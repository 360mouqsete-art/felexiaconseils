import {createMeasurement} from './measurement-core.js';
import {loadMetaPixel, trackLead} from './meta-pixel.js';
const root = document.querySelector('[data-analytics-consent]');
if (root) {
  const key = 'felexia-audience-choice-v1';
  const maxAge = 180 * 86400000;
  let choice = null, loaded = false;
  try { const saved = JSON.parse(localStorage.getItem(key)); if (saved && Date.now() - saved.at < maxAge && ['granted','denied'].includes(saved.value)) choice = saved.value; } catch {}
  const collect = location.hostname === 'www.felexiaconseils.com' || location.hostname.endsWith('.vercel.app') || location.hostname === '127.0.0.1' || location.hostname === 'localhost';
  const measurement = createMeasurement((name, params) => {
    if (collect && typeof window.gtag === 'function') window.gtag('event', name, params);
  }, location.href, document.documentElement.lang);
  function grant() {
    measurement.consent(true);
    if (typeof window.gtag === 'function') window.gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    loadMetaPixel();
    if (/\/merci\/?$/.test(location.pathname)) trackLead();
    if (loaded) return;
    loaded = true;
    if (collect) measurement.pageView();
  }
  function deny() {
    measurement.consent(false);
    if (typeof window.gtag === 'function') window.gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
    clearCookies();
  }
  function clearCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim(); if (!/^_ga(?:_|$)|^_gcl_/.test(name)) continue;
      for (const domain of ['',location.hostname,'.felexiaconseils.com']) document.cookie = name+'=; Max-Age=0; Path=/'+(domain?'; Domain='+domain:'')+'; SameSite=Lax; Secure';
    }
  }
  root.querySelectorAll('[data-audience-choice]').forEach(button => button.addEventListener('click',()=>{
    choice = button.dataset.audienceChoice;
    try {localStorage.setItem(key,JSON.stringify({value:choice,at:Date.now()}));} catch {}
    root.hidden = true;
    if (choice === 'granted') grant();
    else {
      const hadGrant = loaded;
      deny();
      if (hadGrant && collect) location.reload();
    }
    document.querySelector('[data-audience-settings]')?.focus({preventScroll:true});
  }));
  document.querySelectorAll('[data-audience-settings]').forEach(button=>button.addEventListener('click',()=>{root.hidden=false;root.querySelector('button').focus({preventScroll:true});}));
  document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]'); if(link)measurement.click(link.href);});
  document.addEventListener('felexia:request-received',event=>measurement.received(event.detail));
  // Changes in another tab also revoke collection in this tab.
  window.addEventListener('storage',event=>{if(event.key===key)location.reload();});
  if(choice==='granted')grant();
  else deny();
  root.hidden=choice!==null;
}
