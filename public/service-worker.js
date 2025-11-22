const installEvent = () => {
  self.addEventListener("install", () => {
    self.skipWaiting()
    console.log("service worker installed")
  })
}
installEvent()

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated")
    clients.claim().then(() => console.log("New service worker activated"))
  })
}
activateEvent()

const cacheName = "v1"

const cacheClone = async (e) => {
  const res = await fetch(e.request)
  const resClone = res.clone()

  const cache = await caches.open(cacheName)
  await cache.put(e.request, resClone)
  return res
}

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    // Only handle GET requests
    if (e.request.method !== "GET") {
      return;
    }

    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res),
    )
  })
}

fetchEvent()
