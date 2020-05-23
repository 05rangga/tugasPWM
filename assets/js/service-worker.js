//nama dari cache
var CACHE_NAME = 'akakom-news-v1';

//default file yang dimasukkan ke cache
var urlsToCache = [
  '/',
  '/assets/css/bootstrap.min.css',
  '/assets/css/aos.css',
  '/assets/css/font-aawesome.min.css',
  '/assets/css/fonts.css',
  '/assets/css/main.css',
  '/assets/js/aos.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/jquery-3.4.1.min.js',
  '/assets/js/main.js',
];

// Perform install steps
self.addEventListener('install', function(event) {
  //event untuk delay sampai promise selesai
  event.waitUntil(

    //open cache
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');

        //menambahkan semua default files ke cache
        return cache.addAll(urlsToCache);
      })
  );
});


//Activate service worker
self.addEventListener('activate', function(event) {
    console.log('sservice worker aktif');
    event.waitUntil(

      // Get all the cache keys (cacheName)
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName){
            return cacheName != CACHE_NAME
          }).map(function(cacheName){
            return caches.delete(cacheName)
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
  
  
