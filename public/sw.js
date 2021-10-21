/* eslint-disable no-restricted-globals */
const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v2'

const assets = [
  // '/',
  // '/index.html',
  // '/img/background.png',
  // '/img/clock.png',
  // '/img/githubbackground.jpg',
  // '/img/logo.png',
  // '/img/profile.jpg',
  // '/img/user.jpg',
  // '/img/welcome.jpg',
  // '/logo192.png',
  // '/logo512.png',
  // '/maskable_icon_x384.png',
  // '/manifest.json',
  // 'https://kit.fontawesome.com/557952cc9a.js',
  // 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
]

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets)
    })
  )
})

// activate event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})

// fetch event
self.addEventListener('fetch', (evt) => {
  // evt.respondWith(
  //   caches.match(evt.request).then((cacheRes) => {
  //     return (
  //       cacheRes ||
  //       fetch(evt.request).then((fetchRes) => {
  //         return caches.open(dynamicCacheName).then((cache) => {
  //           cache.put(evt.request.url, fetchRes.clone())
  //           return fetchRes
  //         })
  //       })
  //     )
  //   })
  // )
})
