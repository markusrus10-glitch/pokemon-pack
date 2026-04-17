'use strict';
const express  = require('express');
const Database = require('better-sqlite3');
const path     = require('path');

const app  = express();
const db   = new Database(path.join(__dirname, 'game.db'));
const PORT = process.env.PORT || 3000;

// Accept both application/json and text/plain (iOS workaround — text/plain avoids CORS preflight)
app.use(express.json({ limit: '4mb', type: ['application/json', 'text/plain'] }));

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

const stmtInsertListing = db.prepare(`
  INSERT OR IGNORE INTO market (uid, seller_id, seller_name, card, price, listed_at)
  VALUES (?, ?, ?, ?, ?, ?)
`);

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
  // Save any pending market listings
  if (Array.isArray(b.pending_listings)) {
    for (const l of b.pending_listings) {
      if (l.uid && l.card && l.price && l.seller_id) {
        stmtInsertListing.run(
          String(l.uid),
          String(l.seller_id),
          String(l.seller_name || 'Trader').slice(0, 64),
          JSON.stringify(l.card),
          Number(l.price),
          new Date().toISOString()
        );
      }
    }
  }
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

// ── CARD CATALOG (no base64 needed — reconstruct card from tcg_num) ─
const CARD_CATALOG = {
  4: {name:'Charizard', hp:120, rarity:'crown',    css:'crown',     label:'♛',   value:15000},
  10:{name:'Mewtwo',    hp:60,  rarity:'crown',    css:'crown',     label:'♛',   value:15000},
  2: {name:'Blastoise', hp:100, rarity:'ultraRare',css:'ultra-rare',label:'★',   value:3000},
  6: {name:'Gyarados',  hp:100, rarity:'ultraRare',css:'ultra-rare',label:'★',   value:3000},
  14:{name:'Raichu',    hp:80,  rarity:'ultraRare',css:'ultra-rare',label:'★',   value:3000},
  15:{name:'Venusaur',  hp:100, rarity:'ultraRare',css:'ultra-rare',label:'★',   value:3000},
  16:{name:'Zapdos',    hp:90,  rarity:'ultraRare',css:'ultra-rare',label:'★',   value:3000},
  1: {name:'Alakazam',  hp:80,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  3: {name:'Chansey',   hp:120, rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  5: {name:'Clefairy',  hp:40,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  7: {name:'Hitmonchan',hp:70,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  8: {name:'Machamp',   hp:100, rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  9: {name:'Magneton',  hp:60,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  11:{name:'Nidoking',  hp:90,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  12:{name:'Ninetales', hp:80,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  13:{name:'Poliwrath', hp:90,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  17:{name:'Beedrill',  hp:80,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  18:{name:'Dragonair', hp:80,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  19:{name:'Dugtrio',   hp:70,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  20:{name:'Electabuzz',hp:70,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  21:{name:'Electrode', hp:80,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  22:{name:'Pidgeotto', hp:60,  rarity:'rare',     css:'rare',      label:'◆◆◆', value:750},
  23:{name:'Arcanine',  hp:100, rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  24:{name:'Charmeleon',hp:80,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  25:{name:'Dewgong',   hp:80,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  26:{name:'Dratini',   hp:40,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  27:{name:"Farfetch'd",hp:50,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  28:{name:'Growlithe', hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  29:{name:'Haunter',   hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  30:{name:'Ivysaur',   hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  31:{name:'Jynx',      hp:70,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  32:{name:'Kadabra',   hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  33:{name:'Kakuna',    hp:80,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  34:{name:'Machoke',   hp:80,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  35:{name:'Magikarp',  hp:30,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  36:{name:'Magmar',    hp:50,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  37:{name:'Nidorino',  hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  38:{name:'Poliwhirl', hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  39:{name:'Porygon',   hp:30,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  40:{name:'Raticate',  hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  41:{name:'Seel',      hp:60,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  42:{name:'Wartortle', hp:70,  rarity:'uncommon', css:'uncommon',  label:'◆◆',  value:200},
  43:{name:'Abra',      hp:30,  rarity:'common',   css:'common',    label:'◆',   value:50},
  44:{name:'Bulbasaur', hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  45:{name:'Caterpie',  hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  46:{name:'Charmander',hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  47:{name:'Diglett',   hp:30,  rarity:'common',   css:'common',    label:'◆',   value:50},
  48:{name:'Doduo',     hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  49:{name:'Drowzee',   hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  50:{name:'Gastly',    hp:30,  rarity:'common',   css:'common',    label:'◆',   value:50},
  51:{name:'Koffing',   hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  52:{name:'Machop',    hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  53:{name:'Magnemite', hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  54:{name:'Metapod',   hp:70,  rarity:'common',   css:'common',    label:'◆',   value:50},
  55:{name:'Nidoran M', hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  56:{name:'Onix',      hp:90,  rarity:'common',   css:'common',    label:'◆',   value:50},
  57:{name:'Pidgey',    hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  58:{name:'Pikachu',   hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  59:{name:'Poliwag',   hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  60:{name:'Ponyta',    hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  61:{name:'Rattata',   hp:30,  rarity:'common',   css:'common',    label:'◆',   value:50},
  62:{name:'Sandshrew', hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  63:{name:'Squirtle',  hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  64:{name:'Starmie',   hp:60,  rarity:'common',   css:'common',    label:'◆',   value:50},
  65:{name:'Staryu',    hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  66:{name:'Tangela',   hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  67:{name:'Voltorb',   hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
  68:{name:'Vulpix',    hp:50,  rarity:'common',   css:'common',    label:'◆',   value:50},
  69:{name:'Weedle',    hp:40,  rarity:'common',   css:'common',    label:'◆',   value:50},
};

// ── MARKET LIST — 3 path segments, same depth as /api/user/:id (iOS-safe) ──
// URL: /api/mkt/:data  where data = "seller_id.uid.price.tcg_num"
// iOS WKWebView allows fetch() to 3-segment paths; blocks 4+ segments
app.get('/api/mkt/:data', (req, res) => {
  const parts = req.params.data.split('.');
  if (parts.length < 4) return res.status(400).json({ error: 'bad params' });
  const [seller_id, uid, price, tcg_num] = parts;
  const entry = CARD_CATALOG[Number(tcg_num)];
  if (!entry) return res.status(400).json({ error: 'unknown card' });
  const user = stmtGetUser.get(String(seller_id));
  const seller_name = (user && user.username) || 'Trader';
  const card = {
    tcgId:      `base1-${tcg_num}`,
    name:       entry.name,
    hp:         entry.hp,
    rarity:     entry.rarity,
    rarityCSS:  entry.css,
    rarityLabel:entry.label,
    value:      entry.value,
    imageUrl:   `https://images.pokemontcg.io/base1/${tcg_num}.png`,
  };
  db.prepare('INSERT OR IGNORE INTO market (uid, seller_id, seller_name, card, price, listed_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(uid, String(seller_id), seller_name.slice(0, 64), JSON.stringify(card), Number(price), new Date().toISOString());
  res.json({ ok: true });
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
