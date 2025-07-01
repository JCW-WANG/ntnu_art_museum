const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random()*width;
    this.y = Math.random()*height;
    this.radius = Math.random()*1.5 + 0.5;
    this.vx = (Math.random()-0.5)*0.15;
    this.vy = (Math.random()-0.5)*0.15;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>width) this.vx*=-1;
    if(this.y<0||this.y>height) this.vy*=-1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(150,150,150,0.1)';
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fill();
  }
}
for(let i=0;i<100;i++) particles.push(new Particle());
function animate() {
  ctx.clearRect(0,0,width,height);
  particles.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
animate();
