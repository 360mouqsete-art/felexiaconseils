# Recovery of production source — dpl_3kuVdJZhPtMpQxfanP3fwgruKXXL

Deployment: CLI upload, 29 Oct 2026, 08:47:15 Africa/Casablanca.
Project root in this folder (the Vercel file tree prefixes source with `src/`; that prefix was stripped).

## Counts

- Files in the Vercel deployment tree: 1039
- Listed with path+SHA-1 UID: 452 (587 image files omitted by `list_deployment_files`, no names/UIDs)
- Excluded from the target tree: 6 `out/` build lambdas, 2 `supabase/.temp/*` (skipped on purpose)
- Listed source files in scope: 444
- Recovered and SHA-1 verified against the deployment UID: 383
- Listed source files still missing: 61 (see below)
- Additional public files recovered from the live site or GitHub without a deployment UID: 598
- Files on disk in this tree (excluding `_recovery` / status): 981

This is not a complete, UID-verified copy of the production source.

## Methods that worked

1. For CLI uploads, each file UID is the SHA-1 of the file bytes. Unchanged files were copied from the public GitHub repo `360mouqsete-art/felexiaconseils` when SHA-1 matched the UID.
2. Static files under `public/` were downloaded from https://www.felexiaconseils.com and kept when SHA-1 matched the UID.
3. Small server-only files (under ~1500 bytes) were fetched with MCP `get_deployment_file_contents` on `user-Vercel--conseils` and kept only after SHA-1 verification.
4. Further images were collected by crawling the 507 sitemap URLs on the live site. These have no UID (the API omitted those directories) and are not SHA-verified against the deployment. Some `*-640.webp` variants may be generated assets rather than original source files.

## Methods that did not work

- `get_deployment_file_contents` / `list_deployment_files` have no offset, range, or pagination parameters.
- `write_to_file=true` on CallDynamicTool still truncates large base64 bodies at about 1500 decoded bytes, so SHA-1 never matches for large files.
- A Vercel Sandbox cannot be initialized from a deployment id, and it does not receive an API credential unless a token is injected. No token was created.
- `web_fetch_vercel_url` was not used: it would create a share link on the deployment.

## Missing listed files (61)

- vercel.json, package-lock.json, server.mjs, scripts/build.mjs
- scripts/check.mjs, check-http.mjs, check-guides-data.mjs, check-guides-migration.mjs, check-cover-similarity.py, prepare-intelligence-reserve.mjs
- src/editorial.mjs, forms.mjs, pages.mjs, seo.mjs, templates.mjs, guides-site.mjs
- src/guide-covers.json, guide-images-curated.json, guides-imported.json, guides-ministry.json
- src/intelligence/{config,engine,http,providers,quality,render,research,runtime,store}.mjs
- src/intelligence/reserve.json, reserve-a.json, reserve-b.json, reserve-supplement.json
- supabase/migrations/20261012075219_felexia_intelligence_state.sql
- supabase/migrations/20261012082004_felexia_intelligence_scheduler.sql
- GUIDES_MIGRATION_REPORT.md and 11 docs (INTELLIGENCE-*, RECETTE.md, SOURCES.md, ACCUEIL-MYLEGAL.md, SEARCH-CONSOLE-*, MINISTERE-PLF2027-*)
- 14 test files

Without `scripts/build.mjs`, `vercel.json`, and the Intelligence / page generators, this tree is not sufficient to rebuild or redeploy the site.
