self.addEventListener('install',function(event){
    console.log("Service-worker is installed")
    event.waitUntil(
    caches.open('static')
    .then(function(cache){
       // cache.add()
       cache.addAll([
           './assets',
           '/views',
           '/views/home.html',
           '/index.js'
       ])
    }))
    
})  

self.addEventListener('activate',function(){
    console.log('SW Installed')
})

self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(res){
            if(res){
                return res;
            }else{
                return fetch(event.request)
            }
        })
    )

})