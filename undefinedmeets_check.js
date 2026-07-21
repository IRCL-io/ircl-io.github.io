
// ── BOT DATA ────────────────────────────────────────────────────────────────
const BASE = 'cards/cards/Spring_Bot_Breaker_2026/';
const BOTS = {
  full: [
    { id: 'anteater',    name: 'Anteater',                     card: 'Anteater.png' },
    { id: 'benny',       name: 'Benny',                        card: 'Benny.png' },
    { id: 'bob2',        name: 'Bob\u00B2',                    card: 'Bob2.png' },
    { id: 'brawndo',     name: 'Brawndo the thirst mutilator', card: 'Brawndo_the_thirst_mutilator.png' },
    { id: 'cyclone',     name: 'Cyclone',                      card: 'Cyclone.png' },
    { id: 'dread',       name: 'Dread',                        card: 'Dread.png' },
    { id: 'ghost_viper', name: 'Ghost Viper',                  card: 'Ghost_Viper.png' },
    { id: 'icu2',        name: 'ICU2',                         card: 'ICU2.png' },
    { id: 'jumbo',       name: 'JUMBO',                        card: 'JUMBO.png' },
    { id: 'lil_nasty',   name: "Lil' Nasty",                   card: 'Lil_Nasty.png' },
    { id: 'metally',     name: 'Metally Croissant',            card: 'Metally_Croissant.png' },
    { id: 'sovereign',   name: 'Sovereign Gear',               card: 'Sovereign_Gear.png' },
    { id: 'spur',        name: 'Spur',                         card: 'Spur.png' },
    { id: 'tenacity',    name: 'TENACITY!',                    card: 'TENACITY.png' },
    { id: 'tinkatuff',   name: 'TinkaTuff',                    card: 'TinkaTuff.png' },
    { id: 'zephyr',      name: 'Zephyr',                       card: 'Zephyr.png' },
  ],
  plastic: [
    { id: 'ammit',      name: 'Ammit',                   card: 'Ammit.png' },
    { id: 'bob',        name: 'BOB',                     card: 'BOB.png' },
    { id: 'broadside',  name: 'Broadside Killer',        card: 'Broadside_Killer.png' },
    { id: 'deadly',     name: 'Deadly Croissant',        card: 'Deadly_Croissant.png' },
    { id: 'graveline',  name: 'Grave Line',              card: 'Grave_Line.png' },
    { id: 'iclone',     name: "I Think I'm A Clone Now", card: 'I_Think_I_m_A_Clone_Now.png' },
    { id: 'lilgnarly',  name: "Lil'Gnarly",              card: 'Lil_Gnarly.png' },
    { id: 'rickrolled', name: 'Rickrolled',              card: 'Rickrolled.png' },
    { id: 'thing',      name: 'Thing',                   card: 'Thing.png' },
    { id: 'unicorna',   name: 'Unicorna',                card: 'Unicorna.png' },
  ],
  beetle: [
    { id: 'bunzilla',  name: 'Bunzilla!!',               card: 'Bunzilla.png' },
    { id: 'dreadly',   name: 'Dreadly Croissant',        card: 'Dreadly_Croissant.png' },
    { id: 'fafner',    name: 'Fafner',                   card: 'Fafner.png' },
    { id: 'gyro',      name: 'Gyro',                     card: 'Gyro.png' },
    { id: 'mistwitz',  name: 'Mistwitz',                 card: 'Mistwitz.png' },
    { id: 'overnout',  name: 'Over-N-Out',               card: 'Over_N_Out.png' },
    { id: 'planb',     name: 'Plan B',                   card: 'Plan_B.png' },
    { id: 'renegade',  name: 'Renegade',                 card: 'Renegade.png' },
    { id: 'subzero',   name: 'Sub-Zero',                 card: 'Sub_Zero.png' },
    { id: 'sukuna',    name: 'Sukuna \u5BBF\u5132',      card: 'Sukuna.png' },
    { id: 'crusader',  name: 'The Corrugated Crusader',  card: 'The_Corrugated_Crusader.png' },
    { id: 'valkyria',  name: 'VALKYRIA',                 card: 'VALKYRIA.png' },
    { id: 'virilade',  name: 'Virilade',                 card: 'Virilade.png' },
  ]
};

