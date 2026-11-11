/* Сторінки: Словник, Граматика, Тренування, Домашні завдання, Зошит, Прогрес, Матеріали, Налаштування */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const head=(t,lead)=>`<header class="page-h"><h1>${t}</h1>${lead?`<p class="lead">${lead}</p>`:''}</header>`;
const seg=(act,cur,opts,cls)=>`<span class="seg ${cls||''}">${opts.map(o=>`<button class="${String(cur)===String(o[0])?'on':''}" data-act="${act}" data-v="${o[0]}">${o[1]}</button>`).join('')}</span>`;

/* ====================== СЛОВНИК ====================== */
UI.dict={q:'',cat:'',lvl:'',st:'',n:40};
function dictFilter(){
  const d=UI.dict, q=d.q.trim().toLowerCase();
  return WORDS.filter(w=>{
    const s=S.words[w.de]||{};
    if(d.cat&&w.cat!==d.cat) return false; if(d.lvl&&w.lvl!==d.lvl) return false;
    if(d.st==='new'&&s.s) return false; if(d.st==='learn'&&s.s!=='learn') return false; if(d.st==='know'&&s.s!=='know') return false;
    if(d.st==='unknown'&&s.s==='know') return false; if(d.st==='fav'&&!s.fav) return false; if(d.st==='hard'&&!isHard(w.de)) return false;
    return !q||w.de.toLowerCase().includes(q)||w.tr[0].toLowerCase().includes(q)||w.tr[1].toLowerCase().includes(q);
  });
}
function dictList(){
  const list=dictFilter(), d=UI.dict, box=$('#dictList'); if(!box) return;
  $('#dictCount').textContent=L('Знайдено слів: ','Найдено слов: ')+list.length;
  box.innerHTML=list.length?`<div class="words">${list.slice(0,d.n).map(w=>wordCard(w,{meta:1})).join('')}</div>${list.length>d.n?`<p class="center"><button class="btn" data-act="dictMore">${L('Показати ще','Показать ещё')} (${list.length-d.n})</button></p>`:''}`
    :`<div class="empty">${L('Нічого не знайдено. Спробуйте інший запит або зніміть фільтри.','Ничего не найдено. Попробуйте другой запрос или снимите фильтры.')}<br><button class="btn" data-act="dictReset">${L('Скинути фільтри','Сбросить фильтры')}</button></div>`;
}
Pages.dictionary=function(v){
  const d=UI.dict, st=Stats();
  if(UI.cards){ cardsView(v); return; }
  const sel=(id,cur,opts)=>`<select class="input" id="${id}" data-ch="dictSel" data-k="${id.slice(4)}">${opts.map(o=>`<option value="${o[0]}" ${cur===o[0]?'selected':''}>${esc(o[1])}</option>`).join('')}</select>`;
  v.innerHTML=head(L('Словник','Словарь'),L('Німецько-український словник курсу. Перемкніть мову інтерфейсу — і переклад стане російським.','Немецко-русский словарь курса. Переключите язык интерфейса — и перевод станет украинским.'))+
  `<div class="dict-sum"><span class="pill">${L('Усього','Всего')}: ${WORDS.length}</span><span class="pill ok">${L('Знаю','Знаю')}: ${st.wordsKnown}</span><span class="pill">${L('Вивчаю','Изучаю')}: ${st.wordsLearn}</span><span class="pill bad">${L('Складні','Трудные')}: ${WORDS.filter(w=>isHard(w.de)).length}</span></div>
  <div class="toolbar"><label class="search">${ic('search')}<input class="input" id="dictQ" type="search" data-in="dictQ" value="${esc(d.q)}" placeholder="${L('Пошук німецькою або за перекладом…','Поиск по-немецки или по переводу…')}"></label>
    ${sel('dictcat',d.cat,[['',L('Усі теми','Все темы')],...Object.keys(CATS).map(k=>[k,B(CATS[k])])])}
    ${sel('dictlvl',d.lvl,[['',L('Усі рівні','Все уровни')],['A1','A1'],['A2','A2']])}
    ${sel('dictst',d.st,[['',L('Усі слова','Все слова')],['unknown',L('Лише незнайомі','Только незнакомые')],['new',L('Ще не вчила','Ещё не учила')],['learn',L('Вивчаю','Изучаю')],['know',L('Знаю','Знаю')],['fav',L('Обране','Избранное')],['hard',L('Часто забуваю','Часто забываю')]])}
    <button class="btn primary" data-act="cardsStart">${ic('cards')} ${L('Картки','Карточки')}</button></div>
  <p class="muted sm" id="dictCount"></p><div id="dictList"></div>`;
  dictList();
};
INP.dictQ=el=>{ UI.dict.q=el.value; UI.dict.n=40; dictList(); };
INP.dictSel=el=>{ UI.dict[el.dataset.k]=el.value; UI.dict.n=40; dictList(); };
ACT.dictMore=()=>{ UI.dict.n+=40; dictList(); };
ACT.dictReset=()=>{ UI.dict={q:'',cat:'',lvl:'',st:'',n:40}; App.render(); };
ACT.cardsStart=()=>{
  let list=dictFilter(); if(!list.length){ toast(L('Немає слів для карток — змініть фільтри.','Нет слов для карточек — измените фильтры.')); return; }
  const hard=list.filter(w=>isHard(w.de)); list=[...new Set([...shuffle(hard),...shuffle(list)])].slice(0,20);
  UI.cards={list,i:0,flip:false,ok:0}; App.render();
};
function cardsView(v){
  const c=UI.cards;
  if(c.i>=c.list.length){
    v.innerHTML=head(L('Картки','Карточки'))+`<div class="card center"><div class="res-ring" style="--p:${Math.round(c.ok/c.list.length*100)}"><b>${c.ok}/${c.list.length}</b></div><h3>${L('Серію завершено','Серия завершена')}</h3><p class="muted">${L('Слова, які ви не згадали, зʼявлятимуться частіше.','Слова, которые вы не вспомнили, будут появляться чаще.')}</p><div class="res-btns"><button class="btn" data-act="cardsExit">${L('До словника','К словарю')}</button><button class="btn primary" data-act="cardsStart">${L('Ще серія','Ещё серия')}</button></div></div>`;
    return;
  }
  const w=c.list[c.i];
  v.innerHTML=head(L('Картки','Карточки'),L('Згадайте переклад, потім натисніть на картку.','Вспомните перевод, затем нажмите на карточку.'))+
  `<div class="flash-wrap"><div class="bar"><i style="width:${c.i/c.list.length*100}%"></i></div><p class="muted sm center">${c.i+1} / ${c.list.length}</p>
    <button class="flash ${c.flip?'flip':''}" data-act="cardFlip" aria-label="${L('Перевернути картку','Перевернуть карточку')}">
      <span class="flash-de">${artChip(w)} ${esc(w.bare)}</span>
      ${c.flip?`<span class="flash-tr">${esc(B(w.tr))}</span><span class="pron">[${esc(w.pron)}]</span><span class="flash-ex">${esc(w.ex)}<small>${esc(B(w.exTr))}</small></span>`:`<span class="muted sm">${L('Натисніть, щоб побачити переклад','Нажмите, чтобы увидеть перевод')}</span>`}</button>
    <div class="flash-btns">${sayBtn(w.de)}${c.flip?`<button class="btn" data-act="cardAns" data-ok="0">${L('Не згадала','Не вспомнила')}</button><button class="btn primary" data-act="cardAns" data-ok="1">${ic('check')} ${L('Знаю','Знаю')}</button>`:`<button class="btn primary" data-act="cardFlip">${L('Показати переклад','Показать перевод')}</button>`}${favBtn(w.de)}</div>
    <p class="center"><button class="link-btn" data-act="cardsExit">${L('Завершити і повернутися до словника','Завершить и вернуться к словарю')}</button></p></div>`;
}
ACT.cardFlip=()=>{ UI.cards.flip=!UI.cards.flip; App.render(); };
ACT.cardAns=el=>{ const c=UI.cards, w=c.list[c.i], ok=el.dataset.ok==='1'; wordResult(w.de,ok); day().ex++; if(ok){ day().ok++; c.ok++; if((S.words[w.de].hit||0)>=2||S.words[w.de].s==='know') setWordStatus(w.de,'know'); } else setWordStatus(w.de,'learn');
  c.i++; c.flip=false; if(c.i>=c.list.length){ planMark('w'); checkAchievements(); } save(); App.render(); };
