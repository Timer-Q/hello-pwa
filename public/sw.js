/* eslint-disable no-restricted-globals */

self.addEventListener('install', function(event) {
  // ExtendableEvent.waitUntil() 方法扩展了事件的生命周期。
  // 在服务工作线程中，延长事件的寿命从而阻止浏览器在事件中的异步操作完成之前终止服务工作线程。
  event.waitUntil(
    // Cache 接口为缓存的 Request / Response  对象对提供存储机制，例如，作为ServiceWorker 生命周期的一部分。
    // 请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。
    // 尽管它被定义在 service worker 的标准中,  但是它不必一定要配合 service worker 使用.
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/public/',
        '/index.html',
        '/logo192.png',
        '/logo512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        console.log(response)
        return response;
      } else {
        return fetch(event.request)
          .then(function(response) {
            // response may be used only once
            // we need to save clone to put one copy in cache
            // and serve second one
            let responseClone = response.clone();
            caches.open('v1').then(function(cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function() {
            return caches.match('/sw-test/gallery/myLittleVader.jpg');
          });
      }
    })
  );
});