// flat lookup by id
const BOT_MAP = {};
for (const [cls, arr] of Object.entries(BOTS)) {
  arr.forEach(b => { b.cls = cls; BOT_MAP[b.id] = b; });
}

// ── STATE ───────────────────────────────────────────────────────────────────
const placedBots = new Set();   // ids currently in any slot
let dragBotId    = null;        // tracked during drag for dragover checks
let slotSeq      = 0;           // uid for slots

// ── TIMER ───────────────────────────────────────────────────────────────────
let timerSec   = 180;
let timerTotal = 180;
let timerTick  = null;

const timerEl   = document.getElementById('timer');
const setInput  = document.getElementById('timer-set');
const btnStart  = document.getElementById('btn-start');
const btnStop   = document.getElementById('btn-stop');
const btnReset  = document.getElementById('btn-reset');

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
function renderTimer() {
  timerEl.textContent = fmtTime(timerSec);
  timerEl.className   = timerSec <= 30 ? 'danger' : timerSec <= 60 ? 'warn' : '';
}

btnStart.addEventListener('click', () => {
  if (timerTick) return;
  timerTick = setInterval(() => {
    if (timerSec > 0) { timerSec--; renderTimer(); }
    else              { clearInterval(timerTick); timerTick = null; btnStart.classList.remove('active'); }
  }, 1000);
  btnStart.classList.add('active');
});
btnStop.addEventListener('click', () => {
  clearInterval(timerTick); timerTick = null;
  btnStart.classList.remove('active');
});
btnReset.addEventListener('click', () => {
  clearInterval(timerTick); timerTick = null;
  btnStart.classList.remove('active');
  timerSec = timerTotal;
  renderTimer();
});
setInput.addEventListener('change', () => {
  const v  = Math.max(1, Math.min(99, parseInt(setInput.value) || 3));
  setInput.value = v;
  timerTotal = v * 60;
  timerSec   = timerTotal;
  renderTimer();
});

// ── ROSTER BUILD ─────────────────────────────────────────────────────────────
function buildRoster() {
  const roster = document.getElementById('roster');
  const CATS = [
    { key: 'full',    label: 'Full Combat Antweight', cls: 'full'    },
    { key: 'plastic', label: 'Plastic Antweight',     cls: 'plastic' },
    { key: 'beetle',  label: 'Beetleweight',          cls: 'beetle'  },
  ];

  CATS.forEach(({ key, label, cls }) => {
    const sorted = [...BOTS[key]].sort((a, b) => a.name.localeCompare(b.name));

    const cat  = document.createElement('div');
    cat.className = 'cat';

    const head = document.createElement('div');
    head.className = `cat-head ${cls}`;
    head.textContent = label;
    cat.appendChild(head);

    const vp    = document.createElement('div');
    vp.className = 'scroll-vp';

    const track = document.createElement('div');
    track.className = 'scroll-track';

    // item height = 6+6 padding + 1.3 line-height * 0.74rem ~= 29px; use 30px
    const ITEM_H   = 30;
    const totalH   = sorted.length * ITEM_H;
    const duration = (totalH / 22).toFixed(1); // 22 px/s
    track.style.animation = `scroll-up ${duration}s linear infinite`;

    function makeChip(bot) {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = bot.name;
      chip.draggable = true;
      chip.dataset.botId = bot.id;

      chip.addEventListener('dragstart', e => {
        if (placedBots.has(bot.id)) { e.preventDefault(); return; }
        dragBotId = bot.id;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({ botId: bot.id, source: 'roster' }));
        vp.classList.add('paused');
      });
      chip.addEventListener('dragend', () => {
        dragBotId = null;
        vp.classList.remove('paused');
      });
      return chip;
    }

    // original + clone for seamless loop
    sorted.forEach(b => track.appendChild(makeChip(b)));
    sorted.forEach(b => {
      const c = makeChip(b);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });

    vp.appendChild(track);
    cat.appendChild(vp);
    roster.appendChild(cat);
  });
}

// ── CHIP PLACED STATE ────────────────────────────────────────────────────────
function setPlaced(botId, isPlaced) {
  if (isPlaced) placedBots.add(botId);
  else          placedBots.delete(botId);

  document.querySelectorAll(`.chip[data-bot-id="${botId}"]`).forEach(chip => {
    chip.classList.toggle('placed', isPlaced);
    chip.draggable = !isPlaced;
  });
}

