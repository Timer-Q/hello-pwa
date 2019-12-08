/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'cache_v1';
const URLS = ['/', '/index.html', '/logo192.png', '/logo512.png', '/manifest.json'];

self.addEventListener('install', async event => {
  // ExtendableEvent.waitUntil() 方法扩展了事件的生命周期。
  // 在服务工作线程中，延长事件的寿命从而阻止浏览器在事件中的异步操作完成之前终止服务工作线程。

  // event.waitUntil(
  //   // Cache 接口为缓存的 Request / Response  对象对提供存储机制，例如，作为ServiceWorker 生命周期的一部分。
  //   // 请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。
  //   // 尽管它被定义在 service worker 的标准中,  但是它不必一定要配合 service worker 使用.
  //   caches.open('v1').then(function(cache) {
  //     return cache.addAll(['/', '/index.html', '/logo192.png', '/logo512.png', '/manifest.json']);
  //   }),
  // );

  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS);
  // 强制等待中的 service worker 成为激活的 service worker
  await self.skipWaiting();
});

self.addEventListener('activate', async () => {
  // 清除 旧 缓存
  const keys = await caches.keys();
  keys.forEach(key => {
    if (key !== CACHE_NAME) {
      return caches.delete(key);
    }
  });
  // 获取控制权
  await self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url)
  const isInCache = URLS.includes(url.pathname);
  console.log('isInCache ', isInCache);

  if (isInCache || request.destination === 'image') {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }


  // event.respondWith(
  //   caches.match(request).then(response => {
  //     // caches.match() always resolves
  //     // but in case of success response will have value
  //     // if (response !== undefined) {
  //     //   console.log(response);
  //     //   return response;
  //     // }
  //     if (request.destination === 'image') {
  //       return response || fetch(request);
  //     }
  //     return fetch(request)
  //       .then(response => {
  //         let responseClone = response.clone();
  //         caches.open('v1').then(cache => {
  //           if (!(request.url.indexOf('http') === 0)) {
  //             cache.put(request, responseClone);
  //           }
  //         });
  //         return response;
  //       })
  //       .catch(() => {
  //         return caches.match('/sw-test/gallery/myLittleVader.jpg');
  //       });
  //   }),
  // );
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  console.log('cacheFirst ', request, cached);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  console.log('networkFirst ', request);
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (request.url.includes('http') || request.url.includes('https')) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
  }
}
