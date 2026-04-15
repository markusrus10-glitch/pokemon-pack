// ============================================================
// CONSTANTS
// ============================================================

// Real TCG card pool — Base Set 1 (base1), confirmed images from pokemontcg.io
const T = (n) => `https://images.pokemontcg.io/base1/${n}.png`;
const POKEMON_POOL = {
  crown: [
    {tcgId:'base1-4',  name:'Charizard',  hp:120, imageUrl:T(4)},
    {tcgId:'base1-10', name:'Mewtwo',     hp:60,  imageUrl:T(10)},
  ],
  ultraRare: [
    {tcgId:'base1-2',  name:'Blastoise',  hp:100, imageUrl:T(2)},
    {tcgId:'base1-6',  name:'Gyarados',   hp:100, imageUrl:T(6)},
    {tcgId:'base1-14', name:'Raichu',     hp:80,  imageUrl:T(14)},
    {tcgId:'base1-15', name:'Venusaur',   hp:100, imageUrl:T(15)},
    {tcgId:'base1-16', name:'Zapdos',     hp:90,  imageUrl:T(16)},
  ],
  rare: [
    {tcgId:'base1-1',  name:'Alakazam',   hp:80,  imageUrl:T(1)},
    {tcgId:'base1-3',  name:'Chansey',    hp:120, imageUrl:T(3)},
    {tcgId:'base1-5',  name:'Clefairy',   hp:40,  imageUrl:T(5)},
    {tcgId:'base1-7',  name:'Hitmonchan', hp:70,  imageUrl:T(7)},
    {tcgId:'base1-8',  name:'Machamp',    hp:100, imageUrl:T(8)},
    {tcgId:'base1-9',  name:'Magneton',   hp:60,  imageUrl:T(9)},
    {tcgId:'base1-11', name:'Nidoking',   hp:90,  imageUrl:T(11)},
    {tcgId:'base1-12', name:'Ninetales',  hp:80,  imageUrl:T(12)},
    {tcgId:'base1-13', name:'Poliwrath',  hp:90,  imageUrl:T(13)},
    {tcgId:'base1-17', name:'Beedrill',   hp:80,  imageUrl:T(17)},
    {tcgId:'base1-18', name:'Dragonair',  hp:80,  imageUrl:T(18)},
    {tcgId:'base1-19', name:'Dugtrio',    hp:70,  imageUrl:T(19)},
    {tcgId:'base1-20', name:'Electabuzz', hp:70,  imageUrl:T(20)},
    {tcgId:'base1-21', name:'Electrode',  hp:80,  imageUrl:T(21)},
    {tcgId:'base1-22', name:'Pidgeotto',  hp:60,  imageUrl:T(22)},
  ],
  uncommon: [
    {tcgId:'base1-23', name:'Arcanine',   hp:100, imageUrl:T(23)},
    {tcgId:'base1-24', name:'Charmeleon', hp:80,  imageUrl:T(24)},
    {tcgId:'base1-25', name:'Dewgong',    hp:80,  imageUrl:T(25)},
    {tcgId:'base1-26', name:'Dratini',    hp:40,  imageUrl:T(26)},
    {tcgId:'base1-27', name:"Farfetch'd", hp:50,  imageUrl:T(27)},
    {tcgId:'base1-28', name:'Growlithe',  hp:60,  imageUrl:T(28)},
    {tcgId:'base1-29', name:'Haunter',    hp:60,  imageUrl:T(29)},
    {tcgId:'base1-30', name:'Ivysaur',    hp:60,  imageUrl:T(30)},
    {tcgId:'base1-31', name:'Jynx',       hp:70,  imageUrl:T(31)},
    {tcgId:'base1-32', name:'Kadabra',    hp:60,  imageUrl:T(32)},
    {tcgId:'base1-33', name:'Kakuna',     hp:80,  imageUrl:T(33)},
    {tcgId:'base1-34', name:'Machoke',    hp:80,  imageUrl:T(34)},
    {tcgId:'base1-35', name:'Magikarp',   hp:30,  imageUrl:T(35)},
    {tcgId:'base1-36', name:'Magmar',     hp:50,  imageUrl:T(36)},
    {tcgId:'base1-37', name:'Nidorino',   hp:60,  imageUrl:T(37)},
    {tcgId:'base1-38', name:'Poliwhirl',  hp:60,  imageUrl:T(38)},
    {tcgId:'base1-39', name:'Porygon',    hp:30,  imageUrl:T(39)},
    {tcgId:'base1-40', name:'Raticate',   hp:60,  imageUrl:T(40)},
    {tcgId:'base1-41', name:'Seel',       hp:60,  imageUrl:T(41)},
    {tcgId:'base1-42', name:'Wartortle',  hp:70,  imageUrl:T(42)},
  ],
  common: [
    {tcgId:'base1-43', name:'Abra',       hp:30,  imageUrl:T(43)},
    {tcgId:'base1-44', name:'Bulbasaur',  hp:40,  imageUrl:T(44)},
    {tcgId:'base1-45', name:'Caterpie',   hp:40,  imageUrl:T(45)},
    {tcgId:'base1-46', name:'Charmander', hp:50,  imageUrl:T(46)},
    {tcgId:'base1-47', name:'Diglett',    hp:30,  imageUrl:T(47)},
    {tcgId:'base1-48', name:'Doduo',      hp:50,  imageUrl:T(48)},
    {tcgId:'base1-49', name:'Drowzee',    hp:50,  imageUrl:T(49)},
    {tcgId:'base1-50', name:'Gastly',     hp:30,  imageUrl:T(50)},
    {tcgId:'base1-51', name:'Koffing',    hp:50,  imageUrl:T(51)},
    {tcgId:'base1-52', name:'Machop',     hp:50,  imageUrl:T(52)},
    {tcgId:'base1-53', name:'Magnemite',  hp:40,  imageUrl:T(53)},
    {tcgId:'base1-54', name:'Metapod',    hp:70,  imageUrl:T(54)},
    {tcgId:'base1-55', name:'Nidoran M',  hp:40,  imageUrl:T(55)},
    {tcgId:'base1-56', name:'Onix',       hp:90,  imageUrl:T(56)},
    {tcgId:'base1-57', name:'Pidgey',     hp:40,  imageUrl:T(57)},
    {tcgId:'base1-58', name:'Pikachu',    hp:40,  imageUrl:T(58)},
    {tcgId:'base1-59', name:'Poliwag',    hp:40,  imageUrl:T(59)},
    {tcgId:'base1-60', name:'Ponyta',     hp:40,  imageUrl:T(60)},
    {tcgId:'base1-61', name:'Rattata',    hp:30,  imageUrl:T(61)},
    {tcgId:'base1-62', name:'Sandshrew',  hp:40,  imageUrl:T(62)},
    {tcgId:'base1-63', name:'Squirtle',   hp:40,  imageUrl:T(63)},
    {tcgId:'base1-64', name:'Starmie',    hp:60,  imageUrl:T(64)},
    {tcgId:'base1-65', name:'Staryu',     hp:40,  imageUrl:T(65)},
    {tcgId:'base1-66', name:'Tangela',    hp:50,  imageUrl:T(66)},
    {tcgId:'base1-67', name:'Voltorb',    hp:40,  imageUrl:T(67)},
    {tcgId:'base1-68', name:'Vulpix',     hp:50,  imageUrl:T(68)},
    {tcgId:'base1-69', name:'Weedle',     hp:40,  imageUrl:T(69)},
  ],
};

