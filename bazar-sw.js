// এলাকার বাজার — শুধু bazar.html-এর জন্য (পুরনো সাইটে কোনো প্রভাব নেই)
var C = 'bazar-v1';
self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function(c){ return c.add('bazar.html'); }).catch(function(){}));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var r = e.request;
  if(r.mode === 'navigate'){
    e.respondWith(fetch(r).then(function(res){
      var cp = res.clone(); caches.open(C).then(function(c){ c.put('bazar.html', cp); }); return res;
    }).catch(function(){ return caches.match('bazar.html'); }));
  }
});
