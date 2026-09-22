import {createMeasurement} from './measurement-core.js';
const root = document.querySelector('[data-analytics-consent]');
if (root) {
  const id = root.dataset.measurementId;
  const key = 'felexia-audience-choice-v1';
  const maxAge = 180 * 86400000;
  let choice = null, loaded = false;
  try { const saved = JSON.parse(localStorage.getItem(key)); if (saved && Date.now() - saved.at < maxAge && ['granted','denied'].includes(saved.value)) choice = saved.value; } catch {}
  const production = location.hostname === 'www.felexiaconseils.com';
  const measurement = createMeasurement((name, params) => {
    if (production && loaded) window.gtag('event', name, params);
  }, location.href, document.documentElement.lang);
  function enable() {
    measurement.consent(true);
    if (loaded) return;
    loaded = true;
    if (!production) return;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());
    let referrer = ''; try { referrer = new URL(document.referrer).origin; } catch {}
    window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,page_location:location.origin+location.pathname,page_referrer:referrer});
    const script = document.createElement('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id='+id; document.head.append(script);
    measurement.pageView();
  }
  function clearCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim(); if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['',location.hostname,'.felexiaconseils.com']) document.cookie = name+'=; Max-Age=0; Path=/'+(domain?'; Domain='+domain:'')+'; SameSite=Lax; Secure';
    }
  }
  root.querySelectorAll('[data-audience-choice]').forEach(button => button.addEventListener('click',()=>{
    choice = button.dataset.audienceChoice;
    try {localStorage.setItem(key,JSON.stringify({value:choice,at:Date.now()}));} catch {}
    root.hidden = true;
    if (choice === 'granted') enable();
    else {
      measurement.consent(false); window['ga-disable-'+id] = true; clearCookies();
      // Reload unloads the third-party library and its listeners immediately.
      if (loaded && production) location.reload();
    }
    document.querySelector('[data-audience-settings]')?.focus({preventScroll:true});
  }));
  document.querySelectorAll('[data-audience-settings]').forEach(button=>button.addEventListener('click',()=>{root.hidden=false;root.querySelector('button').focus({preventScroll:true});}));
  document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]'); if(link)measurement.click(link.href);});
  document.addEventListener('felexia:request-received',event=>measurement.received(event.detail));
  // Changes in another tab also revoke collection in this tab.
  window.addEventListener('storage',event=>{if(event.key===key)location.reload();});
  if(choice==='granted')enable();
  else {window['ga-disable-'+id]=true;clearCookies();}
  root.hidden=choice!==null;
}