ACT.cardsExit=()=>{ UI.cards=null; App.render(); };

/* ====================== ГРАМАТИКА ====================== */
UI.gq=''; UI.gfav=false;
function gramList(){
  const q=UI.gq.trim().toLowerCase(), box=$('#gramList'); if(!box) return;
  const list=GRAMMAR.filter(g=>(!UI.gfav||S.gramFav[g.id])&&(!q||(g.t[0]+g.t[1]+g.s[0]+g.s[1]+g.id).toLowerCase().includes(q)));
  const verbs=!UI.gfav&&(!q||'неправильні дієслова неправильные глаголы verben irregular таблиця таблица'.includes(q));
  box.innerHTML=(list.length||verbs)?`<div class="grid g-grid">${list.map((g,i)=>`<a class="card g-card" href="#grammar-${g.id}"><div class="card-h"><span class="lvl">A1</span><button class="icon-btn fav ${S.gramFav[g.id]?'on':''}" data-act="gfav" data-id="${g.id}" aria-label="${L('В обране','В избранное')}">${ic('star')}</button></div><h3>${esc(B(g.t))}</h3><p class="muted">${esc(B(g.s))}</p><span class="sm muted">${g.exercises.length} ${L('вправ','упражнений')}</span></a>`).join('')}
    ${verbs?`<a class="card g-card verbs-card" href="#grammar-verbs"><div class="card-h"><span class="lvl">A1–A2</span>${ic('gram')}</div><h3>${L('Таблиця неправильних дієслів','Таблица неправильных глаголов')}</h3><p class="muted">Infinitiv · Präteritum · Perfekt</p><span class="sm muted">${IRREG_LIST.length} ${L('дієслів','глаголов')}</span></a>`:''}</div>`
    :`<div class="empty">${UI.gfav?L('В обраному поки порожньо. Додайте тему зірочкою.','В избранном пока пусто. Добавьте тему звёздочкой.'):L('Теми не знайдено.','Темы не найдены.')}</div>`;
}
Pages.grammar=function(v,arg){
  if(arg==='verbs') return verbsPage(v);
  const g=arg&&gram(arg);
  if(!g){
    v.innerHTML=head(L('Граматика','Грамматика'),L('Довідник рівня A1: просте пояснення, таблиця, приклади, типові помилки і вправи до кожної теми.','Справочник уровня A1: простое объяснение, таблица, примеры, типичные ошибки и упражнения к каждой теме.'))+
      `<div class="toolbar"><label class="search">${ic('search')}<input class="input" id="gramQ" type="search" data-in="gramQ" value="${esc(UI.gq)}" placeholder="${L('Пошук теми: артиклі, Akkusativ, sein…','Поиск темы: артикли, Akkusativ, sein…')}"></label><button class="btn ${UI.gfav?'primary':''}" data-act="gfavOnly">${ic('star')} ${L('Лише обране','Только избранное')}</button></div><div id="gramList"></div>`;
    gramList(); return;
  }
  const idx=GRAMMAR.indexOf(g), prev=GRAMMAR[idx-1], next=GRAMMAR[idx+1], ls=LESSONS.filter(l=>gram(l.g)===g);
  v.innerHTML=`<a class="back" href="#grammar">${ic('left')} ${L('Усі теми','Все темы')}</a>
    <header class="page-h"><p class="eyebrow">A1 · ${L('Граматика','Грамматика')}</p><h1>${esc(B(g.t))} <button class="icon-btn fav ${S.gramFav[g.id]?'on':''}" data-act="gfav" data-id="${g.id}" aria-label="${L('В обране','В избранное')}">${ic('star')}</button></h1><p class="lead">${esc(B(g.s))}</p></header>
    <section class="card">${grammarBody(g)}${ls.length?`<p class="muted sm">${L('Тема зустрічається в уроках: ','Тема встречается в уроках: ')}${ls.map(l=>'№'+l.id).join(', ')}</p>`:''}</section>
    <section class="card"><h2>${L('Вправи','Упражнения')}</h2><div id="run"></div></section>
    <div class="part-nav">${prev?`<a class="btn" href="#grammar-${prev.id}">${ic('left')} ${esc(B(prev.t))}</a>`:'<span></span>'}${next?`<a class="btn" href="#grammar-${next.id}">${esc(B(next.t))} ${ic('right')}</a>`:''}</div>`;
  const start=()=>Runner.mount($('#run'),shuffle(g.exercises).map(e=>G.gram(g,e)),{onDone:res=>{
    S.tests.push({d:today(),mode:'grammar',topic:g.id,total:res.length,ok:res.filter(r=>r.ok).length}); planMark('t'); save();
    $('#run').innerHTML=resultHTML(res,`<div class="res-btns"><button class="btn primary" id="gAgain">${L('Пройти ще раз','Пройти ещё раз')}</button></div>`); $('#gAgain').onclick=start; checkAchievements(); }});
  start();
};
INP.gramQ=el=>{ UI.gq=el.value; gramList(); };
ACT.gfavOnly=()=>{ UI.gfav=!UI.gfav; App.render(); };
ACT.gfav=(el,e)=>{ e.preventDefault(); e.stopPropagation(); const id=el.dataset.id; if(S.gramFav[id]) delete S.gramFav[id]; else S.gramFav[id]=1; save(); el.classList.toggle('on',!!S.gramFav[id]); if(UI.gfav) gramList(); };
UI.vq='';
function verbRows(){
  const q=UI.vq.trim().toLowerCase(), box=$('#verbRows'); if(!box) return;
  const list=IRREG_LIST.filter(x=>!q||(x.inf+x.pra+x.perf+x.tr[0]+x.tr[1]).toLowerCase().includes(q));
  box.innerHTML=list.map(x=>`<tr><th>${esc(x.inf)} ${sayBtn(x.inf+', '+x.pra+', '+x.perf,'sm')}</th><td>${esc(x.pra)}</td><td>${esc(x.perf)}</td><td>${esc(B(x.tr))}</td></tr>`).join('')||`<tr><td colspan="4" class="muted">${L('Нічого не знайдено','Ничего не найдено')}</td></tr>`;
}
function verbsPage(v){
  v.innerHTML=`<a class="back" href="#grammar">${ic('left')} ${L('Усі теми','Все темы')}</a>`+head(L('Таблиця неправильних дієслів','Таблица неправильных глаголов'),L('Три основні форми найуживаніших дієслів. «ist» у Perfekt означає, що дієслово вживається із sein.','Три основные формы самых употребительных глаголов. «ist» в Perfekt означает, что глагол употребляется с sein.'))+
    `<div class="toolbar"><label class="search">${ic('search')}<input class="input" id="verbQ" type="search" data-in="verbQ" value="${esc(UI.vq)}" placeholder="${L('Пошук дієслова або перекладу…','Поиск глагола или перевода…')}"></label></div>
    <section class="card"><div class="tbl-wrap"><table class="tbl wide"><thead><tr><th>Infinitiv</th><th>Präteritum</th><th>Perfekt</th><th>${L('Переклад','Перевод')}</th></tr></thead><tbody id="verbRows"></tbody></table></div></section>`;
  verbRows();
}
INP.verbQ=el=>{ UI.vq=el.value; verbRows(); };

