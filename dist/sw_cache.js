const cacheVersion = "v1";

self.addEventListener("install", (e) => {
  console.log("service worker installed");
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cacheVersion) {
            console.log("Deleting out of date cache:", cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("Handling fetch event for", event.request.url);

  event.respondWith(
    caches.open(cacheVersion).then(function (cache) {
      return cache
        .match(event.request)
        .then(function (response) {
          if (response) {
            console.log("Found response in cache:", response);

            return response;
          }

          console.log("Fetching request from the network");

          return fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });
        })
        .catch(function (error) {
          // Handles exceptions that arise from match() or fetch().
          console.error("Error in fetch handler:", error);

          throw error;
        });
    })
  );
});
