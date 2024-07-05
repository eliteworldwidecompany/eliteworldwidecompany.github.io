self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/map.html',
        '/bitcoin.html',
        '/blog.html',
        '/css/styles.css',
        '/css/map.css',
        '/css/style-bitcoin.css',
        '/app.js',
        '/js/bitcoin.js',
        '/js/popup.js',
        '/js/script.js',
        '/js/store.js',
        '/icon/icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
