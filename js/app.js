/* Каркас застосунку: навігація, маршрути, спільні дії, Головна, Уроки, сторінка уроку.
   Кожна сторінка — функція Pages.<name>(view, arg). Нову сторінку достатньо додати в NAV і Pages. */
(function(){
'use strict';
const NAV=[['home','home',['Головна','Главная']],['lessons','book',['Уроки','Уроки']],['dictionary','dict',['Словник','Словарь']],['grammar','gram',['Граматика','Грамматика']],
 ['training','dumb',['Тренування','Тренировка']],['homework','clip',['Домашні завдання','Домашние задания']],['notebook','note',['Мій зошит','Моя тетрадь']],
 ['progress','chart',['Прогрес','Прогресс']],['materials','lib',['Додаткові матеріали','Дополнительные материалы']],['prefs','gear',['Налаштування','Настройки']]];
window.Pages={}; window.ACT={}; window.INP={}; window.UI={};
const $=s=>document.querySelector(s);

window.App={
  applyTheme(){ const r=document.documentElement; if(S.theme==='auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme',S.theme); },
  isDark(){ return S.theme==='dark'||(S.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches); },
  shell(){
    const cur=this.route().name;
    $('#nav').innerHTML=NAV.map(n=>`<a href="#${n[0]}" class="nav-a ${cur===n[0]||(n[0]==='lessons'&&cur==='lesson')?'on':''}">${ic(n[1])}<span>${B(n[2])}</span></a>`).join('');
    const tools=`<button class="tool" data-act="lang" title="${L('Мова інтерфейсу','Язык интерфейса')}"><b>${S.lang==='ru'?'RU':'UA'}</b></button><button class="tool" data-act="theme" title="${L('Тема','Тема')}">${ic(this.isDark()?'sun':'moon')}</button>`;
    $('#sideTools').innerHTML=tools; $('#topTools').innerHTML=tools;
    $('#sideLevel').innerHTML=`<span class="lvl">${S.level}</span><span>${L('урок','урок')} ${Math.min(currentLessonId(),LESSONS.length)} / ${LESSONS.length}</span>`;
  },
  route(){ const h=(location.hash||'#home').slice(1); const m=h.match(/^([a-z]+)(?:-(.+))?$/)||[0,'home']; return {name:Pages[m[1]]?m[1]:'home',arg:m[2]}; },
  render(){ const r=this.route(); document.body.classList.remove('nav-open'); this.shell(); const v=$('#view'); v.className='view page-'+r.name; Pages[r.name](v,r.arg); },
  refresh(){ this.applyTheme(); this.render(); },
  go(h){ if(location.hash==='#'+h) this.render(); else location.hash=h; },
  modal(html){ $('#modalBody').innerHTML=html; $('#modal').hidden=false; },
  closeModal(){ $('#modal').hidden=true; $('#modalBody').innerHTML=''; }
};

/* ---------- спільні дії ---------- */
ACT.say=el=>Speech.say(el.dataset.text);
ACT.fav=el=>{ el.classList.toggle('on',!!toggleFav(el.dataset.de)); };
ACT.lang=()=>{ S.lang=S.lang==='ru'?'uk':'ru'; save(); App.refresh(); };
ACT.theme=()=>{ S.theme=App.isDark()?'light':'dark'; save(); App.refresh(); };
ACT.menu=()=>document.body.classList.toggle('nav-open');
ACT.closeModal=()=>App.closeModal();
ACT.rule=el=>{ const g=gram(el.dataset.id); App.modal(`<h2>${esc(B(g.t))}</h2>${grammarBody(g)}<p><a class="btn" href="#grammar-${g.id}" data-act="closeModal">${L('Відкрити тему з вправами','Открыть тему с упражнениями')}</a></p>`); };
ACT.wstatus=el=>{ setWordStatus(el.dataset.de,el.dataset.s); checkAchievements(); const box=el.closest('.wstat'); if(box) box.outerHTML=wordStatusBtns(el.dataset.de); };

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const f=ACT[el.dataset.act]; if(f){ if(el.tagName!=='A') e.preventDefault(); f(el,e); }
});
document.addEventListener('input',e=>{ const el=e.target.closest('[data-in]'); if(el&&INP[el.dataset.in]) INP[el.dataset.in](el,e); });
document.addEventListener('change',e=>{ const el=e.target.closest('[data-ch]'); if(el&&INP[el.dataset.ch]) INP[el.dataset.ch](el,e); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ App.closeModal(); document.body.classList.remove('nav-open'); } });
window.addEventListener('hashchange',()=>{ App.render(); window.scrollTo(0,0); });

