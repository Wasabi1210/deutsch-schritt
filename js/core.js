/* Ядро: стан, збереження, мова, озвучення, індекс слів, статистика.
   Сховище винесено в окремий адаптер (Storage), щоб згодом підключити базу даних і реєстрацію. */
(function(){
'use strict';
const KEY='dss-state-v1';
const today=()=>dkey(new Date());
function dkey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
window.dkey=dkey; window.today=today;

/* ---------- дані: розбір компактних рядків ---------- */
const lines=s=>s.trim().split('\n').map(x=>x.split('|'));
function mkWord(a,lesson,cat,lvl){
  const de=a[0], m=de.match(/^(der|die|das) (.+)$/);
  return {de,art:m&&a[1]!=='Pl.'?m[1]:'',bare:m?m[2]:de,pl:a[1]==='-'?'':a[1],tr:[a[2],a[3]],pron:a[4],ex:a[5],exTr:[a[6],a[7]],lesson,cat,lvl,noun:!!m};
}
window.WORDS=[]; window.WMAP={};
LESSONS.forEach(l=>{
  l.words=lines(l.w).map(a=>mkWord(a,l.id,l.cat,'A1'));
  l.phrases=lines(l.p).map(a=>({de:a[0],tr:[a[1],a[2]]}));
  l.dialog=lines(l.dlg).map(a=>({who:a[0],de:a[1],tr:[a[2],a[3]]}));
  l.words.forEach(w=>{ if(!WMAP[w.de]){WMAP[w.de]=w;WORDS.push(w);} });
});
lines(EXTRA_WORDS).forEach(a=>{const w=mkWord(a,0,a[8],'A2'); if(!WMAP[w.de]){WMAP[w.de]=w;WORDS.push(w);}});
GRAMMAR.forEach(g=>{
  g.examples=lines(g.ex).map(a=>({de:a[0],tr:[a[1],a[2]]}));
  g.mistakes=lines(g.bad).map(a=>({bad:a[0],good:a[1],why:[a[2],a[3]]}));
  g.exercises=lines(g.x).map(a=>({q:a[0],a:a[1],wrong:a[2].split(';'),why:[a[3],a[4]]}));
});
window.GMAP={}; GRAMMAR.forEach(g=>GMAP[g.id]=g);
window.gram=id=>GMAP[GALIAS[id]||id];
window.IRREG_LIST=lines(IRREG).map(a=>({inf:a[0],pra:a[1],perf:a[2],tr:[a[3],a[4]]}));
window.lessonById=id=>LESSONS.find(l=>l.id===id);

/* ---------- стан ---------- */
function defaults(){
  const s={v:1,lang:'uk',theme:'auto',name:'',goalMin:25,rate:0.9,level:'A1',goal:'study-work',
    start:today(),updated:0,lessons:{},words:{},gramFav:{},matFav:{},hw:{},notes:[],tests:[],days:{},ach:{},plan:{}};
  /* стартовий прогрес: уроки 1–10 вже пройдено до початку роботи із сайтом */
  LESSONS.filter(l=>l.id<=10).forEach(l=>{ s.lessons[l.id]={st:'done',pre:1}; l.words.forEach(w=>s.words[w.de]={s:'know',pre:1}); });
  return s;
}
/* Адаптер сховища. Локально — localStorage; за потреби тут підключається хмарне сховище. Щоб підключити власний бекенд, достатньо замінити методи remote*. */
const Storage={
  mode:'local', _db:null, _ref:null, _t:null,
  loadLocal(){ try{const r=localStorage.getItem(KEY); return r?JSON.parse(r):null;}catch(e){this.mode='memory';return null;} },
  saveLocal(s){ try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){this.mode=this.mode==='cloud'?'cloud':'memory';} },
  async initRemote(){ /* місце для підключення власної бази даних */ },
  pushRemote(){ if(!this._ref) return; clearTimeout(this._t); this._t=setTimeout(()=>{ this._ref.set({json:JSON.stringify(S),updated:S.updated}).catch(()=>{}); },4000); }
};
window.Storage=Storage;
window.S=Object.assign(defaults(),Storage.loadLocal()||{});
window.save=function(){ S.updated=Date.now(); S.tests=S.tests.slice(-300); Storage.saveLocal(S); Storage.pushRemote(); };
window.resetState=function(){ window.S=defaults(); checkAchievements(true); S.seeded=1; save(); };
window.importState=function(obj){ window.S=Object.assign(defaults(),obj); save(); };

/* ---------- мова ---------- */
window.L=(uk,ru)=>S.lang==='ru'?ru:uk;
window.B=a=>Array.isArray(a)?a[S.lang==='ru'?1:0]:a;
window.esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.fmtDate=(d,opt)=>{ try{return new Date(d).toLocaleDateString(S.lang==='ru'?'ru-RU':'uk-UA',opt||{day:'numeric',month:'long',year:'numeric'});}catch(e){return d;} };
window.shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
window.pick=(a,n)=>shuffle(a).slice(0,n);
window.plural=(n,uk,ru)=>{ // форми: [1, 2-4, 5+]
  const f=S.lang==='ru'?ru:uk, m=n%100, k=n%10; return n+' '+(m>10&&m<20?f[2]:k===1?f[0]:k>=2&&k<=4?f[1]:f[2]); };

/* ---------- облік активності ---------- */
window.day=function(){ const k=today(); if(!S.days[k]) S.days[k]={min:0,words:0,ex:0,ok:0}; return S.days[k]; };
window.touchDay=function(){ day(); };
let lastAct=Date.now(); ['click','keydown','pointerdown'].forEach(e=>document.addEventListener(e,()=>lastAct=Date.now(),true));
setInterval(()=>{ if(!document.hidden && Date.now()-lastAct<120000 && S.days[today()]){ day().min=Math.round((day().min+0.5)*10)/10; save(); } },30000);

/* ---------- слова ---------- */
window.wst=de=>S.words[de]||(S.words[de]={});
window.setWordStatus=function(de,st){ const w=wst(de); const was=w.s; w.s=st; if(st==='know'&&was!=='know'){ w.d=today(); day().words++; } save(); };
window.toggleFav=function(de){ const w=wst(de); w.fav=w.fav?0:1; save(); return w.fav; };
window.wordResult=function(de,ok){ const w=wst(de); if(ok) w.hit=(w.hit||0)+1; else w.miss=(w.miss||0)+1; if(!w.s) w.s='learn'; };
window.isHard=de=>{const w=S.words[de]; return !!w&&(w.miss||0)>=2&&(w.miss||0)>=(w.hit||0)/2;};
window.knownPool=function(){ // слова з уже відкритих уроків
  const max=currentLessonId(); return WORDS.filter(w=>w.lesson&&w.lesson<=max); };

/* ---------- уроки ---------- */
window.lst=id=>S.lessons[id]||{};
window.isDone=id=>lst(id).st==='done';
window.currentLessonId=function(){ const n=LESSONS.find(l=>!isDone(l.id)); return n?n.id:LESSONS[LESSONS.length-1].id; };
window.allDone=()=>LESSONS.every(l=>isDone(l.id));
window.completeLesson=function(id,score){
  const st=S.lessons[id]||(S.lessons[id]={}); const first=st.st!=='done';
  st.st='done'; st.date=st.date||today(); if(score!=null) st.score=score; delete st.pre;
  lessonById(id).words.forEach(w=>{ const x=wst(w.de); if(!x.s) x.s='learn'; });
  touchDay(); save(); return first;
};

/* ---------- статистика ---------- */
window.Stats=function(){
  const done=LESSONS.filter(l=>isDone(l.id)).length;
  const wordsKnown=Object.keys(S.words).filter(k=>S.words[k].s==='know'&&WMAP[k]).length;
  const wordsLearn=Object.keys(S.words).filter(k=>S.words[k].s==='learn'&&WMAP[k]).length;
  const keys=Object.keys(S.days).filter(k=>{const d=S.days[k];return d.min>0||d.ex>0||d.words>0||d.lesson;}).sort();
  let best=0,run=0,prev=null;
  keys.forEach(k=>{ const t=new Date(k+'T12:00').getTime(); run=(prev&&Math.round((t-prev)/864e5)===1)?run+1:1; best=Math.max(best,run); prev=t; });
  let streak=0; const d=new Date(); if(!keys.includes(dkey(d))) d.setDate(d.getDate()-1);
  while(keys.includes(dkey(d))){streak++;d.setDate(d.getDate()-1);}
  const tests=S.tests; const avg=tests.length?Math.round(tests.reduce((a,t)=>a+t.ok/t.total,0)/tests.length*100):null;
  const exTotal=Object.values(S.days).reduce((a,d)=>a+(d.ex||0),0), exOk=Object.values(S.days).reduce((a,d)=>a+(d.ok||0),0);
  const mods=MODS.map((m,i)=>{const ls=LESSONS.filter(l=>l.m===i);return {n:ls.length,done:ls.filter(l=>isDone(l.id)).length};});
  return {lessonsDone:done,lessonsTotal:LESSONS.length,pct:Math.round(done/LESSONS.length*100),wordsKnown,wordsLearn,
    daysActive:keys.length,streak,bestStreak:Math.max(best,streak),minutes:Math.round(Object.values(S.days).reduce((a,d)=>a+(d.min||0),0)),
    tests:tests.length,avg,exTotal,exOk,hwDone:Object.values(S.hw).filter(h=>h.done).length,notes:S.notes.length,
    perfect:tests.filter(t=>t.total>=10&&t.ok===t.total).length,modulesDone:mods.filter(m=>m.done===m.n).length,mods,
    daysSince:Math.max(1,Math.round((new Date(today()+'T12:00')-new Date(S.start+'T12:00'))/864e5)+1)};
};
/* Досягнення видаються лише тоді, коли умову справді виконано */
window.checkAchievements=function(silent){
  const st=Stats(), fresh=[];
  ACHIEVEMENTS.forEach(a=>{ if(!S.ach[a.id] && a.val(st)>=a.need){ S.ach[a.id]=today(); fresh.push(a); } });
  if(fresh.length){ save(); if(!silent) fresh.forEach((a,i)=>setTimeout(()=>toast('🏅 '+L('Нове досягнення: ','Новое достижение: ')+B(a.t)),i*1800)); }
  return fresh;
};

/* ---------- озвучення (de-DE) ---------- */
const Speech={
  ok:('speechSynthesis' in window)&&typeof SpeechSynthesisUtterance!=='undefined', voice:null, tts:null, warned:false,
  init(){
    if(this.ok){ const load=()=>{ const v=speechSynthesis.getVoices(); this.voice=v.find(x=>x.lang==='de-DE')||v.find(x=>/^de/i.test(x.lang))||null; }; load(); try{speechSynthesis.addEventListener('voiceschanged',load);}catch(e){} }
  },
  available(){ return this.ok||!!this.tts; },
  say(text,rate){
    text=String(text).replace(/[…]/g,' ').replace(/\s+\/\s+/g,'. ');
    if(this.ok){ try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang='de-DE'; if(this.voice) u.voice=this.voice; u.rate=rate||S.rate||0.9; speechSynthesis.speak(u); return true; }catch(e){} }
    if(this.tts){ this.tts.speak(text,{language:'de'}).catch(()=>this.fail()); return true; }
    this.fail(); return false;
  },
  fail(){ toast(L('Озвучення недоступне в цьому браузері. Текст можна прочитати за транскрипцією.','Озвучка недоступна в этом браузере. Текст можно прочитать по транскрипции.')); }
};
window.Speech=Speech; Speech.init();
window.unit=(n,uk,ru)=>plural(n,uk,ru).replace(/^\S+ /,'');

