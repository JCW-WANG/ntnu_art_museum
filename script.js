const videos = [
  "https://www.youtube.com/embed/SHfPMoIzD08",
  "https://www.youtube.com/embed/SHfPMoIzD08",
  "https://www.youtube.com/embed/SHfPMoIzD08",
  "https://www.youtube.com/embed/SHfPMoIzD08"
];

const thumbnails = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80"
];

console.log("videos 長度:", videos.length);
console.log("thumbnails 長度:", thumbnails.length);

const buttonsContainer = document.getElementById("buttons");
const videoContainer = document.getElementById("videoContainer");
const videoPlayer = document.getElementById("videoPlayer");
const backBtn = document.getElementById("backBtn");

function createButtons() {
  buttonsContainer.innerHTML = "";
  videos.forEach((videoUrl, index) => {
    console.log("生成按鈕 index:", index);
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", `播放影片 ${index + 1}`);
    btn.innerHTML = `
      <img src="${thumbnails[index]}" alt="影片 ${index + 1} 封面圖">
      <div class="label">作品 ${index + 1}</div>
    `;
    btn.addEventListener("click", () => {
      playVideo(index);
    });
    buttonsContainer.appendChild(btn);
  });
}

function playVideo(index) {
  videoPlayer.src = videos[index];
  videoPlayer.load();
  videoPlayer.play();
  videoContainer.classList.remove("hidden");
  buttonsContainer.classList.add("hidden");

  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}

function backToMenu() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoContainer.classList.add("hidden");
  buttonsContainer.classList.remove("hidden");

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

backBtn.addEventListener("click", backToMenu);

// 初始化
createButtons();
