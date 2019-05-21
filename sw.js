console.log('Service Worker started');

var CACHE_NAME = 'my-site-cache-v2';

var urlsToCache = [
 //  '/', //index.html
//   '/styles/main.css',
//   '/script/main.js'
    '/image1.png'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('sw caching..now')
  // eagar caching
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        // browser/sw, send requests to the web server, get the files and cache them
        return cache.addAll(urlsToCache);
      })
  );
});

// invoked for all the calls src/ajax
self.addEventListener('fetch', function(event) {
    console.log('fetch call in sw ', event.request);
    
    event.respondWith(
      caches.match(event.request)
        // response is complete http headers + content
        .then(function(response) {
            console.log('could find asset in cache ', event.request.url )
          // Cache hit - return response
          if (response) {
            return response;
          }
          console.log('could not find asset ', event.request.url  );
          // invoked only if cache not found
          return fetch(event.request).then(
            function(response) {
                console.log('got reply from server, caching ondemand ');
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        }))
  });


  // very first time
  // open browser instance first time
  self.addEventListener('activate', function(event) {
    // invalidate/remote cache
    var cacheWhitelist = ['my-site-cache-v2'];
    console.log('activate ');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('cached key ', cacheName);
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }

          })
        );
      })
    );
  });