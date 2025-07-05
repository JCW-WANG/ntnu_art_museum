const CACHE_NAME = 'museum-video-gallery-v1';
const urlsToCache = [
  '/', // 根目錄
  '/index.html',
  '/video.html',
  '/manifest.json',
  '/service-worker.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;500;700&display=swap', // Google Fonts CSS
  // 藝廊圖片 (如果你希望它們離線可見，請加入這些連結)
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80'
  // !!! 如果你的影片檔案是靜態的（非動態載入的），也可以將它們的連結加入到這裡進行快取 !!!
  // 例如: 'path/to/your/video1.mp4',
  // 注意：大檔案快取可能需要更多時間和空間，並非所有影片都適合快取。
];

// 安裝 Service Worker 並快取基本資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求並從快取提供資源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有資源，就從快取返回
        if (response) {
          return response;
        }
        // 否則，從網路獲取並快取新資源
        return fetch(event.request).then(
          response => {
            // 檢查回應是否有效
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // 克隆回應，因為回應流只能讀取一次
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

// 清理舊的快取
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
