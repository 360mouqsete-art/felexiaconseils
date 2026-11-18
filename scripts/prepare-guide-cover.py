"""Create the explicitly requested local, responsive WebP versions of a cover."""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('source')
parser.add_argument('slug')
args = parser.parse_args()
if not args.slug or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in args.slug):
    raise ValueError('Invalid guide slug')
root = Path(__file__).resolve().parents[1]
destination = root / 'public' / 'images' / 'guides'
destination.mkdir(parents=True, exist_ok=True)
image = ImageOps.exif_transpose(Image.open(args.source)).convert('RGB')
result = {'slug': args.slug, 'original': str(Path(args.source).resolve()), 'files': []}
for width, suffix in [(1280, ''), (640, '-640')]:
    height = width * 5 // 8
    resized = ImageOps.fit(image, (width, height), method=Image.Resampling.LANCZOS)
    target = destination / f'{args.slug}{suffix}.webp'
    resized.save(target, 'WEBP', quality=88, method=6)
    result['files'].append({'src': '/images/guides/' + target.name, 'width': width,
                            'height': height, 'bytes': target.stat().st_size,
                            'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
journal = root / 'migration' / 'covers' / 'completed'
journal.mkdir(parents=True, exist_ok=True)
(journal / f'{args.slug}.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(result))
