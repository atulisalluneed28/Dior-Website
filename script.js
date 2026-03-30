gsap.registerPlugin(ScrollTrigger);

/* ── CURSOR ── */
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx-4}px,${my-4}px)`;});
(function aR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.transform=`translate(${rx-16}px,${ry-16}px)`;requestAnimationFrame(aR);})();
document.querySelectorAll('a,button,.prod-card,.gal-cell,.ed-cell,.feat-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.width='54px';ring.style.height='54px';ring.style.opacity='.75';});
  el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';ring.style.opacity='.4';});
});

/* ── NAV ── */
const nav=document.getElementById('nav');
['#hero','#products','#about','#banner','#features'].forEach(sel=>{
  const el=document.querySelector(sel);if(!el)return;
  ScrollTrigger.create({trigger:el,start:'top 60%',end:'bottom 60%',
    onEnter:()=>{nav.classList.add('dark');nav.classList.remove('light');document.body.classList.add('dark-bg');},
    onLeave:()=>{nav.classList.remove('dark');nav.classList.add('light');document.body.classList.remove('dark-bg');},
    onEnterBack:()=>{nav.classList.add('dark');nav.classList.remove('light');document.body.classList.add('dark-bg');},
    onLeaveBack:()=>{nav.classList.remove('dark');nav.classList.add('light');document.body.classList.remove('dark-bg');}
  });
});
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80));

/* ── HERO ── */
gsap.timeline({delay:.2})
  .to('.hero-title',{y:0,duration:1.5,ease:'expo.out'})
  .to('.hero-season',{opacity:1,y:0,duration:.9,ease:'power2.out'},'-=.9')
  .to('.hero-desc',{opacity:1,y:0,duration:.9,ease:'power2.out'},'-=.5')
  .to('.hero-cta-row',{opacity:1,y:0,duration:.8,ease:'power2.out'},'-=.4')
  .to('.hero-scroll',{opacity:1,duration:.6},'-=.2');

/* ── PARALLAX ── */
gsap.to('.hero-bg-video',{yPercent:28,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.banner-img',{yPercent:22,ease:'none',scrollTrigger:{trigger:'#banner',start:'top bottom',end:'bottom top',scrub:true}});
gsap.to('.about-img-main',{yPercent:10,ease:'none',scrollTrigger:{trigger:'#about',start:'top bottom',end:'bottom top',scrub:true}});

/* ── SCROLL REVEALS ── */
gsap.utils.toArray('.g-fade').forEach(el=>gsap.to(el,{opacity:1,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 82%'}}));
gsap.utils.toArray('.g-up').forEach((el,i)=>gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',delay:(i%3)*.1,scrollTrigger:{trigger:el,start:'top 87%'}}));
gsap.utils.toArray('.g-left').forEach(el=>gsap.to(el,{opacity:1,x:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}}));
gsap.utils.toArray('.g-right').forEach(el=>gsap.to(el,{opacity:1,x:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%'}}));
gsap.utils.toArray('.g-scale').forEach((el,i)=>gsap.to(el,{opacity:1,scale:1,duration:1.1,ease:'power3.out',delay:(i%3)*.12,scrollTrigger:{trigger:el,start:'top 87%'}}));
gsap.utils.toArray('#banner .g-up').forEach((el,i)=>gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',delay:i*.15,scrollTrigger:{trigger:'#banner',start:'top 65%'}}));
gsap.fromTo('.banner-title',{opacity:0,y:60,rotateX:-15},{opacity:1,y:0,rotateX:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'#banner',start:'top 68%',once:true}});

/* ── GALLERY H-SCROLL ── */
(function(){
  const track=document.querySelector('.h-scroll-track'),outer=document.querySelector('.h-scroll-outer');
  if(!track||!outer)return;
  gsap.to(track,{
    x:()=>-(track.scrollWidth-outer.offsetWidth),
    ease:'none',
    scrollTrigger:{trigger:'#gallery',pin:true,scrub:0.8,start:'top top',end:()=>'+='+(track.scrollWidth-outer.offsetWidth),invalidateOnRefresh:true}
  });
})();

/* ── MARQUEE ── */
(function(){
  const words=['DIOR','PARIS','COUTURE','1946','ÉLÉGANCE','SAVOIR-FAIRE','BEAUTÉ','MAISON','FEMME','LUXE'];
  document.querySelectorAll('.v-marquee-row').forEach(row=>{
    [...words,...words].forEach((w,i)=>{const s=document.createElement('span');s.className='v-item'+(i%3===0?' filled':'');s.textContent=w;row.appendChild(s);});
  });
})();

/* ── TICKER ── */
(function(){
  const items=['New Arrivals — AW 2025','Haute Couture · Paris','J\'adore Fragrance','Lady Dior Collection','30 Avenue Montaigne','Savoir-Faire Extraordinaire','The New Look · Since 1947'];
  const track=document.querySelector('.ticker-track');if(!track)return;
  [...items,...items].forEach(t=>{const d=document.createElement('div');d.className='ticker-item';d.innerHTML=`<span class="dot">✦</span>${t}`;track.appendChild(d);});
})();

/* ── SCRAMBLE ── */
const SC='ABCDEFGHIJKLMNOPQRSTUVWXYZÄÅÆÇÈÉÊËÑØÙÚÛÜàáâãäåæç•◆★';
function scramble(el){const orig=el.getAttribute('data-orig')||el.innerText;el.setAttribute('data-orig',orig);let i=0;if(el._si)clearInterval(el._si);el._si=setInterval(()=>{let r='';const total=20;for(let c=0;c<orig.length;c++){if(orig[c]===' '){r+=' ';continue;}if(i>8&&c<Math.floor((i-8)/(total-8)*orig.length+1))r+=orig[c];else r+=SC[Math.floor(Math.random()*SC.length)];}el.innerText=r;if(i++>=total){clearInterval(el._si);el.innerText=orig;}},45);}
function unscramble(el){if(el._si)clearInterval(el._si);const orig=el.getAttribute('data-orig')||el.innerText;let i=0;const total=14;el._si=setInterval(()=>{let r='';for(let c=0;c<orig.length;c++){if(orig[c]===' '){r+=' ';continue;}r+=(Math.random()>i/total)?SC[Math.floor(Math.random()*SC.length)]:orig[c];}el.innerText=r;if(i++>=total){clearInterval(el._si);el.innerText=orig;}},38);}
document.querySelectorAll('.hero-title .line').forEach(el=>{el.addEventListener('mouseenter',()=>scramble(el));el.addEventListener('mouseleave',()=>unscramble(el));});

/* ── 3D TILT ── */
document.querySelectorAll('.ed-cell,.gal-cell').forEach(el=>{
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{rotateY:((e.clientX-r.left)/r.width-.5)*10,rotateX:-(( e.clientY-r.top)/r.height-.5)*8,duration:.4,ease:'power1.out',transformPerspective:800});});
  el.addEventListener('mouseleave',()=>gsap.to(el,{rotateY:0,rotateX:0,duration:.6,ease:'power2.out'}));
});

/* ── SECTION TITLE CLIP ── */
document.querySelectorAll('.section-title').forEach(el=>{
  ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:()=>{el.style.clipPath='inset(0 100% 0 0)';gsap.to(el,{clipPath:'inset(0 0% 0 0)',duration:1.2,ease:'power3.out'});}});
});

/* ── STAT COUNTER ── */
document.querySelectorAll('.stat-n').forEach(el=>{
  const text=el.textContent.trim();const num=parseFloat(text);const suffix=text.replace(String(num),'');
  if(isNaN(num))return;el.textContent='0'+suffix;
  ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:()=>{gsap.to({val:0},{val:num,duration:1.8,ease:'power2.out',onUpdate:function(){el.textContent=Math.round(this.targets()[0].val)+suffix;}});}});
});

/* ── MISC SCROLL REVEALS ── */
window.addEventListener('scroll',()=>{const el=document.getElementById('scrollProgress');if(!el)return;el.style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';});
setTimeout(()=>document.querySelectorAll('.svg-corner').forEach(el=>{el.classList.add('visible','drawn');}),800);
const ornDiv=document.getElementById('ornDivider');if(ornDiv)ScrollTrigger.create({trigger:ornDiv,start:'top 88%',once:true,onEnter:()=>ornDiv.classList.add('drawn')});
const bRing=document.getElementById('bannerRing');if(bRing){ScrollTrigger.create({trigger:'#banner',start:'top 70%',once:true,onEnter:()=>{bRing.querySelectorAll('circle').forEach((c,i)=>{const len=c.getTotalLength?c.getTotalLength():2000;c.style.strokeDasharray=len;c.style.strokeDashoffset=len;setTimeout(()=>{c.style.transition=`stroke-dashoffset ${2+i*.4}s ease`;c.style.strokeDashoffset=0;},i*200+100);});}});}
const aDeco=document.getElementById('aboutDeco');if(aDeco)ScrollTrigger.create({trigger:'#about',start:'top 75%',once:true,onEnter:()=>aDeco.classList.add('visible')});
gsap.utils.toArray('.prod-card').forEach((c,i)=>gsap.fromTo(c,{opacity:0,y:60,scale:.94},{opacity:1,y:0,scale:1,duration:.9,ease:'power3.out',delay:i*.1,scrollTrigger:{trigger:c,start:'top 88%',once:true}}));
gsap.utils.toArray('.ed-cell').forEach((c,i)=>gsap.fromTo(c,{opacity:0,scale:.9,y:40},{opacity:1,scale:1,y:0,duration:1,ease:'expo.out',delay:i*.08,scrollTrigger:{trigger:'#editorial',start:'top 78%',once:true}}));
gsap.utils.toArray('.stat').forEach((s,i)=>gsap.fromTo(s,{opacity:0,y:30},{opacity:1,y:0,duration:.7,ease:'power2.out',delay:i*.12,scrollTrigger:{trigger:'.about-stats',start:'top 85%',once:true}}));
gsap.fromTo('.gallery-head',{opacity:0,y:30},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'#gallery',start:'top 80%',once:true}});
ScrollTrigger.create({trigger:'.v-strip',start:'top 85%',once:true,onEnter:()=>gsap.fromTo('.v-strip',{opacity:0,scaleX:.95},{opacity:1,scaleX:1,duration:1,ease:'power3.out'})});
gsap.utils.toArray('.footer-col').forEach((c,i)=>gsap.fromTo(c,{opacity:0,y:30},{opacity:1,y:0,duration:.7,ease:'power2.out',delay:i*.1,scrollTrigger:{trigger:'footer',start:'top 88%',once:true}}));
gsap.utils.toArray('.section-label').forEach(el=>gsap.fromTo(el,{opacity:0,x:-20,letterSpacing:'.7em'},{opacity:1,x:0,letterSpacing:'.45em',duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}}));
gsap.fromTo('.about-img-main',{clipPath:'inset(0 100% 0 0)',opacity:0},{clipPath:'inset(0 0% 0 0)',opacity:1,duration:1.4,ease:'power4.inOut',scrollTrigger:{trigger:'#about',start:'top 75%',once:true}});
(function(){const e=document.getElementById('editorial');if(!e)return;for(let i=0;i<12;i++){const d=document.createElement('div');d.className='particle-dot';const s=Math.random()*4+2;d.style.cssText=`width:${s}px;height:${s}px;top:${Math.random()*90+5}%;left:${Math.random()*95+2}%;--dur:${2.5+Math.random()*3}s;--tx:${(Math.random()-.5)*20}px;--ty:${-Math.random()*20-5}px;animation-delay:${Math.random()*2}s;`;e.appendChild(d);}})();

/* ══════════════════════════════════════════════════════════════
   FEATURES — GSAP SCRUB PIN  (no gap + text animates per slide)
══════════════════════════════════════════════════════════════ */
const TOTAL = 8;
const SLIDES = [
  {capTitle:"L'Atelier Dior",        capSub:'Paris · Avenue Montaigne',         count:'01'},
  {capTitle:'Exceptional Craftsmanship', capSub:'Lyon · Milan · Paris',          count:'02'},
  {capTitle:'Timeless Silhouette',   capSub:'Haute Couture · AW 2025',           count:'03'},
  {capTitle:'Bespoke Atelier',       capSub:'Private Clientele Service',         count:'04'},
  {capTitle:'The New Look',          capSub:'Christian Dior · 1947',             count:'05'},
  {capTitle:'Parfum de Grasse',      capSub:'Fragrance · Maison Dior',           count:'06'},
  {capTitle:'Maroquinerie',          capSub:'Leather Goods · Savoir-Faire',      count:'07'},
  {capTitle:'Joaillerie Fine',       capSub:'High Jewellery · Avenue Montaigne', count:'08'}
];

/* ── build dots ── */
const dotsEl = document.getElementById('featDots');
SLIDES.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'feat-dot'+(i===0?' active':'');
  d.id = 'fd'+i;
  dotsEl.appendChild(d);
});

/* ── split chars / wrap lines ── */
function splitChars(el){
  const txt=el.textContent; el.innerHTML='';
  [...txt].forEach(ch=>{
    const w=document.createElement('span');w.className='feat-char-wrap';
    const s=document.createElement('span');s.className='feat-ch';
    s.textContent=ch===' '?'\u00A0':ch;
    w.appendChild(s);el.appendChild(w);
  });
  return el.querySelectorAll('.feat-ch');
}
function wrapLine(el){
  const txt=el.textContent;
  el.innerHTML=`<span class="feat-line-wrap"><span class="feat-line-inner">${txt}</span></span>`;
  return el.querySelector('.feat-line-inner');
}
const CHARS=[0,1,2,3,4,5,6,7].map(i=>splitChars(document.getElementById('fh'+i)));
const LINES=[0,1,2,3,4,5,6,7].map(i=>wrapLine(document.getElementById('fp'+i)));

/* ── initial state — hide all items + images ── */
document.querySelectorAll('.feat-slide-img').forEach((im,i)=>{
  im.style.clipPath = i===0?'inset(0% 0 0 0)':'inset(100% 0 0 0)';
  im.style.zIndex   = i===0?2:1;
});
[0,1,2,3,4,5,6,7].forEach(i=>{
  gsap.set(document.getElementById('fw'+i),{clipPath:'inset(0 100% 0 0)'});
  CHARS[i].forEach(ch=>{ch.style.transform='translateY(105%)';ch.style.opacity='0';});
  LINES[i].style.transform='translateY(102%)';LINES[i].style.opacity='0';
});

let curIdx = -1;

function setDots(i){ document.querySelectorAll('.feat-dot').forEach((d,j)=>d.classList.toggle('active',j===i)); }
function setFill(i){ document.getElementById('featFill').style.width=((i+1)/TOTAL*100)+'%'; }

/* swap image instantly — no animation flash */
function setImage(idx){
  document.querySelectorAll('.feat-slide-img').forEach((im,i)=>{
    im.style.transition='none';
    im.style.zIndex   = i===idx?2:1;
    im.style.clipPath = i===idx?'inset(0% 0 0 0)':'inset(100% 0 0 0)';
  });
  const d=SLIDES[idx];
  const tEl=document.getElementById('featCapTitle');
  const sEl=document.getElementById('featCapSub');
  if(tEl.textContent===d.capTitle) return;
  gsap.to([tEl,sEl],{opacity:0,y:-8,duration:.15,onComplete:()=>{
    tEl.textContent=d.capTitle; sEl.textContent=d.capSub;
    document.getElementById('featCountCur').textContent=d.count;
    gsap.to([tEl,sEl],{opacity:1,y:0,duration:.25});
  }});
}
/* animate newly entered item's text */
function animateItemIn(idx){
  const fw = document.getElementById('fw'+idx);
  const fs = document.getElementById('fs'+idx);
  document.getElementById('fi'+idx).classList.add('is-active');
  gsap.timeline()
    .fromTo(fs,{x:'-110%',opacity:0},{x:'110%',opacity:1,duration:.4,ease:'power2.inOut'})
    .fromTo(fw,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.4,ease:'power3.out'},'-=.2')
    .to(CHARS[idx],{y:0,opacity:1,duration:.28,ease:'power3.out',stagger:.015},'-=.28')
    .to(LINES[idx],{y:0,opacity:1,duration:.3,ease:'power3.out'},'-=.18');
}
/* instantly show item (no animation, for re-entry) */ 
function showItemSilent(idx){
  document.getElementById('fi'+idx).classList.add('is-active');
  gsap.set(document.getElementById('fw'+idx),{clipPath:'inset(0 0% 0 0)'});
  CHARS[idx].forEach(ch=>{ch.style.transform='translateY(0)';ch.style.opacity='1';});
  LINES[idx].style.transform='translateY(0)'; LINES[idx].style.opacity='1';
}

/* instantly hide item */
function hideItem(idx){
  document.getElementById('fi'+idx).classList.remove('is-active');
  gsap.set(document.getElementById('fw'+idx),{clipPath:'inset(0 100% 0 0)'});
  CHARS[idx].forEach(ch=>{ch.style.transform='translateY(105%)';ch.style.opacity='0';});
  LINES[idx].style.transform='translateY(102%)'; LINES[idx].style.opacity='0';
}

function goTo(idx){
  if(idx===curIdx) return;
  const prev = curIdx;
  curIdx = idx;
  setImage(idx);

  if(idx > prev){
    /* forward — silently show all previous, animate new one */
    for(let i=Math.max(0,prev);i<idx;i++) showItemSilent(i);
    animateItemIn(idx);
    for(let i=idx+1;i<TOTAL;i++) hideItem(i);
  } else {
    /* reverse — hide from prev down to idx+1, silently restore rest */
    for(let i=prev;i>idx;i--) hideItem(i);
    for(let i=0;i<=idx;i++) showItemSilent(i);
  }

  setDots(idx);
  setFill(idx);
}

/* ── WRAP features in a container div so pin has a scroll surface ── */
const featSection = document.getElementById('features');
const featWrap = document.createElement('div');
featWrap.id = 'feat-wrap';
featWrap.style.cssText = `height:${TOTAL*100}vh;position:relative;`;
featSection.parentNode.insertBefore(featWrap,featSection);
featWrap.appendChild(featSection);

/* pin #features inside #feat-wrap with NO pinSpacing spacer */
ScrollTrigger.create({
  trigger : featWrap,
  start   : 'top top',
  end     : 'bottom bottom',
  pin     : featSection,
  pinSpacing : false,
  scrub   : 0.3,
  onEnter : ()=>{ document.getElementById('featPanelHead').classList.add('line-drawn'); goTo(0); },
  onLeaveBack : ()=>{
    document.getElementById('featPanelHead').classList.remove('line-drawn');
    for(let i=0;i<TOTAL;i++) hideItem(i);
    curIdx=-1;
  },
 onUpdate : self=>{
    const raw = self.progress * TOTAL;
    // Use floor always — each slide occupies exactly 1/TOTAL of scroll height
    // Clamp to [0, TOTAL-1] to prevent overshoot
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(raw)));
    goTo(idx);
  }
});

/* ── hover micro-tilt ── */
document.querySelectorAll('.feat-item').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const r=el.getBoundingClientRect();
    gsap.to(el,{rotatex:-((e.clientY-r.top)/r.height-.5)*3,duration:.3,ease:'power1.out',transformPerspective:900});
  });
  el.addEventListener('mouseleave',()=>gsap.to(el,{rotateX:0,duration:.5,ease:'power2.out'}));
});