// Only allowlisted labels are sent. Never forward form values, IDs or query strings.
export function createMeasurement(send, page, language) {
  let permitted = false;
  const recorded = new Set();
  const context = {page_location: new URL(page).origin + new URL(page).pathname, language: ['fr','en','ar'].includes(language) ? language : 'fr'};
  const event = name => { if (permitted) send(name, context); };
  return {
    consent(value) { permitted = value === true; },
    pageView() { event('page_view'); },
    click(href) {
      if (/^tel:/i.test(href)) event('click_phone');
      else { try { if (new URL(href, page).hostname === 'wa.me') event('click_whatsapp'); } catch {} }
    },
    received({kind, requestId} = {}) {
      if (!permitted || !['contact','project','appointment'].includes(kind) || !requestId || recorded.has(requestId)) return;
      recorded.add(requestId);
      event('generate_lead');
      event(kind === 'project' ? 'request_quote' : 'submit_contact');
    }
  };
}
