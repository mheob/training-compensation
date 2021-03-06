const ts = "1561460121";
const staticCacheName = "site-static-" + ts;
const dynamicCacheName = "site-dynamic-" + ts;
const assets = [
  "/",
  "/index.html",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/img/favicon.ico",
  "/img/tsg-irlich-logo.svg",
  "/js/app.js",
  "/js/materialize.min.js",
  "/js/ui.js",
  "/js/data/prices.js",
  "/js/ui-components/calculation.js",
  "/pages/404.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install service worker
self.addEventListener("install", evt => {
  evt.waitUntil(caches.open(staticCacheName).then(cache => cache.addAll(assets)));
});

// activate service worker
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => caches.delete(key))
        )
      )
  );
});

// fetch events
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        cacheRes =>
          cacheRes ||
          fetch(evt.request).then(fetchRes => {
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 20);
              return fetchRes;
            });
          })
      )
      .catch(() => {
        if (evt.request.url.indexOf(".html") >= 0) {
          return caches.match("/pages/404.html");
        }
      })
  );
});
