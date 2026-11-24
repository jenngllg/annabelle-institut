# Institut Anna'Belle

Site de l'institut Anna'Belle (Colmar) : https://annabelle-institut.com

HTML, CSS et JavaScript statiques, sans framework ni dépendance npm. Seul Node (12 ou plus) est nécessaire pour assembler les pages.

## Arborescence

```
src/
  layout.html         gabarit commun : <head>, en-tête, menu, pied de page
  pages/<page>.html   contenu de chaque page (home.html = accueil)
  seo-routes.json     URL, titre et description de chaque page (sitemap inclus)
  css/style.css       toute la mise en forme
  js/main.js          menu et plan Google Maps au clic (le site marche sans JS)
  assets/             images, icônes (icons.svg), polices Roboto
scripts/
  build.js            assemble src/ dans dist/
  serve-dist.js       serveur local qui se comporte comme GitHub Pages
  fetch-instagram.js  récupère les derniers posts Instagram (galerie « Réalisations »)
```

## Travailler en local

```sh
npm start        # build puis http://localhost:8765
npm run build    # build seul, dans dist/
```

Pour modifier un tarif ou un texte : éditer `src/pages/<page>.html`, puis relancer `npm start`.
Pour ajouter une page : créer `src/pages/<url>.html`, l'ajouter dans `src/seo-routes.json` et dans le menu de `src/layout.html`.

La galerie Instagram a besoin du secret `INSTAGRAM_TOKEN` (et de la variable `INSTAGRAM_USER_ID`). Sans eux, la page « Réalisations » affiche simplement un lien vers le compte Instagram.

## QR code « Scannez moi » (ne pas casser)

Le QR code imprimé pour les clientes (`src/assets/images/qrcode.jpg`, aussi publié à https://annabelle-institut.com/assets/images/qrcode.jpg) ouvre **http://annabelle-institut.com/flyer** : la page `src/pages/flyer.html`, qui affiche toutes les prestations les unes sous les autres.

- Ne jamais supprimer ni renommer la page `flyer` (route `flyer` dans `src/seo-routes.json`) : les QR codes déjà imprimés ne fonctionneraient plus.
- Ne pas supprimer ni déplacer `qrcode.jpg`.
- Pour ajouter une rubrique au flyer, ajouter une ligne `<!-- build: include <page> -->` dans `src/pages/flyer.html`.

## Mise en ligne

Chaque push sur `master` (et chaque matin, pour rafraîchir Instagram) lance `.github/workflows/deploy.yml` : récupération Instagram, `node scripts/build.js`, puis publication de `dist/` sur la branche `gh-pages`, servie par GitHub Pages avec le domaine `annabelle-institut.com`.

Si Instagram ne répond pas (jeton expiré ou révoqué), la galerie déjà en ligne est conservée, le site est quand même publié, et l'exécution est marquée en échec : GitHub envoie alors un e-mail. Il suffit de renouveler le secret `INSTAGRAM_TOKEN`.

GitHub coupe les tâches planifiées d'un dépôt public après 60 jours sans activité : la dernière étape du workflow réactive la planification à chaque exécution pour éviter cette coupure. En cas de doute, l'onglet Actions indique si le workflow est actif, et le bouton « Run workflow » le relance à la main.
