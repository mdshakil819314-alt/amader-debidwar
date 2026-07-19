/*
  ছোট্ট একটা সার্ভিস ওয়ার্কার — এটা থাকলে Chrome সাইটটাকে "সম্পূর্ণ অ্যাপ"
  হিসেবে ইনস্টল করে (হোমস্ক্রিন আইকনের কোণায় ছোট Chrome ব্যাজ দেখাবে না)।
  এটা কোনো ডাটা সংরক্ষণ করে না, শুধু ইনস্টলযোগ্যতার শর্ত পূরণ করে।
*/
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
