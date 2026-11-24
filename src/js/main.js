// Institut Anna'Belle - le site fonctionne sans JavaScript ; ce script n'ajoute que du confort.
(function () {
  'use strict';

  // Menu : se referme au clic à l'extérieur ou avec la touche Échap.
  var menu = document.querySelector('.menu');
  if (menu) {
    document.addEventListener('click', function (event) {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    // Ouvre la rubrique « Prestations » quand on est sur une page de prestation.
    var current = menu.querySelector('.submenu a[href="' + location.pathname.replace(/\/$/, '') + '"]');
    if (current) {
      current.closest('details').open = true;
      current.setAttribute('aria-current', 'page');
    }
  }

  // Plan Google Maps : chargé seulement après un clic (aucun contenu Google avant).
  document.querySelectorAll('[data-map-src]').forEach(function (map) {
    var button = map.querySelector('[data-map-show]');
    if (!button) {
      return;
    }
    button.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = map.getAttribute('data-map-src');
      iframe.title = "Plan d'accès à l'institut Anna'Belle, 10 rue Vauban à Colmar";
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      map.replaceChildren(iframe);
    });
  });
})();
