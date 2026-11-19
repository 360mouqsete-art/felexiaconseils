const root = document.querySelector('[data-dossier-root]');
if (root) {
  const lang = root.getAttribute('data-dossier-lang') || 'fr';
  const view = root.getAttribute('data-dossier-view');
  const copy = JSON.parse(document.getElementById('fx-dossier-copy').textContent);
  const app = root.querySelector('[data-dossier-app]');
  const feedback = root.querySelector('[data-dossier-feedback]');
  const auth = root.querySelector('[data-dossier-auth]');
  const login = root.querySelector('[data-dossier-login]');
  const text = (value) => (value && typeof value === 'object' ? value[lang] || value.fr || '' : value || '');
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const say = (message) => { feedback.hidden = !message; feedback.textContent = message || ''; };

  async function api(path, options) {
    const response = await fetch(path, {credentials:'same-origin', ...options});
    const body = await response.json().catch(() => ({ok:false, code:'failed'}));
    if (!response.ok || body.ok === false) throw new Error(body.code || 'failed');
    return body;
  }

  function timeline(dossier) {
    return `<ol class="fx-dossier-steps">${dossier.steps.map((step) => `<li class="is-${escape(step.status)}"><span>${escape(text(step.label))}</span><small>${escape(copy.statuses[step.status] || '')}${step.completedOn ? ` · ${escape(step.completedOn)}` : ''}</small></li>`).join('')}</ol>`;
  }

  function clientFile(dossier) {
    const example = dossier.example ? `<p class="fx-dossier-example">${escape(copy.exampleNote)}</p>` : '';
    const requests = (dossier.requests || []).map((item) => `<li><div><strong>${escape(text(item.label))}</strong><small>${escape(copy.statuses[item.status] || '')}</small></div>${dossier.example || !['to_provide','correction'].includes(item.status) ? '' : `<form data-upload data-dossier="${escape(dossier.id)}" data-document="${escape(item.id)}"><input type="file" accept="application/pdf,image/jpeg,image/png" required><button type="submit">${escape(copy.upload)}</button></form>`}</li>`).join('');
    const deliveries = (dossier.deliveries || []).map((item) => `<li><div><strong>${escape(text(item.label))}</strong></div>${dossier.example ? '' : `<button type="button" data-download data-dossier="${escape(dossier.id)}" data-document="${escape(item.id)}">${escape(copy.download)}</button>`}</li>`).join('');
    const notes = (dossier.notes || []).map((note) => `<li><small>${escape(note.at || '')}</small><p>${escape(text(note.text))}</p></li>`).join('');
    return `<article class="fx-dossier-card">${example}<h2>${escape(dossier.reference)} · ${escape(copy.types[dossier.type] || '')}</h2><h3>${escape(copy.steps)}</h3>${timeline(dossier)}<h3>${escape(copy.requests)}</h3><ul class="fx-dossier-list">${requests}</ul><h3>${escape(copy.deliveries)}</h3><ul class="fx-dossier-list">${deliveries}</ul><h3>${escape(copy.notes)}</h3><ul class="fx-dossier-notes">${notes}</ul></article>`;
  }

  function adminDesk(dossiers, live) {
    const options = ['creation','domiciliation','modification'].map((type) => `<option value="${type}">${escape(copy.types[type])}</option>`).join('');
    const review = (dossier, item, status) => `<button type="button" data-review data-dossier="${escape(dossier.id)}" data-document="${escape(item.id)}" data-status="${status}">${escape(copy.statuses[status])}</button>`;
    const cards = dossiers.map((dossier) => `<article class="fx-dossier-card" data-dossier="${escape(dossier.id)}"><h2>${escape(dossier.reference)}</h2><p>${escape(dossier.clientEmail || copy.email)}</p>${timeline(dossier)}<div class="fx-dossier-admin-steps">${(dossier.steps || []).map((step) => `<p><span>${escape(text(step.label))}</span> <button type="button" data-step="${escape(step.id)}" data-dossier="${escape(dossier.id)}" data-status="current">${escape(copy.markCurrent)}</button> <button type="button" data-step="${escape(step.id)}" data-dossier="${escape(dossier.id)}" data-status="done">${escape(copy.markDone)}</button></p>`).join('')}</div><h3>${escape(copy.requests)}</h3><ul class="fx-dossier-list">${(dossier.requests || []).map((item) => `<li><div><strong>${escape(text(item.label))}</strong><small>${escape(copy.statuses[item.status] || '')}</small></div><div class="fx-dossier-actions">${review(dossier, item, 'received')}${review(dossier, item, 'validated')}${review(dossier, item, 'correction')}</div></li>`).join('')}</ul><form class="fx-dossier-card" data-request data-dossier="${escape(dossier.id)}"><label>${escape(copy.piece)}<input name="label" required maxlength="160"></label><button type="submit">${escape(copy.ask)}</button></form><form class="fx-dossier-card" data-note data-dossier="${escape(dossier.id)}"><label>${escape(copy.note)}<textarea name="text" required maxlength="2000"></textarea></label><button type="submit">${escape(copy.publish)}</button></form><form class="fx-dossier-card" data-delivery data-dossier="${escape(dossier.id)}"><label>${escape(copy.deliver)}<input name="label" required maxlength="160"></label><input type="file" name="file" accept="application/pdf,image/jpeg,image/png" required><button type="submit">${escape(copy.deliver)}</button></form></article>`).join('');
    return `${live ? '' : `<p class="fx-dossier-example">${escape(copy.staffOnly)}</p>`}<form class="fx-dossier-card" data-create><label>${escape(copy.email)}<input name="email" type="email" required value="${live ? '' : 'exemple@example.com'}"></label><label>${escape(copy.type)}<select name="type">${options}</select></label><label>${escape(copy.reference)}<input name="reference" maxlength="32"></label><button class="felexia-action" type="submit">${escape(copy.create)}</button></form>${cards}`;
  }

  async function refresh() {
    const state = await api('/api/dossier');
    if (!state.configured) {
      root.querySelector('[data-dossier-unavailable]').hidden = false;
      login.hidden = true;
      return state;
    }
    if (!state.session) return state;
    auth.hidden = true;
    app.hidden = false;
    if (view === 'admin') {
      if (!state.staff) { app.innerHTML = `<p class="fx-dossier-example">${escape(copy.staffOnly)}</p>`; return state; }
      app.innerHTML = `<p><button type="button" data-signout>${escape(copy.signOut)}</button></p>${adminDesk(state.dossiers, true)}`;
    } else {
      const files = state.dossiers.map(clientFile).join('') || `<p>${escape(copy.empty)}</p>`;
      app.innerHTML = `<p><button type="button" data-signout>${escape(copy.signOut)}</button></p><h2>${escape(copy.files)}</h2>${files}`;
    }
    return state;
  }

  function showExample() {
    auth.hidden = true;
    app.hidden = false;
    app.innerHTML = `${view === 'admin' ? adminDesk([{...copy.demo, clientEmail:'exemple@example.com'}], false) : clientFile(copy.demo)}<p><button type="button" data-close-example>${escape(copy.back)}</button></p>`;
  }

  root.addEventListener('click', async (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-dossier-example')) return showExample();
    if (button.hasAttribute('data-close-example')) { app.hidden = true; auth.hidden = false; app.innerHTML = ''; return; }
    if (button.hasAttribute('data-signout')) { await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'sign-out'})}); location.reload(); return; }
    if (button.hasAttribute('data-download')) {
      const result = await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'download', dossierId:button.getAttribute('data-dossier'), documentId:button.getAttribute('data-document')})});
      if (result.url) location.assign(result.url);
      return;
    }
    if (button.hasAttribute('data-review') && !app.querySelector('.fx-dossier-example')) {
      await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'review', dossierId:button.getAttribute('data-dossier'), documentId:button.getAttribute('data-document'), status:button.getAttribute('data-status')})});
      await refresh();
      return;
    }
    if (button.hasAttribute('data-step') && !app.querySelector('.fx-dossier-example')) {
      await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'step', dossierId:button.getAttribute('data-dossier'), stepId:button.getAttribute('data-step'), status:button.getAttribute('data-status'), lang})});
      await refresh();
    }
  });

  root.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    if (app.querySelector('.fx-dossier-example')) return say(copy.staffOnly);
    try {
      if (form.hasAttribute('data-dossier-login')) {
        await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'request-link', email:new FormData(form).get('email'), lang})});
        say(copy.sent);
        return;
      }
      const selected = form.getAttribute('data-dossier');
      if (form.hasAttribute('data-create')) {
        const data = new FormData(form);
        await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'create', email:data.get('email'), type:data.get('type'), reference:data.get('reference'), lang})});
      } else if (form.hasAttribute('data-request')) {
        await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'request', dossierId:selected, label:new FormData(form).get('label')})});
      } else if (form.hasAttribute('data-note')) {
        await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'note', dossierId:selected, text:new FormData(form).get('text')})});
      } else if (form.hasAttribute('data-upload') || form.hasAttribute('data-delivery')) {
        const file = form.querySelector('input[type="file"]').files[0];
        if (!file) return;
        const slot = await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:form.hasAttribute('data-delivery') ? 'delivery-slot' : 'upload-slot', dossierId:selected, documentId:form.getAttribute('data-document'), label:new FormData(form).get('label'), filename:file.name, mime:file.type, size:file.size})});
        const uploaded = await fetch(slot.uploadUrl, {method:'PUT', headers:{'Content-Type':file.type, 'x-upsert':'false'}, body:file});
        if (!uploaded.ok) throw new Error('failed');
        await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'confirm-upload', dossierId:selected, documentId:form.getAttribute('data-document') || slot.documentId, path:slot.path, filename:file.name, mime:file.type, size:file.size})});
      }
      await refresh();
    } catch (error) {
      say(copy.unavailable);
    }
  });

  const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
  const accessToken = hash.get('access_token');
  if (accessToken) history.replaceState(null, '', location.pathname + location.search);
  if (location.hash === '#exemple' || location.hash === '#cabinet') showExample();
  refresh().then(async (state) => {
    if (accessToken && state?.configured && !state.session) {
      await api('/api/dossier', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'establish', accessToken})});
      await refresh();
    }
  }).catch(() => say(copy.unavailable));
}