/* ---------- спільні компоненти ---------- */
window.wordStatusBtns=de=>{ const s=(S.words[de]||{}).s;
  return `<span class="wstat seg sm"><button class="${s==='learn'?'on':''}" data-act="wstatus" data-de="${esc(de)}" data-s="learn">${L('Вивчаю','Изучаю')}</button><button class="${s==='know'?'on':''}" data-act="wstatus" data-de="${esc(de)}" data-s="know">${L('Знаю','Знаю')}</button></span>`; };
window.wordCard=function(w,o){
  return `<article class="word"><div class="word-top"><div class="word-de">${artChip(w)}<b>${esc(w.bare)}</b>${w.pl?`<span class="pl">${w.pl==='Pl.'?L('лише множина','только мн. число'):'Pl. '+esc(w.pl)}</span>`:''}</div><div class="word-btns">${sayBtn(w.de)}${favBtn(w.de)}</div></div>
    <div class="word-tr">${esc(B(w.tr))} <span class="pron">[${esc(w.pron)}]</span></div>
    <div class="word-ex"><span>${esc(w.ex)}</span>${sayBtn(w.ex,'sm')}<small>${esc(B(w.exTr))}</small></div>
    <div class="word-foot">${o&&o.meta?`<span class="chip">${esc(B(CATS[w.cat]))}</span><span class="chip">${w.lvl}</span>`:''}${wordStatusBtns(w.de)}</div></article>`;
};
window.grammarBody=function(g){
  return `<p class="g-rule">${esc(B(g.rule))}</p><p>${esc(B(g.exp))}</p>
    <div class="tbl-wrap"><table class="tbl"><thead><tr>${g.tbl[0].map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${g.tbl.slice(1).map(r=>`<tr>${r.map((c,i)=>i?`<td>${esc(c)}</td>`:`<th>${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>
    <h4>${L('Приклади','Примеры')}</h4><ul class="ex-list">${g.examples.map(x=>`<li><span><b>${esc(x.de)}</b>${sayBtn(x.de,'sm')}</span><small>${esc(B(x.tr))}</small></li>`).join('')}</ul>
    <h4>${L('Порядок слів','Порядок слов')}</h4><p class="g-order">${esc(B(g.ord))}</p>
    <h4>${L('Типові помилки','Типичные ошибки')}</h4><div class="mist">${g.mistakes.map(m=>`<div class="mist-row"><div class="m-bad"><span>✗</span> ${esc(m.bad)}</div><div class="m-good"><span>✓</span> ${esc(m.good)}</div><small>${esc(B(m.why))}</small></div>`).join('')}</div>`;
};
window.ring=(pct,label)=>`<div class="ring" style="--p:${pct}"><b>${pct}%</b>${label?`<small>${label}</small>`:''}</div>`;
window.planMark=k=>{ const p=S.plan[today()]||(S.plan={[today()]:{}})[today()]; p[k]=1; save(); };
window.hwItems=function(l){
  const src=[...l.phrases,...l.words.map(w=>({de:w.ex,tr:w.exTr}))].filter(s=>!/[…\/]/.test(s.de)&&s.de.split(' ').length>=3);
  const items=[src[0],src[1],src[l.phrases.length]||src[2],src[l.phrases.length+3]||src[3]].filter(Boolean);
  return [...new Set(items)].slice(0,4);
};
function wordOfDay(){
  const pool=WORDS.filter(w=>w.lvl==='A1'&&w.lesson>=Math.max(1,currentLessonId()-2)); const src=pool.length>10?pool:WORDS;
  const n=Math.floor(new Date(today()+'T12:00').getTime()/864e5); return src[n%src.length];
}

/* ====================== ГОЛОВНА ====================== */
Pages.home=function(v){
  const st=Stats(), cid=currentLessonId(), next=lessonById(cid), finished=allDone();
  const last=[...LESSONS].reverse().find(l=>isDone(l.id)), w=wordOfDay(), p=S.plan[today()]||{};
  const n=Math.floor(Date.now()/864e5), motto=B(MOTTO[n%MOTTO.length]);
  const acc=st.exTotal?Math.round(st.exOk/st.exTotal*100):null;
  const nextAch=ACHIEVEMENTS.filter(a=>!S.ach[a.id]).map(a=>({a,r:Math.min(1,a.val(st)/a.need)})).sort((x,y)=>y.r-x.r)[0];
  const lastAch=Object.keys(S.ach).sort((a,b)=>S.ach[b].localeCompare(S.ach[a]))[0];
  const plan=[['w','cards',L('Повторити слова','Повторить слова'),'5 '+L('хв','мин'),'#training-words'],
    ['l','book',finished?L('Повторити будь-який урок','Повторить любой урок'):L('Новий урок','Новый урок')+' №'+cid,'15 '+L('хв','мин'),finished?'#lessons':'#lesson-'+cid],
    ['t','dumb',L('Невелика вправа','Небольшое упражнение'),'5 '+L('хв','мин'),'#training-mixed'],
    ['h','clip',L('Коротка практика: домашнє завдання','Короткая практика: домашнее задание'),'5 '+L('хв','мин'),'#homework']];
  v.innerHTML=`
  <header class="hero"><div><p class="eyebrow">${esc(fmtDate(new Date(),{weekday:'long',day:'numeric',month:'long'}))}</p>
    <h1>${L('Привіт','Привет')}${S.name?', '+esc(S.name):''}! <span class="hero-de">Guten Tag!</span></h1><p class="lead">${esc(motto)}</p></div>
    <div class="hero-stats"><div><b>${S.level}</b><small>${L('рівень','уровень')}</small></div><div><b>${st.daysSince}</b><small>${L('день навчання','день обучения')}</small></div><div><b>${st.streak}</b><small>${unit(st.streak,['день поспіль','дні поспіль','днів поспіль'],['день подряд','дня подряд','дней подряд'])}</small></div></div></header>
  <div class="grid home-grid">
    <section class="card accent span2"><div class="card-h"><h2>${L('Продовжити навчання','Продолжить обучение')}</h2><span class="lvl">${S.level}</span></div>
      ${finished?`<p>${L('Усі уроки рівня A1 пройдено. Вітаємо! Закріплюйте знання в тренуваннях.','Все уроки уровня A1 пройдены. Поздравляем! Закрепляйте знания в тренировках.')}</p><a class="btn primary" href="#training">${L('До тренувань','К тренировкам')} ${ic('right')}</a>`:
      `<div class="cont"><div class="cont-num">${next.id}</div><div class="cont-body"><small>${L('Наступний урок','Следующий урок')} · ${esc(B(MODS[next.m]))}</small><h3>${esc(B(next.t))}</h3><p>${esc(B(next.d))}</p>
        <p class="muted sm">${last?L('Останній пройдений: ','Последний пройденный: ')+'№'+last.id+' «'+esc(B(last.t))+'»':''} · ${next.min} ${L('хв','мин')}${lst(cid).st==='prog'?' · '+L('розпочато','начат'):''}</p></div></div>
      <a class="btn primary lg" href="#lesson-${cid}">${L('Продовжити','Продолжить')} ${ic('right')}</a>`}</section>
    <section class="card"><div class="card-h"><h2>${L('Мій прогрес','Мой прогресс')}</h2><a class="more" href="#progress">${L('Докладніше','Подробнее')}</a></div>
      <div class="prog-row">${ring(st.pct,S.level)}<ul class="kv"><li><span>${L('Уроків завершено','Уроков завершено')}</span><b>${st.lessonsDone} / ${st.lessonsTotal}</b></li><li><span>${L('Слів вивчено','Слов выучено')}</span><b>${st.wordsKnown}</b></li><li><span>${L('Точність у вправах','Точность в упражнениях')}</span><b>${acc==null?'—':acc+'%'}</b></li><li><span>${L('Рівень','Уровень')}</span><b>${S.level}</b></li></ul></div></section>
    <section class="card wod"><div class="card-h"><h2>${L('Слово дня','Слово дня')}</h2><div>${sayBtn(w.de)}${favBtn(w.de)}</div></div>
      <div class="wod-de">${artChip(w)}<b>${esc(w.bare)}</b></div><div class="word-tr">${esc(B(w.tr))} <span class="pron">[${esc(w.pron)}]</span></div>
      <div class="word-ex"><span>${esc(w.ex)}</span>${sayBtn(w.ex,'sm')}<small>${esc(B(w.exTr))}</small></div></section>
    <section class="card"><div class="card-h"><h2>${L('План на сьогодні','План на сегодня')}</h2><span class="muted sm">${S.goalMin-5}–${S.goalMin+5} ${L('хв','мин')}</span></div>
      <ul class="plan">${plan.map(x=>`<li class="${p[x[0]]?'done':''}"><a href="${x[4]}"><span class="tick">${p[x[0]]?ic('check'):ic(x[1])}</span><span>${x[2]}</span><small>${x[3]}</small></a></li>`).join('')}</ul>
      <p class="muted sm">${L('Сьогодні ви займалися','Сегодня вы занимались')}: ${Math.round((S.days[today()]||{}).min||0)} ${L('хв','мин')}</p></section>
    <section class="card"><div class="card-h"><h2>${L('Мотивація','Мотивация')}</h2><a class="more" href="#progress">${L('Усі досягнення','Все достижения')}</a></div>
      ${lastAch?`<p class="ach-last">${ic('trophy')} ${L('Останнє досягнення:','Последнее достижение:')} <b>${esc(B(ACHIEVEMENTS.find(a=>a.id===lastAch).t))}</b></p>`:`<p class="muted">${L('Перше досягнення вже близько.','Первое достижение уже близко.')}</p>`}
      ${nextAch?`<p class="sm">${L('Наступна мета:','Следующая цель:')} <b>${esc(B(nextAch.a.t))}</b> — ${esc(B(nextAch.a.d))}</p><div class="bar"><i style="width:${Math.round(nextAch.r*100)}%"></i></div><p class="muted sm">${Math.min(nextAch.a.val(st),nextAch.a.need)} / ${nextAch.a.need}</p>`:''}
      <p class="quote">„Übung macht den Meister.“ <small>${L('Майстром робить практика.','Мастером делает практика.')}</small></p></section>
  </div>`;
  checkAchievements();
};

/* ====================== УРОКИ ====================== */
Pages.lessons=function(v){
  const lvl=UI.lvl||'A1', cid=currentLessonId(), a1done=allDone();
  const tabs=LEVELS.map(x=>{ const open=x.id==='A1'||(x.id==='A2'&&a1done); return `<button class="tab ${lvl===x.id?'on':''}" data-act="lvl" data-id="${x.id}">${open?'':ic('lock')}<b>${x.id}</b><span>${B(x.t)}</span></button>`; }).join('');
  let body='';
  if(lvl==='A1'){
    body=MODS.map((m,i)=>{ const ls=LESSONS.filter(l=>l.m===i), dn=ls.filter(l=>isDone(l.id)).length;
      return `<section class="module"><header class="mod-h"><span class="mod-n">${i+1}</span><h2>${esc(B(m))}</h2><span class="mod-p ${dn===ls.length?'full':''}">${dn} / ${ls.length}</span></header>
      <div class="lrows">${ls.map(l=>{ const done=isDone(l.id), isNext=l.id===cid&&!done, locked=l.id>cid, prog=lst(l.id).st==='prog';
        const stt=done?['done',L('Завершено','Завершён')]:prog?['prog',L('У процесі','В процессе')]:['new',L('Не розпочато','Не начат')];
        return `<div class="lrow ${done?'is-done':''} ${isNext?'is-next':''} ${locked?'is-locked':''}"><div class="l-num">${done?ic('check'):l.id}</div>
          <div class="l-main"><h3><span class="l-no">№${l.id}</span> ${esc(B(l.t))}</h3><p>${esc(B(l.d))}</p><div class="l-meta"><span>${ic('gram')} ${esc(B(gram(l.g).t))}</span><span>${ic('clock')} ${l.min} ${L('хв','мин')}</span><span class="st st-${stt[0]}">${stt[1]}</span>${isNext?`<span class="st st-next">${L('Наступний','Следующий')}</span>`:''}</div></div>
          ${locked?`<span class="l-lock" title="${L('Відкриється після попередніх уроків','Откроется после предыдущих уроков')}">${ic('lock')}</span>`:`<a class="btn ${isNext?'primary':''}" href="#lesson-${l.id}">${done?L('Повторити','Повторить'):prog?L('Продовжити','Продолжить'):L('Відкрити','Открыть')}</a>`}</div>`; }).join('')}</div></section>`; }).join('');
  } else {
    const x=LEVELS.find(q=>q.id===lvl), open=lvl==='A2'&&a1done;
    body=`<section class="card locked-lvl"><div class="lock-big">${open?ic('flag'):ic('lock')}</div><h2>${lvl} · ${esc(B(x.t))}</h2><p>${esc(B(x.d))}</p>
      <p class="muted">${open?L('Рівень A1 завершено — шлях до A2 відкрито. Поки нові уроки додаються, закріплюйте A1 і вчіть слова рівня A2 у словнику й тренуваннях.','Уровень A1 завершён — путь к A2 открыт. Пока новые уроки добавляются, закрепляйте A1 и учите слова уровня A2 в словаре и тренировках.'):lvl==='A2'?L('Відкриється, щойно ви завершите всі уроки A1. Залишилося уроків: ','Откроется, как только вы завершите все уроки A1. Осталось уроков: ')+(LESSONS.length-Stats().lessonsDone):L('Наступний етап. Відкриється після попереднього рівня.','Следующий этап. Откроется после предыдущего уровня.')}</p>
      ${x.plan?`<h4>${L('Програма рівня','Программа уровня')}</h4><ol class="plan-list">${x.plan.map(t=>`<li>${esc(B(t))}</li>`).join('')}</ol>`:''}
      ${open?`<p><a class="btn primary" href="#training">${L('Тренування зі словами A2','Тренировка со словами A2')}</a></p>`:''}</section>`;
  }
  v.innerHTML=`<header class="page-h"><h1>${L('Уроки','Уроки')}</h1><p class="lead">${L('Послідовна програма: від простого до складного, 20–30 хвилин на урок.','Последовательная программа: от простого к сложному, 20–30 минут на урок.')}</p></header><div class="tabs lvl-tabs">${tabs}</div>${body}`;
  if(lvl==='A1'&&!UI.noScroll){ const n=v.querySelector('.is-next'); if(n&&cid>3) setTimeout(()=>n.scrollIntoView({block:'center'}),0); }
};
ACT.lvl=el=>{ UI.lvl=el.dataset.id; UI.noScroll=1; App.render(); UI.noScroll=0; };

/* ====================== УРОК ====================== */
const PARTS=()=>[L('Повторення','Повторение'),L('Нові слова','Новые слова'),L('Фрази','Фразы'),L('Граматика','Грамматика'),L('Діалог','Диалог'),L('Практика','Практика'),L('Міні-завдання','Мини-задание'),L('Домашнє завдання','Домашнее задание')];
Pages.lesson=function(v,arg){
  const l=lessonById(+arg);
  if(!l||l.id>currentLessonId()){ v.innerHTML=`<div class="card"><h2>${L('Цей урок ще закритий','Этот урок ещё закрыт')}</h2><p>${L('Спершу завершіть попередні уроки — так матеріал засвоюється найкраще.','Сначала завершите предыдущие уроки — так материал усваивается лучше всего.')}</p><a class="btn primary" href="#lesson-${currentLessonId()}">${L('До поточного уроку','К текущему уроку')}</a></div>`; return; }
  const st=S.lessons[l.id]||(S.lessons[l.id]={}); if(!st.st){ st.st='prog'; st.part=0; save(); }
  let part=Math.min(7,st.part||0); const names=PARTS(), done=st.st==='done';
  const hw=S.hw[l.id]||{};
  v.innerHTML=`<a class="back" href="#lessons">${ic('left')} ${L('Усі уроки','Все уроки')}</a>
    <header class="page-h lesson-h"><p class="eyebrow">${L('Урок','Урок')} ${l.id} · ${esc(B(MODS[l.m]))} · ${l.min} ${L('хв','мин')}</p><h1>${esc(B(l.t))}</h1><p class="lead">${esc(B(l.d))}</p>${done?`<span class="st st-done">${ic('check')} ${L('Завершено','Завершён')}</span>`:''}</header>
    <nav class="steps" aria-label="${L('Частини уроку','Части урока')}">${names.map((n,i)=>`<button class="step ${i===part?'on':''} ${i<part?'past':''}" data-act="part" data-i="${i}"><i>${i+1}</i><span>${n}</span></button>`).join('')}</nav>
    <section class="card part" id="part"></section>
    <div class="part-nav">${part>0?`<button class="btn" data-act="part" data-i="${part-1}">${ic('left')} ${names[part-1]}</button>`:'<span></span>'}${part<7?`<button class="btn primary" data-act="part" data-i="${part+1}">${names[part+1]} ${ic('right')}</button>`:''}</div>`;
  const box=v.querySelector('#part'); const head=(t,sub)=>`<h2><span class="part-n">${part+1}</span> ${t}</h2>${sub?`<p class="muted">${sub}</p>`:''}`;
  if(part===0){
    const qs=reviewQuiz(l);
    box.innerHTML=head(names[0],L('Коротко згадуємо попередні уроки, перш ніж іти далі.','Коротко вспоминаем предыдущие уроки, прежде чем идти дальше.'))+(qs.length?'<div id="run"></div>':`<p>${L('Це початок курсу — повторювати ще нічого. Сміливо переходьте до нових слів!','Это начало курса — повторять ещё нечего. Смело переходите к новым словам!')}</p>`);
    if(qs.length) Runner.mount(box.querySelector('#run'),qs,{onDone:res=>{ box.querySelector('#run').innerHTML=`<div class="fb good"><div class="fb-title">${ic('check')} ${L('Повторення завершено','Повторение завершено')}: ${res.filter(r=>r.ok).length} / ${res.length}</div><button class="btn primary" data-act="part" data-i="1">${names[1]} ${ic('right')}</button></div>`; }});
  } else if(part===1){
    box.innerHTML=head(names[1],L('Прослухайте кожне слово і повторіть уголос. Іменники вчіть разом з артиклем.','Прослушайте каждое слово и повторите вслух. Существительные учите вместе с артиклем.'))+`<div class="words">${l.words.map(w=>wordCard(w)).join('')}</div>`;
  } else if(part===2){
    box.innerHTML=head(names[2],L('Готові вирази для реальних ситуацій.','Готовые выражения для реальных ситуаций.'))+`<ul class="phrases">${l.phrases.map(p=>`<li><div><b>${esc(p.de)}</b><small>${esc(B(p.tr))}</small></div>${sayBtn(p.de)}</li>`).join('')}</ul>`;
  } else if(part===3){
    const g=gram(l.g);
    box.innerHTML=head(names[3]+': '+esc(B(g.t)))+(l.gf?`<p class="focus">${ic('target')} ${esc(B(l.gf))}</p>`:'')+grammarBody(g)+`<p><a class="link-btn" href="#grammar-${g.id}">${ic('gram')} ${L('Уся тема в довіднику з вправами','Вся тема в справочнике с упражнениями')}</a></p>`;
  } else if(part===4){
    box.innerHTML=head(names[4],L('Прослухайте діалог, потім прочитайте його вголос за ролями.','Прослушайте диалог, затем прочитайте его вслух по ролям.'))+
      `<div class="dlg-tools"><button class="btn" data-act="dlgAll" data-id="${l.id}">${ic('play')} ${L('Прослухати весь діалог','Прослушать весь диалог')}</button><button class="btn" data-act="dlgTr">${ic('eye')} ${L('Сховати / показати переклад','Скрыть / показать перевод')}</button></div>
      <div class="dialog" id="dlg">${l.dialog.map((d,i)=>`<div class="line ${l.dialog.findIndex(x=>x.who===d.who)===0?'a':'b'}"><span class="who">${esc(d.who)}</span><div class="bubble"><b>${esc(d.de)}</b>${sayBtn(d.de,'sm')}<small>${esc(B(d.tr))}</small></div></div>`).join('')}</div>`;
  } else if(part===5){
    box.innerHTML=head(names[5],L('Помилки тут — частина навчання: після кожної ви побачите пояснення.','Ошибки здесь — часть учёбы: после каждой вы увидите объяснение.'))+(st.score!=null?`<p class="muted sm">${L('Попередній результат:','Предыдущий результат:')} ${st.score}%</p>`:'')+'<div id="run"></div>';
    Runner.mount(box.querySelector('#run'),lessonQuiz(l),{onDone:res=>{
      const okN=res.filter(r=>r.ok).length; st.score=Math.round(okN/res.length*100);
      S.tests.push({d:today(),mode:'lesson',lesson:l.id,total:res.length,ok:okN}); planMark('t'); save();
      box.querySelector('#run').innerHTML=resultHTML(res,`<div class="res-btns"><button class="btn" data-act="part" data-i="5">${L('Пройти ще раз','Пройти ещё раз')}</button><button class="btn primary" data-act="part" data-i="6">${names[6]} ${ic('right')}</button></div>`);
      checkAchievements();
    }});
  } else if(part===6){
    box.innerHTML=head(names[6],L('Невелике завдання для самостійного виконання.','Небольшое задание для самостоятельного выполнения.'))+`<p class="task">${esc(B(l.mini))}</p>
      <label class="lbl" for="mini-${l.id}">${L('Нотатки до завдання (зберігаються автоматично)','Заметки к заданию (сохраняются автоматически)')}</label>
      <textarea class="input" id="mini-${l.id}" rows="4" data-in="mini" data-id="${l.id}" placeholder="${L('Можна записати, що ви сказали…','Можно записать, что вы сказали…')}">${esc(hw.mini||'')}</textarea>
      <label class="check"><input type="checkbox" id="minidone-${l.id}" data-ch="miniDone" data-id="${l.id}" ${hw.miniDone?'checked':''}> <span>${L('Я виконала це завдання','Я выполнила это задание')}</span></label>`;
  } else {
    const items=hwItems(l);
    box.innerHTML=head(names[7],L('Завдання збережено в розділі «Домашні завдання» — виконайте його, коли буде зручно.','Задание сохранено в разделе «Домашние задания» — выполните его, когда будет удобно.'))+
      `<div class="hw-prev"><p><b>1.</b> ${L('Перекладіть німецькою:','Переведите на немецкий:')}</p><ul>${items.map(x=>`<li>${esc(B(x.tr))}</li>`).join('')}</ul><p><b>2.</b> ${esc(B(l.hw))}</p></div>
      <p><a class="btn" href="#homework-${l.id}">${ic('clip')} ${L('Виконати зараз','Выполнить сейчас')}</a></p>
      <div class="finish">${done?`<p class="fb good"><span class="fb-title">${ic('check')} ${L('Урок завершено','Урок завершён')}${st.date?' · '+fmtDate(st.date):''}</span></p>`:`<p>${L('Якщо ви пройшли всі частини, позначте урок завершеним — відкриється наступний.','Если вы прошли все части, отметьте урок завершённым — откроется следующий.')}</p>`}
      ${done?(l.id<LESSONS.length?`<a class="btn primary lg" href="#lesson-${l.id+1}">${L('Наступний урок','Следующий урок')} №${l.id+1} ${ic('right')}</a>`:`<a class="btn primary lg" href="#progress">${L('Переглянути прогрес','Посмотреть прогресс')}</a>`):`<button class="btn primary lg" data-act="finish" data-id="${l.id}">${ic('check')} ${L('Завершити урок','Завершить урок')}</button>`}</div>`;
  }
};
ACT.part=el=>{ const id=+App.route().arg, st=S.lessons[id]; if(!st) return; st.part=+el.dataset.i; save(); try{speechSynthesis.cancel();}catch(e){} App.render(); const s=document.querySelector('.steps'); if(s) s.scrollIntoView({block:'start'}); };
ACT.dlgTr=()=>document.getElementById('dlg').classList.toggle('no-tr');
ACT.dlgAll=el=>{ const l=lessonById(+el.dataset.id);
  if(Speech.ok){ try{ speechSynthesis.cancel(); l.dialog.forEach(d=>{ const u=new SpeechSynthesisUtterance(d.de); u.lang='de-DE'; if(Speech.voice) u.voice=Speech.voice; u.rate=S.rate||0.9; speechSynthesis.speak(u); }); return; }catch(e){} }
  Speech.say(l.dialog.map(d=>d.de).join(' ')); };
INP.mini=el=>{ const h=S.hw[el.dataset.id]||(S.hw[el.dataset.id]={}); h.mini=el.value; touchDay(); save(); };
INP.miniDone=el=>{ const h=S.hw[el.dataset.id]||(S.hw[el.dataset.id]={}); h.miniDone=el.checked?1:0; if(el.checked) planMark('h'); save(); };
ACT.finish=el=>{
  const id=+el.dataset.id, st=lst(id);
  if(st.score==null){ toast(L('Спершу пройдіть практику (частина 6) — це займе кілька хвилин.','Сначала пройдите практику (часть 6) — это займёт несколько минут.')); return; }
  completeLesson(id); day().lesson=(day().lesson||0)+1; planMark('l'); save();
  toast(L('Урок завершено! Прогрес оновлено.','Урок завершён! Прогресс обновлён.')); checkAchievements(); App.render();
};

document.addEventListener('DOMContentLoaded',()=>{ if(!S.seeded){ checkAchievements(true); S.seeded=1; save(); } App.applyTheme(); App.render(); Storage.initRemote(); });
})();
