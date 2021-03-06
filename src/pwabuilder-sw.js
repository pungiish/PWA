var CACHE = 'cache-and-update';


this.addEventListener('install',function(e){
  console.log('Instaliram SW');

  e.waitUntil(caches.open(CACHE).then(function(cache){
    console.log('Precacham!')
      return cache.addAll([
        "/",
        "/PWA/index.html",
        "/PWA/favicon.ico",
        "https://cataas.com/cat?"
      ])
    })
  );
});

this.addEventListener('fetch',function(e){
  console.log('fetcham!');
  e.respondWith(caches.match(e.request).then(function(res){
    //ce fetcham sliko macke in sem online,dodaj novo sliko v cache.
    //drugace se skos ponavlja ista slike, ker je url ze cachan
    if(e.request.url==="https://cataas.com/cat?"&& navigator.onLine){
       fetch(e.request.url).then(function(res){
        console.log(res.url);
        caches.open(CACHE).then(function(cache){
          cache.add(res.url);
          console.log("Dodal novo sliko!:)")
        })
      })
    }
      if(res){
        console.log("cachano:)")
        return res;
      }
      console.log("Resource ni cachan!")
      return fetch(e.request).then(function(res){
        console.log(res.url);
        //CE SE NI CACHANO, CACHAJ!
        e.waitUntil(caches.open(CACHE).then(function(cache){
         return cache.add(res.url)
        }))
        return res;
    });
    }));
});