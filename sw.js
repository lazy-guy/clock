const cacheName = "clock";
const contentToCache = [
	"./",
	"./index.html",
	"./index.css",
	"./index.js",
	"./sw.js",
	"./android-chrome-192x192.png",
	"./android-chrome-512x512.png",
	"./site.webmanifest",
	"./favicon.ico",
	"./favicon-16x16.png",
	"./favicon-32x32.png",
	"./apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
	console.log("Service Worker installed");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			await cache.addAll(contentToCache);
		})()
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(fetch(event.request).then((res) => {
		let response = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, response);
        });
		return res
	}).catch((err) => {
		return caches.match(event.request)
	})
	);
});
