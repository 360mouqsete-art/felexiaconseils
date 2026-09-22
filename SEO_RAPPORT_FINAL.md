# Rapport de réalisation SEO — Felexia Conseils

Révision du 22 septembre 2026, publiée dans la nuit du 22 au 23 septembre. Site : https://www.felexiaconseils.com/fr/creation-entreprise/. Commits applicatifs `63de37c` et `e2a3257` poussés sur main, déploiements Vercel production READY. Voir [la recette de publication](docs/PUBLICATION-SEO.md).

## 1. Analyse initiale

Générateur statique Node.js/Cheerio, routes explicites en FR/EN/AR, modèle partagé et RTL arabe. Formulaires JavaScript vers `/api/contact`, intégration serveur de stockage existante. Pas de Next.js ni de migration nécessaire. Dépôt initial propre.

## 2. Problèmes trouvés

Canonical sans www contradictoire avec la redirection Vercel ; sitemap incluant formulaires techniques et aliases légaux ; données structurées limitées à l’entreprise ; H1 commercial peu explicite ; guides trop proches du discours commercial ; dimensions d’images génériques et fichiers PNG/JPEG lourds. Certaines affirmations fiscales héritées restent à faire valider, détaillées dans [l’audit](SEO_AUDIT_FELEXIA.md).

## 3. Modifications réalisées

Optimisations éditoriales dans les trois langues, sans changement d’identité graphique. Canonical centralisé, données structurées générées sur le contenu final, breadcrumbs, images optimisées, sitemap filtré et régression du formulaire www corrigée. Trois packs commerciaux et coordonnées conservés.

## 4. Pages optimisées

Accueil, `/fr/creation-entreprise/`, `/fr/tarif/creation/`, `/fr/contact/`, et guides `creation-entreprise`, `creation-entreprise-en-ligne`, `creer-une-sarl-maroc`, `mre-etranger`. Mêmes évolutions sur leurs équivalents EN/AR. Améliorations techniques transversales sur les 171 pages linguistiques.

## 5. Nouveaux contenus créés

Documents à préparer, choix SARL/SARL AU, limites de la distance, facteurs de coût et de délai, implantation depuis l’étranger, suivi après création. Quatre guides réécrits selon des intentions différentes, FAQ conservées sous forme native, section Contact Marrakech utile. Aucune nouvelle URL quasi dupliquée.

## 6. Metadata modifiées

Title commercial : **Créer une entreprise au Maroc en ligne | Felexia Conseils**. H1 : **Créer une entreprise au Maroc en ligne, avec un cabinet à vos côtés**. Titres/descriptions spécifiques pour les guides, tarifs et contact ; Open Graph et Twitter cohérents et images absolues. Un seul ensemble de balises par page.

## 7. Maillage interne ajouté

Accueil → création/tarifs/guides/SARL/MRE. Création → guides, tarifs, fiscalité, domiciliation et formes juridiques. Guides → commerciale et ressources complémentaires. Tarifs/Contact → création et demande d’accompagnement. Les anciens fragments des guides sont conservés et orientés vers des sections adaptées.

## 8. Données structurées

Un seul graphe JSON-LD remplace le bloc précédent : Organization/ProfessionalService, WebSite, WebPage, BreadcrumbList et Article sur les guides. Breadcrumbs identiques au contenu visible, adresse réelle, aucune note, aucun avis ni prix fictif. Aucune promesse de résultat enrichi FAQ. Contrôles structurels locaux réussis ; le test en direct Search Console de la page création détecte un fil d’Ariane valide.

## 9. Sitemap / robots / canonical / hreflang

Domaine vérifié : **https://www.felexiaconseils.com**. L’apex redirige déjà vers www ; aucune modification DNS. Sitemap unique de **150 URLs indexables**, noindex sur formulaires techniques/404, canonical des aliases légaux vers les pages principales, alternates FR/EN/AR réciproques et x-default FR. Lastmod éditorial fixe pour les huit pages réellement révisées et leurs traductions.

## 10. Performance

23 dérivés WebP, originaux conservés, **3 485 620 octets économisés** sur les fichiers concernés ; dimensions réelles et lazy loading des images secondaires. Brotli/gzip validés. PageSpeed mobile du 23 septembre à 00:03 : **100 performance, 100 accessibilité, 100 bonnes pratiques, 100 SEO**, LCP 1,5 s, CLS 0, TBT 0 ms. Mesure de laboratoire sur la page création, pas une preuve de Core Web Vitals terrain ; aucune donnée CrUX disponible.

## 11. SEO local

Contact enrichi pour Marrakech, adresse Mabrouka exacte, accueil sur rendez-vous et service national conservés. Pas de fausse présence locale ni de nouvelle landing page artificielle. La fiche Google suggérée appartient à une autre entreprise : reprise interrompue, assistance contactée pour retirer l’association non validée sans modifier le contenu public. La fiche propre à Felexia reste à finaliser après résolution.

