// ============================================================
// CONSTANTS
// ============================================================

const POKEMON_POOL = {
  common: [
    {id:1,name:'Bulbasaur'},{id:4,name:'Charmander'},{id:7,name:'Squirtle'},
    {id:10,name:'Caterpie'},{id:16,name:'Pidgey'},{id:19,name:'Rattata'},
    {id:25,name:'Pikachu'},{id:39,name:'Jigglypuff'},{id:52,name:'Meowth'},
    {id:54,name:'Psyduck'},{id:74,name:'Geodude'},{id:129,name:'Magikarp'},
  ],
  uncommon: [
    {id:2,name:'Ivysaur'},{id:5,name:'Charmeleon'},{id:8,name:'Wartortle'},
    {id:26,name:'Raichu'},{id:58,name:'Growlithe'},{id:66,name:'Machop'},
    {id:93,name:'Haunter'},{id:125,name:'Electabuzz'},{id:126,name:'Magmar'},
    {id:131,name:'Lapras'},{id:133,name:'Eevee'},
  ],
  rare: [
    {id:3,name:'Venusaur'},{id:6,name:'Charizard'},{id:9,name:'Blastoise'},
    {id:65,name:'Alakazam'},{id:68,name:'Machamp'},{id:94,name:'Gengar'},
    {id:130,name:'Gyarados'},{id:149,name:'Dragonite'},{id:143,name:'Snorlax'},
    {id:134,name:'Vaporeon'},{id:136,name:'Flareon'},{id:135,name:'Jolteon'},
  ],
  ultraRare: [
    {id:144,name:'Articuno'},{id:145,name:'Zapdos'},{id:146,name:'Moltres'},{id:151,name:'Mew'},
  ],
  crown: [
    {id:150,name:'Mewtwo'},
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
const KEY_USERNAME      = 'pokemon_username_v1';
const KEY_AVATAR        = 'pokemon_avatar_v1';
const KEY_OLD_PACK      = 'pokemon_pack_v1';

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
    const pokemon = pickFromPool(rarity);
    const key     = `${rarity}-${pokemon.id}`;
    if (!used.has(key) || POKEMON_POOL[rarity].length === 1) {
      used.add(key);
      cards.push(enrichCard({
        id:    pokemon.id,
        name:  pokemon.name,
        rarity,
        hp:    randomInt(...RARITY_HP[rarity]),
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
  const elapsed = Date.now() - new Date(last).getTime();
  return Math.max(0, DAILY_INTERVAL_MS - elapsed);
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
    const players = Array.isArray(data.players) ? data.players : [];

    const idx = players.findIndex(p => p.name === name);
    const entry = { name, score, cards, updatedAt: new Date().toISOString() };
    if (idx >= 0) players[idx] = entry;
    else players.push(entry);

    await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players }),
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
  await Promise.all(cards.map(c => new Promise(r => {
    const img = new Image();
    img.onload = img.onerror = r;
    img.src = getSpriteUrl(c.id);
  })));
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
  front.dataset.rarity = card.rarityCSS;
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

// Global nav function (called from HTML onclick)
window.navigate = function(dest) {
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
  }
};

// ============================================================
// PACK OPENING SEQUENCE
// ============================================================

async function runPackOpeningSequence(cards, onDone) {
  showScreen('pack');

  const packVisual  = document.getElementById('pack-visual');
  const packInstr   = document.getElementById('pack-instruction');
  const revealArea  = document.getElementById('cards-reveal-area');

  // Reset pack state
  packVisual.classList.remove('shaking', 'bursting');
  packVisual.style.display = '';
  revealArea.classList.add('hidden');
  revealArea.innerHTML = '';

  await new Promise(resolve => {
    packVisual.addEventListener('click', resolve, { once: true });
  });

  haptic('medium');
  packInstr.textContent = '';
  packVisual.classList.add('shaking');
  await sleep(860);

  packVisual.classList.remove('shaking');
  packVisual.classList.add('bursting');
  await sleep(500);
  packVisual.style.display = 'none';
  revealArea.classList.remove('hidden');

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    if (card.rarity === 'ultraRare' || card.rarity === 'crown') {
      const overlay = document.createElement('div');
      overlay.className = 'spotlight-overlay ' + (card.rarity === 'crown' ? 'crown' : 'ultra');
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 1400);
    }

    revealArea.innerHTML = '';
    const cardEl = buildCardElement(card, false);
    cardEl.classList.add('entering');
    revealArea.appendChild(cardEl);
    await sleep(500);

    cardEl.querySelector('.card-inner').classList.add('flipped');

    const hapticType = { common:'light', uncommon:'light', rare:'medium', ultraRare:'heavy', crown:'heavy' }[card.rarity] || 'light';
    haptic(hapticType);

    const pause = card.rarity === 'crown' ? 2600 : card.rarity === 'ultraRare' ? 2100 : card.rarity === 'rare' ? 1600 : 1200;
    await sleep(pause);
  }

  await sleep(300);
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

  if (canClaimReward() && getCollection().length > 0) {
    sub.textContent   = 'Ежедневная награда';
    timer.textContent = 'Доступна!';
  } else if (getCollection().length === 0) {
    sub.textContent   = 'Первый пак';
    timer.textContent = 'Бесплатно!';
  } else {
    sub.textContent   = 'Следующий пак через';
    timer.textContent = formatTime(msUntilNextReward());
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

let sellTargetUid = null;

function openSellModal(card) {
  sellTargetUid = card.uid;
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
  sellTargetUid = null;
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

// Flat list of all pokemon sorted by rarity for picker
const ALL_POKEMON_FOR_PICKER = [
  ...POKEMON_POOL.crown.map(p    => ({...p, rarity:'crown',    rarityCSS:'crown'})),
  ...POKEMON_POOL.ultraRare.map(p => ({...p, rarity:'ultraRare', rarityCSS:'ultra-rare'})),
  ...POKEMON_POOL.rare.map(p     => ({...p, rarity:'rare',      rarityCSS:'rare'})),
  ...POKEMON_POOL.uncommon.map(p  => ({...p, rarity:'uncommon',  rarityCSS:'uncommon'})),
  ...POKEMON_POOL.common.map(p   => ({...p, rarity:'common',    rarityCSS:'common'})),
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

window.openAvatarPicker = function() {
  const modal  = document.getElementById('avatar-modal');
  const grid   = document.getElementById('avatar-picker-grid');
  const currId = getAvatarId();

  grid.innerHTML = '';
  ALL_POKEMON_FOR_PICKER.forEach(pokemon => {
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

  // Wire up rating refresh
  document.getElementById('btn-refresh-rating').addEventListener('click', loadRatingScreen);

  const collection = getCollection();
  const alreadyOpened = collection.length > 0;

  if (alreadyOpened) {
    document.getElementById('btn-open-pack').disabled = true;
  }

  renderHomeScreen();
  showScreen('welcome', 'home');

  document.getElementById('btn-open-pack').addEventListener('click', async () => {
    const btn = document.getElementById('btn-open-pack');
    btn.disabled = true;

    showLoading(true);
    const cards = rollMiniPack(5);
    await prefetchImages(cards);
    showLoading(false);

    addToCollection(cards);

    document.getElementById('already-opened-msg').classList.remove('hidden');

    await runPackOpeningSequence(cards, showResultsScreen);

    submitCurrentScore();
  });
}

main().catch(err => {
  console.error('App error:', err);
  showLoading(false);
});
