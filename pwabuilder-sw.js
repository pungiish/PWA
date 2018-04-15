var CACHE = 'cache-and-update';


this.addEventListener('install',function(e){
  console.log('Instaliram SW');

  e.waitUntil(caches.open(CACHE).then(function(cache){
    console.log('Precacham!')
      return cache.addAll([
        "/",
        "/index.html",
        "/favicon.ico",
        "https://cataas.com/cat?"
      ])
    })
  );
});

this.addEventListener('fetch',function(e){
  console.log('fetcham!');
  e.respondWith(caches.match(e.request).then(function(res){
      if(res){
        console.log("cachano:)")
        return res;
      }
      console.log("Resource ni cachan!")
      return fetch(e.request).then(function(res){
        console.log(res.url);
        e.waitUntil(caches.open(CACHE).then(function(cache){
         return cache.add(res.url)
        }))
        return res;
    });
    }));
});