/* ====================== ТРЕНУВАННЯ ====================== */
const MODES=()=>[['words','cards',L('Повторення слів','Повторение слов'),L('Переклад в обидва боки; складні слова — частіше','Перевод в обе стороны; трудные слова — чаще')],
 ['articles','layers',L('Перевірка артиклів','Проверка артиклей'),'der, die, das'],['translate','edit',L('Переклад речень','Перевод предложений'),L('Пишемо німецькою і розуміємо фрази','Пишем по-немецки и понимаем фразы')],
 ['build','mix',L('Складання речень','Составление предложений'),L('Розставте слова у правильному порядку','Расставьте слова в правильном порядке')],['verbs','target',L('Вибір дієслова','Выбор глагола'),L('Правильна форма для ich, du, er…','Правильная форма для ich, du, er…')],
 ['listen','ear',L('Аудіювання','Аудирование'),L('Слухайте й обирайте, що прозвучало','Слушайте и выбирайте, что прозвучало')],['grammar','gram',L('Перевірка граматики','Проверка грамматики'),L('Завдання з усіх пройдених тем','Задания по всем пройденным темам')],
 ['mixed','star',L('Змішаний тест','Смешанный тест'),L('Усе потроху','Всего понемногу')]];
UI.tr={mode:'mixed',level:'done',n:10,run:false};
Pages.training=function(v,arg){
  const t=UI.tr, modes=MODES();
  if(arg&&modes.some(m=>m[0]===arg)){ if(UI.trSeen!==arg){ t.mode=arg; t.run=true; UI.trSeen=arg; } } else UI.trSeen=null;
  if(t.run){
    const m=modes.find(x=>x[0]===t.mode);
    v.innerHTML=`<button class="back" data-act="trStop">${ic('left')} ${L('До вибору тренування','К выбору тренировки')}</button>`+head(m[2])+`<section class="card"><div id="run"></div></section>`;
    Runner.mount($('#run'),trainingQuiz(t.mode,t.level,t.n),{onDone:res=>{
      const okN=res.filter(r=>r.ok).length, topics={}; res.filter(r=>!r.ok).forEach(r=>topics[r.topic]=(topics[r.topic]||0)+1);
      S.tests.push({d:today(),mode:t.mode,level:t.level,total:res.length,ok:okN,topics}); planMark(t.mode==='words'?'w':'t'); save();
      $('#run').innerHTML=resultHTML(res,`<div class="res-btns"><button class="btn" data-act="trStop">${L('Інше тренування','Другая тренировка')}</button><button class="btn primary" data-act="trStart">${L('Ще раз','Ещё раз')}</button></div>`); checkAchievements(); }});
    return;
  }
  const last=S.tests.filter(x=>x.mode!=='lesson').slice(-6).reverse();
  v.innerHTML=head(L('Тренування','Тренировка'),L('Практика без проходження уроку. Оберіть режим, рівень і кількість завдань.','Практика без прохождения урока. Выберите режим, уровень и количество заданий.'))+
    `<div class="grid mode-grid">${modes.map(m=>`<button class="card mode ${t.mode===m[0]?'on':''}" data-act="trMode" data-v="${m[0]}">${ic(m[1])}<b>${m[2]}</b><small>${m[3]}</small></button>`).join('')}</div>
    <section class="card setup"><div class="set-row"><span class="lbl">${L('Рівень складності','Уровень сложности')}</span>${seg('trLevel',t.level,[['done',L('Пройдені уроки','Пройденные уроки')],['A1',L('Увесь A1','Весь A1')],['A2',L('A1 + слова A2','A1 + слова A2')]])}</div>
      <div class="set-row"><span class="lbl">${L('Кількість завдань','Количество заданий')}</span>${seg('trN',t.n,[[5,'5'],[10,'10'],[15,'15'],[20,'20']])}</div>
      <button class="btn primary lg" data-act="trStart">${L('Почати тренування','Начать тренировку')} ${ic('right')}</button></section>
    ${last.length?`<section class="card"><h2>${L('Останні результати','Последние результаты')}</h2><ul class="kv">${last.map(x=>{const m=modes.find(q=>q[0]===x.mode);return `<li><span>${esc(fmtDate(x.d,{day:'numeric',month:'short'}))} · ${m?m[2]:topicName(x.topic||x.mode)}</span><b>${x.ok} / ${x.total} · ${Math.round(x.ok/x.total*100)}%</b></li>`;}).join('')}</ul></section>`:''}`;
};
ACT.trMode=el=>{ UI.tr.mode=el.dataset.v; App.render(); };
ACT.trLevel=el=>{ UI.tr.level=el.dataset.v; App.render(); };
ACT.trN=el=>{ UI.tr.n=+el.dataset.v; App.render(); };
ACT.trStart=()=>{ UI.tr.run=true; App.render(); };
ACT.trStop=()=>{ UI.tr.run=false; if(App.route().arg) App.go('training'); else App.render(); };

