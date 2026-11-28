import {META_PIXEL_ID} from './conversion-config.js';

export function loadMetaPixel(id = META_PIXEL_ID) {
  if (!id || window.fbq) return false;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.append(script);
  const queue = window.fbq = function () { queue.callMethod ? queue.callMethod.apply(queue, arguments) : queue.queue.push(arguments); };
  if (!window._fbq) window._fbq = queue;
  queue.push = queue;
  queue.loaded = true;
  queue.version = '2.0';
  queue.queue = [];
  queue('init', id);
  queue('track', 'PageView');
  return true;
}

export function trackLead(id = META_PIXEL_ID) {
  if (!id) return;
  loadMetaPixel(id);
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
}
