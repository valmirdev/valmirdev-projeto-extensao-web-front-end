const CACHE_NAME = "extensao-cache-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./main.js",
  "./manifest.webmanifest",
  "https://cdn.tailwindcss.com",
  "https://unpkg.com/vue@3/dist/vue.global.prod.js",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined))
        )
      )
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