const RARITY_WEIGHTS = { common:0.50, uncommon:0.30, rare:0.15, ultraRare:0.04, crown:0.01 };
const RARITY_HP      = { common:[30,60], uncommon:[60,90], rare:[90,130], ultraRare:[130,170], crown:[200,200] };
const RARITY_LABELS  = { common:'◆', uncommon:'◆◆', rare:'◆◆◆', ultraRare:'★', crown:'♛' };
const RARITY_CSS     = { common:'common', uncommon:'uncommon', rare:'rare', ultraRare:'ultra-rare', crown:'crown' };
const RARITY_ORDER   = ['crown','ultraRare','rare','uncommon','common'];

const CARD_VALUES = { common:50, uncommon:200, rare:750, ultraRare:3000, crown:15000 };

// Storage keys
const KEY_COLLECTION    = 'pokemon_collection_v1';
const KEY_COINS         = 'pokemon_coins_v1';
const KEY_LAST_REWARD   = 'pokemon_last_reward_v1';
const KEY_LAST_PACK     = 'pokemon_last_pack_v1';
const KEY_USERNAME      = 'pokemon_username_v1';
const KEY_AVATAR        = 'pokemon_avatar_v1';
const KEY_OLD_PACK      = 'pokemon_pack_v1';
const KEY_MY_LISTINGS   = 'pokemon_my_listings_v1';

// Leaderboard
const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/019d7b99-ed6c-728b-b65c-a6dab98ec4bb';

const DAILY_INTERVAL_MS = 24 * 60 * 60 * 1000;

// ============================================================
// UTILITIES
// ============================================================

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pickRarity() {
  const roll = Math.random();
  let cum = 0;
  for (const [r, w] of Object.entries(RARITY_WEIGHTS)) { cum += w; if (roll < cum) return r; }
  return 'common';
}

function pickFromPool(rarity) {
  const pool = POKEMON_POOL[rarity];
  return pool[Math.floor(Math.random() * pool.length)];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function makeUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatTime(ms) {
  if (ms <= 0) return '00:00:00';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

// ============================================================
// CARD GENERATION
// ============================================================

function enrichCard(card) {
  return {
    ...card,
    value:      CARD_VALUES[card.rarity] || 50,
    rarityLabel: RARITY_LABELS[card.rarity],
    rarityCSS:   RARITY_CSS[card.rarity],
    obtainedAt:  card.obtainedAt || new Date().toISOString(),
    uid:         card.uid || makeUid(),
  };
}

function rollMiniPack(count) {
  const cards = [];
  const used = new Set();
  let attempts = 0;
  while (cards.length < count && attempts < 200) {
    attempts++;
    const rarity  = pickRarity();
    const pool    = POKEMON_POOL[rarity];
    const pokemon = pool[Math.floor(Math.random() * pool.length)];
    if (!used.has(pokemon.tcgId) || pool.length === 1) {
      used.add(pokemon.tcgId);
      cards.push(enrichCard({
        tcgId:    pokemon.tcgId,
        name:     pokemon.name,
        rarity,
        hp:       pokemon.hp,
        imageUrl: pokemon.imageUrl,
      }));
    }
  }
  return cards;
}

// ============================================================
// STORAGE
// ============================================================

function getCollection() {
  try { return JSON.parse(localStorage.getItem(KEY_COLLECTION)) || []; } catch { return []; }
}
function saveCollection(arr) {
  try { localStorage.setItem(KEY_COLLECTION, JSON.stringify(arr)); } catch {}
}
function addToCollection(cards) {
  const col = getCollection();
  col.push(...cards);
  saveCollection(col);
}

function getCoins() {
  return parseInt(localStorage.getItem(KEY_COINS) || '0', 10);
}
function addCoins(amount) {
  localStorage.setItem(KEY_COINS, String(getCoins() + amount));
}

function getUsername() {
  return localStorage.getItem(KEY_USERNAME) || 'Игрок';
}
function setUsername(name) {
  localStorage.setItem(KEY_USERNAME, name);
}

function canClaimReward() {
  const last = localStorage.getItem(KEY_LAST_REWARD);
  if (!last) return true;
  return Date.now() - new Date(last).getTime() > DAILY_INTERVAL_MS;
}
function markRewardClaimed() {
  localStorage.setItem(KEY_LAST_REWARD, new Date().toISOString());
}
function msUntilNextReward() {
  const last = localStorage.getItem(KEY_LAST_REWARD);
  if (!last) return 0;
  return Math.max(0, DAILY_INTERVAL_MS - (Date.now() - new Date(last).getTime()));
}

// Main pack — once per 24h
function canOpenPack() {
  return true; // TEST MODE — remove this line to restore 24h cooldown
}
function markPackOpened() {
  localStorage.setItem(KEY_LAST_PACK, new Date().toISOString());
}
function msUntilNextPack() {
  const last = localStorage.getItem(KEY_LAST_PACK);
  if (!last) return 0;
  return Math.max(0, DAILY_INTERVAL_MS - (Date.now() - new Date(last).getTime()));
}

// Migrate old pack data to new collection format
function migrateOldData() {
  const raw = localStorage.getItem(KEY_OLD_PACK);
  if (!raw) return;
  if (getCollection().length > 0) return; // already migrated
  try {
    const old = JSON.parse(raw);
    if (Array.isArray(old) && old.length > 0) {
      saveCollection(old.map(enrichCard));
    }
  } catch {}
}

// ============================================================
// LEADERBOARD
// ============================================================

async function submitScore(name, score, cards) {
  try {
    const res = await fetch(JSONBLOB_URL);
    if (!res.ok) return;
    const data = await res.json();
    const players  = Array.isArray(data.players)  ? data.players  : [];
    const listings = Array.isArray(data.listings) ? data.listings : [];

    const idx = players.findIndex(p => p.name === name);
    const entry = { name, score, cards, updatedAt: new Date().toISOString() };
    if (idx >= 0) players[idx] = entry;
    else players.push(entry);

    await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players, listings }),
    });
  } catch {}
}

async function fetchLeaderboard() {
  const res = await fetch(JSONBLOB_URL);
  const data = await res.json();
  const players = Array.isArray(data.players) ? data.players : [];
  return players.sort((a, b) => b.score - a.score).slice(0, 10);
}

// ============================================================
// IMAGE PRE-FETCH
// ============================================================

