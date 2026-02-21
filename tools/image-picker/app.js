(function () {
  'use strict';

  // --- State ---
  let config = null;
  let selectedPoolItem = null; // { type: 'gdrive'|'upload', id: string }
  let allGdriveIds = new Set();
  let uploadPool = new Map(); // uploadId -> { id, filename, thumbnail }
  let processedSlots = new Map();

  // --- DOM refs ---
  const poolGrid = document.getElementById('pool-grid');
  const projectSlots = document.getElementById('project-slots');
  const gallerySlots = document.getElementById('gallery-slots');
  const modeBadge = document.getElementById('mode-badge');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const logPanel = document.getElementById('log-panel');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const processAllBtn = document.getElementById('process-all-btn');
  const saveConfigBtn = document.getElementById('save-config-btn');
  const addGdriveBtn = document.getElementById('add-gdrive-btn');
  const newGdriveIdInput = document.getElementById('new-gdrive-id');
  const addGallerySlotBtn = document.getElementById('add-gallery-slot-btn');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  const CATEGORIES = [
    'driveways', 'septic', 'foundations', 'land-clearing',
    'grading', 'fencing', 'concrete', 'demolition', 'roofing', 'general'
  ];

  // --- Logging ---
  function log(message, type) {
    type = type || '';
    var entry = document.createElement('div');
    entry.className = 'log-entry' + (type ? ' log-entry--' + type : '');
    entry.textContent = new Date().toLocaleTimeString() + ' — ' + message;
    logPanel.appendChild(entry);
    logPanel.scrollTop = logPanel.scrollHeight;
  }

  // --- Drag & Drop ---
  dropZone.addEventListener('click', function () { fileInput.click(); });

  dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.classList.add('drop-zone--active');
  });

  dropZone.addEventListener('dragleave', function () {
    dropZone.classList.remove('drop-zone--active');
  });

  dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropZone.classList.remove('drop-zone--active');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', function () {
    handleFiles(this.files);
    this.value = '';
  });

  async function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (!file.type.startsWith('image/')) {
        log('Skipped non-image: ' + file.name, 'error');
        continue;
      }
      log('Uploading ' + file.name + ' (' + formatBytes(file.size) + ')...', 'info');

      try {
        var formData = new FormData();
        formData.append('file', file);
        var res = await fetch('/api/upload', { method: 'POST', body: formData });
        var data = await res.json();

        if (data.success) {
          uploadPool.set(data.id, {
            id: data.id,
            filename: data.filename,
            thumbnail: data.thumbnail,
            size: data.size,
          });
          log('Added: ' + data.filename + ' → ' + data.id.substring(0, 16), 'success');
          renderPool();
        } else {
          log('Upload failed: ' + data.error, 'error');
        }
      } catch (e) {
        log('Upload error: ' + e.message, 'error');
      }
    }
  }

  // --- Load Config ---
  async function loadConfig() {
    try {
      var res = await fetch('/api/config');
      if (!res.ok) throw new Error('Failed to load config');
      config = await res.json();

      collectGdriveIds();
      renderPool();
      renderProjectSlots();
      renderGallerySlots();
      log('Config loaded: ' + config.projects.length + ' projects, ' + config.gallery.length + ' gallery items', 'success');
    } catch (e) {
      log('Error loading config: ' + e.message, 'error');
      statusDot.classList.add('status-dot--error');
      statusText.textContent = 'Error';
    }
  }

  function collectGdriveIds() {
    allGdriveIds.clear();
    config.projects.forEach(function (p) { if (p.gdriveId) allGdriveIds.add(p.gdriveId); });
    config.gallery.forEach(function (g) { if (g.gdriveId) allGdriveIds.add(g.gdriveId); });
  }

  // --- Pool Rendering ---
  function renderPool() {
    poolGrid.innerHTML = '';

    // Render uploaded files first
    uploadPool.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'pool-item';
      if (selectedPoolItem && selectedPoolItem.type === 'upload' && selectedPoolItem.id === item.id) {
        el.classList.add('selected');
      }

      el.innerHTML =
        '<img src="' + item.thumbnail + '" alt="' + item.filename + '">' +
        '<div class="pool-label">' + item.filename + '</div>';

      el.addEventListener('click', function () {
        selectedPoolItem = { type: 'upload', id: item.id };
        document.querySelectorAll('.pool-item').forEach(function (p) { p.classList.remove('selected'); });
        el.classList.add('selected');
        log('Selected upload: ' + item.filename, 'info');
      });

      poolGrid.appendChild(el);
    });

    // Render gdrive items
    allGdriveIds.forEach(function (gdriveId) {
      var el = document.createElement('div');
      el.className = 'pool-item';
      if (selectedPoolItem && selectedPoolItem.type === 'gdrive' && selectedPoolItem.id === gdriveId) {
        el.classList.add('selected');
      }

      el.innerHTML =
        '<img src="/api/gdrive-thumb/' + gdriveId + '" alt="GDrive" loading="lazy">' +
        '<div class="pool-label">' + gdriveId.substring(0, 12) + '...</div>';

      el.addEventListener('click', function () {
        selectedPoolItem = { type: 'gdrive', id: gdriveId };
        document.querySelectorAll('.pool-item').forEach(function (p) { p.classList.remove('selected'); });
        el.classList.add('selected');
        log('Selected GDrive: ' + gdriveId.substring(0, 16) + '...', 'info');
      });

      poolGrid.appendChild(el);
    });
  }

  // --- Slot Rendering ---
  function renderProjectSlots() {
    projectSlots.innerHTML = '';
    config.projects.forEach(function (project, index) {
      projectSlots.appendChild(createSlotCard(project, 'project', index));
    });
  }

  function renderGallerySlots() {
    gallerySlots.innerHTML = '';
    config.gallery.forEach(function (item, index) {
      gallerySlots.appendChild(createSlotCard(item, 'gallery', index));
    });
  }

  function createSlotCard(item, type, index) {
    var card = document.createElement('div');
    card.className = 'slot-card';
    card.dataset.slotId = item.id;

    var processed = processedSlots.get(item.id);
    var statusClass = processed ? 'slot-status--uploaded' : 'slot-status--pending';
    var statusLabel = processed ? 'Saved' : 'Pending';

    // Determine preview image
    var previewSrc = '';
    if (processed) {
      previewSrc = processed.publicUrl || '';
    } else if (item._uploadId && uploadPool.has(item._uploadId)) {
      previewSrc = uploadPool.get(item._uploadId).thumbnail;
    } else if (item.gdriveId) {
      previewSrc = '/api/gdrive-thumb/' + item.gdriveId;
    }

    var previewHtml = previewSrc
      ? '<img src="' + previewSrc + '" alt="' + (item.title || '') + '">'
      : '<span class="empty-text">No image assigned</span>';

    var categoryOptions = CATEGORIES.map(function (cat) {
      var selected = (item.category === cat) ? ' selected' : '';
      return '<option value="' + cat + '"' + selected + '>' + cat + '</option>';
    }).join('');

    card.innerHTML =
      '<div class="slot-card__preview">' +
        previewHtml +
        '<span class="slot-status ' + statusClass + '">' + statusLabel + '</span>' +
      '</div>' +
      '<div class="slot-card__body">' +
        '<div class="slot-card__id">' + item.id + '</div>' +
        '<div class="slot-card__fields">' +
          '<input type="text" data-field="title" value="' + (item.title || '') + '" placeholder="Title">' +
          '<select data-field="category"><option value="">Category...</option>' + categoryOptions + '</select>' +
          (type === 'project'
            ? '<input type="text" data-field="location" value="' + (item.location || '') + '" placeholder="Location">'
            : '') +
        '</div>' +
        '<div class="slot-card__actions">' +
          '<button class="btn btn--primary btn--small assign-btn">Assign Selected</button>' +
          '<button class="btn btn--secondary btn--small process-btn">Process</button>' +
          (type === 'gallery'
            ? '<button class="btn btn--danger btn--small remove-slot-btn">Remove</button>'
            : '') +
        '</div>' +
      '</div>';

    // Field change handlers
    card.querySelectorAll('[data-field]').forEach(function (input) {
      input.addEventListener('change', function () {
        var field = this.dataset.field;
        var list = type === 'project' ? config.projects : config.gallery;
        list[index][field] = this.value;
      });
    });

    // Assign button
    card.querySelector('.assign-btn').addEventListener('click', function () {
      if (!selectedPoolItem) {
        log('Select a photo from the pool first', 'error');
        return;
      }
      var list = type === 'project' ? config.projects : config.gallery;
      if (selectedPoolItem.type === 'upload') {
        list[index]._uploadId = selectedPoolItem.id;
        list[index].gdriveId = '';
        var upload = uploadPool.get(selectedPoolItem.id);
        log('Assigned ' + upload.filename + ' to ' + item.id, 'success');
      } else {
        list[index].gdriveId = selectedPoolItem.id;
        list[index]._uploadId = '';
        allGdriveIds.add(selectedPoolItem.id);
        log('Assigned GDrive ' + selectedPoolItem.id.substring(0, 16) + '... to ' + item.id, 'success');
      }
      renderPool();
      if (type === 'project') renderProjectSlots();
      else renderGallerySlots();
    });

    // Process single button
    card.querySelector('.process-btn').addEventListener('click', async function () {
      var list = type === 'project' ? config.projects : config.gallery;
      var current = list[index];
      this.disabled = true;
      this.textContent = '...';

      try {
        var res, data;
        if (current._uploadId && uploadPool.has(current._uploadId)) {
          log('Processing upload for ' + current.id + '...', 'info');
          res = await fetch('/api/process-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uploadId: current._uploadId, slotId: current.id, type: type }),
          });
        } else if (current.gdriveId) {
          log('Processing GDrive for ' + current.id + '...', 'info');
          res = await fetch('/api/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gdriveId: current.gdriveId, slotId: current.id, type: type }),
          });
        } else {
          log('No image assigned to ' + current.id, 'error');
          this.disabled = false;
          this.textContent = 'Process';
          return;
        }

        data = await res.json();
        if (data.success) {
          current.localImage = data.filename;
          processedSlots.set(current.id, { filename: data.filename, publicUrl: data.localPath || '' });
          log(current.id + ': ' + data.filename + ' (' + formatBytes(data.optimizedSize) + ', -' + data.savings + '%)', 'success');
        } else {
          log(current.id + ' failed: ' + data.error, 'error');
        }
      } catch (e) {
        log(current.id + ' error: ' + e.message, 'error');
      }

      if (type === 'project') renderProjectSlots();
      else renderGallerySlots();
    });

    // Remove button (gallery only)
    var removeBtn = card.querySelector('.remove-slot-btn');
    if (removeBtn) {
      removeBtn.addEventListener('click', function () {
        config.gallery.splice(index, 1);
        renderGallerySlots();
        log('Removed gallery slot ' + item.id, 'info');
      });
    }

    return card;
  }

  // --- Process All ---
  processAllBtn.addEventListener('click', async function () {
    if (!config) return;

    // Collect items that have uploads assigned
    var uploadItems = [];
    var gdriveItems = [];

    function collectItems(list, type) {
      list.forEach(function (item) {
        if (item._uploadId && uploadPool.has(item._uploadId)) {
          uploadItems.push({ uploadId: item._uploadId, slotId: item.id, type: type });
        } else if (item.gdriveId) {
          gdriveItems.push({ gdriveId: item.gdriveId, slotId: item.id, type: type });
        }
      });
    }

    collectItems(config.projects, 'project');
    collectItems(config.gallery, 'gallery');

    var total = uploadItems.length + gdriveItems.length;
    if (total === 0) {
      log('No images to process', 'error');
      return;
    }

    processAllBtn.disabled = true;
    processAllBtn.textContent = 'Processing...';
    progressContainer.classList.add('active');
    progressFill.style.width = '0%';
    progressText.textContent = '0 / ' + total;

    log('Starting batch: ' + total + ' images...', 'info');
    var completed = 0;

    // Process uploads first (local, fast)
    for (var i = 0; i < uploadItems.length; i++) {
      var item = uploadItems[i];
      try {
        var res = await fetch('/api/process-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        var data = await res.json();
        completed++;
        var pct = Math.round((completed / total) * 100);
        progressFill.style.width = pct + '%';
        progressText.textContent = completed + ' / ' + total;

        if (data.success) {
          // Update config
          var allItems = config.projects.concat(config.gallery);
          var match = allItems.find(function (x) { return x.id === item.slotId; });
          if (match) match.localImage = data.filename;
          processedSlots.set(item.slotId, { filename: data.filename, publicUrl: data.localPath || '' });
          log(item.slotId + ': ' + data.filename + ' (' + formatBytes(data.optimizedSize) + ', -' + data.savings + '%)', 'success');
        } else {
          log(item.slotId + ' failed: ' + data.error, 'error');
        }
      } catch (e) {
        completed++;
        log(item.slotId + ' error: ' + e.message, 'error');
      }
    }

    // Process GDrive items via streaming endpoint
    if (gdriveItems.length > 0) {
      try {
        var res = await fetch('/api/process-all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: gdriveItems }),
        });

        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buffer = '';

        while (true) {
          var result = await reader.read();
          if (result.done) break;

          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop();

          lines.forEach(function (line) {
            if (!line.trim()) return;
            try {
              var msg = JSON.parse(line);
              if (msg.type === 'progress') {
                completed++;
                var pct = Math.round((completed / total) * 100);
                progressFill.style.width = pct + '%';
                progressText.textContent = completed + ' / ' + total;

                if (msg.current.success) {
                  var allItems = config.projects.concat(config.gallery);
                  var match = allItems.find(function (x) { return x.id === msg.current.slotId; });
                  if (match) match.localImage = msg.current.filename;
                  processedSlots.set(msg.current.slotId, {
                    filename: msg.current.filename,
                    publicUrl: msg.current.localPath || msg.current.publicUrl,
                  });
                  log(msg.current.slotId + ': ' + msg.current.filename + ' (' + formatBytes(msg.current.optimizedSize) + ', -' + msg.current.savings + '%)', 'success');
                } else {
                  log(msg.current.slotId + ' failed: ' + msg.current.error, 'error');
                }
              }
            } catch (e) { /* skip */ }
          });
        }
      } catch (e) {
        log('Batch GDrive error: ' + e.message, 'error');
      }
    }

    log('Batch complete: ' + completed + '/' + total, 'success');

    processAllBtn.disabled = false;
    processAllBtn.textContent = 'Process & Save All';
    renderProjectSlots();
    renderGallerySlots();
  });

  // --- Save Config ---
  saveConfigBtn.addEventListener('click', async function () {
    if (!config) return;
    saveConfigBtn.disabled = true;
    saveConfigBtn.textContent = 'Saving...';

    // Clean up internal fields before saving
    var cleanConfig = JSON.parse(JSON.stringify(config));
    cleanConfig.mode = 'local';
    cleanConfig.projects.forEach(function (p) { delete p._uploadId; });
    cleanConfig.gallery.forEach(function (g) { delete g._uploadId; });

    try {
      var res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanConfig),
      });
      var data = await res.json();
      if (data.success) {
        log('Config saved to ' + data.path, 'success');
      } else {
        log('Save failed: ' + data.error, 'error');
      }
    } catch (e) {
      log('Save error: ' + e.message, 'error');
    }

    saveConfigBtn.disabled = false;
    saveConfigBtn.textContent = 'Save Config';
  });

  // --- Add GDrive ID ---
  addGdriveBtn.addEventListener('click', function () {
    var raw = newGdriveIdInput.value.trim();
    if (!raw) return;

    var id = raw;
    var match = raw.match(/[-\w]{25,}/);
    if (match) id = match[0];

    if (allGdriveIds.has(id)) {
      log('ID already in pool: ' + id.substring(0, 16) + '...', 'info');
    } else {
      allGdriveIds.add(id);
      log('Added GDrive ID to pool: ' + id.substring(0, 16) + '...', 'success');
    }

    newGdriveIdInput.value = '';
    renderPool();
  });

  newGdriveIdInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addGdriveBtn.click();
  });

  // --- Add Gallery Slot ---
  addGallerySlotBtn.addEventListener('click', function () {
    var nextNum = config.gallery.length + 1;
    config.gallery.push({
      id: 'gallery-' + nextNum,
      title: '',
      category: '',
      localImage: 'gallery-' + nextNum + '.jpg',
      gdriveId: '',
    });
    renderGallerySlots();
    log('Added gallery slot: gallery-' + nextNum, 'info');
  });

  // --- Helpers ---
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  // --- Init ---
  loadConfig();
})();
