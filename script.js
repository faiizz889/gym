/* MuscleUp Gym — shared behaviour */
(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const fine=matchMedia('(pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const pages=[['index.html','Home'],['about.html','About'],['programs.html','Programs'],['membership.html','Membership'],['contact.html','Contact']];
const here=location.pathname.split('/').pop()||'index.html';
const ic=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
/* shared chrome injected so every page stays in sync */
document.body.insertAdjacentHTML('afterbegin',`
${here=='index.html'?'<div id="pre" role="status" aria-label="Loading"><img src="logo.png" alt="MuscleUp Gym"><b id="pct">0</b></div>':''}<div id="bar"></div>
<header class="hdr"><a class="brand" href="index.html" aria-label="MuscleUp Gym home"><img src="logo.png" alt=""><span class="brand__name"><span>Muscle</span><span class="up">Up</span><span class="gym">Gym</span></span></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>
<nav class="nav" aria-label="Main">${pages.map(p=>`<a href="${p[0]}" class="${p[0]==here?'on':''}">${p[1]}</a>`).join('')}<a class="tel" href="tel:+919879859811">098798 59811</a><a class="btn btn--fill" href="membership.html">Join now</a></nav></header>`);
document.body.insertAdjacentHTML('beforeend',`
<footer class="ftr"><div class="grid"><div><img src="logo.png" alt="MuscleUp Gym"><p>Train hard. Rise higher. Ladies-only hours 12:00 PM – 4:00 PM daily.</p></div>
<div>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
<div><p>Ground Floor, Pushpak Building, Khanpur Naka, beside Cama Hotel, Ahmedabad, Gujarat 380001</p><a href="tel:+919879859811">098798 59811</a><a href="https://wa.me/919879859811" target="_blank" rel="noopener">WhatsApp us</a></div>
<div class="soc"><a href="#" aria-label="Instagram">${ic('M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1 1 0 100 2 1 1 0 000-2z')}</a><a href="#" aria-label="Facebook">${ic('M14 8V6c0-1 .5-1.5 1.5-1.5H17V1h-3a4 4 0 00-4 4v3H7v3.5h3V23h4V11.500h3l.5-3.500z')}</a><a href="https://wa.me/919879859811" aria-label="WhatsApp">${ic('M12 2a10 10 0 00-8.600 15L2 22l5.200-1.400A10 10 0 1012 2zm5 13.500c-.2.600-1.200 1.100-1.700 1.200-.5.100-1 .1-3.300-.8-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.200c.1.200 0 .4-.1.600l-.4.500c-.2.200-.3.300-.1.600.7 1.100 1.500 1.800 2.600 2.300.3.200.5.100.6-.1l.8-1c.2-.2.400-.2.600-.1l2 1c.3.100.5.200.5.300 0 .200 0 .8-.2 1.400z')}</a></div></div>
<small>© ${new Date().getFullYear()} MuscleUp Gym, Ahmedabad.</small></footer>
<a class="call" href="tel:+919879859811">Call now</a><button id="top" aria-label="Back to top">↑</button>`);
/* preloader counter, then reveal */
const pre=$('#pre'),pct=$('#pct');let n=0;
const tick=()=>{n+=calm?100:3;pct.textContent=Math.min(n,100);n<100?requestAnimationFrame(tick):(pre.classList.add('done'),document.body.classList.add('ready'),$$('[data-split]').forEach(e=>e.classList.add('go')))};
/* split headings into masked words */
$$('[data-split]').forEach(e=>{e.setAttribute('aria-label',e.textContent);e.innerHTML=e.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w" aria-hidden="true"><span style="transition-delay:${i*90}ms">${w}</span></span>`).join(' ')});
if(pre)addEventListener('load',()=>setTimeout(tick,200));else requestAnimationFrame(()=>{document.body.classList.add('ready');$$('[data-split]').forEach(e=>e.classList.add('go'))});
/* menu */
const bg=$('.burger');bg.onclick=()=>{const o=document.body.classList.toggle('menu');bg.setAttribute('aria-expanded',o)};
addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('menu');bg.setAttribute('aria-expanded',false)}});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu')));
/* lerp smooth scroll (mouse wheel only; touch stays native) */
let target=scrollY,cur=scrollY,raf=0;
const max=()=>document.documentElement.scrollHeight-innerHeight;
if(fine&&!calm){addEventListener('wheel',e=>{if(e.ctrlKey||document.body.classList.contains('menu'))return;e.preventDefault();target=Math.max(0,Math.min(max(),target+e.deltaY*(e.deltaMode===1?33:1)));if(!raf)raf=requestAnimationFrame(glide)},{passive:false});
 const glide=()=>{cur+=(target-cur)*.085;scrollTo(0,cur);raf=Math.abs(target-cur)>.5?requestAnimationFrame(glide):0};
 addEventListener('scroll',()=>{if(!raf){target=cur=scrollY}})}
/* scroll-linked: progress, header, parallax, back-to-top */
let last=0;const hdr=$('.hdr'),bar=$('#bar'),top=$('#top'),px=$$('.hero__bg');
addEventListener('scroll',()=>{const y=scrollY;bar.style.transform=`scaleX(${y/Math.max(1,max())})`;
 hdr.classList.toggle('hide',y>last&&y>120);last=y;top.classList.toggle('show',y>800);
 if(!calm)px.forEach(p=>p.style.transform=`translate3d(0,${y*.25}px,0)`)},{passive:true});
top.onclick=()=>{target=0;scrollTo({top:0,behavior:'smooth'})};
/* reveals + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
 if(e.target.dataset.count){const t=+e.target.dataset.count,s=performance.now();const f=now=>{const p=Math.min((now-s)/1600,1);e.target.textContent=Math.round(t*(1-Math.pow(1-p,4)))+(e.target.dataset.suf||'');p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)}}),{threshold:.2});
$$('[data-r],.clip,[data-count]').forEach((e,i)=>{if(e.dataset.r!==undefined)e.style.setProperty('--i',i%4);io.observe(e)});
/* rotating creed quotes */
$$('.creed').forEach(c=>{const q=$$('blockquote',c),d=$('.dots',c);let i=0,t;
 q.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Quote '+(k+1));b.onclick=()=>{go(k);play()};d.append(b)});
 const go=k=>{i=k;q.forEach((e,m)=>e.classList.toggle('on',m==k));$$('button',d).forEach((e,m)=>e.classList.toggle('on',m==k))};
 const play=()=>{clearInterval(t);if(!calm)t=setInterval(()=>go((i+1)%q.length),5200)};go(0);play()});
/* contact form validation */
const f=$('#lead');if(f){f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
 const rules={name:v=>v.trim().length>1||'Enter your name.',phone:v=>{let d=v.replace(/\D/g,'');if(d.length>10)d=d.replace(/^(91|0+)/,'');return /^[6-9]\d{9}$/.test(d)||'Enter a valid 10-digit mobile number.'},goal:v=>!!v||'Pick a goal.'};
 Object.keys(rules).forEach(k=>{const i=f.elements[k],r=rules[k](i.value),m=i.parentElement.querySelector('.err');m.textContent=r===true?'':r;i.classList.toggle('bad',r!==true);if(r!==true)ok=false});
 if(ok){const g=k=>f.elements[k].value.trim();const t=`Hi MuscleUp Gym, I want to join.\nName: ${g('name')}\nPhone: ${g('phone')}\nGoal: ${g('goal')}\nPreferred time: ${g('time')}\nMessage: ${g('msg')}`;f.parentElement.classList.add('sent');open('https://wa.me/919879859811?text='+encodeURIComponent(t),'_blank','noopener')}})}
})();