async function prefetchImages(cards) {
  const timeout = ms => new Promise(r => setTimeout(r, ms));
  await Promise.all(cards.map(c => Promise.race([
    new Promise(r => {
      const img = new Image();
      img.onload = img.onerror = r;
      img.src = c.imageUrl || getSpriteUrl(c.id);
    }),
    timeout(6000),
  ])));
}

// ============================================================
// DOM BUILDERS
// ============================================================

function buildCardElement(card, isFlipped = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';

  const inner = document.createElement('div');
  inner.className = 'card-inner' + (isFlipped ? ' flipped' : '');

  const back = document.createElement('div');
  back.className = 'card-face card-back';
  const logo = document.createElement('span');
  logo.className = 'card-back-logo';
  logo.textContent = '⬟';
  back.appendChild(logo);

  const front = document.createElement('div');
  front.className = 'card-face card-front';
  front.dataset.rarity = card.rarityCSS || RARITY_CSS[card.rarity] || 'common';

  if (card.imageUrl) {
    // Real TCG card image
    const img = document.createElement('img');
    img.className = 'card-tcg-img';
    img.src = card.imageUrl;
    img.alt = card.name;
    img.draggable = false;
    img.onerror = () => { img.style.opacity = '0.3'; };
    front.appendChild(img);
  } else {
    // Legacy fallback for old collection cards
    front.innerHTML = `
      <div class="card-header">
        <span class="card-pokemon-name">${card.name}</span>
        <span class="card-hp">${card.hp}&nbsp;HP</span>
      </div>
      <div class="card-image-area">
        <img class="card-pokemon-image" src="${getSpriteUrl(card.id)}" alt="${card.name}" draggable="false" onerror="this.style.opacity='0.3'"/>
      </div>
      <div class="card-footer">
        <div class="card-rarity-indicator" data-rarity="${card.rarityCSS}">${card.rarityLabel}</div>
      </div>`;
  }

  inner.appendChild(back);
  inner.appendChild(front);
  wrapper.appendChild(inner);
  return wrapper;
}

function buildProfileCardItem(card, onClick) {
  const item = document.createElement('div');
  item.className = 'profile-card-item';
  item.appendChild(buildCardElement(card, true));
  const badge = document.createElement('div');
  badge.className = 'card-value-badge';
  badge.textContent = `🪙 ${card.value.toLocaleString()}`;
  item.appendChild(badge);
  item.addEventListener('click', () => onClick(card));
  return item;
}

// ============================================================
// STARFIELD
// ============================================================

function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({length:120}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.4 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = 0.25 + 0.75 * Math.abs(Math.sin(ts * s.speed * 0.001 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
}

// ============================================================
// TELEGRAM SDK
// ============================================================

function initTelegram() {
  if (typeof Telegram === 'undefined' || !Telegram.WebApp) return;
  const tg = Telegram.WebApp;
  tg.ready();
  tg.expand();
  const t = tg.themeParams || {};
  const r = document.documentElement.style;
  if (t.bg_color)          r.setProperty('--tg-bg-color',          t.bg_color);
  if (t.text_color)        r.setProperty('--tg-text-color',        t.text_color);
  if (t.hint_color)        r.setProperty('--tg-hint-color',        t.hint_color);
  if (t.button_color)      r.setProperty('--tg-button-color',      t.button_color);
  if (t.button_text_color) r.setProperty('--tg-button-text-color', t.button_text_color);

  // Get username from Telegram
  try {
    const user = tg.initDataUnsafe?.user;
    if (user) {
      const name = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username || 'Игрок';
      setUsername(name);
    }
  } catch {}
}

function haptic(type) {
  try { if (typeof Telegram !== 'undefined') Telegram.WebApp?.HapticFeedback?.impactOccurred(type); } catch {}
}

// ============================================================
// NAVIGATION
// ============================================================

let currentScreen = 'welcome';

function showScreen(id, navTab) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
    el.classList.add('hidden');
  });
  const target = document.getElementById(`screen-${id}`);
  target.classList.remove('hidden');
  void target.offsetWidth;
  target.classList.add('active');
  currentScreen = id;

  // Hide nav during pack animation
  const nav = document.getElementById('main-nav');
  if (id === 'pack') {
    nav.style.display = 'none';
  } else {
    nav.style.display = '';
  }

  // Update nav active tab
  if (navTab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(`nav-${navTab}`);
    if (tab) tab.classList.add('active');
  }
}

function showLoading(show) {
  document.getElementById('loading-overlay').classList.toggle('hidden', !show);
}

// Global functions exposed to HTML (onclick attributes)
/** @type {any} */ (window).navigate = function(dest) {
  if (dest === 'home') {
    renderHomeScreen();
    showScreen('welcome', 'home');
  } else if (dest === 'profile') {
    renderProfileScreen();
    showScreen('profile', 'profile');
    submitCurrentScore();
  } else if (dest === 'rating') {
    showScreen('rating', 'rating');
    loadRatingScreen();
  } else if (dest === 'market') {
    showScreen('market', 'market');
    renderMarketScreen();
  }
};

// ============================================================
// PACK OPENING SEQUENCE — SWIPE TO REVEAL
// ============================================================

const SWIPE_THRESHOLD = 70; // px to trigger reveal

function revealCardWithSwipe(card, cardSlot, counterEl, index, total) {
  return new Promise(resolve => {
    // Build card face-down, then auto-flip to reveal
    const cardEl = buildCardElement(card, false);
    cardEl.classList.add('entering');
    cardSlot.appendChild(cardEl);

    const inner = cardEl.querySelector('.card-inner');

    // Update counter
    if (counterEl) counterEl.textContent = `${index + 1} / ${total}`;

    // Auto-reveal: flip to front immediately
    setTimeout(() => {
      inner.style.transition = 'transform 0.35s ease';
      inner.classList.add('flipped');
      haptic({ common:'light', uncommon:'light', rare:'medium', ultraRare:'heavy', crown:'heavy' }[card.rarity] || 'light');
      if (card.rarity === 'ultraRare' || card.rarity === 'crown') {
        const overlay = document.createElement('div');
        overlay.className = 'spotlight-overlay ' + (card.rarity === 'crown' ? 'crown' : 'ultra');
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1400);
      }
    }, 80);

    let startX = 0, startY = 0;
    let dragging = false;
    let done = false;

    function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
    function getY(e) { return e.touches ? e.touches[0].clientY : e.clientY; }

    function onStart(e) {
      if (done) return;
      startX = getX(e);
      startY = getY(e);
      dragging = true;
      cardEl.style.transition = 'none';
    }

    function onMove(e) {
      if (!dragging || done) return;
      const dx = getX(e) - startX;
      const dy = getY(e) - startY;
      // Only horizontal swipe (ignore vertical scroll)
      if (Math.abs(dx) < Math.abs(dy) * 0.6 && Math.abs(dx) < 20) return;
      if (e.cancelable) e.preventDefault();
      const rotate = dx * 0.07;
      const progress = Math.min(Math.abs(dx) / SWIPE_THRESHOLD, 1);
      cardEl.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      // Show directional tint on card front
      inner.style.setProperty('--swipe-progress', progress);
      inner.style.setProperty('--swipe-dir', dx > 0 ? '1' : '-1');
    }

    function onEnd(e) {
      if (!dragging || done) return;
      dragging = false;
      const dx = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - startX;

      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        // Swipe confirmed — fly off immediately, no delays
        done = true;
        cleanup();
        const dir = dx > 0 ? 1 : -1;

        cardEl.style.transition = 'transform 0.3s ease-in, opacity 0.25s ease';
        cardEl.style.transform  = `translateX(${dir * 110}vw) rotate(${dir * 22}deg)`;
        cardEl.style.opacity    = '0';

        // Resolve right away so next card appears immediately
        resolve();
        setTimeout(() => cardEl.remove(), 350);

      } else {
        // Snap back
        cardEl.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
        cardEl.style.transform  = '';
      }
    }

    function cleanup() {
      cardEl.removeEventListener('touchstart', onStart);
      cardEl.removeEventListener('touchmove',  onMove);
      cardEl.removeEventListener('touchend',   onEnd);
      cardEl.removeEventListener('mousedown',  onStart);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onEnd);
    }

    cardEl.addEventListener('touchstart', onStart, { passive: true });
    cardEl.addEventListener('touchmove',  onMove,  { passive: false });
    cardEl.addEventListener('touchend',   onEnd);
    cardEl.addEventListener('mousedown',  onStart);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onEnd);
  });
}

