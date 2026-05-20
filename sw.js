importScripts("https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker({
    wisp: "wss://gointospace.app/wisp/",
    prefix: "/frontended/scramjet/"
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
