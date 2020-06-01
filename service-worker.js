//nama dari cache
var CACHE_NAME = 'static-akakom-news-v1';

//default static file yang dimasukkan ke cache
var urlsToCache = [
  './',
  './assets/css/main.css',
  './assets/css/bootstrap.min.css'
  /*'./index.html',
  './assets/css/bootstrap.min.css',
  './assets/css/aos.css',
  './assets/css/font-aawesome.min.css',
  './assets/css/fonts.css',
  './assets/css/main.css',
  './assets/js/aos.js',
  './assets/js/bootstrap.min.js',
  './assets/js/jquery-3.4.1.min.js'*/
];

// Perform install steps
self.addEventListener('install', function(event) {
  //event untuk delay sampai promise selesai
  event.waitUntil(

    //open cache
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache')
        
        //menambahkan semua default files ke cache
        return cache.addAll(urlsToCache)
       // console.log(urlsToCache)
      })
  );
});



//Activate service worker

self.addEventListener('activate', function(event) {
    console.log('service worker aktif')
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
          console.log('fetch')
          return fetch(event.request);
        }
      )
    );
  });
  
/*
  self.addEventListener('fetch', function(event) {
    
    var request = event.request
    var url     = new URL(request.url)

    //memisahkan static file dengan dynamic file dari API
    if(url.origin === location.origin){
      event.respondWith(
        caches.match(request).then(function(response){
          return response || fetch(request)
        })
      )
    }else{
      event.respondWith(
        caches.open('dynamic-akakom-news-v1').then(function(cache){
          return fetch(request).then(function(liveResponse){
            cache.put(request, liveResponse.clone())
            return liveResponse
        }).catch(function(){
          return caches.match(request).then(function(response){
            if(response) return response
            return caches.match('/offline.json')
          })
        })
      })
      )
    }

  })
  */ 
  