async function runPackOpeningSequence(cards, onDone) {
  showScreen('pack');

  const packVisual = document.getElementById('pack-visual');
  const packInstr  = document.getElementById('pack-instruction');
  const revealArea = document.getElementById('cards-reveal-area');

  packVisual.classList.remove('shaking', 'bursting');
  packVisual.style.display = '';
  revealArea.classList.add('hidden');
  revealArea.innerHTML = '';

  // Short pause so user sees the pack before it opens
  await sleep(400);

  haptic('medium');
  packInstr.textContent = '';
  packVisual.classList.add('shaking');
  await sleep(860);

  packVisual.classList.remove('shaking');
  packVisual.classList.add('bursting');
  await sleep(500);
  packVisual.style.display = 'none';
  revealArea.classList.remove('hidden');

  // Card slot (where card lives)
  const cardSlot = document.createElement('div');
  cardSlot.className = 'card-slot';
  revealArea.appendChild(cardSlot);

  // Counter "1 / 5"
  const counterEl = document.createElement('div');
  counterEl.className = 'card-counter';
  revealArea.appendChild(counterEl);

  // Swipe hint
  const hint = document.createElement('div');
  hint.className = 'swipe-hint';
  hint.innerHTML = '<span class="swipe-arrow">←</span> смахни <span class="swipe-arrow">→</span>';
  revealArea.appendChild(hint);

  // Reveal each card via swipe
  for (let i = 0; i < cards.length; i++) {
    await revealCardWithSwipe(cards[i], cardSlot, counterEl, i, cards.length);
  }

  await sleep(200);
  if (onDone) onDone(cards);
}

function showResultsScreen(cards) {
  const container = document.getElementById('results-cards');
  container.innerHTML = '';
  cards.forEach((card, i) => {
    const el = buildCardElement(card, true);
    el.style.animationDelay = `${i * 100}ms`;
    el.classList.add('entering');
    container.appendChild(el);
  });
  showScreen('results', 'home');
}

// ============================================================
// HOME SCREEN
// ============================================================

let homeTimerInterval = null;

function renderHomeScreen() {
  const name = getUsername();
  const collection = getCollection();
  const coins = getCoins();

  const nameEl = document.getElementById('home-trainer-name');
  const avatarEl = document.getElementById('home-avatar');
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) applyAvatarToEl(avatarEl, getAvatarId(), name.charAt(0).toUpperCase());

  // Header coins
  const headerCoins = document.getElementById('header-coins');
  if (headerCoins) headerCoins.textContent = `🪙 ${coins.toLocaleString()}`;

  // Deck strip — show last 5 cards (sorted by rarity)
  const strip = document.getElementById('home-deck-strip');
  if (strip) {
    strip.innerHTML = '';
    if (collection.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'deck-strip-empty';
      empty.textContent = 'Открой первый пакет!';
      strip.appendChild(empty);
    } else {
      const sorted = [...collection]
        .sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity))
        .slice(0, 6);
      sorted.forEach(card => {
        const item = document.createElement('div');
        item.className = `deck-strip-card rarity-${card.rarityCSS}`;
        const img = document.createElement('img');
        img.src = getSpriteUrl(card.id);
        img.alt = card.name;
        img.onerror = () => { img.style.opacity = '0.3'; };
        item.appendChild(img);
        strip.appendChild(item);
      });
    }
  }

  // Pack timer
  updateHomePackTimer();
  if (homeTimerInterval) clearInterval(homeTimerInterval);
  homeTimerInterval = setInterval(updateHomePackTimer, 1000);
}

function updateHomePackTimer() {
  const sub   = document.getElementById('home-pack-sub');
  const timer = document.getElementById('home-pack-timer');
  const btn   = document.getElementById('btn-open-pack');
  if (!sub || !timer) return;

  if (canOpenPack()) {
    sub.textContent   = getCollection().length === 0 ? 'Первый пак бесплатно!' : 'Доступен!';
    timer.textContent = 'Открыть сейчас';
    if (btn) btn.disabled = false;
  } else {
    sub.textContent   = 'Следующий пак через';
    timer.textContent = formatTime(msUntilNextPack());
    if (btn) btn.disabled = true;
  }
}

// ============================================================
// PROFILE SCREEN
// ============================================================

let rewardTimerInterval = null;

function renderProfileScreen() {
  const name       = getUsername();
  const collection = getCollection();
  const coins      = getCoins();
  const totalValue = collection.reduce((s, c) => s + (c.value || 0), 0);

  // Header
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-coins-count').textContent = coins.toLocaleString();
  applyAvatarToEl(document.getElementById('profile-avatar'), getAvatarId(), name.charAt(0).toUpperCase());
  document.getElementById('profile-total-value').textContent = totalValue.toLocaleString();

  // Stats
  document.getElementById('stat-total-cards').textContent = collection.length;
  document.getElementById('stat-collection-value').textContent = totalValue.toLocaleString();

  // Rarest card
  const rarest = RARITY_ORDER.find(r => collection.some(c => c.rarity === r));
  if (rarest) {
    const rarestCard = collection.find(c => c.rarity === rarest);
    document.getElementById('stat-rarest').textContent = rarestCard.name;
  }

  // Most valuable card
  if (collection.length > 0) {
    const best = collection.reduce((a, b) => (b.value > a.value ? b : a));
    document.getElementById('stat-best-card').textContent = best.name;
  }

  // Daily reward
  updateDailyRewardUI();
  if (rewardTimerInterval) clearInterval(rewardTimerInterval);
  rewardTimerInterval = setInterval(updateDailyRewardUI, 1000);

  // Collection grid
  const grid = document.getElementById('profile-collection');
  grid.innerHTML = '';

  if (collection.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.innerHTML = 'Пока нет карточек.<br>Открой первый пакет!';
    grid.appendChild(empty);
  } else {
    const sorted = [...collection].sort((a, b) =>
      RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity)
    );
    sorted.forEach(card => {
      grid.appendChild(buildProfileCardItem(card, openSellModal));
    });
  }
}

