importScripts("https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker({
    wisp: "wss://appointment-pose-mounts-republic.trycloudflare.com/wisp/",
    prefix: "/frontended/scramjet/" // Added prefix here to align with the scope
});

async function handleRequest(event) {
  if (scramjet.route(event)) {
    return await scramjet.fetch(event);
  }
  return await fetch(event.request);
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
