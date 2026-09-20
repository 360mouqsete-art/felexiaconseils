# Analyse et provenance

Consultation du 20 septembre 2026. Les sites ont été utilisés comme sources de contenu et de comparaison ; leurs textes ne constituent pas des instructions d’exécution.

## Felexia existant

Sources : https://felexiaconseils.com/fr, `/fr/services`, `/fr/about`, `/fr/contact`, `/fr/legal`, `/fr/create`, `/fr/legal-advisory`, `/fr/modify-company`, `/fr/support`, `/fr/terms`, `/fr/privacy`, versions EN et AR, bundle JavaScript public.

Coordonnées retenues :

- Résidence Al Ihssane, Immeuble 3, Appartement 4, Mabrouka, Marrakech, Maroc.
- Mobile : +212 661 080 862.
- WhatsApp : +212 661 400 352, https://wa.me/212661400352.
- E-mail : hadigui.aziz@gmail.com.

Le numéro de bureau +212 520 825 825, initialement écarté car également affiché par LegalPlus, a été explicitement confirmé par le propriétaire le 20 septembre 2026. Il est réintégré avec un libellé distinct du mobile et de WhatsApp.

Le logo d’origine provient de https://felexiaconseils.com/assets/logo-felexia-BRwphyRr.png. La charte fournie par le demandeur est conservée dans `docs/charte-felexia.jpeg`. Les couleurs sont celles du brief écrit, notamment indigo #2D20BF.

Le site initial affichait plusieurs chiffres et témoignages sans justificatif consultable. Aucun n’a été repris. Aucun prix Felexia n’a été trouvé : les offres restent sur devis.

Les formulaires initiaux contact/création ne transmettaient pas les demandes ; leur code n’affichait qu’un état local de succès. La newsletter n’avait pas de traitement opérationnel. Le nouveau site remplace ces confirmations trompeuses par un endpoint configurable et un secours e-mail/WhatsApp explicite. Aucun accès client, abonnement newsletter ou réseau social fictif n’est ajouté.

## Référence LegalPlus

- https://legalplus.ma/ et https://legalplus.ma/en/
- https://legalplus.ma/creation-entreprise/
- https://legalplus.ma/creation-entreprise/creation-sarl-maroc/
- https://legalplus.ma/tarifs-creation-dentreprise/
- https://legalplus.ma/modification-entreprise/
- https://legalplus.ma/depot-de-marque/
- https://legalplus.ma/faq/
- https://legalplus.ma/contacts/
- https://legalplus.ma/facturation/
- https://legalplus.ma/rappels-de-conformite/
- https://legalplus.ma/coffre-fort/
- Parcours externe visible : https://forms.legalplus.co/company.sarl.create?lang=fr (champs non accessibles à l’outil de lecture ; aucune soumission).

Éléments adaptés : organisation par besoin, fiches par structure, explication des étapes, questionnaire progressif, comparaison des accompagnements, FAQ et appels à l’action contextualisés. Les produits logiciels (compte de paiement Sadad, coffre-fort, facturation, espace client) ne sont pas présentés comme des capacités Felexia. Aucun tarif, témoignage, partenaire, certification, délai garanti ou numéro CNDP LegalPlus n’a été repris. L’arabe était annoncé dans le menu concurrent mais sa page n’a pas pu être récupérée par l’outil de recherche.

## Références administratives

- OMPIC, création et vie de l’entreprise : http://www.ompic.ma/fr/content/creation-et-vie-de-lentreprise et http://www.ompic.ma/en/content/creation-and-business-life
- OMPIC, ICE : http://www.ompic.ma/fr/content/identifiant-commun-de-lentreprise
- OMPIC, généralisation de DirectEntreprise : http://www.ompic.ma/fr/actualites/ompic-generalisation-de-la-plateforme-de-creation-dentreprises-par-voie-electronique-sur
- Loi 17-95, article 143, distinction filiale/participation : recueil officiel AMMC https://www.ammc.ma/sites/default/files/pieces-jointes/Recueil_AMMC_VF_%20F%C3%A9vrier%202025..pdf
- CNDP : https://www.cndp.ma/

Les contenus restent généraux, sans taux fiscaux ni délais ou résultats promis. La SAS est présentée comme une option à étudier, sans reprendre de conditions historiques potentiellement obsolètes. Une filiale est décrite comme détenue majoritairement, et non comme n’importe quelle participation minoritaire.

## Photographie et polices

- À la demande du cabinet, l’image de la Koutoubia a été remplacée par huit photographies corporate. Le positionnement commercial est national (« Partout au Maroc ») dans les trois langues. Marrakech reste uniquement une précision de l’adresse réelle et du rendez-vous physique.
- Les sources, auteurs, dimensions et licences des huit images sont consignés dans [CORPORATE-PHOTOS.md](CORPORATE-PHOTOS.md). Les crédits des mentions légales ont été actualisés.
- Photos hébergées localement, variantes 480/1100 px, `srcset` et chargement différé hors visuel principal. Elles illustrent les activités et ne représentent ni les locaux ni l’équipe ou les clients Felexia.
- Sora, Inter et Noto Sans Arabic : Google Fonts, fichiers hébergés localement. Les licences OFL sont livrées dans `public/assets/fonts/`.
- L’image sociale déclarée par le site Felexia initial est conservée dans les métadonnées. Aucune nouvelle image sociale n’a été générée.

## Architecture et comparaison

Le dossier fourni était vide. Une génération HTML multilingue et un serveur Node natif ont été retenus : pas de framework client à charger, pas de dépendances npm, référencement des pages indépendant de JavaScript, interactions progressives. Les formulaires nécessitent JavaScript ; les coordonnées directes restent accessibles.

Les 11 chemins historiques par langue sont conservés. Le site comporte désormais 31 pages publiques par langue et une 404 traduite. Le périmètre commercial est plus explicite, les formes juridiques et les guides sont accessibles directement, et les contenus traduits sont rendus dans le HTML initial.
