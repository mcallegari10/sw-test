const path = require('path')

const CACHE_NAME = path.dirname(__dirname)
const filesToCache = [
  '/sw-test/',
  '/sw-test/public/index.html',
  '/sw-testapp.js',
  'styles.css'
]

/**
 * On install, add all the files to the cache API
 */
self.addEventListener('install', event => {
  console.log('Installing Service Worker...')
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(filesToCache)))
})

self.addEventListener('activate', event => {
  console.log('Activating Service Worker...')
})

/** 
+ fetch allows to intercepts all the request inside the sw scope
+ the next listener will respond with the cached resource but if it's not cached
* it will fetch it and then store it to the cache
*/
self.addEventListener('fetch', event => {
  console.log(`Fetching: ${event.request}`)
  event.respondWith(caches.match(event.request))
    .then(response => response || fetch(event.request).then(response =>
      caches.open(CACHE_NAME).then(cache => {
        /**
         * Cloning the response is necessary because request and response streams can only be read once. 
         * In order to return the response to the browser and put it in the cache we have to clone it.
         * So the original gets returned to the browser and the clone gets sent to the cache. 
         * They are each read once.
         */
        cache.put(event.request, response.clone())
        return response
      })
    ))
    .catch(() => {
      new Response('<p>Hello from your friendly neighbourhood service worker!</p>', {
        headers: { 'Content-Type': 'text/html' }
      })
    })
})
