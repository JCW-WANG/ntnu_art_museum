const thumbnails = [
  "https://picsum.photos/id/1011/600/400",
  "https://picsum.photos/id/1012/600/400",
  "https://picsum.photos/id/1013/600/400",
  "https://picsum.photos/id/1015/600/400"
];
const buttonsContainer = document.getElementById("buttons");

function createButtons() {
  buttonsContainer.innerHTML = "";
  thumbnails.forEach((thumb, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `
      <img src="${thumb}" alt="作品 ${index+1}">
      <div class="label">作品 ${index+1}</div>
    `;
    btn.addEventListener("click", () => {
      window.location.href = `video.html?index=${index}`;
    });
    buttonsContainer.appendChild(btn);
  });
}
createButtons();