## 12. Tracking

GA4 créé et connecté après autorisation, avec consentement explicite FR/EN/AR et retrait dans le pied de page. Réception de page_view, first_visit et session_start observée en temps réel. generate_lead enregistré comme événement clé, sans montant fictif, uniquement après confirmation serveur. Aucun contenu de formulaire envoyé à Analytics. Voir [le suivi](SEO_TRACKING_PLAN.md).

## 13. Fichiers créés ou modifiés

Contenus et moteur : `src/seo-content.mjs`, `src/seo.mjs`, `src/site-origin.mjs`, `src/content.mjs`, `src/mylegal-site.mjs`. Images/styles : `src/image-dimensions.json`, `src/image-optimized.json`, `public/assets/optimized/`, `public/seo.css`, `scripts/prepare-seo-images.mjs`. Build/tests : `scripts/build.mjs`, `scripts/check*.mjs`, `tests/seo.test.mjs`, tests contact/déploiement, `src/contact-api.mjs`, `.env.example`, README.

Documents : [audit](SEO_AUDIT_FELEXIA.md), [carte mots-clés](SEO_KEYWORD_MAP.md), [Search Console](SEO_GOOGLE_SEARCH_CONSOLE_SETUP.md), [backlinks](SEO_BACKLINK_PLAN.md), [mesure](SEO_TRACKING_PLAN.md), [recette](docs/RECETTE-SEO.md).

## 14. Résultat du build

Build réussi : **172 entrées**. **48 tests réussis**. **171 routes**, **12 840 liens/ressources**, **894 occurrences d’images** et **33 anciennes URLs** vérifiés. Pas de lint/typecheck configuré dans la stack. Contrôle navigateur à 375/820/1440 px sur cinq pages prioritaires, RTL/jour-nuit/FAQ/sommaires et parcours jusqu’au récapitulatif vérifiés. Tests API avec stockage simulé ; aucun prospect réel envoyé. Les 150 URLs du sitemap répondent 200 en production avec canonical cohérent et un H1.

## 15. Actions externes que vous devez réaliser manuellement

Publication, propriété Search Console par préfixe URL, sitemap et Analytics réalisés. La propriété Domaine par DNS reste non validée ; aucune modification DNS effectuée. La demande d’indexation manuelle rencontre une erreur Google, malgré un test en direct indexable. Attendre la résolution de l’association Business Profile erronée avant de finaliser la fiche Felexia. Faire valider les informations légales manquantes et les affirmations fiscales résiduelles de l’audit. Aucun secret versionné.

## 16. Priorités des 30 prochains jours

- J1–J3 : revue éditoriale/juridique des réserves, publication, contrôle des pages et formulaires publics.
- Semaine 1 : Search Console, sitemap, fiche locale, point zéro des indicateurs.
- Semaine 2 : relire les articles hérités restants, observer l’indexation et les performances mobiles.
- Semaines 3–4 : premiers contacts partenariaux réels par le cabinet ; comparer les périodes disponibles, travailler les pages à impressions fortes/CTR faible, qualifier les demandes reçues.

| Action | Statut | Impact SEO | Fichier/URL | Action suivante |
|---|---|---|---|---|
| Page commerciale principale | DONE | Pertinence et conversion | `/fr/creation-entreprise/` | Suivre les résultats |
| Quatre guides et traductions | DONE | Intentions distinctes et maillage | `src/seo-content.mjs` | Suivre indexation |
| Canonical et sitemap | DONE | Cohérence d’exploration | `src/site-origin.mjs`, `scripts/build.mjs` | Sitemap accepté, suivre l’indexation |
| Schema et breadcrumbs | DONE | Compréhension des pages | `src/seo.mjs` | Test Google réussi sur la page création |
| Images et responsive | DONE | Poids et stabilité | `public/assets/optimized/` | Mesurer CWV terrain |
| Formulaires | DONE | Conservation des conversions | `tests/`, `src/contact-api.mjs` | Recette publique après déploiement |
| CWV réels | À VÉRIFIER | Expérience utilisateur | Search Console / PageSpeed | Mesure en production |
| Assertions fiscales héritées | À VÉRIFIER | Fiabilité éditoriale | `SEO_AUDIT_FELEXIA.md` | Relecture compétente et sources actuelles |
| Nouvelle page locale Marrakech | NON NÉCESSAIRE | Évite une duplication | `/fr/contact/` | Exploiter la page enrichie |
| Publication et GSC | DONE | Mise en ligne et visibilité | GitHub/Vercel, Google | Suivre l’indexation effective |
| Google Business Profile | ASSISTANCE EN COURS | Identité locale correcte | Google | Retirer l’association erronée puis finaliser Felexia |
| Analytics | DONE | Mesure avec consentement | Plan tracking | Qualifier les véritables demandes reçues |
| Partenariats | ACTION CABINET | Autorité | Plan backlinks | Mobiliser les relations réelles, sans faux liens |