function updateDailyRewardUI() {
  const btn = document.getElementById('daily-reward-btn');
  const sub = document.getElementById('daily-reward-sub');

  if (canClaimReward()) {
    btn.classList.remove('hidden');
    sub.textContent = 'Доступна!';
    if (rewardTimerInterval) { clearInterval(rewardTimerInterval); rewardTimerInterval = null; }
  } else {
    btn.classList.add('hidden');
    sub.textContent = 'Следующая через ' + formatTime(msUntilNextReward());
  }
}

// ============================================================
// DAILY REWARD MODAL
// ============================================================

async function claimDailyReward() {
  const cards = rollMiniPack(3);
  await prefetchImages(cards);
  addToCollection(cards);
  markRewardClaimed();
  updateDailyRewardUI();
  renderProfileScreen();
  showRewardModal(cards);
}

function showRewardModal(cards) {
  const modal = document.getElementById('reward-modal');
  const area  = document.getElementById('reward-cards-area');
  modal.classList.remove('hidden');
  area.innerHTML = '';

  cards.forEach((card, i) => {
    const el = buildCardElement(card, false);
    el.style.animationDelay = `${i * 200}ms`;
    el.classList.add('entering');
    area.appendChild(el);

    setTimeout(() => {
      el.querySelector('.card-inner').classList.add('flipped');
    }, i * 300 + 400);
  });
}

function closeRewardModal() {
  document.getElementById('reward-modal').classList.add('hidden');
}

// ============================================================
// SELL MODAL
// ============================================================

let sellTargetUid  = null;
let sellTargetCard = null;

function openSellModal(card) {
  sellTargetUid  = card.uid;
  sellTargetCard = card;
  const modal = document.getElementById('sell-modal');
  const area  = document.getElementById('sell-modal-card-area');

  area.innerHTML = '';
  const el = buildCardElement(card, true);
  // Scale the card smaller inside modal
  el.style.cssText = '--card-width:130px;--card-height:182px';
  el.querySelector('.card-wrapper').style.width  = '130px';
  el.querySelector('.card-wrapper').style.height = '182px';
  area.appendChild(el);

  document.getElementById('sell-modal-value').textContent = card.value.toLocaleString();
  modal.classList.remove('hidden');
}

function closeSellModal() {
  document.getElementById('sell-modal').classList.add('hidden');
  sellTargetUid  = null;
  sellTargetCard = null;
}

function confirmSell() {
  if (!sellTargetUid) return;
  const col = getCollection();
  const idx = col.findIndex(c => c.uid === sellTargetUid);
  if (idx === -1) { closeSellModal(); return; }

  const card = col[idx];
  col.splice(idx, 1);
  saveCollection(col);
  addCoins(card.value);
  haptic('medium');
  closeSellModal();
  renderProfileScreen();
  renderHomeScreen();
  submitCurrentScore();
}

// ============================================================
// MARKETPLACE — LOCAL LISTINGS CACHE
// ============================================================

function getMyListings() {
  try { return JSON.parse(localStorage.getItem(KEY_MY_LISTINGS)) || []; } catch { return []; }
}
function saveMyListings(arr) {
  try { localStorage.setItem(KEY_MY_LISTINGS, JSON.stringify(arr)); } catch {}
}
function addMyListingLocal(listing) {
  const mine = getMyListings();
  mine.push({ uid: listing.uid, card: listing.card });
  saveMyListings(mine);
}
function removeMyListingLocal(uid) {
  saveMyListings(getMyListings().filter(l => l.uid !== uid));
}

// ============================================================
// MARKETPLACE — API
// ============================================================

async function fetchListings() {
  const res  = await fetch(JSONBLOB_URL);
  const data = await res.json();
  return Array.isArray(data.listings) ? data.listings : [];
}

async function createListing(card, price) {
  const res  = await fetch(JSONBLOB_URL);
  const data = await res.json();
  const players  = Array.isArray(data.players)  ? data.players  : [];
  const listings = Array.isArray(data.listings) ? data.listings : [];

  const listing = {
    uid:        makeUid(),
    sellerName: getUsername(),
    card:       { ...card },
    price:      Math.max(1, Math.floor(Number(price))),
    listedAt:   new Date().toISOString(),
  };
  listings.push(listing);

  await fetch(JSONBLOB_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ players, listings }),
  });
  return listing;
}

async function removeListingRemote(uid) {
  const res  = await fetch(JSONBLOB_URL);
  const data = await res.json();
  const players  = Array.isArray(data.players)  ? data.players  : [];
  const listings = (Array.isArray(data.listings) ? data.listings : []).filter(l => l.uid !== uid);

  await fetch(JSONBLOB_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ players, listings }),
  });
}

async function buyListing(listing) {
  if (getCoins() < listing.price) return false;

  await removeListingRemote(listing.uid);
  removeMyListingLocal(listing.uid); // in case buyer == seller somehow

  const newCoins = getCoins() - listing.price;
  localStorage.setItem(KEY_COINS, String(newCoins));
  addToCollection([enrichCard({ ...listing.card, uid: makeUid(), obtainedAt: new Date().toISOString() })]);
  haptic('medium');
  return true;
}

async function delistListing(listing) {
  await removeListingRemote(listing.uid);
  removeMyListingLocal(listing.uid);
  // Return card to collection
  addToCollection([enrichCard({ ...listing.card, uid: makeUid(), obtainedAt: new Date().toISOString() })]);
  haptic('light');
}

// ============================================================
// MARKET SCREEN
// ============================================================

