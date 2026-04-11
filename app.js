// ============================================================
// POKEMON CARD POOL
// ============================================================

const POKEMON_POOL = {
  common: [
    { id: 1,   name: 'Bulbasaur'  },
    { id: 4,   name: 'Charmander' },
    { id: 7,   name: 'Squirtle'   },
    { id: 10,  name: 'Caterpie'   },
    { id: 16,  name: 'Pidgey'     },
    { id: 19,  name: 'Rattata'    },
    { id: 25,  name: 'Pikachu'    },
    { id: 39,  name: 'Jigglypuff' },
    { id: 52,  name: 'Meowth'     },
    { id: 54,  name: 'Psyduck'    },
    { id: 74,  name: 'Geodude'    },
    { id: 129, name: 'Magikarp'   },
  ],
  uncommon: [
    { id: 2,   name: 'Ivysaur'    },
    { id: 5,   name: 'Charmeleon' },
    { id: 8,   name: 'Wartortle'  },
    { id: 26,  name: 'Raichu'     },
    { id: 58,  name: 'Growlithe'  },
    { id: 66,  name: 'Machop'     },
    { id: 93,  name: 'Haunter'    },
    { id: 125, name: 'Electabuzz' },
    { id: 126, name: 'Magmar'     },
    { id: 131, name: 'Lapras'     },
    { id: 133, name: 'Eevee'      },
  ],
  rare: [
    { id: 3,   name: 'Venusaur'   },
    { id: 6,   name: 'Charizard'  },
    { id: 9,   name: 'Blastoise'  },
    { id: 65,  name: 'Alakazam'   },
    { id: 68,  name: 'Machamp'    },
    { id: 94,  name: 'Gengar'     },
    { id: 130, name: 'Gyarados'   },
    { id: 149, name: 'Dragonite'  },
    { id: 143, name: 'Snorlax'    },
    { id: 134, name: 'Vaporeon'   },
    { id: 136, name: 'Flareon'    },
    { id: 135, name: 'Jolteon'    },
  ],
  ultraRare: [
    { id: 144, name: 'Articuno'   },
    { id: 145, name: 'Zapdos'     },
    { id: 146, name: 'Moltres'    },
    { id: 151, name: 'Mew'        },
  ],
  crown: [
    { id: 150, name: 'Mewtwo'     },
  ],
};

// Probability weights (must sum to 1)
const RARITY_WEIGHTS = {
  common:    0.50,
  uncommon:  0.30,
  rare:      0.15,
  ultraRare: 0.04,
  crown:     0.01,
};

// HP ranges [min, max]
const RARITY_HP = {
  common:    [30,  60 ],
  uncommon:  [60,  90 ],
  rare:      [90,  130],
  ultraRare: [130, 170],
  crown:     [200, 200],
};

// Display labels
const RARITY_LABELS = {
  common:    '◆',
  uncommon:  '◆◆',
  rare:      '◆◆◆',
  ultraRare: '★',
  crown:     '♛',
};

// CSS data-rarity attribute values
const RARITY_CSS = {
  common:    'common',
  uncommon:  'uncommon',
  rare:      'rare',
  ultraRare: 'ultra-rare',
  crown:     'crown',
};

const STORAGE_KEY = 'pokemon_pack_v1';

// ============================================================
// UTILITIES
// ============================================================

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRarity() {
  const roll = Math.random();
  let cumulative = 0;
  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (roll < cumulative) return rarity;
  }
  return 'common';
}

function pickFromPool(rarity) {
  const pool = POKEMON_POOL[rarity];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateHP(rarity) {
  const [min, max] = RARITY_HP[rarity];
  return randomInt(min, max);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Generate 5 cards with no duplicate id+rarity combos
function rollPack() {
  const cards = [];
  const usedKeys = new Set();
  let attempts = 0;

  while (cards.length < 5 && attempts < 100) {
    attempts++;
    const rarity = pickRarity();
    const pokemon = pickFromPool(rarity);
    const key = `${rarity}-${pokemon.id}`;

    if (!usedKeys.has(key) || POKEMON_POOL[rarity].length === 1) {
      usedKeys.add(key);
      cards.push({
        id:          pokemon.id,
        name:        pokemon.name,
        rarity,
        hp:          generateHP(rarity),
        rarityLabel: RARITY_LABELS[rarity],
        rarityCSS:   RARITY_CSS[rarity],
      });
    }
  }
  return cards;
}

// ============================================================
// DOM BUILDERS
// ============================================================

function buildCardElement(card, isFlipped = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';

  const inner = document.createElement('div');
  inner.className = 'card-inner' + (isFlipped ? ' flipped' : '');

  // Back face
  const back = document.createElement('div');
  back.className = 'card-face card-back';
  const backLogo = document.createElement('span');
  backLogo.className = 'card-back-logo';
  backLogo.textContent = '⬟';
  back.appendChild(backLogo);

  // Front face
  const front = document.createElement('div');
  front.className = 'card-face card-front';
  front.dataset.rarity = card.rarityCSS;

  front.innerHTML = `
    <div class="card-header">
      <span class="card-pokemon-name">${card.name}</span>
      <span class="card-hp">${card.hp}&nbsp;HP</span>
    </div>
    <div class="card-image-area">
      <img
        class="card-pokemon-image"
        src="${getSpriteUrl(card.id)}"
        alt="${card.name}"
        draggable="false"
        onerror="this.style.opacity='0.3'"
      />
    </div>
    <div class="card-footer">
      <div class="card-rarity-indicator" data-rarity="${card.rarityCSS}">
        ${card.rarityLabel}
      </div>
    </div>
  `;

  inner.appendChild(back);
  inner.appendChild(front);
  wrapper.appendChild(inner);
  return wrapper;
}

// ============================================================
// STARFIELD
// ============================================================

function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 120 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.4 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      const alpha = 0.25 + 0.75 * Math.abs(Math.sin(timestamp * star.speed * 0.001 + star.phase));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
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

  const theme = tg.themeParams || {};
  const root = document.documentElement.style;
  if (theme.bg_color)          root.setProperty('--tg-bg-color',          theme.bg_color);
  if (theme.text_color)        root.setProperty('--tg-text-color',        theme.text_color);
  if (theme.hint_color)        root.setProperty('--tg-hint-color',        theme.hint_color);
  if (theme.button_color)      root.setProperty('--tg-button-color',      theme.button_color);
  if (theme.button_text_color) root.setProperty('--tg-button-text-color', theme.button_text_color);
}

function haptic(type) {
  try {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp?.HapticFeedback) {
      Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
  } catch (_) {}
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
    el.classList.add('hidden');
  });
  const target = document.getElementById(id);
  target.classList.remove('hidden');
  void target.offsetWidth; // reflow for CSS transition
  target.classList.add('active');
}