// ── SLOT CREATION ────────────────────────────────────────────────────────────
function canDrop(slotEl, botId) {
  if (slotEl.dataset.botId) return false;                       // occupied
  const bot = BOT_MAP[botId];
  if (!bot) return false;
  if (bot.cls === 'beetle' && slotEl.dataset.arena !== 'beetle') return false;
  return true;
}

function clearSlot(slotEl) {
  const botId = slotEl.dataset.botId;
  if (!botId) return;
  slotEl.dataset.botId = '';
  slotEl.classList.remove('occupied');
  slotEl.querySelectorAll('img, .xbtn, .qname').forEach(el => el.remove());
  setPlaced(botId, false);

  if (slotEl.dataset.type === 'stage') {
    const lbl = document.createElement('span');
    lbl.className = 'empty-lbl';
    lbl.textContent = 'drop here';
    slotEl.appendChild(lbl);
  }
}

function placeInStage(slotEl, botId) {
  const bot = BOT_MAP[botId];
  slotEl.dataset.botId = botId;
  slotEl.classList.add('occupied');
  slotEl.querySelector('.empty-lbl')?.remove();

  const img = document.createElement('img');
  img.src = BASE + bot.card;
  img.alt = bot.name;
  slotEl.appendChild(img);

  addXBtn(slotEl);
  setPlaced(botId, true);
}

function placeInQueue(slotEl, botId) {
  const bot = BOT_MAP[botId];
  slotEl.dataset.botId = botId;
  slotEl.classList.add('occupied');

  const qname = document.createElement('div');
  qname.className = 'qname';
  qname.textContent = bot.name;
  qname.draggable = true;
  qname.dataset.botId = botId;

  qname.addEventListener('dragstart', e => {
    dragBotId = botId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({
      botId,
      source:  'queue',
      slotId:  slotEl.dataset.slotId
    }));
  });
  qname.addEventListener('dragend', () => { dragBotId = null; });

  slotEl.appendChild(qname);
  addXBtn(slotEl);
  setPlaced(botId, true);
}

function addXBtn(parentEl) {
  const btn = document.createElement('button');
  btn.className = 'xbtn';
  btn.textContent = '\u00D7';
  btn.addEventListener('click', () => clearSlot(parentEl));
  parentEl.appendChild(btn);
}

function attachDrop(slotEl) {
  slotEl.addEventListener('dragover', e => {
    e.preventDefault();
    const ok = dragBotId && canDrop(slotEl, dragBotId);
    slotEl.classList.toggle('over',   ok);
    slotEl.classList.toggle('reject', !ok && !!dragBotId);
    e.dataTransfer.dropEffect = ok ? 'move' : 'none';
  });
  slotEl.addEventListener('dragleave', () => {
    slotEl.classList.remove('over', 'reject');
  });
  slotEl.addEventListener('drop', e => {
    e.preventDefault();
    slotEl.classList.remove('over', 'reject');
    let data;
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
    const { botId, source, slotId } = data;
    if (!botId || !canDrop(slotEl, botId)) return;

    // Clear source queue slot (without unplacing — bot is still placed, just moving)
    if (source === 'queue' && slotId) {
      const src = document.querySelector(`[data-slot-id="${slotId}"]`);
      if (src) {
        src.dataset.botId = '';
        src.classList.remove('occupied');
        src.querySelectorAll('.qname, .xbtn').forEach(el => el.remove());
        placedBots.delete(botId); // temporarily remove so setPlaced(true) re-grays chips
      }
    }

    if (slotEl.dataset.type === 'stage') placeInStage(slotEl, botId);
    else                                 placeInQueue(slotEl, botId);
  });
}

function makeSlot(type, arena) {
  const el = document.createElement('div');
  el.className   = type === 'stage' ? 'slot' : 'qslot';
  el.dataset.slotId = `s${++slotSeq}`;
  el.dataset.arena  = arena;
  el.dataset.type   = type;
  el.dataset.botId  = '';

  if (type === 'stage') {
    const lbl = document.createElement('span');
    lbl.className = 'empty-lbl';
    lbl.textContent = 'drop here';
    el.appendChild(lbl);
  }

  attachDrop(el);
  return el;
}

// ── ARENA STAGE BUILD ────────────────────────────────────────────────────────
function buildStage(arenaId, arena) {
  const stage = document.getElementById(`${arenaId}-stage`);
  stage.appendChild(makeSlot('stage', arena));
  stage.appendChild(makeSlot('stage', arena));
}