async function renderMarketScreen() {
  const list = document.getElementById('market-list');
  list.innerHTML = '<div class="rating-empty">Загрузка...</div>';

  let listings;
  try {
    listings = await fetchListings();
  } catch {
    list.innerHTML = '<div class="market-empty">Ошибка загрузки. Попробуйте позже.</div>';
    return;
  }

  const myName = getUsername();
  const myCoins = getCoins();

  if (listings.length === 0) {
    list.innerHTML = '<div class="market-empty">Пока нет лотов.<br>Выставь карточки из профиля!</div>';
    return;
  }

  list.innerHTML = '';
  // Sort: own listings first, then by price
  const sorted = [...listings].sort((a, b) => {
    if ((a.sellerName === myName) !== (b.sellerName === myName)) return a.sellerName === myName ? -1 : 1;
    return a.price - b.price;
  });

  sorted.forEach(listing => {
    const card   = listing.card;
    const isMine = listing.sellerName === myName;

    const row = document.createElement('div');
    row.className = 'market-row' + (isMine ? ' is-mine' : '');

    // Card thumbnail
    const thumb = document.createElement('div');
    thumb.className = `market-thumb rarity-${card.rarityCSS || 'common'}`;
    if (card.imageUrl) {
      const img = document.createElement('img');
      img.src = card.imageUrl;
      img.alt = card.name;
      img.onerror = () => { img.style.opacity = '0.3'; };
      thumb.appendChild(img);
    }
    row.appendChild(thumb);

    // Info
    const info = document.createElement('div');
    info.className = 'market-info';
    info.innerHTML = `
      <div class="market-card-name">${card.name}</div>
      <div class="market-card-rarity ${card.rarityCSS || 'common'}">${card.rarityLabel || ''}</div>
      <div class="market-seller">${isMine ? '⭐ Ваш лот' : '👤 ' + listing.sellerName}</div>`;
    row.appendChild(info);

    // Right side: price + action button
    const right = document.createElement('div');
    right.className = 'market-right';

    const priceEl = document.createElement('div');
    priceEl.className = 'market-price';
    priceEl.textContent = '🪙 ' + listing.price.toLocaleString();
    right.appendChild(priceEl);

    if (isMine) {
      const btn = document.createElement('button');
      btn.className = 'btn-delist';
      btn.textContent = 'Снять';
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = '...';
        try {
          await delistListing(listing);
          renderMarketScreen();
          renderProfileScreen();
          renderHomeScreen();
        } catch {
          btn.disabled = false;
          btn.textContent = 'Снять';
        }
      });
      right.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn-buy';
      btn.textContent = 'Купить';
      if (myCoins < listing.price) btn.disabled = true;
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = '...';
        try {
          const ok = await buyListing(listing);
          if (ok) {
            renderMarketScreen();
            renderHomeScreen();
            submitCurrentScore();
          } else {
            btn.textContent = 'Купить';
            btn.disabled = false;
          }
        } catch {
          btn.textContent = 'Купить';
          btn.disabled = false;
        }
      });
      right.appendChild(btn);
    }

    row.appendChild(right);
    list.appendChild(row);
  });
}

// ============================================================
// LIST-ON-MARKET MODAL
// ============================================================

let listTargetCard = null;

function openListModal(card) {
  listTargetCard = card;
  const modal   = document.getElementById('list-modal');
  const area    = document.getElementById('list-modal-card-area');
  const input   = document.getElementById('list-price-input');
  const hint    = document.getElementById('list-price-hint');

  area.innerHTML = '';
  const el = buildCardElement(card, true);
  el.querySelector('.card-wrapper').style.cssText = 'width:130px;height:182px;--card-w:130px;--card-h:182px';
  area.appendChild(el);

  input.value = String(card.value || 50);
  hint.textContent = `Минимальная стоимость: 🪙 ${(card.value || 50).toLocaleString()}`;

  modal.classList.remove('hidden');
}

function closeListModal() {
  document.getElementById('list-modal').classList.add('hidden');
  listTargetCard = null;
}

async function confirmListing() {
  if (!listTargetCard) return;

  const input   = document.getElementById('list-price-input');
  const price   = parseInt(input.value, 10);
  if (!price || price < 1) { input.focus(); return; }

  const btn = document.getElementById('btn-list-confirm');
  btn.disabled = true;
  btn.textContent = '...';

  try {
    // Remove card from collection first
    const col = getCollection();
    const idx = col.findIndex(c => c.uid === listTargetCard.uid);
    if (idx !== -1) col.splice(idx, 1);
    saveCollection(col);

    const listing = await createListing(listTargetCard, price);
    addMyListingLocal(listing);

    haptic('medium');
    closeListModal();
    renderProfileScreen();
    renderHomeScreen();
    submitCurrentScore();
  } catch {
    btn.disabled = false;
    btn.textContent = 'Выставить';
  }
}

// ============================================================
// RATING SCREEN
// ============================================================