function showLoading(show) {
  document.getElementById('loading-overlay').classList.toggle('hidden', !show);
}

// ============================================================
// IMAGE PRE-FETCH
// ============================================================

async function prefetchImages(cards) {
  await Promise.all(cards.map(card => new Promise(resolve => {
    const img = new Image();
    img.onload  = resolve;
    img.onerror = resolve;
    img.src     = getSpriteUrl(card.id);
  })));
}

// ============================================================
// PACK OPENING SEQUENCE
// ============================================================

async function runPackOpeningSequence(cards) {
  showScreen('screen-pack');

  const packVisual    = document.getElementById('pack-visual');
  const packInstr     = document.getElementById('pack-instruction');
  const revealArea    = document.getElementById('cards-reveal-area');

  // Wait for user to tap the pack
  await new Promise(resolve => {
    packVisual.addEventListener('click', resolve, { once: true });
  });

  haptic('medium');

  // Phase A: Shake
  packInstr.textContent = '';
  packVisual.classList.add('shaking');
  await sleep(860);

  // Phase B: Burst
  packVisual.classList.remove('shaking');
  packVisual.classList.add('bursting');
  await sleep(500);
  packVisual.style.display = 'none';

  // Show reveal area
  revealArea.classList.remove('hidden');

  // Phase C: Reveal each card one by one
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // Spotlight for ultra rare / crown
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

    // Wait for entrance animation
    await sleep(500);

    // Flip to front
    const inner = cardEl.querySelector('.card-inner');
    inner.classList.add('flipped');

    // Haptic by rarity
    const hapticType = {
      common:    'light',
      uncommon:  'light',
      rare:      'medium',
      ultraRare: 'heavy',
      crown:     'heavy',
    }[card.rarity] || 'light';
    haptic(hapticType);

    // Pause so player can see the card
    const pause = card.rarity === 'crown'     ? 2600
                : card.rarity === 'ultraRare' ? 2100
                : card.rarity === 'rare'      ? 1600
                : 1200;

    await sleep(pause);
  }

  await sleep(300);
  showResultsScreen(cards);
}

// ============================================================
// RESULTS SCREEN
// ============================================================

function showResultsScreen(cards) {
  const container = document.getElementById('results-cards');
  container.innerHTML = '';

  cards.forEach((card, index) => {
    const cardEl = buildCardElement(card, true);
    cardEl.style.animationDelay = `${index * 100}ms`;
    cardEl.classList.add('entering');
    container.appendChild(cardEl);
  });

  showScreen('screen-results');
}

// ============================================================
// PERSISTENCE
// ============================================================

function savePackResult(cards) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (_) {}
}

function loadPackResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 5) return null;
    // Validate each card has required fields
    if (!parsed.every(c => c.id && c.name && c.rarity)) return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

// ============================================================
// MAIN BOOTSTRAP
// ============================================================

async function main() {
  initTelegram();
  initStarfield();

  const existingCards = loadPackResult();

  if (existingCards) {
    // Already opened — show welcome briefly, then jump to results
    document.getElementById('already-opened-msg').classList.remove('hidden');
    document.getElementById('btn-open-pack').disabled = true;
    await sleep(600);
    showResultsScreen(existingCards);
    return;
  }

  // Fresh user
  showScreen('screen-welcome');

  document.getElementById('btn-open-pack').addEventListener('click', async () => {
    const btn = document.getElementById('btn-open-pack');
    btn.disabled = true;

    showLoading(true);

    const cards = rollPack();

    // Pre-fetch sprites in parallel before starting animation
    await prefetchImages(cards);
    showLoading(false);

    // Save before animation (in case user closes mid-flow)
    savePackResult(cards);

    await runPackOpeningSequence(cards);
  });
}

main().catch(err => {
  console.error('Pokemon app crashed:', err);
  showLoading(false);
});
