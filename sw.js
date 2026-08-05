// Service worker minimal : ne met rien en cache, force systématiquement une
// requête réseau fraîche pour tout ce que chargent les pages. L'objectif
// n'est pas le hors-ligne, mais d'empêcher le navigateur de resservir une
// version périmée après une mise à jour.

self.addEventListener("install", (event) => {
  self.skipWaiting(); // prend effet immédiatement, sans attendre la fermeture des onglets
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim()); // prend le contrôle des pages déjà ouvertes
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request, { cache: "no-store" }).catch(() => fetch(event.request))
  );
});
