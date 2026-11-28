import {ADS_ID, CONTACT_CONVERSION_LABEL} from './conversion-config.js';
import {trackLead} from './meta-pixel.js';

const key = 'felexia-audience-choice-v1';
const maxAge = 180 * 86400000;
let granted = false;
try {
  const saved = JSON.parse(localStorage.getItem(key));
  granted = Boolean(saved && Date.now() - saved.at < maxAge && saved.value === 'granted');
} catch {}

if (granted) {
  if (CONTACT_CONVERSION_LABEL && typeof window.gtag === 'function') window.gtag('event', 'conversion', {send_to: `${ADS_ID}/${CONTACT_CONVERSION_LABEL}`});
  trackLead();
}