// ── QUEUE ROW BUILD ───────────────────────────────────────────────────────────
function addQueueRow(arena) {
  const container = document.getElementById(`${arena}-queue-rows`);
  const row = document.createElement('div');
  row.className = 'queue-row';
  row.appendChild(makeSlot('queue', arena));
  row.appendChild(makeSlot('queue', arena));
  container.appendChild(row);
}

function hasEmptyQueueSlot(arena) {
  return !!document.querySelector(`#${arena}-queue-rows .qslot:not(.occupied)`);
}

// Auto-expand: attach to each queue-rows container + drop zone below
function attachAutoQueue(arena) {
  const container = document.getElementById(`${arena}-queue-rows`);
  const dropZone  = document.getElementById(`${arena}-queue-drop-zone`);
  let added = false; // reset each drag

  document.addEventListener('dragstart', () => { added = false; });

  function canExpandForBot() {
    if (!dragBotId) return false;
    const bot = BOT_MAP[dragBotId];
    if (!bot) return false;
    if (bot.cls === 'beetle' && arena !== 'beetle') return false;
    return true;
  }

  // Auto-expand when hovering over full queue rows
  container.addEventListener('dragover', e => {
    e.preventDefault();
    if (!canExpandForBot() || added) return;
    if (!hasEmptyQueueSlot(arena)) {
      addQueueRow(arena);
      added = true;
    }
  });

  // Drop zone below last queue
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    if (!canExpandForBot()) return;
    dropZone.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('over');
  });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('over');
    if (!canExpandForBot()) return;
    let data;
    try { data = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
    const { botId, source, slotId } = data;
    if (!botId) return;
    addQueueRow(arena);
    added = true;
    // Place into the first empty slot of the new row
    const newSlot = document.querySelector(`#${arena}-queue-rows .qslot:not(.occupied)`);
    if (!newSlot) return;
    if (source === 'queue' && slotId) {
      const src = document.querySelector(`[data-slot-id="${slotId}"]`);
      if (src) {
        src.dataset.botId = '';
        src.classList.remove('occupied');
        src.querySelectorAll('.qname, .xbtn').forEach(el => el.remove());
        placedBots.delete(botId);
      }
    }
    placeInQueue(newSlot, botId);
  });
}

// Toggle body.dragging so drop zones become interactive
document.addEventListener('dragstart', () => document.body.classList.add('dragging'));
document.addEventListener('dragend',   () => document.body.classList.remove('dragging'));

// ── MATCH LOG (agent memory: meet_ttdb.md, outcome lane lat 60) ──────────────
// Contract per meet_ttdb.md @LAT10LON1: page fetches the store on load, merges
// lat-60 records with localStorage (file wins, dedupe by match number), and
// Export TTDB downloads the store with missing outcome records appended.
const TTDB_FILE  = 'meet_ttdb.md';
const OUTCOME_LAT = 60;
const LS_KEY     = 'ircl_meet_lat60_log';
const METHOD_LABEL = { KO: 'KO', JD: 'JD', TAP: 'tap out', NS: 'no show' };

let matchLog = [];   // {n, ts, arena, cls, red, blue, result, method, elapsed, fromFile}
let ttdbBase = null; // fetched store text, base for export

function loadLocalLog() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
}
function saveLocalLog() {
  localStorage.setItem(LS_KEY, JSON.stringify(matchLog.filter(m => !m.fromFile)));
}

// Tolerant parser: pull every @LAT60LONn record's key/value body lines.
// Malformed records are skipped, never fatal (store rule: parser never crashes).
function parseOutcomeRecords(text) {
  const out = [];
  const re = new RegExp(`^@LAT${OUTCOME_LAT}LON(\\d+) \\| created:(\\d+)`, 'gm');
  let m;
  while ((m = re.exec(text)) !== null) {
    const end  = text.indexOf('\n@LAT', m.index + 1);
    const body = text.slice(m.index, end === -1 ? text.length : end);
    const field = k => {
      const f = body.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
      return f ? f[1].trim() : '';
    };
    const rec = {
      n:       parseInt(m[1], 10),
      ts:      parseInt(m[2], 10),
      arena:   field('arena'),
      cls:     field('class'),
      red:     field('red'),
      blue:    field('blue'),
      result:  field('result'),
      method:  field('method'),
      elapsed: field('elapsed'),
      fromFile: true
    };
    if (rec.red && rec.blue && rec.result) out.push(rec);
  }
  return out;
}

