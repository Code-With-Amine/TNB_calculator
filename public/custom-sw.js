// next-pwa custom service worker (optional)
// You can add custom logic here if needed.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
