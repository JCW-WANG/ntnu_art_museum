const thumbnails = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=600&q=80"
];

const buttonsContainer = document.getElementById("buttons");

thumbnails.forEach((thumb, index) => {
  const btn = document.createElement("button");
  btn.setAttribute("aria-label", `播放影片 ${index + 1}`);
  btn.innerHTML = `
    <img src="${thumb}" alt="影片 ${index + 1} 封面圖">
    <div class="label">作品 ${index + 1}</div>
  `;
  btn.addEventListener("click", () => {
    window.location.href = `video.html?index=${index}`;
  });
  buttonsContainer.appendChild(btn);
});
