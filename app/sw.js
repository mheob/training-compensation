// install service worker
self.addEventListener("install", evt => {
  // temp
  console.log("service worker has been installed");
});

// activate service worker
self.addEventListener("activate", evt => {
  // temp
  console.log("service worker has been activated");
});

// fetch events
self.addEventListener("fetch", evt => {
  // temp
  console.log("event fetched", evt);
});
