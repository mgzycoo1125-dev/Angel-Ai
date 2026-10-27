const CACHE_NAME = "angel-ai-final-fix-v3-20261027";
const APP_SHELL = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./angel-logo.svg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME && key.toLowerCase().includes("angel-ai")).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const req = event.request;
  const freshContent = req.destination === "document" || req.destination === "script" || req.destination === "style";
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (freshContent) {
      try {
        const response = await fetch(req, {cache: "no-cache"});
        if (response && response.ok) await cache.put(req, response.clone());
        return response;
      } catch (error) {
        const cached = await cache.match(req);
        if (cached) return cached;
        throw error;
      }
    }
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const response = await fetch(req);
      if (response && response.ok) await cache.put(req, response.clone());
      return response;
    } catch (error) {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
      throw error;
    }
  })());
});