/* ====================== ДОМАШНІ ЗАВДАННЯ ====================== */
UI.hwf='all';
Pages.homework=function(v,arg){
  const cid=currentLessonId(), openId=arg?+arg:UI.hwOpen;
  let ls=LESSONS.filter(l=>isDone(l.id)||l.id===cid).reverse();
  const todo=ls.filter(l=>!(S.hw[l.id]||{}).done).length;
  if(UI.hwf==='todo') ls=ls.filter(l=>!(S.hw[l.id]||{}).done); if(UI.hwf==='done') ls=ls.filter(l=>(S.hw[l.id]||{}).done);
  v.innerHTML=head(L('Домашні завдання','Домашние задания'),L('Усі завдання з уроків в одному місці. Спершу виконайте самостійно, потім відкрийте зразки відповідей і порівняйте.','Все задания из уроков в одном месте. Сначала выполните самостоятельно, затем откройте образцы ответов и сравните.'))+
    `<div class="toolbar">${seg('hwf',UI.hwf,[['all',L('Усі','Все')],['todo',L('Не виконані','Не выполненные')+' · '+todo],['done',L('Виконані','Выполненные')]])}</div>
    <div class="hw-list">${ls.map(l=>{ const h=S.hw[l.id]||{}, items=hwItems(l), ans=h.ans||[], shown=h.shown;
      return `<details class="card hw" id="hw-${l.id}" ${openId===l.id?'open':''}><summary><span class="l-num">${h.done?ic('check'):l.id}</span><span class="hw-t"><b>${L('Урок','Урок')} ${l.id}. ${esc(B(l.t))}</b><small>${esc(B(MODS[l.m]))}</small></span>
        <span class="st ${h.done?'st-done':ans.some(Boolean)||h.free?'st-prog':'st-new'}">${h.done?L('Виконано','Выполнено')+(h.date?' · '+fmtDate(h.date,{day:'numeric',month:'short'}):''):ans.some(Boolean)||h.free?L('Розпочато','Начато'):L('Не виконано','Не выполнено')}</span></summary>
        <div class="hw-body"><h4>1. ${L('Перекладіть німецькою','Переведите на немецкий')}</h4>
        ${items.map((x,i)=>`<div class="hw-item"><label for="hw-${l.id}-${i}">${esc(B(x.tr))}</label><input class="input" id="hw-${l.id}-${i}" type="text" autocomplete="off" spellcheck="false" data-in="hwAns" data-id="${l.id}" data-i="${i}" value="${esc(ans[i]||'')}" placeholder="${L('Ваш переклад…','Ваш перевод…')}">
          ${shown?`<div class="hw-key ${ans[i]&&normAns(ans[i])===normAns(x.de)?'match':''}"><span>${L('Зразок:','Образец:')}</span> <b>${esc(x.de)}</b> ${sayBtn(x.de,'sm')}${ans[i]&&normAns(ans[i])===normAns(x.de)?` <em>${ic('check')} ${L('збігається','совпадает')}</em>`:''}</div>`:''}</div>`).join('')}
        <h4>2. ${esc(B(l.hw))}</h4><textarea class="input" id="hw-${l.id}-free" rows="4" data-in="hwFree" data-id="${l.id}" placeholder="${L('Пишіть німецькою…','Пишите по-немецки…')}">${esc(h.free||'')}</textarea>
        ${shown?`<div class="hw-key"><span>${L('Приклад відповіді:','Пример ответа:')}</span> <b>${esc(l.hw[2])}</b> ${sayBtn(l.hw[2],'sm')}<br><small>${L('Ваш текст може бути іншим — порівняйте порядок слів, закінчення дієслів та артиклі.','Ваш текст может быть другим — сравните порядок слов, окончания глаголов и артикли.')}</small></div>`:''}
        <div class="hw-btns"><button class="btn" data-act="hwShow" data-id="${l.id}">${ic('eye')} ${shown?L('Сховати відповіді','Скрыть ответы'):L('Перевірити відповіді','Проверить ответы')}</button>
          <button class="btn ${h.done?'':'primary'}" data-act="hwDone" data-id="${l.id}">${h.done?L('Позначити невиконаним','Отметить невыполненным'):ic('check')+' '+L('Позначити виконаним','Отметить выполненным')}</button>
          <a class="link-btn" href="#lesson-${l.id}">${L('Відкрити урок','Открыть урок')}</a><span class="saved muted sm" id="hwSaved-${l.id}"></span></div></div></details>`; }).join('')||`<div class="empty">${L('Тут поки порожньо.','Здесь пока пусто.')}</div>`}</div>`;
  if(openId){ const el=document.getElementById('hw-'+openId); if(el&&arg) setTimeout(()=>el.scrollIntoView({block:'start'}),0); }
};
const hwGet=id=>S.hw[id]||(S.hw[id]={});
const savedMark=id=>{ const el=document.getElementById('hwSaved-'+id); if(el) el.textContent=L('Збережено','Сохранено')+' ✓'; };
ACT.hwf=el=>{ UI.hwf=el.dataset.v; App.render(); };
INP.hwAns=el=>{ const h=hwGet(el.dataset.id); h.ans=h.ans||[]; h.ans[+el.dataset.i]=el.value; touchDay(); save(); savedMark(el.dataset.id); };
INP.hwFree=el=>{ hwGet(el.dataset.id).free=el.value; touchDay(); save(); savedMark(el.dataset.id); };
ACT.hwShow=el=>{ const h=hwGet(el.dataset.id); h.shown=h.shown?0:1; UI.hwOpen=+el.dataset.id; save(); App.render(); };
ACT.hwDone=el=>{ const h=hwGet(el.dataset.id);
  if(!h.done&&!(h.ans||[]).some(Boolean)&&!h.free){ toast(L('Спершу запишіть хоча б одну відповідь.','Сначала запишите хотя бы один ответ.')); return; }
  h.done=h.done?0:1; h.date=h.done?today():null; if(h.done) planMark('h'); UI.hwOpen=+el.dataset.id; save(); checkAchievements(); App.render(); };