function mergeLogs(fileRecs, localRecs) {
  const byN = new Map();
  localRecs.forEach(r => byN.set(r.n, r));
  fileRecs.forEach(r => byN.set(r.n, r)); // file wins
  return [...byN.values()].sort((a, b) => a.n - b.n);
}

function outcomeToTTDB(m) {
  const bot = id => BOT_MAP[id]?.name || id;
  const title = m.result === 'draw'
    ? `${bot(m.red)} vs ${bot(m.blue)} — draw`
    : `${bot(m.result === 'red' ? m.red : m.blue)} def. ${bot(m.result === 'red' ? m.blue : m.red)}`;
  return `@LAT${OUTCOME_LAT}LON${m.n} | created:${m.ts} | updated:${m.ts} | relates:derived_from@LAT30LON1
[ew]
conf:240
rev:0
sal:100
touched:${m.ts}
[/ew]

**MATCH ${m.n} — ${title} (${m.arena} arena)**
src: meets.html match control

arena: ${m.arena}
class: ${m.cls}
red: ${m.red}
blue: ${m.blue}
result: ${m.result}
method: ${m.method}
elapsed: ${m.elapsed}
recorded_by: meets.html Spring Bot Breaker 2026`;
}

// ── HISTORY PANEL ────────────────────────────────────────────────────────────
const historyPanel = document.getElementById('history');
const historyList  = document.getElementById('history-list');
const histCount    = document.getElementById('hist-count');

function renderHistory() {
  historyList.innerHTML = '';
  histCount.textContent = matchLog.length;
  if (!matchLog.length) {
    const d = document.createElement('div');
    d.className = 'hist-empty';
    d.textContent = 'No matches recorded yet. Stage two bots, run the timer, then Record Result.';
    historyList.appendChild(d);
    return;
  }
  const bot = id => BOT_MAP[id]?.name || id;
  [...matchLog].reverse().forEach(m => {
    const row = document.createElement('div');
    row.className = 'hist-row' + (m.fromFile ? ' from-file' : '');
    const res = m.result === 'draw'
      ? `${bot(m.red)} vs ${bot(m.blue)} — <b>draw</b>`
      : `<b>${bot(m.result === 'red' ? m.red : m.blue)}</b> def. ${bot(m.result === 'red' ? m.blue : m.red)}`;
    row.innerHTML =
      `<span class="hn">#${m.n}</span>` +
      `<span class="harena ${m.arena}">${m.arena}</span>` +
      `<span class="hres">${res}</span>` +
      `<span class="hmeta">${METHOD_LABEL[m.method] || m.method} · ${m.elapsed}</span>`;
    historyList.appendChild(row);
  });
}

document.getElementById('btn-history-toggle').addEventListener('click', () => {
  historyPanel.classList.toggle('hidden');
});
document.getElementById('hist-clear').addEventListener('click', () => {
  if (!confirm('Clear locally recorded matches? Records already in meet_ttdb.md are kept.')) return;
  matchLog = matchLog.filter(m => m.fromFile);
  saveLocalLog();
  renderHistory();
});

// ── MATCH FLOW ───────────────────────────────────────────────────────────────
function stageSlots(arena) {
  return [...document.querySelectorAll(`#${arena}-stage .slot`)];
}

function nextFromQueue(arena) {
  const slots = stageSlots(arena).filter(s => !s.dataset.botId);
  if (!slots.length) return;
  const qslots = [...document.querySelectorAll(`#${arena}-queue-rows .qslot.occupied`)];
  slots.forEach(slot => {
    const q = qslots.shift();
    if (!q) return;
    const botId = q.dataset.botId;
    q.dataset.botId = '';
    q.classList.remove('occupied');
    q.querySelectorAll('.qname, .xbtn').forEach(el => el.remove());
    placedBots.delete(botId); // moving, not unplacing
    placeInStage(slot, botId);
  });
}

// result modal state
let pendingMatch = null; // {arena, red, blue}
let pendingResult = null;
const modal        = document.getElementById('modal');
const modalVs      = document.getElementById('modal-vs');
const winRow       = document.getElementById('win-row');
const methodSel    = document.getElementById('method');
const modalElapsed = document.getElementById('modal-elapsed');
const modalSave    = document.getElementById('modal-save');

