/* ==========================================================================
   ABEL STUDIO — PRIVATE AUTO-SAVE PROJECT MANAGER (GitHub Pages + Localhost)
   Secret Shortcut: Ctrl + Shift + A (Cmd + Shift + A on macOS) or #admin
   ========================================================================== */
(() => {
  const SESSION_KEY = 'abel_admin_unlocked_v1';
  const GH_CONFIG_KEY = 'abel_gh_sync_v1';
  const DEFAULT_HASH = '71a4d91bca233eaa20214a6e0885f6ee7c7deee3e7a13a1b06aeb9f55b638d57'; // sha256("abel2026")

  // DOM References
  const overlay = document.getElementById('adminOverlay');
  if (!overlay) return;

  const authBox = document.getElementById('adminAuthBox');
  const authClose = document.getElementById('adminAuthClose');
  const authForm = document.getElementById('adminAuthForm');
  const passwordInput = document.getElementById('adminPasswordInput');
  const authErr = document.getElementById('adminAuthErr');

  const shell = document.getElementById('adminShell');
  const syncDot = document.getElementById('adminSyncDot');
  const syncStatus = document.getElementById('adminSyncStatus');
  const ghToggleBtn = document.getElementById('adminGhToggleBtn');
  const changePassBtn = document.getElementById('adminChangePassBtn');
  const exportBtn = document.getElementById('adminExportBtn');
  const logoutBtn = document.getElementById('adminLogoutBtn');
  const closeBtn = document.getElementById('adminCloseBtn');

  const ghDrawer = document.getElementById('adminGhDrawer');
  const ghForm = document.getElementById('adminGhForm');
  const ghOwnerInput = document.getElementById('ghOwnerInput');
  const ghRepoInput = document.getElementById('ghRepoInput');
  const ghBranchInput = document.getElementById('ghBranchInput');
  const ghTokenInput = document.getElementById('ghTokenInput');
  const ghDisconnectBtn = document.getElementById('ghDisconnectBtn');

  const countLabel = document.getElementById('adminCountLabel');
  const newBtn = document.getElementById('adminNewBtn');
  const projectListEl = document.getElementById('adminProjectList');

  const editorIdLabel = document.getElementById('adminEditorIdLabel');
  const editorHeading = document.getElementById('adminEditorHeading');
  const previewBtn = document.getElementById('adminPreviewBtn');
  const deleteBtn = document.getElementById('adminDeleteBtn');
  const projectForm = document.getElementById('adminProjectForm');

  const afCardTitle = document.getElementById('afCardTitle');
  const afId = document.getElementById('afId');
  const afCategory = document.getElementById('afCategory');
  const afTags = document.getElementById('afTags');
  const afInSlider = document.getElementById('afInSlider');
  const afCoverPreview = document.getElementById('afCoverPreview');
  const afImage = document.getElementById('afImage');
  const afCoverFile = document.getElementById('afCoverFile');
  const afDemoUrl = document.getElementById('afDemoUrl');
  const afAppDemoUrl = document.getElementById('afAppDemoUrl');
  const afExternalUrl = document.getElementById('afExternalUrl');
  const afSource = document.getElementById('afSource');

  const langTabs = Array.from(document.querySelectorAll('[data-admin-lang]'));
  const panelEs = document.getElementById('adminPanelEs');
  const panelEn = document.getElementById('adminPanelEn');

  const afEsTitle = document.getElementById('afEsTitle');
  const afEsTag = document.getElementById('afEsTag');
  const afEsClient = document.getElementById('afEsClient');
  const afEsYear = document.getElementById('afEsYear');
  const afEsImpact = document.getElementById('afEsImpact');
  const afEsChallenge = document.getElementById('afEsChallenge');
  const afEsSolution = document.getElementById('afEsSolution');
  const afEsDeliverables = document.getElementById('afEsDeliverables');

  const afEnTitle = document.getElementById('afEnTitle');
  const afEnTag = document.getElementById('afEnTag');
  const afEnClient = document.getElementById('afEnClient');
  const afEnYear = document.getElementById('afEnYear');
  const afEnImpact = document.getElementById('afEnImpact');
  const afEnChallenge = document.getElementById('afEnChallenge');
  const afEnSolution = document.getElementById('afEnSolution');
  const afEnDeliverables = document.getElementById('afEnDeliverables');

  const addGalleryFile = document.getElementById('adminAddGalleryFile');
  const galleryListEl = document.getElementById('adminGalleryList');

  // State
  let store = null;
  let selectedIdx = 0;
  let hasLocalApi = false;
  let ghConfig = loadGhConfig();
  let debounceTimer = null;
  let saveInFlight = false;
  let saveQueued = false;
  let isPopulating = false;
  let lastFocusedEl = null;

  /* ------------------------------------------------------------------------
     CRYPTO: SHA-256 (Web Crypto + pure-JS fallback for non-HTTPS contexts)
  ------------------------------------------------------------------------ */
  function sha256Fallback(ascii) {
    const rightRotate = (v, a) => (v >>> a) | (v << (32 - a));
    const maxWord = Math.pow(2, 32);
    let result = '';
    const words = [];
    const bytes = new TextEncoder().encode(ascii);
    const bitLen = bytes.length * 8;
    const hash = [];
    const k = [];
    let primeCounter = 0;
    const isComposite = {};

    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    const padded = new Uint8Array(bytes.length + 1 + ((55 - (bytes.length % 64) + 64) % 64) + 8);
    padded.set(bytes);
    padded[bytes.length] = 0x80;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 4, bitLen, false);

    for (let i = 0; i < padded.length; i += 4) {
      words.push(dv.getUint32(i, false));
    }

    const h = hash.slice(0, 8);
    for (let j = 0; j < words.length; ) {
      const w = words.slice(j, (j += 16));
      const oldHash = h.slice(0);
      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15];
        const w2 = w[i - 2];
        const a = h[0];
        const e = h[4];
        const temp1 =
          h[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & h[5]) ^ (~e & h[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        const temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]));
        h.unshift((temp1 + temp2) | 0);
        h[4] = (h[4] + temp1) | 0;
        h.pop();
      }
      for (let i = 0; i < 8; i++) h[i] = (h[i] + oldHash[i]) | 0;
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 3; j >= 0; j--) {
        const b = (h[i] >> (j * 8)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  async function sha256Hex(str) {
    if (window.crypto && window.crypto.subtle) {
      const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
    return sha256Fallback(str);
  }

  /* ------------------------------------------------------------------------
     SYNC STATUS INDICATOR
  ------------------------------------------------------------------------ */
  function setSyncState(mode, text) {
    if (syncDot) {
      syncDot.classList.toggle('is-saving', mode === 'saving');
      syncDot.classList.toggle('is-error', mode === 'error');
    }
    if (syncStatus) {
      syncStatus.textContent = text;
    }
  }

  function updateIdleStatusLabel() {
    if (ghConfig && hasLocalApi) {
      setSyncState('ready', 'Auto-guardado: Local + GitHub ✓');
    } else if (ghConfig) {
      setSyncState('ready', `GitHub Sync activo (${ghConfig.owner}/${ghConfig.repo})`);
    } else if (hasLocalApi) {
      setSyncState('ready', 'Auto-guardado local activo ✓');
    } else {
      setSyncState('ready', 'Solo vista previa (conecta GitHub Sync)');
    }
  }

  /* ------------------------------------------------------------------------
     GITHUB PAGES SYNC (REST Contents API — Token kept ONLY in localStorage)
  ------------------------------------------------------------------------ */
  function loadGhConfig() {
    try {
      const raw = localStorage.getItem(GH_CONFIG_KEY);
      if (!raw) return null;
      const cfg = JSON.parse(raw);
      if (cfg && cfg.owner && cfg.repo && cfg.token) {
        return {
          owner: cfg.owner.trim(),
          repo: cfg.repo.trim(),
          branch: (cfg.branch || 'main').trim(),
          token: cfg.token.trim()
        };
      }
    } catch {
      // ignore corrupted config
    }
    return null;
  }

  function populateGhForm() {
    if (ghConfig) {
      ghOwnerInput.value = ghConfig.owner;
      ghRepoInput.value = ghConfig.repo;
      ghBranchInput.value = ghConfig.branch || 'main';
      ghTokenInput.value = ghConfig.token;
      ghDisconnectBtn.classList.remove('is-hidden');
      ghToggleBtn.textContent = 'GitHub Sync ✓';
    } else {
      // Auto-guess owner/repo when running on *.github.io
      const host = window.location.hostname || '';
      if (host.endsWith('.github.io')) {
        const guessedOwner = host.replace(/\.github\.io$/i, '');
        const seg = window.location.pathname.split('/').filter(Boolean)[0] || `${guessedOwner}.github.io`;
        if (!ghOwnerInput.value) ghOwnerInput.value = guessedOwner;
        if (!ghRepoInput.value) ghRepoInput.value = seg;
      }
      ghDisconnectBtn.classList.add('is-hidden');
      ghToggleBtn.textContent = 'GitHub Pages Sync';
    }
  }

  function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
  }

  async function githubPutFile(repoPath, base64Content, commitMessage) {
    if (!ghConfig) return false;
    const { owner, repo, branch, token } = ghConfig;
    const apiBase = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${repoPath}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };

    let existingSha = null;
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}&_=${Date.now()}`, { headers });
    if (getRes.ok) {
      const meta = await getRes.json();
      existingSha = meta.sha || null;
    } else if (getRes.status !== 404) {
      const errBody = await getRes.text().catch(() => '');
      throw new Error(`GitHub GET ${getRes.status}: ${errBody.slice(0, 120)}`);
    }

    const body = {
      message: commitMessage,
      content: base64Content,
      branch
    };
    if (existingSha) body.sha = existingSha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      throw new Error(errData.message || `GitHub PUT ${putRes.status}`);
    }
    return true;
  }

  async function testGhConnection(cfg) {
    const url = `https://api.github.com/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status} al verificar el repositorio`);
    }
    return res.json();
  }

  /* ------------------------------------------------------------------------
     DATA LOADING & AUTO-SAVE QUEUE
  ------------------------------------------------------------------------ */
  async function detectLocalApi() {
    try {
      const res = await fetch('/api/ping', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        hasLocalApi = Boolean(data && data.local);
      } else {
        hasLocalApi = false;
      }
    } catch {
      hasLocalApi = false;
    }
  }

  async function loadStore() {
    try {
      const res = await fetch(`data/projects.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.projects)) {
          store = {
            version: json.version || 1,
            adminPasswordHash: json.adminPasswordHash || DEFAULT_HASH,
            projects: json.projects
          };
          return store;
        }
      }
    } catch {
      // Fallback below
    }
    store = {
      version: 1,
      adminPasswordHash: DEFAULT_HASH,
      projects: []
    };
    return store;
  }

  function scheduleAutoSave(immediate = false) {
    if (!store) return;
    // Update live portfolio behind overlay right away
    window.AbelPortfolio?.syncProjectsFromData(store.projects);

    clearTimeout(debounceTimer);
    if (immediate) {
      flushSave();
    } else {
      setSyncState('saving', 'Guardando cambios…');
      debounceTimer = setTimeout(() => {
        flushSave();
      }, 700);
    }
  }

  async function flushSave() {
    if (!store) return;
    if (saveInFlight) {
      saveQueued = true;
      return;
    }

    saveInFlight = true;
    setSyncState('saving', ghConfig ? 'Publicando en GitHub…' : 'Guardando…');

    const payloadText = JSON.stringify(store, null, 2);
    let savedLocal = false;
    let savedGh = false;
    let lastError = null;

    try {
      if (hasLocalApi) {
        const res = await fetch('/api/save-projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payloadText
        });
        if (!res.ok) throw new Error(`Local API ${res.status}`);
        savedLocal = true;
      }

      if (ghConfig) {
        await githubPutFile('data/projects.json', utf8ToBase64(payloadText), 'chore(portfolio): update projects via private studio');
        savedGh = true;
      }
    } catch (err) {
      lastError = err;
    }

    saveInFlight = false;

    if (saveQueued) {
      saveQueued = false;
      flushSave();
      return;
    }

    if (lastError) {
      setSyncState('error', `Error al guardar: ${lastError.message}`);
      window.AbelPortfolio?.showToast(`Error al guardar: ${lastError.message}`);
    } else if (savedGh && savedLocal) {
      setSyncState('ready', 'Guardado en local y publicado en GitHub ✓');
    } else if (savedGh) {
      setSyncState('ready', 'Publicado en GitHub Pages ✓ (~30s)');
    } else if (savedLocal) {
      setSyncState('ready', 'Guardado automáticamente en local ✓');
    } else {
      setSyncState('ready', 'Vista previa actualizada (conecta GitHub Sync para guardar)');
    }
  }

  /* ------------------------------------------------------------------------
     IMAGE COMPRESSION & AUTO-UPLOAD (max 1280px JPEG @ 0.85)
  ------------------------------------------------------------------------ */
  function slugify(str) {
    return String(str || 'proyecto')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'proyecto';
  }

  function compressImageFile(file, maxWidth = 1280, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Formato de imagen inválido'));
        img.onload = () => {
          const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
          const w = Math.max(1, Math.round(img.width * ratio));
          const h = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#0e0e0e';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function uploadCompressedImage(file, baseSlug) {
    setSyncState('saving', 'Optimizando y subiendo imagen…');
    const dataUrl = await compressImageFile(file, 1280, 0.85);
    const shortStamp = Date.now().toString(36).slice(-5);
    const filename = `${slugify(baseSlug)}-${shortStamp}.jpg`;
    const targetPath = `assets/projects/${filename}`;
    const base64Only = dataUrl.replace(/^data:image\/[a-z+]+;base64,/i, '');

    if (hasLocalApi) {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, dataUrl })
      });
      if (!res.ok) throw new Error(`Error subiendo imagen en local (${res.status})`);
    }

    if (ghConfig) {
      await githubPutFile(targetPath, base64Only, `chore(assets): upload ${filename}`);
    }

    if (hasLocalApi || ghConfig) {
      return targetPath;
    }
    return dataUrl;
  }

  /* ------------------------------------------------------------------------
     SIDEBAR & EDITOR RENDERING
  ------------------------------------------------------------------------ */
  function getCurrentProject() {
    if (!store || !store.projects.length) return null;
    if (selectedIdx < 0 || selectedIdx >= store.projects.length) selectedIdx = 0;
    return store.projects[selectedIdx];
  }

  function renderProjectList() {
    if (!store) return;
    const total = store.projects.length;
    countLabel.textContent = `${total} PROYECTO${total === 1 ? '' : 'S'}`;
    projectListEl.textContent = '';

    store.projects.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = `admin-item${idx === selectedIdx ? ' is-selected' : ''}`;
      row.tabIndex = 0;

      const thumb = document.createElement('img');
      thumb.className = 'admin-item__thumb';
      thumb.src = p.image || '';
      thumb.alt = p.cardTitle || p.id;
      thumb.loading = 'lazy';

      const meta = document.createElement('div');
      meta.className = 'admin-item__info';
      const title = document.createElement('strong');
      title.textContent = p.cardTitle || p.es?.title || p.id;
      const sub = document.createElement('span');
      const catLabel = p.category === 'branding' ? 'Branding' : 'Web / UI-UX';
      sub.textContent = `${catLabel}${p.inSlider === false ? ' · Oculto' : ''}`;
      meta.appendChild(title);
      meta.appendChild(sub);

      const orderBox = document.createElement('div');
      orderBox.className = 'admin-item__order';

      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.textContent = '↑';
      upBtn.title = 'Subir posición';
      upBtn.disabled = idx === 0;
      upBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveProject(idx, -1);
      });

      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.textContent = '↓';
      downBtn.title = 'Bajar posición';
      downBtn.disabled = idx === total - 1;
      downBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveProject(idx, 1);
      });

      orderBox.appendChild(upBtn);
      orderBox.appendChild(downBtn);

      row.appendChild(thumb);
      row.appendChild(meta);
      row.appendChild(orderBox);

      row.addEventListener('click', () => selectProject(idx));
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProject(idx);
        }
      });

      projectListEl.appendChild(row);
    });
  }

  function renderGalleryEditor(p) {
    galleryListEl.textContent = '';
    const items = Array.isArray(p.gallery) ? p.gallery : [];

    if (items.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'admin-hint';
      empty.textContent = 'Sin imágenes extra todavía. Sube pantallas o vistas adicionales para el detalle del proyecto.';
      galleryListEl.appendChild(empty);
      return;
    }

    items.forEach((item, gIdx) => {
      const row = document.createElement('div');
      row.className = 'admin-gal-row';

      const img = document.createElement('img');
      img.src = item.src || '';
      img.alt = item.captionEs || `Galería ${gIdx + 1}`;

      const inputs = document.createElement('div');
      inputs.className = 'admin-gal-row__fields';

      const esIn = document.createElement('input');
      esIn.type = 'text';
      esIn.className = 'admin-input';
      esIn.placeholder = 'Descripción en español (opcional)';
      esIn.value = item.captionEs || '';
      esIn.addEventListener('input', () => {
        p.gallery[gIdx].captionEs = esIn.value;
        scheduleAutoSave(false);
      });

      const enIn = document.createElement('input');
      enIn.type = 'text';
      enIn.className = 'admin-input';
      enIn.placeholder = 'Caption in English (optional)';
      enIn.value = item.captionEn || '';
      enIn.addEventListener('input', () => {
        p.gallery[gIdx].captionEn = enIn.value;
        scheduleAutoSave(false);
      });

      inputs.appendChild(esIn);
      inputs.appendChild(enIn);

      const rmBtn = document.createElement('button');
      rmBtn.type = 'button';
      rmBtn.className = 'admin-btn admin-btn--danger-ghost admin-btn--sm';
      rmBtn.textContent = '✕';
      rmBtn.title = 'Quitar imagen';
      rmBtn.addEventListener('click', () => {
        p.gallery.splice(gIdx, 1);
        renderGalleryEditor(p);
        scheduleAutoSave(true);
      });

      row.appendChild(img);
      row.appendChild(inputs);
      row.appendChild(rmBtn);
      galleryListEl.appendChild(row);
    });
  }

  function populateEditor() {
    const p = getCurrentProject();
    if (!p) {
      editorIdLabel.textContent = 'SIN PROYECTOS';
      editorHeading.textContent = 'Crea tu primer proyecto';
      return;
    }

    isPopulating = true;
    p.es = p.es || {};
    p.en = p.en || {};
    p.gallery = Array.isArray(p.gallery) ? p.gallery : [];

    editorIdLabel.textContent = `#proyecto/${p.id}`;
    editorHeading.textContent = p.cardTitle || p.es.title || p.id;

    afCardTitle.value = p.cardTitle || '';
    afId.value = p.id || '';
    afCategory.value = p.category === 'branding' ? 'branding' : 'web';
    afTags.value = Array.isArray(p.tags) ? p.tags.join(', ') : '';
    afInSlider.checked = p.inSlider !== false;
    afImage.value = p.image || '';
    afCoverPreview.src = p.image || '';
    afDemoUrl.value = p.demoUrl || '';
    afAppDemoUrl.value = p.appDemoUrl || '';
    afExternalUrl.value = p.url || '';
    afSource.value = p.source === 'dribbble' ? 'dribbble' : 'behance';

    afEsTitle.value = p.es.title || '';
    afEsTag.value = p.es.tag || '';
    afEsClient.value = p.es.client || '';
    afEsYear.value = p.es.year || '';
    afEsImpact.value = p.es.impact || '';
    afEsChallenge.value = p.es.challenge || '';
    afEsSolution.value = p.es.solution || '';
    afEsDeliverables.value = Array.isArray(p.es.deliverables) ? p.es.deliverables.join(', ') : '';

    afEnTitle.value = p.en.title || '';
    afEnTag.value = p.en.tag || '';
    afEnClient.value = p.en.client || '';
    afEnYear.value = p.en.year || '';
    afEnImpact.value = p.en.impact || '';
    afEnChallenge.value = p.en.challenge || '';
    afEnSolution.value = p.en.solution || '';
    afEnDeliverables.value = Array.isArray(p.en.deliverables) ? p.en.deliverables.join(', ') : '';

    renderGalleryEditor(p);
    isPopulating = false;
  }

  function selectProject(idx) {
    selectedIdx = idx;
    renderProjectList();
    populateEditor();
  }

  function moveProject(idx, delta) {
    const target = idx + delta;
    if (!store || target < 0 || target >= store.projects.length) return;
    const [moved] = store.projects.splice(idx, 1);
    store.projects.splice(target, 0, moved);
    if (selectedIdx === idx) selectedIdx = target;
    else if (selectedIdx === target) selectedIdx = idx;
    renderProjectList();
    scheduleAutoSave(true);
  }

  function parseCsv(value) {
    return String(value || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function syncFormToCurrentProject() {
    if (isPopulating) return;
    const p = getCurrentProject();
    if (!p) return;

    const cleanId = slugify(afId.value) || p.id;
    p.id = cleanId;
    p.cardTitle = afCardTitle.value.trim();
    p.category = afCategory.value === 'branding' ? 'branding' : 'web';
    p.tags = parseCsv(afTags.value);
    p.inSlider = Boolean(afInSlider.checked);
    p.image = afImage.value.trim();
    p.demoUrl = afDemoUrl.value.trim();
    p.appDemoUrl = afAppDemoUrl.value.trim();
    p.url = afExternalUrl.value.trim();
    p.source = afSource.value === 'dribbble' ? 'dribbble' : 'behance';

    p.es = {
      tag: afEsTag.value.trim(),
      client: afEsClient.value.trim(),
      year: afEsYear.value.trim(),
      title: afEsTitle.value.trim() || p.cardTitle,
      impact: afEsImpact.value.trim(),
      challenge: afEsChallenge.value.trim(),
      solution: afEsSolution.value.trim(),
      deliverables: parseCsv(afEsDeliverables.value)
    };

    p.en = {
      tag: afEnTag.value.trim() || p.es.tag,
      client: afEnClient.value.trim() || p.es.client,
      year: afEnYear.value.trim() || p.es.year,
      title: afEnTitle.value.trim() || p.es.title,
      impact: afEnImpact.value.trim() || p.es.impact,
      challenge: afEnChallenge.value.trim() || p.es.challenge,
      solution: afEnSolution.value.trim() || p.es.solution,
      deliverables: parseCsv(afEnDeliverables.value).length ? parseCsv(afEnDeliverables.value) : p.es.deliverables
    };

    afCoverPreview.src = p.image || '';
    editorIdLabel.textContent = `#proyecto/${p.id}`;
    editorHeading.textContent = p.cardTitle || p.es.title || p.id;

    renderProjectList();
    scheduleAutoSave(false);
  }

  /* ------------------------------------------------------------------------
     OPEN / CLOSE & AUTH FLOW
  ------------------------------------------------------------------------ */
  function showView(unlocked) {
    authBox.classList.toggle('is-hidden', unlocked);
    shell.classList.toggle('is-hidden', !unlocked);
    if (unlocked) {
      populateGhForm();
      updateIdleStatusLabel();
      renderProjectList();
      populateEditor();
    } else {
      authErr.classList.add('is-hidden');
      passwordInput.value = '';
      setTimeout(() => passwordInput.focus(), 40);
    }
  }

  async function openAdminPanel() {
    if (overlay.classList.contains('is-open')) return;
    lastFocusedEl = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    window.AbelPortfolio?.lockPageScroll(true);

    await Promise.all([detectLocalApi(), loadStore()]);
    const unlocked = sessionStorage.getItem(SESSION_KEY) === '1';
    showView(unlocked);
  }

  function closeAdminPanel() {
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    const caseModalOpen = document.getElementById('caseModal')?.classList.contains('is-open');
    window.AbelPortfolio?.lockPageScroll(Boolean(caseModalOpen));
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  /* ------------------------------------------------------------------------
     EVENT LISTENERS
  ------------------------------------------------------------------------ */
  // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A on macOS)
  window.addEventListener('keydown', (e) => {
    const isShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a';
    if (isShortcut) {
      e.preventDefault();
      if (overlay.classList.contains('is-open')) {
        closeAdminPanel();
      } else {
        openAdminPanel();
      }
      return;
    }

    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      e.preventDefault();
      closeAdminPanel();
    }
  });

  // Fallback secret hash #admin
  if (window.location.hash === '#admin') {
    openAdminPanel();
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openAdminPanel();
  });

  authClose?.addEventListener('click', closeAdminPanel);
  closeBtn?.addEventListener('click', closeAdminPanel);

  // Unlock password submit
  authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const entered = passwordInput.value;
    if (!entered) return;
    const expected = store?.adminPasswordHash || DEFAULT_HASH;
    const enteredHash = await sha256Hex(entered);
    if (enteredHash === expected) {
      sessionStorage.setItem(SESSION_KEY, '1');
      authErr.classList.add('is-hidden');
      showView(true);
    } else {
      authErr.classList.remove('is-hidden');
      passwordInput.select();
    }
  });

  // Logout
  logoutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    showView(false);
  });

  // Toggle GitHub Sync drawer
  ghToggleBtn?.addEventListener('click', () => {
    ghDrawer.classList.toggle('is-hidden');
    if (!ghDrawer.classList.contains('is-hidden')) {
      populateGhForm();
      ghOwnerInput.focus();
    }
  });

  // Save & test GitHub Sync config
  ghForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const candidate = {
      owner: ghOwnerInput.value.trim(),
      repo: ghRepoInput.value.trim(),
      branch: ghBranchInput.value.trim() || 'main',
      token: ghTokenInput.value.trim()
    };
    if (!candidate.owner || !candidate.repo || !candidate.token) return;

    setSyncState('saving', 'Verificando conexión con GitHub…');
    try {
      await testGhConnection(candidate);
      ghConfig = candidate;
      localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(ghConfig));
      populateGhForm();
      ghDrawer.classList.add('is-hidden');
      window.AbelPortfolio?.showToast('GitHub Pages Sync conectado ✓');
      updateIdleStatusLabel();
    } catch (err) {
      setSyncState('error', `GitHub: ${err.message}`);
      window.AbelPortfolio?.showToast(`No se pudo conectar: ${err.message}`);
    }
  });

  ghDisconnectBtn?.addEventListener('click', () => {
    ghConfig = null;
    localStorage.removeItem(GH_CONFIG_KEY);
    ghTokenInput.value = '';
    populateGhForm();
    updateIdleStatusLabel();
    window.AbelPortfolio?.showToast('GitHub Sync desconectado');
  });

  // Change password (auto-saves new SHA-256 hash)
  changePassBtn?.addEventListener('click', async () => {
    const nextPass = window.prompt('Nueva contraseña privada (mínimo 6 caracteres):');
    if (!nextPass) return;
    if (nextPass.length < 6) {
      window.AbelPortfolio?.showToast('Usa al menos 6 caracteres.');
      return;
    }
    const confirmPass = window.prompt('Confirma la nueva contraseña:');
    if (confirmPass !== nextPass) {
      window.AbelPortfolio?.showToast('Las contraseñas no coinciden.');
      return;
    }
    store.adminPasswordHash = await sha256Hex(nextPass);
    scheduleAutoSave(true);
    window.AbelPortfolio?.showToast('Contraseña actualizada y guardada ✓');
  });

  // Backup JSON download
  exportBtn?.addEventListener('click', () => {
    if (!store) return;
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.AbelPortfolio?.showToast('Backup projects.json descargado');
  });

  // Create new project
  newBtn?.addEventListener('click', () => {
    if (!store) return;
    const n = store.projects.length + 1;
    let id = `proyecto-${n}`;
    const existing = new Set(store.projects.map((p) => p.id));
    while (existing.has(id)) id = `${id}-${Math.floor(Math.random() * 90 + 10)}`;

    const fresh = {
      id,
      cardTitle: 'Nuevo Proyecto',
      category: 'web',
      inSlider: true,
      tags: ['UI/UX', 'WEB'],
      image: 'assets/projects/shift.jpg',
      demoUrl: '',
      appDemoUrl: '',
      url: '',
      source: 'behance',
      gallery: [],
      es: {
        tag: 'CASO · DISEÑO DIGITAL',
        client: 'Cliente / Marca',
        year: '2026',
        title: 'Nuevo Proyecto',
        impact: 'Resultado o enfoque principal',
        challenge: 'Describe el reto principal del proyecto.',
        solution: 'Explica cómo diseñaste la solución.',
        deliverables: ['UI/UX', 'Diseño Web', 'Figma']
      },
      en: {
        tag: 'CASE · DIGITAL DESIGN',
        client: 'Client / Brand',
        year: '2026',
        title: 'New Project',
        impact: 'Primary outcome or focus',
        challenge: 'Describe the main project challenge.',
        solution: 'Explain how you crafted the solution.',
        deliverables: ['UI/UX', 'Web Design', 'Figma']
      }
    };

    store.projects.unshift(fresh);
    selectedIdx = 0;
    renderProjectList();
    populateEditor();
    scheduleAutoSave(true);
    afCardTitle.focus();
    afCardTitle.select();
  });

  // Delete project
  deleteBtn?.addEventListener('click', () => {
    const p = getCurrentProject();
    if (!p || !store) return;
    if (store.projects.length <= 1) {
      window.AbelPortfolio?.showToast('Mantén al menos 1 proyecto en el portafolio.');
      return;
    }
    const ok = window.confirm(`¿Eliminar "${p.cardTitle || p.id}" del portafolio?`);
    if (!ok) return;
    store.projects.splice(selectedIdx, 1);
    selectedIdx = Math.max(0, selectedIdx - 1);
    renderProjectList();
    populateEditor();
    scheduleAutoSave(true);
    window.AbelPortfolio?.showToast('Proyecto eliminado ✓');
  });

  // Preview project directly in live portfolio modal
  previewBtn?.addEventListener('click', () => {
    const p = getCurrentProject();
    if (!p) return;
    closeAdminPanel();
    window.AbelPortfolio?.openCaseModal(p.id);
  });

  // Form auto-save on input/change
  projectForm?.addEventListener('input', syncFormToCurrentProject);
  projectForm?.addEventListener('change', syncFormToCurrentProject);
  projectForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    scheduleAutoSave(true);
  });

  // Bilingual tabs ES / EN
  langTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.adminLang === 'en' ? 'en' : 'es';
      langTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      panelEs.classList.toggle('is-hidden', target !== 'es');
      panelEn.classList.toggle('is-hidden', target !== 'en');
    });
  });

  // Cover image upload (compress + auto-save)
  afCoverFile?.addEventListener('change', async () => {
    const file = afCoverFile.files?.[0];
    const p = getCurrentProject();
    if (!file || !p) return;
    try {
      const savedPath = await uploadCompressedImage(file, p.id || 'cover');
      p.image = savedPath;
      afImage.value = savedPath;
      afCoverPreview.src = savedPath;
      renderProjectList();
      scheduleAutoSave(true);
      window.AbelPortfolio?.showToast('Portada optimizada y guardada ✓');
    } catch (err) {
      setSyncState('error', `Imagen: ${err.message}`);
      window.AbelPortfolio?.showToast(`Error subiendo portada: ${err.message}`);
    } finally {
      afCoverFile.value = '';
    }
  });

  // Gallery image upload (compress + auto-save)
  addGalleryFile?.addEventListener('change', async () => {
    const file = addGalleryFile.files?.[0];
    const p = getCurrentProject();
    if (!file || !p) return;
    try {
      const savedPath = await uploadCompressedImage(file, `${p.id || 'item'}-gallery`);
      p.gallery = Array.isArray(p.gallery) ? p.gallery : [];
      p.gallery.push({
        src: savedPath,
        captionEs: '',
        captionEn: ''
      });
      renderGalleryEditor(p);
      scheduleAutoSave(true);
      window.AbelPortfolio?.showToast('Imagen añadida a la galería ✓');
    } catch (err) {
      setSyncState('error', `Galería: ${err.message}`);
      window.AbelPortfolio?.showToast(`Error subiendo imagen: ${err.message}`);
    } finally {
      addGalleryFile.value = '';
    }
  });
})();