/* ---------- сповіщення ---------- */
window.toast=function(msg){
  let box=document.getElementById('toasts'); if(!box) return;
  const el=document.createElement('div'); el.className='toast'; el.textContent=msg; box.appendChild(el);
  setTimeout(()=>{el.classList.add('out'); setTimeout(()=>el.remove(),300);},3600);
};

/* ---------- іконки ---------- */
const P={home:'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7',
 dict:'M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2zM5 19a2 2 0 0 1 2-2h12M9 8h6M9 12h4',gram:'M4 4h16v16H4zM4 10h16M10 4v16',
 dumb:'M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12',clip:'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12l2 2 4-4',note:'M6 3h11l3 3v15H6zM6 3v18M10 9h6M10 13h6',
 chart:'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',lib:'M4 4v16M8 4v16M12 6l5 14M12 6l3-1 5 14-3 1M4 4h4M4 20h4',gear:'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
 play:'M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
 check:'M5 12l5 5 9-10',lock:'M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3',menu:'M4 7h16M4 12h16M4 17h16',sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
 moon:'M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z',right:'M9 6l6 6-6 6',left:'M15 6l-6 6 6 6',x:'M6 6l12 12M18 6L6 18',search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4',
 plus:'M12 5v14M5 12h14',trash:'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13',edit:'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',flame:'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
 clock:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8v4l3 2',flag:'M5 21V4M5 4h11l-2 4 2 4H5',layers:'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',trophy:'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4a4 4 0 0 0 4 4M16 6h4a4 4 0 0 1-4 4M12 13v4M8 20h8',
 ext:'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',cards:'M7 5h13v12H7zM4 8v12h13',target:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01',cloud:'M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9z',ear:'M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5 2M10 10a2 2 0 0 1 4 0',mix:'M4 7h4l8 10h4M4 17h4l2-2.5M14 9.5L16 7h4M18 5l2 2-2 2M18 15l2 2-2 2'};
window.ic=(n,cls)=>`<svg class="ic ${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]||''}"/></svg>`;

/* спільні шматочки розмітки */
window.artChip=w=>w.art?`<span class="art art-${w.art}">${w.art}</span>`:'';
window.sayBtn=(text,cls)=>`<button class="icon-btn say ${cls||''}" data-act="say" data-text="${esc(text)}" title="${L('Прослухати','Прослушать')}" aria-label="${L('Прослухати','Прослушать')}">${ic('play')}</button>`;
window.favBtn=de=>`<button class="icon-btn fav ${(S.words[de]||{}).fav?'on':''}" data-act="fav" data-de="${esc(de)}" title="${L('В обране','В избранное')}" aria-label="${L('В обране','В избранное')}">${ic('star')}</button>`;
})();
