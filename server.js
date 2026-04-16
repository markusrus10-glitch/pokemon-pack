'use strict';
const express  = require('express');
const Database = require('better-sqlite3');
const path     = require('path');

const app  = express();
const db   = new Database(path.join(__dirname, 'game.db'));
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '4mb' }));

// CORS — Telegram iOS WebView sends preflight OPTIONS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.path.startsWith('/api')) {
    console.log(`${req.method} ${req.path} ip=${req.headers['x-real-ip'] || req.ip}`);
  }
  next();
});

// Block access to sensitive server files
const BLOCKED = new Set(['/server.js', '/package.json', '/package-lock.json', '/setup.sh', '/game.db', '/.gitignore']);
app.use((req, res, next) => {
  if (BLOCKED.has(req.path)) return res.status(403).end();
  next();
});

// Serve game files from repo root
app.use(express.static(__dirname));

// ── DB INIT ──────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    telegram_id  TEXT PRIMARY KEY,
    username     TEXT    NOT NULL DEFAULT 'Trainer',
    coins        INTEGER NOT NULL DEFAULT 0,
    score        INTEGER NOT NULL DEFAULT 0,
    collection   TEXT    NOT NULL DEFAULT '[]',
    avatar_id    INTEGER NOT NULL DEFAULT 0,
    last_pack    TEXT,
    last_reward  TEXT,
    updated_at   TEXT    NOT NULL DEFAULT ''
  );
  CREATE TABLE IF NOT EXISTS market (
    uid          TEXT PRIMARY KEY,
    seller_id    TEXT NOT NULL,
    seller_name  TEXT NOT NULL,
    card         TEXT NOT NULL,
    price        INTEGER NOT NULL,
    listed_at    TEXT NOT NULL
  );
`);

// ── PREPARED STATEMENTS ───────────────────────────────────────
const stmtGetUser = db.prepare('SELECT * FROM users WHERE telegram_id = ?');
const stmtUpsertUser = db.prepare(`
  INSERT INTO users (telegram_id, username, coins, score, collection, avatar_id, last_pack, last_reward, updated_at)
  VALUES (@telegram_id, @username, @coins, @score, @collection, @avatar_id, @last_pack, @last_reward, @updated_at)
  ON CONFLICT(telegram_id) DO UPDATE SET
    username    = excluded.username,
    coins       = excluded.coins,
    score       = excluded.score,
    collection  = excluded.collection,
    avatar_id   = excluded.avatar_id,
    last_pack   = excluded.last_pack,
    last_reward = excluded.last_reward,
    updated_at  = excluded.updated_at
`);

// ── USER API ─────────────────────────────────────────────────
app.get('/api/user/:id', (req, res) => {
  const row = stmtGetUser.get(req.params.id);
  if (!row) return res.json(null);
  res.json({ ...row, collection: JSON.parse(row.collection || '[]') });
});

app.post('/api/user/:id', (req, res) => {
  const b = req.body;
  stmtUpsertUser.run({
    telegram_id: req.params.id,
    username:    String(b.username    || 'Trainer').slice(0, 64),
    coins:       Number(b.coins)       || 0,
    score:       Number(b.score)       || 0,
    collection:  JSON.stringify(Array.isArray(b.collection) ? b.collection : []),
    avatar_id:   Number(b.avatar_id)   || 0,
    last_pack:   b.last_pack   || null,
    last_reward: b.last_reward || null,
    updated_at:  new Date().toISOString(),
  });
  res.json({ ok: true });
});

// ── LEADERBOARD ───────────────────────────────────────────────
app.get('/api/leaderboard', (_req, res) => {
  const rows = db.prepare(`
    SELECT username AS name, score, updated_at,
      json_array_length(collection) AS cards
    FROM users
    WHERE score > 0
    ORDER BY score DESC
    LIMIT 10
  `).all();
  res.json(rows);
});

// ── MARKET ───────────────────────────────────────────────────
app.get('/api/market', (_req, res) => {
  const rows = db.prepare('SELECT * FROM market ORDER BY listed_at DESC').all();
  res.json(rows.map(r => ({ ...r, card: JSON.parse(r.card) })));
});

app.post('/api/market', (req, res) => {
  const { uid, seller_id, seller_name, card, price } = req.body;
  if (!uid || !card || !price || !seller_id) {
    return res.status(400).json({ error: 'missing fields' });
  }
  db.prepare(`
    INSERT OR IGNORE INTO market (uid, seller_id, seller_name, card, price, listed_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(uid, String(seller_id), String(seller_name).slice(0, 64),
         JSON.stringify(card), Number(price), new Date().toISOString());
  res.json({ ok: true });
});

app.delete('/api/market/:uid', (req, res) => {
  const row = db.prepare('SELECT * FROM market WHERE uid = ?').get(req.params.uid);
  if (!row) return res.status(404).json({ error: 'not found' });
  db.prepare('DELETE FROM market WHERE uid = ?').run(req.params.uid);
  res.json({ ok: true, card: JSON.parse(row.card), seller_id: row.seller_id });
});

// ── FALLBACK → SPA ────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── START ─────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Pokemon TCG server on port ${PORT}`);
});
