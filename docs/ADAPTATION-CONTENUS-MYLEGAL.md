# Adaptation commerciale pour Felexia Conseils

Le module `src/reference-content.mjs` conserve la structure des pages de référence et adapte les informations qui ne peuvent pas être présentées comme des engagements vérifiés de Felexia.

- Les cartes tarifaires restent comparables, mais affichent **Sur devis**. Les acomptes, mensualités, promotions, économies et services automatiquement offerts du site source sont remplacés par des modalités à préciser dans la proposition du cabinet.
- Les garanties de remboursement ou d'absence de rejet, les délais fixes et les réponses en moins d'une heure ne sont pas repris.
- La signature électronique, le suivi en temps réel, le compte logiciel et les démarches intégralement à distance deviennent un parcours de préparation et d'échanges avec le cabinet. Les signatures et présences éventuellement requises dépendent du dossier.
- Les statistiques de clients, la note Google, les témoignages et la comparaison avec les cabinets traditionnels ne sont pas attribués à Felexia.
- Le carrousel conserve les organismes administratifs utiles aux démarches ; les marques commerciales privées et le terme « partenaires » sont retirés. Les logos de paiement ne sont pas présentés comme une intégration active.
- La domiciliation est proposée comme un besoin à étudier selon l'activité, la ville souhaitée et les modalités du contrat. Les listes de villes indiquent des projets possibles, sans suggérer l'existence de bureaux Felexia dans ces villes.
- Le contact ne reprend pas les horaires non confirmés du site source. La page recrutement présente uniquement une candidature spontanée, sans inventer de postes ouverts.
- Les guides gardent leurs explications et leur structure. Seuls les paragraphes qui font la promotion de capacités propres au site source sont adaptés au cabinet. Les informations juridiques et fiscales issues des guides ne constituent pas une nouvelle validation réglementaire de ces articles.
- Les titres et descriptions des pages principales sont adaptés pour ne pas annoncer les prix ou fonctionnalités logiciels du site source.

Le générateur principal prend séparément en charge les véritables coordonnées, le logo, les liens internes, les formulaires et les pages légales propres à Felexia.

Contrôles du module : les 27 captures peuvent être traitées sans erreur et conservent un titre et un H1. Les deux pages tarifaires conservent respectivement trois et deux cartes « Sur devis », sans montants, acomptes ou promesse de paiement bancaire du site source.

## Nouveaux visuels Felexia

Deux scènes originales à caractère marocain ont été générées avec `image_gen`, à partir du véritable fichier de marque `public/assets/logo-original.png` utilisé comme référence :

- `public/mylegal/images/brand/felexia-office.webp` : intérieur de bureau avec l’identité Felexia Conseils.
- `public/mylegal/images/brand/felexia-exterior-sans-enseigne.webp` : façade professionnelle sans logo, texte ni enseigne, conformément à la dernière demande.

Les deux fichiers sont optimisés au format **WebP, 1280 × 853 pixels** ; leur format et leurs dimensions ont été vérifiés. Le logo authentique Felexia sert de référence aux enseignes, et l’interface conserve son fichier PNG original sans recomposition.

Ces visuels remplacent les anciens bureaux marqués MYLEGAL, le bureau neutralisé et la façade portant l’enseigne **Oasis Offices Latitudes**, dans les pages, les cartes de guides et les onglets interactifs. Les anciennes images ne doivent plus être utilisées par les pages publiées ou leurs scripts actifs.

Il s’agit de **scènes marocaines d’illustration générées**, et non de photographies attestant les locaux réels du cabinet. Leurs descriptions et légendes doivent conserver cette distinction ; elles ne modifient pas l’adresse de contact communiquée par Felexia.

Retouche finale de la façade avec l’outil intégré `image_gen` : suppression complète du panneau, du logo et du texte au-dessus de l’entrée, remplacés par une pierre claire continue. Le bureau intérieur conserve son logo Felexia.

Prompt de retouche exécuté :

> Use case: precise-object-edit. Edit target: the attached exterior architectural photograph. Remove the entire dark rectangular FELEXIA CONSEILS sign above the central arched doorway, including ALL logo symbols and ALL text. Reconstruct a seamless natural warm ivory limestone facade in that area, consistent with adjacent stone wall surfaces, realistic stone joints, shadows and architectural perspective. There should be no signboard remaining and no visible text or logo anywhere on the building. Preserve the exact building, windows, Moroccan geometric screens, arched entrance, palms, plants, street, sunlight, framing and camera angle. Change only the sign area. Keep landscape 3:2 and photographic quality. No new objects, no watermark, no lettering.
