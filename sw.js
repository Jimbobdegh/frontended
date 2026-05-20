importScripts("https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/scramjet.all.js");

// Initialize the worker with your specific WISP and folder prefix
const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker({
    wisp: "wss://appointment-pose-mounts-republic.trycloudflare.com/wisp/",
    prefix: "/frontended/scramjet/"
});

async function handleRequest(event) {
  // If the request path matches our prefix, proxy it
  if (scramjet.route(event)) {
    return await scramjet.fetch(event);
  }
  // Otherwise, let the browser load standard files normally
  return await fetch(event.request);
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
