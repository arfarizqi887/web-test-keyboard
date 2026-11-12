(() => {
  "use strict";

  /* ================= Definisi layout ================= */
  const K = (code, label, w = 1) => ({ code, label, w });
  const G = (gap) => ({ gap });
  const F = (n) => K("F" + n, "F" + n);

  const NUMS = [
    K("Backquote", "`"),
    ..."1234567890".split("").map((d) => K("Digit" + d, d)),
    K("Minus", "-"),
    K("Equal", "="),
  ];
  const ROW_Q = [..."QWERTYUIOP".split("").map((l) => K("Key" + l, l)), K("BracketLeft", "["), K("BracketRight", "]")];
  const ROW_A = [..."ASDFGHJKL".split("").map((l) => K("Key" + l, l)), K("Semicolon", ";"), K("Quote", "'")];
  const ROW_Z = [..."ZXCVBNM".split("").map((l) => K("Key" + l, l)), K("Comma", ","), K("Period", "."), K("Slash", "/")];

  const BOTTOM_FULL = [
    K("ControlLeft", "Ctrl", 1.25), K("MetaLeft", "Win", 1.25), K("AltLeft", "Alt", 1.25),
    K("Space", "Spasi", 6.25),
    K("AltRight", "Alt", 1.25), K("MetaRight", "Win", 1.25), K("ContextMenu", "Menu", 1.25), K("ControlRight", "Ctrl", 1.25),
  ];
  const BOTTOM_COMPACT = [
    K("ControlLeft", "Ctrl", 1.25), K("MetaLeft", "Win", 1.25), K("AltLeft", "Alt", 1.25),
    K("Space", "Spasi", 6.25),
    K("AltRight", "Alt"), K("ControlRight", "Ctrl"),
  ];

  const LAYOUT_NAMES = {
    "60": "60%",
    "65": "65%",
    "75": "75%",
    "tkl": "TKL (80%)",
    "full": "Full Size",
  };

  function place(items, x0, y, out) {
    let x = x0;
    for (const it of items) {
      if (it.gap !== undefined) { x += it.gap; continue; }
      out.push({ code: it.code, label: it.label, x, y, w: it.w, h: 1 });
      x += it.w;
    }
  }

  function buildLayout(id) {
    const keys = [];
    const hasF = id !== "60" && id !== "65";
    const y0 = hasF ? 1.5 : 0;
    const compact = id === "65" || id === "75";

    // Baris fungsi
    if (id === "tkl" || id === "full") {
      place([
        K("Escape", "Esc"), G(1), F(1), F(2), F(3), F(4), G(0.5), F(5), F(6), F(7), F(8), G(0.5), F(9), F(10), F(11), F(12),
      ], 0, 0, keys);
      place([K("PrintScreen", "PrtSc"), K("ScrollLock", "ScrLk"), K("Pause", "Pause")], 15.25, 0, keys);
    } else if (id === "75") {
      place([
        K("Escape", "Esc"), ...Array.from({ length: 12 }, (_, i) => F(i + 1)),
        K("Delete", "Del"), K("Home", "Home"), K("End", "End"),
      ], 0, 0, keys);
    }

    // Blok utama
    const r1 = [...NUMS, K("Backspace", "Backspace", 2)];
    const r2 = [K("Tab", "Tab", 1.5), ...ROW_Q, K("Backslash", "\\", 1.5)];
    const r3 = [K("CapsLock", "Caps", 1.75), ...ROW_A, K("Enter", "Enter", 2.25)];
    const r4 = [K("ShiftLeft", "Shift", 2.25), ...ROW_Z, K("ShiftRight", "Shift", compact ? 1.75 : 2.75)];
    let r5 = compact ? [...BOTTOM_COMPACT] : [...BOTTOM_FULL];

    if (id === "65") {
      r1.push(K("Delete", "Del"));
      r2.push(K("PageUp", "PgUp"));
      r3.push(K("PageDown", "PgDn"));
      r4.push(K("ArrowUp", "↑"), K("End", "End"));
      r5.push(G(1), K("ArrowLeft", "←"), K("ArrowDown", "↓"), K("ArrowRight", "→"));
    } else if (id === "75") {
      r1.push(K("PageUp", "PgUp"));
      r2.push(K("PageDown", "PgDn"));
      r3.push(G(1));
      r4.push(K("ArrowUp", "↑"));
      r5.push(G(1), K("ArrowLeft", "←"), K("ArrowDown", "↓"), K("ArrowRight", "→"));
    }

    place(r1, 0, y0, keys);
    place(r2, 0, y0 + 1, keys);
    place(r3, 0, y0 + 2, keys);
    place(r4, 0, y0 + 3, keys);
    place(r5, 0, y0 + 4, keys);

    // Cluster navigasi (TKL & Full)
    if (id === "tkl" || id === "full") {
      const nx = 15.25;
      place([K("Insert", "Ins"), K("Home", "Home"), K("PageUp", "PgUp")], nx, y0, keys);
      place([K("Delete", "Del"), K("End", "End"), K("PageDown", "PgDn")], nx, y0 + 1, keys);
      place([K("ArrowUp", "↑")], nx + 1, y0 + 3, keys);
      place([K("ArrowLeft", "←"), K("ArrowDown", "↓"), K("ArrowRight", "→")], nx, y0 + 4, keys);
    }

    // Numpad (Full)
    if (id === "full") {
      const px = 18.5;
      const np = (code, label, c, r, w = 1, h = 1) =>
        keys.push({ code, label, x: px + c, y: y0 + r, w, h });
      np("NumLock", "Num", 0, 0); np("NumpadDivide", "/", 1, 0); np("NumpadMultiply", "*", 2, 0); np("NumpadSubtract", "-", 3, 0);
      np("Numpad7", "7", 0, 1); np("Numpad8", "8", 1, 1); np("Numpad9", "9", 2, 1); np("NumpadAdd", "+", 3, 1, 1, 2);
      np("Numpad4", "4", 0, 2); np("Numpad5", "5", 1, 2); np("Numpad6", "6", 2, 2);
      np("Numpad1", "1", 0, 3); np("Numpad2", "2", 1, 3); np("Numpad3", "3", 2, 3); np("NumpadEnter", "Enter", 3, 3, 1, 2);
      np("Numpad0", "0", 0, 4, 2, 1); np("NumpadDecimal", ".", 2, 4);
    }

    const cols = { "60": 15, "65": 16, "75": 16, tkl: 18.25, full: 22.5 }[id];
    const rows = hasF ? 6.5 : 5;
    return { keys, cols, rows };
  }

  /* ================= Alias pencarian ================= */
  const ALIASES = {
    Escape: "esc escape",
    Space: "spasi space spacebar",
    Backspace: "backspace hapus",
    Enter: "enter return",
    NumpadEnter: "enter numpad return",
    MetaLeft: "win windows cmd command super meta",
    MetaRight: "win windows cmd command super meta",
    ContextMenu: "menu context apps",
    ControlLeft: "ctrl control",
    ControlRight: "ctrl control",
    ShiftLeft: "shift",
    ShiftRight: "shift",
    AltLeft: "alt option",
    AltRight: "alt option altgr",
    CapsLock: "caps capslock",
    PageUp: "pageup pgup page up",
    PageDown: "pagedown pgdn page down",
    PrintScreen: "printscreen prtsc prtscn",
    ScrollLock: "scrolllock scrlk",
    ArrowUp: "atas up panah arrow",
    ArrowDown: "bawah down panah arrow",
    ArrowLeft: "kiri left panah arrow",
    ArrowRight: "kanan right panah arrow",
    NumLock: "numlock num",
    Delete: "delete del hapus",
  };

  /* ================= Elemen & state ================= */
  const $ = (id) => document.getElementById(id);
  const board = $("board");
  const wrap = $("boardWrap");
  const tabsEl = $("layoutTabs");
  const searchEl = $("search");
  const searchInfo = $("searchInfo");

  const state = {
    layout: "full",
    tested: new Set(),
    counts: Object.create(null),
    down: new Set(),
    log: [],
    presses: 0,
    current: null, // { keys, cols, rows }
    els: new Map(), // code -> elemen
  };

  try {
    const saved = localStorage.getItem("kbtest-layout");
    if (saved && LAYOUT_NAMES[saved]) state.layout = saved;
  } catch (_) { /* abaikan */ }

  /* ================= Render ================= */
  function renderTabs() {
    tabsEl.textContent = "";
    for (const [id, name] of Object.entries(LAYOUT_NAMES)) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.role = "tab";
      b.textContent = name;
      b.dataset.layout = id;
      b.setAttribute("aria-selected", String(id === state.layout));
      b.addEventListener("click", () => { setLayout(id); b.blur(); });
      tabsEl.appendChild(b);
    }
  }

  function renderBoard() {
    const lay = buildLayout(state.layout);
    state.current = lay;
    state.els.clear();
    board.textContent = "";
    board.style.gridTemplateColumns = `repeat(${Math.round(lay.cols * 4)}, calc(var(--u) / 4))`;
    board.style.gridTemplateRows = `repeat(${Math.round(lay.rows * 4)}, calc(var(--u) / 4))`;

    for (const k of lay.keys) {
      const el = document.createElement("div");
      el.className = "key" + (k.label.length > 3 ? " sm" : "");
      el.dataset.code = k.code;
      el.style.gridColumn = `${Math.round(k.x * 4) + 1} / span ${Math.round(k.w * 4)}`;
      el.style.gridRow = `${Math.round(k.y * 4) + 1} / span ${Math.round(k.h * 4)}`;
      const cap = document.createElement("span");
      cap.textContent = k.label;
      el.appendChild(cap);
      if (state.tested.has(k.code)) el.classList.add("tested");
      if (state.down.has(k.code)) el.classList.add("down");
      board.appendChild(el);
      state.els.set(k.code, el);
    }
    fit();
    applySearch();
    updateStats();
  }

  function fit() {
    if (!state.current) return;
    const avail = wrap.clientWidth - 16;
    const u = Math.max(22, Math.min(64, Math.floor(avail / state.current.cols)));
    board.style.setProperty("--u", u + "px");
  }

  function setLayout(id) {
    if (id === state.layout && state.current) return;
    state.layout = id;
    try { localStorage.setItem("kbtest-layout", id); } catch (_) { /* abaikan */ }
    for (const b of tabsEl.children) b.setAttribute("aria-selected", String(b.dataset.layout === id));
    renderBoard();
  }

  /* ================= Statistik ================= */
  function updateStats() {
    const codes = state.current.keys.map((k) => k.code);
    const total = codes.length;
    const done = codes.filter((c) => state.tested.has(c)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    $("pTested").textContent = done;
    $("pTotal").textContent = total;
    $("pPercent").textContent = pct + "%";
    $("pLeft").textContent = total - done;
    $("pPresses").textContent = state.presses;
    $("pHeld").textContent = state.down.size;
    $("pFill").style.width = pct + "%";
    $("pBar").setAttribute("aria-valuenow", String(pct));

    const box = $("untested");
    box.textContent = "";
    const left = state.current.keys.filter((k) => !state.tested.has(k.code));
    if (!left.length) {
      const p = document.createElement("span");
      p.className = "done-msg";
      p.textContent = "Semua tombol sudah diuji.";
      box.appendChild(p);
    } else {
      for (const k of left) {
        const c = document.createElement("span");
        c.className = "chip";
        c.textContent = k.label;
        box.appendChild(c);
      }
    }
  }

  function updateHeld() { $("pHeld").textContent = state.down.size; }

  /* ================= Panel tombol terakhir ================= */
  const LOC = ["Standar", "Kiri", "Kanan", "Numpad"];

  function showLast(e) {
    const name = e.key === " " ? "Spasi" : e.key;
    $("lastKey").textContent = name;
    $("fKey").textContent = e.key === " " ? "' ' (spasi)" : e.key;
    $("fCode").textContent = e.code || "Unidentified";
    $("fKeyCode").textContent = e.keyCode || "–";
    $("fLoc").textContent = LOC[e.location] || "–";
    const mods = [];
    if (e.ctrlKey) mods.push("Ctrl");
    if (e.shiftKey) mods.push("Shift");
    if (e.altKey) mods.push("Alt");
    if (e.metaKey) mods.push("Meta");
    $("fMods").textContent = mods.length ? mods.join(" + ") : "Tidak ada";
    $("fRepeat").textContent = e.repeat ? "Ya (ditahan)" : "Tidak";
  }

  function resetLast() {
    $("lastKey").textContent = "–";
    for (const id of ["fKey", "fCode", "fKeyCode", "fLoc", "fMods", "fRepeat"]) $(id).textContent = "–";
  }

  /* ================= Riwayat ================= */
  function pushLog(e, inLayout) {
    const t = new Date().toLocaleTimeString("id-ID", { hour12: false });
    state.log.unshift({ name: e.key === " " ? "Spasi" : e.key, code: e.code, t, out: !inLayout });
    state.log.length = Math.min(state.log.length, 10);
    renderLog();
  }

  function renderLog() {
    const ol = $("log");
    ol.textContent = "";
    for (const it of state.log) {
      const li = document.createElement("li");
      if (it.out) li.className = "out";
      const b = document.createElement("b");
      b.textContent = it.name;
      const s = document.createElement("small");
      s.textContent = `${it.code}${it.out ? " · di luar layout" : ""} · ${it.t}`;
      li.append(b, s);
      ol.appendChild(li);
    }
  }

  /* ================= Event keyboard ================= */
  function isTyping(t) {
    return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
  }

  function onKeyDown(e) {
    if (isTyping(e.target)) return;
    if ($("chkPrevent").checked) e.preventDefault();

    const code = e.code || "Unidentified";
    state.down.add(code);
    state.tested.add(code);

    const el = state.els.get(code);
    if (el) el.classList.add("down", "tested");

    showLast(e);
    if (!e.repeat) {
      state.presses++;
      state.counts[code] = (state.counts[code] || 0) + 1;
      pushLog(e, !!el);
    }
    updateStats();
  }

  function onKeyUp(e) {
    if (isTyping(e.target)) return;
    if ($("chkPrevent").checked) e.preventDefault();

    const code = e.code || "Unidentified";
    const el = state.els.get(code);

    // PrintScreen di Windows hanya mengirim keyup
    if (!state.tested.has(code)) {
      state.tested.add(code);
      state.presses++;
      showLast(e);
      pushLog(e, !!el);
    }

    state.down.delete(code);
    if (el) el.classList.remove("down");
    if (el) el.classList.add("tested");

    // Tombol Meta sering menelan keyup tombol lain
    if (code.startsWith("Meta")) clearHeld();

    updateStats();
  }

  function clearHeld() {
    state.down.clear();
    for (const el of state.els.values()) el.classList.remove("down");
    updateHeld();
  }

  /* ================= Pencarian ================= */
  function applySearch() {
    const q = searchEl.value.trim().toLowerCase();
    board.classList.toggle("searching", !!q);
    let n = 0;
    for (const k of state.current.keys) {
      const hay = `${k.label} ${k.code} ${ALIASES[k.code] || ""}`.toLowerCase();
      const hit = !!q && hay.includes(q);
      state.els.get(k.code).classList.toggle("match", hit);
      if (hit) n++;
    }
    searchInfo.textContent = !q ? "" : n ? `${n} tombol cocok dengan “${searchEl.value.trim()}”.` : `Tidak ada tombol yang cocok di layout ${LAYOUT_NAMES[state.layout]}.`;
  }

  /* ================= Reset & layar penuh ================= */
  function resetAll() {
    state.tested.clear();
    state.counts = Object.create(null);
    state.down.clear();
    state.log = [];
    state.presses = 0;
    for (const el of state.els.values()) el.classList.remove("down", "tested");
    resetLast();
    renderLog();
    updateStats();
  }

  const btnFull = $("btnFull");
  function toggleFull() {
    if (!document.fullscreenEnabled) {
      searchInfo.textContent = "Browser ini tidak mendukung mode layar penuh.";
      return;
    }
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }
  document.addEventListener("fullscreenchange", () => {
    btnFull.textContent = document.fullscreenElement ? "Keluar layar penuh" : "Layar penuh";
    fit();
  });

  /* ================= Pasang event ================= */
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", clearHeld);
  searchEl.addEventListener("input", applySearch);
  $("btnReset").addEventListener("click", (ev) => { resetAll(); ev.currentTarget.blur(); });
  btnFull.addEventListener("click", (ev) => { toggleFull(); ev.currentTarget.blur(); });
  $("chkPrevent").addEventListener("change", (ev) => ev.currentTarget.blur());

  if ("ResizeObserver" in window) new ResizeObserver(fit).observe(wrap);
  else window.addEventListener("resize", fit);

  /* ================= Mulai ================= */
  renderTabs();
  renderBoard();
})();
