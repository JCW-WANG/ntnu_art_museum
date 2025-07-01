// 共用密碼
const ADMIN_PASSWORD = "1234567890";

// 載入影片資料
async function loadVideos() {
  try {
    const res = await fetch('data.json?_=' + new Date().getTime());
    if (!res.ok) throw new Error('讀取影片資料失敗');
    const data = await res.json();
    return data.videos;
  } catch(e) {
    console.error(e);
    return ["video/video1.mp4", "video/video2.mp4", "video/video3.mp4"];
  }
}

// 按鈕加圖片和文字
async function generateButtons() {
  const container = document.getElementById('buttons');
  const videos = await loadVideos();

  // 這裡給三個示範圖片路徑（你換成你自己的圖片網址或路徑）
  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80'
  ];

  container.innerHTML = '';
  videos.forEach((src, idx) => {
    const btn = document.createElement('button');

    const img = document.createElement('img');
    img.src = images[idx] || '';
    img.alt = `作品 ${idx+1}`;
    btn.appendChild(img);

    const label = document.createElement('span');
    label.textContent = `作品 ${idx+1}`;
    btn.appendChild(label);

    btn.onclick = () => playVideo(src);
    container.appendChild(btn);
  });
}


// 播放影片並淡入
function playVideo(src) {
  const video = document.getElementById('videoPlayer');
  const container = document.getElementById('videoContainer');
  video.src = src;
  video.load();
  video.play();
  container.style.opacity = 1;
}

// 防止右鍵與快捷鍵
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.key === 'F12' || e.key === 'F5' || e.key.toLowerCase() === 'r') {
    e.preventDefault();
  }
});

// index.html 初始化
if(document.getElementById('buttons')) {
  generateButtons();
}

// admin.html 相關
if(document.getElementById('loginBtn')) {
  const loginSection = document.getElementById('loginSection');
  const adminSection = document.getElementById('adminSection');
  const loginMessage = document.getElementById('loginMessage');
  const saveMessage = document.getElementById('saveMessage');
  const passwordInput = document.getElementById('passwordInput');
  const videoInputs = ['video1','video2','video3'].map(id => document.getElementById(id));

  document.getElementById('loginBtn').onclick = async () => {
    if(passwordInput.value === ADMIN_PASSWORD) {
      loginSection.style.display = 'none';
      adminSection.style.display = 'block';
      loginMessage.textContent = '';
      // 載入現有資料
      try {
        const res = await fetch('data.json?_=' + new Date().getTime());
        if(!res.ok) throw new Error('讀取失敗');
        const data = await res.json();
        videoInputs.forEach((input, i) => input.value = data.videos[i] || '');
      } catch(e) {
        videoInputs.forEach(input => input.value = '');
      }
    } else {
      loginMessage.textContent = '密碼錯誤';
    }
  };

  document.getElementById('saveBtn').onclick = () => {
    // 只能在客戶端模擬儲存（localStorage），無法寫入 GitHub
    const newVideos = videoInputs.map(i => i.value.trim());
    localStorage.setItem('videos', JSON.stringify(newVideos));
    saveMessage.style.color = 'green';
    saveMessage.textContent = '儲存成功！刷新 index 頁面以載入';
  };

  // 載入 localStorage 儲存的資料（如果有）
  window.addEventListener('load', () => {
    const saved = localStorage.getItem('videos');
    if(saved) {
      const arr = JSON.parse(saved);
      if(arr.length === 3) {
        ['video1','video2','video3'].forEach((id,i) => {
          const input = document.getElementById(id);
          if(input) input.value = arr[i];
        });
      }
    }
  });
}
