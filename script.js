const ADMIN_PASSWORD = "1234567890";

async function loadVideos() {
  try {
    const saved = localStorage.getItem('videos');
    if (saved) {
      const arr = JSON.parse(saved);
      if (arr.length === 3) return arr;
    }
    const res = await fetch('data.json?_=' + new Date().getTime());
    const data = await res.json();
    return data.videos;
  } catch(e) {
    console.error(e);
    return ["video/video1.mp4", "video/video2.mp4", "video/video3.mp4"];
  }
}

async function generateButtons() {
  const container = document.getElementById('buttons');
  const videos = await loadVideos();

  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80'
  ];

  container.innerHTML = '';
  videos.forEach((src, idx) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<img src="${images[idx]}"><div class="label">作品 ${idx+1}</div>`;
    btn.onclick = () => playVideo(src);
    container.appendChild(btn);
  });
}

function playVideo(src) {
  const video = document.getElementById('videoPlayer');
  const container = document.getElementById('videoContainer');
  video.src = src;
  video.load();
  video.play();
  container.style.opacity = 1;
}

// 防止右鍵
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.key === 'F12' || e.key === 'F5' || e.key.toLowerCase() === 'r') e.preventDefault();
});

// 初始化
if(document.getElementById('buttons')) generateButtons();