async function loadRatingScreen() {
  const list = document.getElementById('rating-list');
  list.innerHTML = '<div class="rating-loading">Загрузка...</div>';

  try {
    const players = await fetchLeaderboard();
    const myName  = getUsername();
    list.innerHTML = '';

    if (players.length === 0) {
      list.innerHTML = '<div class="rating-loading">Пока нет игроков. Будь первым!</div>';
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    players.forEach((p, i) => {
      const row  = document.createElement('div');
      const isMe = p.name === myName;
      row.className = 'rating-row' + (isMe ? ' is-me' : '');
      row.innerHTML = `
        <span class="rating-rank">${medals[i] || (i + 1)}</span>
        <div class="rating-info">
          <div class="rating-name">${p.name}${isMe ? ' (Вы)' : ''}</div>
          <div class="rating-meta">${p.cards} карточек</div>
        </div>
        <span class="rating-score">🪙 ${(p.score || 0).toLocaleString()}</span>`;
      list.appendChild(row);
    });
  } catch {
    list.innerHTML = '<div class="rating-loading">Ошибка загрузки. Попробуйте позже.</div>';
  }
}

async function submitCurrentScore() {
  const col   = getCollection();
  if (col.length === 0) return;
  const name  = getUsername();
  const score = col.reduce((s, c) => s + (c.value || 0), 0);
  await submitScore(name, score, col.length);
}

// ============================================================
// AVATAR PICKER
// ============================================================

// Avatar picker uses PokéAPI Pokedex IDs (separate from TCG card pool)
const AVATAR_POKEMON = [
  {id:150,name:'Mewtwo',     rarityCSS:'crown'},
  {id:6,  name:'Charizard',  rarityCSS:'crown'},
  {id:9,  name:'Blastoise',  rarityCSS:'ultra-rare'},
  {id:3,  name:'Venusaur',   rarityCSS:'ultra-rare'},
  {id:130,name:'Gyarados',   rarityCSS:'ultra-rare'},
  {id:26, name:'Raichu',     rarityCSS:'ultra-rare'},
  {id:145,name:'Zapdos',     rarityCSS:'ultra-rare'},
  {id:144,name:'Articuno',   rarityCSS:'ultra-rare'},
  {id:146,name:'Moltres',    rarityCSS:'ultra-rare'},
  {id:149,name:'Dragonite',  rarityCSS:'ultra-rare'},
  {id:94, name:'Gengar',     rarityCSS:'ultra-rare'},
  {id:131,name:'Lapras',     rarityCSS:'ultra-rare'},
  {id:136,name:'Flareon',    rarityCSS:'ultra-rare'},
  {id:135,name:'Jolteon',    rarityCSS:'ultra-rare'},
  {id:143,name:'Snorlax',    rarityCSS:'ultra-rare'},
  {id:134,name:'Vaporeon',   rarityCSS:'ultra-rare'},
  {id:65, name:'Alakazam',   rarityCSS:'rare'},
  {id:113,name:'Chansey',    rarityCSS:'rare'},
  {id:35, name:'Clefairy',   rarityCSS:'rare'},
  {id:107,name:'Hitmonchan', rarityCSS:'rare'},
  {id:68, name:'Machamp',    rarityCSS:'rare'},
  {id:82, name:'Magneton',   rarityCSS:'rare'},
  {id:34, name:'Nidoking',   rarityCSS:'rare'},
  {id:38, name:'Ninetales',  rarityCSS:'rare'},
  {id:62, name:'Poliwrath',  rarityCSS:'rare'},
  {id:36, name:'Clefable',   rarityCSS:'rare'},
  {id:101,name:'Electrode',  rarityCSS:'rare'},
  {id:115,name:'Kangaskhan', rarityCSS:'rare'},
  {id:122,name:'Mr. Mime',   rarityCSS:'rare'},
  {id:31, name:'Nidoqueen',  rarityCSS:'rare'},
  {id:18, name:'Pidgeot',    rarityCSS:'rare'},
  {id:127,name:'Pinsir',     rarityCSS:'rare'},
  {id:123,name:'Scyther',    rarityCSS:'rare'},
  {id:49, name:'Venomoth',   rarityCSS:'rare'},
  {id:71, name:'Victreebel', rarityCSS:'rare'},
  {id:45, name:'Vileplume',  rarityCSS:'rare'},
  {id:40, name:'Wigglytuff', rarityCSS:'rare'},
  {id:15, name:'Beedrill',   rarityCSS:'rare'},
  {id:148,name:'Dragonair',  rarityCSS:'rare'},
  {id:51, name:'Dugtrio',    rarityCSS:'rare'},
  {id:125,name:'Electabuzz', rarityCSS:'rare'},
  {id:17, name:'Pidgeotto',  rarityCSS:'rare'},
  {id:59, name:'Arcanine',   rarityCSS:'uncommon'},
  {id:5,  name:'Charmeleon', rarityCSS:'uncommon'},
  {id:87, name:'Dewgong',    rarityCSS:'uncommon'},
  {id:147,name:'Dratini',    rarityCSS:'uncommon'},
  {id:83, name:"Farfetch'd", rarityCSS:'uncommon'},
  {id:58, name:'Growlithe',  rarityCSS:'uncommon'},
  {id:93, name:'Haunter',    rarityCSS:'uncommon'},
  {id:2,  name:'Ivysaur',    rarityCSS:'uncommon'},
  {id:124,name:'Jynx',       rarityCSS:'uncommon'},
  {id:64, name:'Kadabra',    rarityCSS:'uncommon'},
  {id:14, name:'Kakuna',     rarityCSS:'uncommon'},
  {id:67, name:'Machoke',    rarityCSS:'uncommon'},
  {id:129,name:'Magikarp',   rarityCSS:'uncommon'},
  {id:126,name:'Magmar',     rarityCSS:'uncommon'},
  {id:33, name:'Nidorino',   rarityCSS:'uncommon'},
  {id:61, name:'Poliwhirl',  rarityCSS:'uncommon'},
  {id:137,name:'Porygon',    rarityCSS:'uncommon'},
  {id:20, name:'Raticate',   rarityCSS:'uncommon'},
  {id:86, name:'Seel',       rarityCSS:'uncommon'},
  {id:8,  name:'Wartortle',  rarityCSS:'uncommon'},
  {id:12, name:'Butterfree', rarityCSS:'uncommon'},
  {id:85, name:'Dodrio',     rarityCSS:'uncommon'},
  {id:103,name:'Exeggutor',  rarityCSS:'uncommon'},
  {id:22, name:'Fearow',     rarityCSS:'uncommon'},
  {id:44, name:'Gloom',      rarityCSS:'uncommon'},
  {id:108,name:'Lickitung',  rarityCSS:'uncommon'},
  {id:105,name:'Marowak',    rarityCSS:'uncommon'},
  {id:30, name:'Nidorina',   rarityCSS:'uncommon'},
  {id:47, name:'Parasect',   rarityCSS:'uncommon'},
  {id:53, name:'Persian',    rarityCSS:'uncommon'},
  {id:57, name:'Primeape',   rarityCSS:'uncommon'},
  {id:78, name:'Rapidash',   rarityCSS:'uncommon'},
  {id:112,name:'Rhydon',     rarityCSS:'uncommon'},
  {id:119,name:'Seaking',    rarityCSS:'uncommon'},
  {id:128,name:'Tauros',     rarityCSS:'uncommon'},
  {id:70, name:'Weepinbell', rarityCSS:'uncommon'},
  {id:63, name:'Abra',       rarityCSS:'common'},
  {id:1,  name:'Bulbasaur',  rarityCSS:'common'},
  {id:10, name:'Caterpie',   rarityCSS:'common'},
  {id:4,  name:'Charmander', rarityCSS:'common'},
  {id:50, name:'Diglett',    rarityCSS:'common'},
  {id:84, name:'Doduo',      rarityCSS:'common'},
  {id:96, name:'Drowzee',    rarityCSS:'common'},
  {id:92, name:'Gastly',     rarityCSS:'common'},
  {id:109,name:'Koffing',    rarityCSS:'common'},
  {id:66, name:'Machop',     rarityCSS:'common'},
  {id:81, name:'Magnemite',  rarityCSS:'common'},
  {id:11, name:'Metapod',    rarityCSS:'common'},
  {id:32, name:'Nidoran M',  rarityCSS:'common'},
  {id:95, name:'Onix',       rarityCSS:'common'},
  {id:16, name:'Pidgey',     rarityCSS:'common'},
  {id:25, name:'Pikachu',    rarityCSS:'common'},
  {id:60, name:'Poliwag',    rarityCSS:'common'},
  {id:77, name:'Ponyta',     rarityCSS:'common'},
  {id:19, name:'Rattata',    rarityCSS:'common'},
  {id:27, name:'Sandshrew',  rarityCSS:'common'},
  {id:7,  name:'Squirtle',   rarityCSS:'common'},
  {id:121,name:'Starmie',    rarityCSS:'common'},
  {id:120,name:'Staryu',     rarityCSS:'common'},
  {id:114,name:'Tangela',    rarityCSS:'common'},
  {id:100,name:'Voltorb',    rarityCSS:'common'},
  {id:37, name:'Vulpix',     rarityCSS:'common'},
  {id:13, name:'Weedle',     rarityCSS:'common'},
  {id:69, name:'Bellsprout', rarityCSS:'common'},
  {id:104,name:'Cubone',     rarityCSS:'common'},
  {id:133,name:'Eevee',      rarityCSS:'common'},
  {id:102,name:'Exeggcute',  rarityCSS:'common'},
  {id:118,name:'Goldeen',    rarityCSS:'common'},
  {id:39, name:'Jigglypuff', rarityCSS:'common'},
  {id:56, name:'Mankey',     rarityCSS:'common'},
  {id:52, name:'Meowth',     rarityCSS:'common'},
  {id:29, name:'Nidoran F',  rarityCSS:'common'},
  {id:43, name:'Oddish',     rarityCSS:'common'},
  {id:46, name:'Paras',      rarityCSS:'common'},
  {id:111,name:'Rhyhorn',    rarityCSS:'common'},
  {id:21, name:'Spearow',    rarityCSS:'common'},
  {id:48, name:'Venonat',    rarityCSS:'common'},
  {id:23, name:'Ekans',      rarityCSS:'common'},
  {id:74, name:'Geodude',    rarityCSS:'common'},
  {id:88, name:'Grimer',     rarityCSS:'common'},
  {id:116,name:'Horsea',     rarityCSS:'common'},
  {id:140,name:'Kabuto',     rarityCSS:'common'},
  {id:98, name:'Krabby',     rarityCSS:'common'},
  {id:138,name:'Omanyte',    rarityCSS:'common'},
  {id:54, name:'Psyduck',    rarityCSS:'common'},
  {id:90, name:'Shellder',   rarityCSS:'common'},
  {id:79, name:'Slowpoke',   rarityCSS:'common'},
  {id:72, name:'Tentacool',  rarityCSS:'common'},
  {id:41, name:'Zubat',      rarityCSS:'common'},
];

function getAvatarId() {
  return parseInt(localStorage.getItem(KEY_AVATAR) || '0', 10);
}
function setAvatarId(id) {
  localStorage.setItem(KEY_AVATAR, String(id));
}

function applyAvatarToEl(el, avatarId, fallbackLetter) {
  el.innerHTML = '';
  if (avatarId) {
    const img = document.createElement('img');
    img.src = getSpriteUrl(avatarId);
    img.alt = '';
    img.onerror = () => {
      el.innerHTML = fallbackLetter;
    };
    el.appendChild(img);
  } else {
    el.textContent = fallbackLetter;
  }
  // Re-add edit hint if profile avatar
  if (el.id === 'profile-avatar') {
    const hint = document.createElement('span');
    hint.className = 'avatar-edit-hint';
    hint.textContent = 'изменить';
    el.appendChild(hint);
  }
}

/** @type {any} */ (window).openAvatarPicker = function() {
  const modal  = document.getElementById('avatar-modal');
  const grid   = document.getElementById('avatar-picker-grid');
  const currId = getAvatarId();

  grid.innerHTML = '';
  AVATAR_POKEMON.forEach(pokemon => {
    const item = document.createElement('div');
    item.className = 'avatar-picker-item' + (pokemon.id === currId ? ' selected' : '');
    item.dataset.id = pokemon.id;

    const dot = document.createElement('div');
    dot.className = `picker-rarity-dot ${pokemon.rarityCSS}`;

    const img = document.createElement('img');
    img.className = 'avatar-picker-img';
    img.src = getSpriteUrl(pokemon.id);
    img.alt = pokemon.name;
    img.loading = 'lazy';

    const name = document.createElement('div');
    name.className = 'avatar-picker-name';
    name.textContent = pokemon.name;

    item.appendChild(dot);
    item.appendChild(img);
    item.appendChild(name);

    item.addEventListener('click', () => {
      selectAvatar(pokemon.id);
      // Update selection highlight
      grid.querySelectorAll('.avatar-picker-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });

    grid.appendChild(item);
  });

  modal.classList.remove('hidden');
};

function selectAvatar(id) {
  setAvatarId(id);
  haptic('light');

  const letter = getUsername().charAt(0).toUpperCase();

  // Update profile avatar
  const profAv = document.getElementById('profile-avatar');
  if (profAv) applyAvatarToEl(profAv, id, letter);

  // Update home avatar
  const homeAv = document.getElementById('home-avatar');
  if (homeAv) applyAvatarToEl(homeAv, id, letter);
}

function closeAvatarPicker() {
  document.getElementById('avatar-modal').classList.add('hidden');
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  initTelegram();
  initStarfield();
  migrateOldData();

  // Apply saved avatar on load
  const savedAvatar = getAvatarId();
  const letter = getUsername().charAt(0).toUpperCase();
  if (savedAvatar) {
    const profAv = document.getElementById('profile-avatar');
    const homeAv = document.getElementById('home-avatar');
    if (profAv) applyAvatarToEl(profAv, savedAvatar, letter);
    if (homeAv) applyAvatarToEl(homeAv, savedAvatar, letter);
  }

  // Avatar picker
  document.getElementById('avatar-modal-backdrop').addEventListener('click', closeAvatarPicker);

  // Wire up daily reward button
  document.getElementById('daily-reward-btn').addEventListener('click', claimDailyReward);

  // Wire up reward modal close
  document.getElementById('btn-reward-close').addEventListener('click', closeRewardModal);
  document.getElementById('reward-modal-backdrop').addEventListener('click', closeRewardModal);

  // Wire up sell modal
  document.getElementById('btn-sell-confirm').addEventListener('click', confirmSell);
  document.getElementById('btn-sell-cancel').addEventListener('click', closeSellModal);
  document.getElementById('sell-modal-backdrop').addEventListener('click', closeSellModal);
  document.getElementById('btn-sell-list').addEventListener('click', () => {
    const card = sellTargetCard;
    closeSellModal();
    if (card) openListModal(card);
  });

  // Wire up list-on-market modal
  document.getElementById('btn-list-confirm').addEventListener('click', confirmListing);
  document.getElementById('btn-list-cancel').addEventListener('click', closeListModal);
  document.getElementById('list-modal-backdrop').addEventListener('click', closeListModal);

  // Wire up rating refresh
  document.getElementById('btn-refresh-rating').addEventListener('click', loadRatingScreen);

  // Wire up market refresh
  document.getElementById('btn-refresh-market').addEventListener('click', renderMarketScreen);

  renderHomeScreen();
  showScreen('welcome', 'home');

  document.getElementById('btn-open-pack').addEventListener('click', async () => {
    if (!canOpenPack()) return; // guard against double-click

    const btn = document.getElementById('btn-open-pack');
    btn.disabled = true;

    try {
      showLoading(true);
      const cards = rollMiniPack(5);
      await prefetchImages(cards);
      showLoading(false);

      addToCollection(cards);
      markPackOpened(); // start 24h cooldown

      await runPackOpeningSequence(cards, showResultsScreen);

      renderHomeScreen(); // refresh timer on home screen
      submitCurrentScore();
    } catch (err) {
      console.error('Pack open error:', err);
      showLoading(false);
      btn.disabled = false;
    }
  });
}

main().catch(err => {
  console.error('App error:', err);
  showLoading(false);
});