function openResultModal(arena) {
  const [a, b] = stageSlots(arena).map(s => s.dataset.botId);
  if (!a || !b) { alert('Stage two bots in this arena first.'); return; }
  pendingMatch  = { arena, red: a, blue: b };
  pendingResult = null;
  modalSave.disabled = true;
  modalVs.textContent = `${BOT_MAP[a].name} vs ${BOT_MAP[b].name} — ${arena} arena`;
  modalElapsed.textContent = fmtTime(timerTotal - timerSec);
  winRow.innerHTML = '';
  [['red', `Winner: ${BOT_MAP[a].name}`], ['blue', `Winner: ${BOT_MAP[b].name}`], ['draw', 'Draw']]
    .forEach(([val, label]) => {
      const btn = document.createElement('button');
      btn.className = 'win-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        pendingResult = val;
        winRow.querySelectorAll('.win-btn').forEach(x => x.classList.remove('sel'));
        btn.classList.add('sel');
        modalSave.disabled = false;
      });
      winRow.appendChild(btn);
    });
  modal.classList.remove('hidden');
}

document.getElementById('modal-cancel').addEventListener('click', () => {
  modal.classList.add('hidden');
  pendingMatch = null;
});

modalSave.addEventListener('click', () => {
  if (!pendingMatch || !pendingResult) return;
  const { arena, red, blue } = pendingMatch;
  const redCls  = BOT_MAP[red].cls;
  const blueCls = BOT_MAP[blue].cls;
  const nextN = matchLog.reduce((mx, m) => Math.max(mx, m.n), 0) + 1;
  matchLog.push({
    n: nextN,
    ts: Math.floor(Date.now() / 1000),
    arena,
    cls: redCls === blueCls ? redCls : 'mixed',
    red, blue,
    result: pendingResult,
    method: methodSel.value,
    elapsed: fmtTime(timerTotal - timerSec),
    fromFile: false
  });
  saveLocalLog();
  renderHistory();
  historyPanel.classList.remove('hidden');
  modal.classList.add('hidden');
  pendingMatch = null;

  // stop + reset timer, clear the stage, pull the next pair from the queue
  clearInterval(timerTick); timerTick = null;
  btnStart.classList.remove('active');
  timerSec = timerTotal;
  renderTimer();
  stageSlots(arena).forEach(clearSlot);
  nextFromQueue(arena);
});

document.querySelectorAll('.mbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.act === 'next') nextFromQueue(btn.dataset.arena);
    else                            openResultModal(btn.dataset.arena);
  });
});

// ── TTDB LOAD + EXPORT ───────────────────────────────────────────────────────
function initMatchLog() {
  matchLog = mergeLogs([], loadLocalLog());
  renderHistory();
  fetch(TTDB_FILE)
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(text => {
      ttdbBase = text;
      matchLog = mergeLogs(parseOutcomeRecords(text), loadLocalLog());
      renderHistory();
    })
    .catch(() => { /* file:// or missing store — localStorage only */ });
}

document.getElementById('btn-export').addEventListener('click', () => {
  let base = ttdbBase;
  if (base === null) {
    alert('meet_ttdb.md could not be loaded (serve the site over http to export the full store). Exporting outcome records only.');
    base = '# IRCL meet outcome records (partial export — merge into meet_ttdb.md)\n';
  }
  let out = base.replace(/\s+$/, '');
  const fresh = matchLog.filter(m => !new RegExp(`^@LAT${OUTCOME_LAT}LON${m.n} `, 'm').test(base));
  fresh.forEach(m => { out += '\n\n---\n\n' + outcomeToTTDB(m); });
  out += '\n';
  const blob = new Blob([out], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = TTDB_FILE;
  a.click();
  URL.revokeObjectURL(a.href);
});

// ── INIT ─────────────────────────────────────────────────────────────────────
buildRoster();
buildStage('ant',    'ant');
buildStage('beetle', 'beetle');
addQueueRow('ant');
addQueueRow('beetle');

attachAutoQueue('ant');
attachAutoQueue('beetle');

document.querySelectorAll('.add-q-btn').forEach(btn => {
  btn.addEventListener('click', () => addQueueRow(btn.dataset.arena));
});

renderTimer();
initMatchLog();
