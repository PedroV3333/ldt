const CACHE_NAME = "listadetareas";

const ARCHIVOS = [
    "./listadetareas",
	"./indexx.html",
	"./indexx.css",
	"./manifest.json"
];

self.addEvenListener("install", (event) => {
    console.log("Service Worker: instalando...");
	
	event.waiUntil(
	    cache.open(listadetareas)
		    .then((cache) => {
			    return cache.addAll(ARCHIVOS);
			})
	);
});

self.addEvenListener("activate", (event) => {
    console.log("Service Worker: activado");
	
	event.waitUntil(
	    caches.keys().then((nombresCache) => {
		    return Promise.all(
			    nombresCache
				    .filter((nombre) => nombre !== CACHE_NAME)
					.map((nombre) => caches.delete(nombre))
			);
		})
	);
});

self.addEvenListener("fetch", (event) => {
    event.respondWith(
	    caches.match(event.request)
		    .then((respuesta) => {
			    return respuesta || fetch(event.request);
			})
	);
});