/* ====================== МІЙ ЗОШИТ ====================== */
const NCATS=()=>({words:L('Слова','Слова'),grammar:L('Граматика','Грамматика'),sentences:L('Речення','Предложения'),errors:L('Помилки','Ошибки'),personal:L('Особисті нотатки','Личные заметки')});
UI.nb={cat:'all',q:'',edit:null,del:null};
Pages.notebook=function(v){
  const n=UI.nb, cats=NCATS(), q=n.q.trim().toLowerCase();
  const list=S.notes.filter(x=>(n.cat==='all'||x.cat===n.cat)&&(!q||(x.title+' '+x.text).toLowerCase().includes(q))).sort((a,b)=>b.ts-a.ts);
  v.innerHTML=head(L('Мій зошит','Моя тетрадь'),L('Ваші власні слова, правила, речення і нотатки. Усе зберігається автоматично.','Ваши собственные слова, правила, предложения и заметки. Всё сохраняется автоматически.'))+
    `<div class="tabs">${[['all',L('Усі записи','Все записи')],...Object.entries(cats)].map(c=>`<button class="tab ${n.cat===c[0]?'on':''}" data-act="nbCat" data-v="${c[0]}"><span>${c[1]}</span><b>${c[0]==='all'?S.notes.length:S.notes.filter(x=>x.cat===c[0]).length}</b></button>`).join('')}</div>
    <div class="toolbar"><label class="search">${ic('search')}<input class="input" id="nbQ" type="search" data-in="nbQ" value="${esc(n.q)}" placeholder="${L('Пошук у зошиті…','Поиск в тетради…')}"></label><button class="btn primary" data-act="nbAdd">${ic('plus')} ${L('Новий запис','Новая запись')}</button></div>
    <div class="notes" id="nbList">${list.map(x=>n.edit===x.id?`<article class="card note editing"><div class="set-row"><label class="lbl" for="nbc-${x.id}">${L('Категорія','Категория')}</label><select class="input" id="nbc-${x.id}" data-ch="nbField" data-id="${x.id}" data-k="cat">${Object.entries(cats).map(c=>`<option value="${c[0]}" ${x.cat===c[0]?'selected':''}>${c[1]}</option>`).join('')}</select></div>
        <input class="input" id="nbt-${x.id}" type="text" data-in="nbField" data-id="${x.id}" data-k="title" value="${esc(x.title)}" placeholder="${L('Заголовок: слово, правило, тема…','Заголовок: слово, правило, тема…')}">
        <textarea class="input" id="nbx-${x.id}" rows="5" data-in="nbField" data-id="${x.id}" data-k="text" placeholder="${L('Текст запису: переклад, приклад, пояснення…','Текст записи: перевод, пример, объяснение…')}">${esc(x.text)}</textarea>
        <div class="hw-btns"><button class="btn primary" data-act="nbDone">${ic('check')} ${L('Готово','Готово')}</button><span class="muted sm" id="nbSaved">${L('Зберігається автоматично','Сохраняется автоматически')}</span></div></article>`
      :`<article class="card note"><div class="card-h"><span class="chip cat-${x.cat}">${cats[x.cat]}</span><span class="muted sm">${esc(fmtDate(x.ts,{day:'numeric',month:'short',year:'numeric'}))}</span></div>
        <h3>${esc(x.title)||`<span class="muted">${L('Без заголовка','Без заголовка')}</span>`}</h3><p class="note-text">${esc(x.text)}</p>
        <div class="hw-btns"><button class="btn sm" data-act="nbEdit" data-id="${x.id}">${ic('edit')} ${L('Редагувати','Редактировать')}</button>${n.del===x.id?`<button class="btn sm danger" data-act="nbDelYes" data-id="${x.id}">${L('Так, видалити','Да, удалить')}</button><button class="btn sm" data-act="nbDelNo">${L('Скасувати','Отмена')}</button>`:`<button class="btn sm" data-act="nbDel" data-id="${x.id}">${ic('trash')} ${L('Видалити','Удалить')}</button>`}</div></article>`).join('')
      ||`<div class="empty">${S.notes.length?L('За цим запитом записів немає.','По этому запросу записей нет.'):L('Зошит поки порожній. Запишіть перше слово, правило або речення, яке хочете запамʼятати.','Тетрадь пока пуста. Запишите первое слово, правило или предложение, которое хотите запомнить.')}<br><button class="btn primary" data-act="nbAdd">${ic('plus')} ${L('Створити запис','Создать запись')}</button></div>`}</div>`;
  if(n.edit){ const el=document.getElementById('nbt-'+n.edit); if(el&&!el.value) el.focus(); }
};
ACT.nbCat=el=>{ UI.nb.cat=el.dataset.v; UI.nb.edit=null; App.render(); };
INP.nbQ=el=>{ UI.nb.q=el.value; const pos=el.selectionStart; App.render(); const n=$('#nbQ'); n.focus(); n.setSelectionRange(pos,pos); };
ACT.nbAdd=()=>{ const id='n'+Date.now(); S.notes.push({id,cat:UI.nb.cat==='all'?'words':UI.nb.cat,title:'',text:'',ts:Date.now()}); UI.nb.edit=id; UI.nb.q=''; touchDay(); save(); App.render(); };
ACT.nbEdit=el=>{ UI.nb.edit=el.dataset.id; App.render(); };
ACT.nbDone=()=>{ const x=S.notes.find(q=>q.id===UI.nb.edit); if(x&&!x.title.trim()&&!x.text.trim()) S.notes=S.notes.filter(q=>q!==x); UI.nb.edit=null; save(); checkAchievements(); App.render(); };
INP.nbField=el=>{ const x=S.notes.find(q=>q.id===el.dataset.id); if(!x) return; x[el.dataset.k]=el.value; x.ts=Date.now(); touchDay(); save(); const s=$('#nbSaved'); if(s) s.textContent=L('Збережено','Сохранено')+' ✓'; };
ACT.nbDel=el=>{ UI.nb.del=el.dataset.id; App.render(); };
ACT.nbDelNo=()=>{ UI.nb.del=null; App.render(); };
ACT.nbDelYes=el=>{ S.notes=S.notes.filter(q=>q.id!==el.dataset.id); UI.nb.del=null; save(); toast(L('Запис видалено','Запись удалена')); App.render(); };

