import manifest from '../guide-images-curated.json' with {type:'json'};

/** Display curated artwork for the known placeholder, without changing editorial state. */
export function resolveCuratedCover(topic, language, entries = manifest.entries) {
  const entry = entries?.[topic?.id];
  const current = topic?.image;
  if (!entry?.image || !current || ![entry.image.src, ...(entry.legacySources || [])].includes(current.src)) return null;
  return {...entry.image, alt:entry.alt?.[language] || topic.translations?.[language]?.alt || topic.translations?.[language]?.title || ''};
}

export {manifest as curatedCoverManifest};
