# Mesurer le SEO et les demandes qualifiées

## État réel

Google Analytics 4 créé après autorisation des conditions par le propriétaire : compte 409106729, propriété 555480986, flux 15827411869, ID public G-5CTT86CCQ2. Fuseau Maroc et MAD ; partages facultatifs et mesures améliorées automatiques désactivés. Le site charge GA uniquement après consentement explicite, avec refus aussi visible, retrait dans le pied de page et textes FR/EN/AR. Aucun script Google avant consentement ; collecte limitée au domaine www de production. Les formulaires transmettent toujours leurs données au serveur du cabinet, jamais à Analytics. Seul generate_lead doit être considéré comme conversion principale ; submit_contact et request_quote sont des diagnostics de réception, les clics restent distincts. La vérification de réception réelle Analytics est consignée dans la recette de publication.

## Tableau de bord mensuel

| KPI | Source | Lecture |
|---|---|---|
| Clics Google organiques et impressions | Search Console | Par URL, pays, appareil et requête |
| CTR | Search Console | Clics / impressions, comparer une intention similaire |
| Position moyenne | Search Console | Indicateur agrégé, pas une position fixe garantie |
| Requêtes non brandées | Search Console | Exclure Felexia, variantes orthographiques et domaine |
| Devis/formulaires reçus | Stockage existant + qualification du cabinet | Dédoublonner sur request_id, exclure tests et spam |
| Clics WhatsApp / téléphone | GA4, uniquement après accord | Microconversions seulement : un clic n’est ni un contact confirmé ni une vente |
| Conversions organiques | GA4 + confirmation serveur | Attribution limitée aux visites consenties ; aucune hausse revendiquée sans historique |
| Leads qualifiés et ventes | Suivi du cabinet | À distinguer des demandes brutes |

## Contrat d’événements implémenté avec un seul collecteur

| Événement | Déclencheur exact | Dédoublonnage |
|---|---|---|
| `generate_lead` | Seulement après réponse HTTP réussie ET `result.ok === true` dans `public/app.js` | Une fois par demande logique ; jamais au clic Envoyer, ni lors d’une erreur/retry |
| `submit_contact` | Facultatif pour diagnostic ; même confirmation, type contact | Ne pas le marquer aussi comme conversion si generate_lead est déjà la conversion |
| `request_quote` | Réception confirmée par le serveur du formulaire projet | Diagnostic ; ne pas compter aussi comme conversion principale |
| `click_whatsapp` | Activation du lien `https://wa.me/212661400352` | Un écouteur délégué, pas un par parent et enfant |
| `click_phone` | Activation d’un lien tel: | Un seul événement par activation |

Paramètres admis : type de formulaire, langue et chemin de page sans query. Ne jamais transmettre email, nom, téléphone, message, documents ou contenu de champ à Google Analytics. Ne pas mettre de données personnelles dans les URL ou événements. Ne pas déduire de consentement analytics du consentement au traitement d’une demande.

## Recette et suivi

Réception réelle des événements de visite vérifiée dans le rapport temps réel. Absence du script Google avant accord et après retrait vérifiée dans le navigateur de production. La logique de confirmation serveur, de refus, de dédoublonnage et d’exclusion des candidatures est testée localement ; aucun faux prospect envoyé en production. generate_lead enregistré dans GA4 comme événement clé, une fois par événement, sans valeur monétaire par défaut. Les événements préinstallés Google ne sont pas émis par ce site. L’aperçu localhost/Vercel ne collecte rien ; le test initial en production reste une visite de recette dans les statistiques.

## Cadence

Point zéro avant publication, contrôle technique à J+2/J+7, comparaison 28 jours à J+30. Annoter la date de publication réelle, et non la date de rédaction de ce plan. Sans historique ni accès Search Console, aucune hausse de trafic ne peut être annoncée.
