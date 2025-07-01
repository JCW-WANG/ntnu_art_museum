const videos = [
  "https://drive.google.com/uc?export=download&id=1lVbaarkNlKrcxyvbk9NQKJoQtIuPmaF8",
  "影片2連結",
  "影片3連結"
];

function playVideo(index) {
  const video = document.getElementById('videoPlayer');
  const container = document.getElementById('videoContainer');
  video.src = videos[index];
  video.load();
  video.play();
  container.style.opacity = 1;

  // 嘗試全螢幕
  if(container.requestFullscreen) container.requestFullscreen();
}

document.getElementById('backBtn').onclick = () => {
  const video = document.getElementById('videoPlayer');
  const container = document.getElementById('videoContainer');
  video.pause();
  container.style.opacity = 0;
  if(document.exitFullscreen) document.exitFullscreen();
};
