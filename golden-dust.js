(()=>{                       // IIFE 不污染全局
const N=60, Z=-1, BG='#111'; // 粒子数/层级/背景
let c,q,a,p,m=0;             // canvas/ctx/active/particles/mode

function init(){
  c=document.body.appendChild(document.createElement('canvas'));
  c.id='gd-canvas'; c.style.cssText='position:fixed;inset:0;z-index:'+Z;
  q=c.getContext('2d'); resize(); build(); go();
  window.addEventListener('resize',resize);
}
function resize(){
  const d=devicePixelRatio||1, w=innerWidth, h=innerHeight;
  c.width=w*d; c.height=h*d; q.setTransform(d,0,0,d,0,0);
}
function build(){
  p=[...Array(N)].map(_=>({
    x:Math.random()*innerWidth, y:Math.random()*innerHeight,
    r:Math.random()*3+1,        // 半径
    sx:(Math.random()-.5)*.8,   // 速度
    sy:(Math.random()-.5)*.8,
    o:Math.random()*.8+.2,      // 透明度
    d:Math.random()>.5?1:-1,    // 呼吸方向
    c:'#FFD700'
  }));
}
function draw(){
  q.clearRect(0,0,innerWidth,innerHeight);
  p.forEach(i=>{
    // 呼吸
    i.o+=i.d*.008; if(i.o>.9||i.o<.1)i.d*=-1;
    // 移动
    i.x+=i.sx; i.y+=i.sy;
    // 边界
    if(i.x<0)i.x=innerWidth; if(i.x>innerWidth)i.x=0;
    if(i.y<0)i.y=innerHeight; if(i.y>innerHeight)i.y=0;
    // 画
    q.save(); q.globalAlpha=i.o;
    const g=q.createRadialGradient(i.x,i.y,0,i.x,i.y,i.r*3);
    g.addColorStop(0,i.c); g.addColorStop(1,i.c+'00');
    q.fillStyle=g; q.beginPath(); q.arc(i.x,i.y,i.r,0,Math.PI*2); q.fill();
    q.restore();
  });
}
function go(){if(!a)return; draw(); requestAnimationFrame(go);}
a=1;
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();