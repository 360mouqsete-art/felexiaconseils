window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };
window.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
try {
  const saved = JSON.parse(localStorage.getItem('felexia-audience-choice-v1'));
  if (saved && Date.now() - saved.at < 180 * 86400000 && saved.value === 'granted') {
    window.gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
  }
} catch { /* The default denial still applies when storage is unavailable. */ }
window.gtag('js', new Date());
window.gtag('config', 'G-5CTT86CCQ2', {send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false, cookie_expires:15552000});
window.gtag('config', 'AW-18492364232');
