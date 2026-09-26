const CACHE_NAME = 'egbe-idimu-hub-v1';
const urlsToCache = [
  '/idimu-citizen-hub/',
  '/idimu-citizen-hub/index.html',
  '/idimu-citizen-hub/styles.css',
  '/idimu-citizen-hub/script.js',
  '/idimu-citizen-hub/images/logo.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/idimu-citizen-hub/index.html'))
  );
});