/* ====================== ПРОГРЕС ====================== */
function bars(data,o){ // data: [{l,v,t}] — проста стовпчикова діаграма
  o=o||{}; const max=Math.max(o.max||0,...data.map(d=>d.v),1), W=Math.max(data.length*34,300), H=150, bw=W/data.length;
  return `<div class="chart-wrap"><svg class="chart" viewBox="0 0 ${W} ${H+26}" role="img" aria-label="${esc(o.label||'')}"><line x1="0" y1="${H}" x2="${W}" y2="${H}" class="ax"/>
    ${data.map((d,i)=>{ const h=Math.round(d.v/max*(H-22)); return `<g><title>${esc(d.t||d.l)}: ${d.v}${o.unit||''}</title><rect class="${d.cls||''}" x="${i*bw+bw*0.2}" y="${H-h}" width="${bw*0.6}" height="${Math.max(h,d.v?2:0)}" rx="4"/>${d.v||d.z?`<text class="val" x="${i*bw+bw/2}" y="${H-h-5}">${d.v}</text>`:''}<text class="lab" x="${i*bw+bw/2}" y="${H+17}">${esc(d.l)}</text></g>`; }).join('')}</svg></div>`;
}
Pages.progress=function(v){
  checkAchievements();
  const st=Stats(), days=[]; for(let i=13;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); days.push(d); }
  const act=days.map(d=>({l:String(d.getDate()),t:fmtDate(d,{day:'numeric',month:'long'}),v:Math.round((S.days[dkey(d)]||{}).min||0)}));
  const wd=days.map(d=>({l:String(d.getDate()),t:fmtDate(d,{day:'numeric',month:'long'}),v:(S.days[dkey(d)]||{}).words||0,cls:'c2'}));
  const tests=S.tests.slice(-12).map((t,i)=>({l:String(i+1),t:fmtDate(t.d,{day:'numeric',month:'short'}),v:Math.round(t.ok/t.total*100),cls:'c3',z:1})); while(tests.length&&tests.length<12) tests.push({l:'',v:0});
  const tile=(i,v2,l)=>`<div class="tile">${ic(i)}<b>${v2}</b><small>${l}</small></div>`;
  const hrs=st.minutes>=60?Math.floor(st.minutes/60)+' '+L('год','ч')+' '+(st.minutes%60)+' '+L('хв','мин'):st.minutes+' '+L('хв','мин');
  v.innerHTML=head(L('Прогрес','Прогресс'),L('Уся ваша статистика рахується з реальних дій на сайті.','Вся ваша статистика считается из реальных действий на сайте.'))+
    `<section class="card lvl-card">${ring(st.pct)}<div><p class="eyebrow">${L('Поточний рівень','Текущий уровень')}</p><h2>${S.level} · ${B(LEVELS[0].t)}</h2><p class="muted">${L('Завершено','Завершено')} ${st.lessonsDone} ${L('із','из')} ${st.lessonsTotal} ${L('уроків рівня','уроков уровня')}</p><div class="bar"><i style="width:${st.pct}%"></i></div></div></section>
    <div class="tiles">${tile('book',st.lessonsDone,L('уроків пройдено','уроков пройдено'))}${tile('dict',st.wordsKnown,L('слів вивчено','слов выучено'))}${tile('clip',st.hwDone+st.tests,L('завдань виконано','заданий выполнено'))}${tile('target',st.avg==null?'—':st.avg+'%',L('середній результат тестів','средний результат тестов'))}
      ${tile('chart',st.daysActive,unit(st.daysActive,['день занять','дні занять','днів занять'],['день занятий','дня занятий','дней занятий']))}${tile('flame',st.streak,unit(st.streak,['день поспіль','дні поспіль','днів поспіль'],['день подряд','дня подряд','дней подряд']))}${tile('clock',hrs,L('часу на навчання','времени на учёбу'))}${tile('check',st.exTotal?Math.round(st.exOk/st.exTotal*100)+'%':'—',L('точність у вправах','точность в упражнениях'))}</div>
    <div class="grid chart-grid">
      <section class="card"><h2>${L('Активність за 14 днів','Активность за 14 дней')}</h2><p class="muted sm">${L('хвилин на день','минут в день')}</p>${bars(act,{unit:' '+L('хв','мин'),max:S.goalMin,label:L('Активність за днями','Активность по дням')})}</section>
      <section class="card"><h2>${L('Нові вивчені слова','Новые выученные слова')}</h2><p class="muted sm">${L('слів на день, 14 днів','слов в день, 14 дней')}</p>${bars(wd,{max:5,label:L('Вивчені слова за днями','Выученные слова по дням')})}</section>
      <section class="card"><h2>${L('Результати тренувань','Результаты тренировок')}</h2><p class="muted sm">${L('останні 12 спроб, % правильних','последние 12 попыток, % правильных')}</p>${tests.length?bars(tests,{max:100,unit:'%',label:L('Результати тренувань','Результаты тренировок')}):`<div class="empty sm">${L('Пройдіть перше тренування — і тут зʼявиться графік.','Пройдите первую тренировку — и здесь появится график.')}<br><a class="btn" href="#training">${L('До тренувань','К тренировкам')}</a></div>`}</section>
      <section class="card"><h2>${L('Проходження курсу','Прохождение курса')}</h2><p class="muted sm">${L('уроки за модулями','уроки по модулям')}</p><ul class="mod-bars">${MODS.map((m,i)=>`<li><span>${i+1}. ${esc(B(m))}</span><div class="bar"><i style="width:${st.mods[i].done/st.mods[i].n*100}%"></i></div><b>${st.mods[i].done}/${st.mods[i].n}</b></li>`).join('')}</ul></section>
    </div>
    <section class="card"><h2>${L('Досягнення','Достижения')}</h2><p class="muted sm">${L('Отримано','Получено')}: ${Object.keys(S.ach).length} / ${ACHIEVEMENTS.length}</p><div class="grid ach-grid">${ACHIEVEMENTS.map(a=>{ const got=S.ach[a.id], val=Math.min(a.val(st),a.need);
      return `<div class="ach ${got?'got':''}"><span class="ach-ic">${ic(a.ic)}</span><div><b>${esc(B(a.t))}</b><small>${esc(B(a.d))}</small>${got?`<small class="ach-date">${ic('check')} ${esc(fmtDate(got,{day:'numeric',month:'short',year:'numeric'}))}</small>`:`<div class="bar"><i style="width:${val/a.need*100}%"></i></div><small>${val} / ${a.need}</small>`}</div></div>`; }).join('')}</div></section>`;
};

