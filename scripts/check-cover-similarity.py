"""Read-only visual similarity audit in addition to the exact SHA256 checks."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
covers = json.loads((root / 'src' / 'guide-covers.json').read_text(encoding='utf-8'))
rows = []
missing = []
for slug, cover in covers.items():
    path = root / 'public' / cover['src'].lstrip('/')
    if not path.is_file():
        missing.append(slug)
        continue
    with Image.open(path) as image:
        pixels = image.convert('L').resize((17, 16), Image.Resampling.LANCZOS).tobytes()
    value = 0
    for y in range(16):
        for x in range(16):
            value = (value << 1) | (pixels[y * 17 + x] > pixels[y * 17 + x + 1])
    rows.append({'slug': slug, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                 'dhash256': f'{value:064x}'})

candidates = []
for i, left in enumerate(rows):
    for right in rows[i + 1:]:
        distance = (int(left['dhash256'], 16) ^ int(right['dhash256'], 16)).bit_count()
        if distance <= 12 or left['sha256'] == right['sha256']:
            candidates.append({'first': left['slug'], 'second': right['slug'],
                               'distance': distance, 'exact': left['sha256'] == right['sha256']})
result = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'images': len(rows),
          'missing': missing, 'method': 'SHA256 and 256-bit horizontal difference hash',
          'candidateThreshold': 12, 'candidates': candidates,
          'note': 'Candidates require direct image inspection; a hash is not a semantic quality review.',
          'hashes': rows}
(root / 'migration' / 'covers' / 'similarity-audit.json').write_text(
    json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'images': len(rows), 'missing': len(missing), 'candidates': candidates}))