/* ====================== МАТЕРІАЛИ ====================== */
UI.matFav=false;
Pages.materials=function(v){
  v.innerHTML=head(L('Додаткові матеріали','Дополнительные материалы'),L('Перевірені підручники, довідники та безкоштовні ресурси для самостійного навчання. Пояснення і вправи на цьому сайті — власні; підручники радимо як додаткове джерело.','Проверенные учебники, справочники и бесплатные ресурсы для самостоятельной учёбы. Объяснения и упражнения на этом сайте — собственные; учебники советуем как дополнительный источник.'))+
    `<div class="toolbar"><button class="btn ${UI.matFav?'primary':''}" data-act="matOnly">${ic('star')} ${L('Лише збережені','Только сохранённые')}</button></div>`+
    Object.keys(MAT_CATS).map(c=>{ const list=MATERIALS.map((m,i)=>({m,i})).filter(x=>x.m.c===c&&(!UI.matFav||S.matFav[x.i])); if(!list.length) return '';
      return `<section class="mat-sec"><h2>${B(MAT_CATS[c])}</h2><div class="grid mat-grid">${list.map(({m,i})=>{ const int=m.u[0]==='#';
        return `<article class="card mat"><div class="card-h"><h3>${esc(B(m.n))}</h3><button class="icon-btn fav ${S.matFav[i]?'on':''}" data-act="matFav" data-i="${i}" aria-label="${L('Зберегти','Сохранить')}">${ic('star')}</button></div><p>${esc(B(m.d))}</p>
          <a class="link-btn" href="${m.u}" ${int?'':'target="_blank" rel="noopener noreferrer"'}>${int?L('Відкрити розділ','Открыть раздел'):L('Перейти на сайт','Перейти на сайт')} ${ic(int?'right':'ext')}</a></article>`; }).join('')}</div></section>`; }).join('')
    ||`<div class="empty">${L('Збережених матеріалів поки немає.','Сохранённых материалов пока нет.')}</div>`;
};
ACT.matOnly=()=>{ UI.matFav=!UI.matFav; App.render(); };
ACT.matFav=el=>{ const i=el.dataset.i; if(S.matFav[i]) delete S.matFav[i]; else S.matFav[i]=1; save(); el.classList.toggle('on',!!S.matFav[i]); if(UI.matFav) App.render(); };

/* ====================== НАЛАШТУВАННЯ ====================== */
UI.pf={};
Pages.prefs=function(v){
  const mode={cloud:L('Цей браузер + хмарна копія','Этот браузер + облачная копия'),local:L('Локально в цьому браузері (LocalStorage)','Локально в этом браузере (LocalStorage)'),memory:L('Лише до закриття вкладки: браузер заблокував сховище','Только до закрытия вкладки: браузер заблокировал хранилище')}[Storage.mode];
  v.innerHTML=head(L('Налаштування','Настройки'))+
  `<section class="card"><h2>${L('Профіль','Профиль')}</h2><div class="set-row"><label class="lbl" for="pfName">${L('Як до вас звертатися','Как к вам обращаться')}</label><input class="input" id="pfName" type="text" maxlength="40" data-in="pfName" value="${esc(S.name)}" placeholder="${L('Ваше імʼя','Ваше имя')}"></div>
    <ul class="kv"><li><span>${L('Рівень','Уровень')}</span><b>${S.level}</b></li><li><span>${L('Основна мета','Основная цель')}</span><b>${L('Німецька для навчання і роботи','Немецкий для учёбы и работы')}</b></li><li><span>${L('Пояснення','Объяснения')}</span><b>${L('Максимально прості','Максимально простые')}</b></li><li><span>${L('Навчання','Обучение')}</span><b>${L('Послідовне, від простого до складного','Последовательное, от простого к сложному')}</b></li></ul></section>
  <section class="card"><h2>${L('Інтерфейс','Интерфейс')}</h2>
    <div class="set-row"><span class="lbl">${L('Мова інтерфейсу і перекладів','Язык интерфейса и переводов')}</span>${seg('pfLang',S.lang,[['uk','Українська'],['ru','Русский']])}</div>
    <div class="set-row"><span class="lbl">${L('Тема оформлення','Тема оформления')}</span>${seg('pfTheme',S.theme,[['auto',L('Як у системі','Как в системе')],['light',L('Світла','Светлая')],['dark',L('Темна','Тёмная')]])}</div></section>
  <section class="card"><h2>${L('Навчання','Обучение')}</h2>
    <div class="set-row"><span class="lbl">${L('Час на день','Время в день')}</span>${seg('pfGoal',S.goalMin,[[15,'10–20 '+L('хв','мин')],[25,'20–30 '+L('хв','мин')],[35,'30–40 '+L('хв','мин')]])}</div>
    <div class="set-row"><span class="lbl">${L('Швидкість озвучення','Скорость озвучки')}</span>${seg('pfRate',S.rate,[[0.7,L('Повільно','Медленно')],[0.9,L('Спокійно','Спокойно')],[1,L('Звичайно','Обычно')]])}</div>
    <div class="set-row"><span class="lbl">${L('Озвучення німецькою (de-DE)','Озвучка на немецком (de-DE)')}</span><span><button class="btn" data-act="say" data-text="Guten Tag! Ich lerne Deutsch, Schritt für Schritt.">${ic('play')} ${L('Перевірити звук','Проверить звук')}</button> <span class="muted sm">${Speech.available()?(Speech.voice?Speech.voice.name:L('голос браузера','голос браузера')):L('недоступне в цьому браузері','недоступна в этом браузере')}</span></span></div></section>
  <section class="card"><h2>${L('Дані та збереження','Данные и сохранение')}</h2><p>${ic('cloud')} ${L('Прогрес зберігається: ','Прогресс сохраняется: ')}<b>${mode}</b></p>
    <div class="hw-btns"><button class="btn" data-act="pfExport">${L('Резервна копія','Резервная копия')}</button><button class="btn" data-act="pfImportOpen">${L('Відновити з копії','Восстановить из копии')}</button>${UI.pf.reset?`<button class="btn danger" data-act="pfResetYes">${L('Так, скинути весь прогрес','Да, сбросить весь прогресс')}</button><button class="btn" data-act="pfResetNo">${L('Скасувати','Отмена')}</button>`:`<button class="btn" data-act="pfReset">${ic('trash')} ${L('Скинути прогрес','Сбросить прогресс')}</button>`}</div>
    ${UI.pf.reset?`<p class="warn">${L('Буде видалено всі результати, нотатки й домашні завдання. Стартовий стан (уроки 1–10 пройдено) відновиться.','Будут удалены все результаты, заметки и домашние задания. Стартовое состояние (уроки 1–10 пройдены) восстановится.')}</p>`:''}
    ${UI.pf.exp?`<label class="lbl" for="pfData">${L('Скопіюйте цей текст і збережіть у надійному місці','Скопируйте этот текст и сохраните в надёжном месте')}</label><textarea class="input mono" id="pfData" rows="5" readonly>${esc(JSON.stringify(S))}</textarea><button class="btn primary" data-act="pfCopy">${L('Копіювати','Копировать')}</button>`:''}
    ${UI.pf.imp?`<label class="lbl" for="pfIn">${L('Вставте текст резервної копії','Вставьте текст резервной копии')}</label><textarea class="input mono" id="pfIn" rows="5"></textarea><button class="btn primary" data-act="pfImport">${L('Відновити','Восстановить')}</button>`:''}</section>`;
};
INP.pfName=el=>{ S.name=el.value.trim(); save(); };
ACT.pfLang=el=>{ S.lang=el.dataset.v; save(); App.refresh(); };
ACT.pfTheme=el=>{ S.theme=el.dataset.v; save(); App.refresh(); };
ACT.pfGoal=el=>{ S.goalMin=+el.dataset.v; save(); App.render(); };
ACT.pfRate=el=>{ S.rate=+el.dataset.v; save(); App.render(); };
ACT.pfExport=()=>{ UI.pf={exp:1}; App.render(); };
ACT.pfImportOpen=()=>{ UI.pf={imp:1}; App.render(); };
ACT.pfCopy=()=>{ const t=$('#pfData'); const done=()=>toast(L('Скопійовано','Скопировано')); try{ navigator.clipboard.writeText(t.value).then(done).catch(()=>{t.select();}); }catch(e){ t.select(); } };
ACT.pfImport=()=>{ try{ const o=JSON.parse($('#pfIn').value); if(!o||typeof o!=='object'||!o.lessons||!o.words) throw 0; importState(o); UI.pf={}; toast(L('Дані відновлено','Данные восстановлены')); App.refresh(); }catch(e){ toast(L('Не вдалося прочитати копію. Перевірте, що текст скопійовано повністю.','Не удалось прочитать копию. Проверьте, что текст скопирован полностью.')); } };
ACT.pfReset=()=>{ UI.pf={reset:1}; App.render(); };
ACT.pfResetNo=()=>{ UI.pf={}; App.render(); };
ACT.pfResetYes=()=>{ resetState(); UI.pf={}; toast(L('Прогрес скинуто до стартового','Прогресс сброшен до стартового')); App.refresh(); };
})();
