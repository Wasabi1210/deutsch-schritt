/* Генератори вправ і «Runner» — компонент, що показує завдання, перевіряє відповіді й пояснює помилки. */
(function(){
'use strict';
const PRON=['ich','du','er','wir','ihr','sie'];
const norm=s=>String(s).toLowerCase().replace(/[.,!?;:"„“”'’…–—-]/g,' ').replace(/ß/g,'ss').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/\s+/g,' ').trim();
window.normAns=norm;
const uniqBy=(a,f)=>{const seen={};return a.filter(x=>{const k=f(x);if(seen[k])return false;seen[k]=1;return true;});};
function distract(pool,w,n,f){ return pick(uniqBy(pool.filter(x=>f(x)!==f(w)),f),n); }
function artHint(w){
  const b=w.bare;
  if(/(ung|heit|keit|ion|schaft|tät)$/.test(b)) return L('Слова із закінченням -ung, -heit, -keit, -ion, -schaft, -tät завжди жіночого роду (die).','Слова с окончанием -ung, -heit, -keit, -ion, -schaft, -tät всегда женского рода (die).');
  if(/(chen|lein)$/.test(b)) return L('Слова на -chen і -lein завжди середнього роду (das).','Слова на -chen и -lein всегда среднего рода (das).');
  if(/tag$|^(Montag|Mittwoch|Januar|Mai|Sommer|Winter|Herbst|Frühling)$/.test(b)) return L('Дні тижня, місяці й пори року — чоловічого роду (der).','Дни недели, месяцы и времена года — мужского рода (der).');
  if(w.art==='die'&&/e$/.test(b)) return L('Більшість іменників на -e — жіночого роду (die).','Большинство существительных на -e — женского рода (die).');
  return L('Рід цього слова треба запамʼятати: вчіть його одразу з артиклем.','Род этого слова нужно запомнить: учите его сразу с артиклем.');
}
const G={
  vocab(w,pool,dir){
    const d=distract(pool,w,3,x=>dir==='tr2de'?x.de:B(x.tr)); if(d.length<2) return null;
    const de2=dir!=='tr2de';
    return {type:'choice',kind:L('Переклад слова','Перевод слова'),q:de2?`<span class="q-de">${esc(w.de)}</span>`:`<span class="q-tr">${esc(B(w.tr))}</span>`,say:de2?w.de:null,
      sub:de2?L('Оберіть переклад','Выберите перевод'):L('Як це німецькою?','Как это по-немецки?'),
      opts:shuffle([w,...d].map(x=>de2?B(x.tr):x.de)),a:de2?B(w.tr):w.de,word:w.de,topic:'vocab',
      why:`«${w.de}» — ${B(w.tr)}.`,sim:{de:w.ex,tr:B(w.exTr)},plain:de2?w.de:B(w.tr)};
  },
  article(w){
    const sim=pick(WORDS.filter(x=>x.art===w.art&&x.de!==w.de),1)[0];
    return {type:'choice',kind:L('Артикль','Артикль'),q:`<span class="q-gap">___</span> <span class="q-de">${esc(w.bare)}</span>`,sub:B(w.tr),
      opts:['der','die','das'],a:w.art,word:w.de,topic:'artdef',why:artHint(w),sim:sim?{de:sim.de,tr:B(sim.tr)}:null,plain:'___ '+w.bare};
  },
  listen(w,pool){
    if(!Speech.available()) return G.vocab(w,pool,'de2tr');
    const d=distract(pool,w,3,x=>B(x.tr)); if(d.length<2) return null;
    return {type:'choice',kind:L('Аудіювання','Аудирование'),q:`<button class="btn big-say" data-act="say" data-text="${esc(w.de)}">${ic('play')} ${L('Прослухати','Прослушать')}</button>`,auto:w.de,
      sub:L('Що ви почули?','Что вы услышали?'),opts:shuffle([w,...d].map(x=>B(x.tr))),a:B(w.tr),word:w.de,topic:'listen',
      why:L('Прозвучало: ','Прозвучало: ')+`«${w.de}» — ${B(w.tr)}.`,sim:{de:w.ex,tr:B(w.exTr)},plain:'🔊 '+w.de};
  },
  gap(w,pool){
    const re=new RegExp('(^|[^A-Za-zÄÖÜäöüß])'+w.bare.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![A-Za-zÄÖÜäöüß])');
    if(!re.test(w.ex)||w.bare.includes(' ')) return null;
    const d=distract(pool.filter(x=>x.noun===w.noun&&!x.bare.includes(' ')),w,3,x=>x.bare); if(d.length<2) return null;
    const sent=w.ex.replace(re,'$1___');
    return {type:'choice',kind:L('Пропущене слово','Пропущенное слово'),q:`<span class="q-sent">${esc(sent)}</span>`,sub:B(w.exTr),
      opts:shuffle([w,...d].map(x=>x.bare)),a:w.bare,word:w.de,topic:'vocab',why:`«${w.bare}» — ${B(w.tr)}. ${L('Повне речення: ','Полное предложение: ')}${w.ex}`,plain:sent};
  },
  order(s){
    const tokens=s.de.split(/\s+/); if(tokens.length<3||tokens.length>9) return null;
    let sh=shuffle(tokens),i=0; while(sh.join(' ')===tokens.join(' ')&&i++<5) sh=shuffle(tokens);
    return {type:'order',kind:L('Складіть речення','Составьте предложение'),q:`<span class="q-tr">${esc(B(s.tr))}</span>`,sub:L('Натискайте слова у правильному порядку','Нажимайте слова в правильном порядке'),
      tokens:sh,a:s.de,topic:'wordorder',why:L('У німецькому реченні відмінюване дієслово стоїть на другому місці (у питанні без питального слова — на першому).','В немецком предложении спрягаемый глагол стоит на втором месте (в вопросе без вопросительного слова — на первом).'),plain:B(s.tr)};
  },
  translate(s){
    return {type:'input',kind:L('Переклад німецькою','Перевод на немецкий'),q:`<span class="q-tr">${esc(B(s.tr))}</span>`,sub:L('Напишіть німецькою','Напишите по-немецки'),
      a:[s.de],topic:'translate',why:L('Порівняйте свою відповідь зі зразком слово за словом: зверніть увагу на закінчення дієслова й артиклі.','Сравните свой ответ с образцом слово за словом: обратите внимание на окончание глагола и артикли.'),plain:B(s.tr)};
  },
  phraseChoice(s,pool){
    const d=distract(pool,s,3,x=>B(x.tr)); if(d.length<2) return null;
    return {type:'choice',kind:L('Переклад з німецької','Перевод с немецкого'),q:`<span class="q-sent">${esc(s.de)}</span>`,say:s.de,sub:L('Оберіть переклад','Выберите перевод'),
      opts:shuffle([s,...d].map(x=>B(x.tr))),a:B(s.tr),topic:'translate',why:`«${s.de}» — ${B(s.tr)}`,plain:s.de};
  },
  gram(g,e){
    const sim=pick(g.examples,1)[0];
    return {type:'choice',kind:B(g.t),q:`<span class="q-sent">${esc(e.q)}</span>`,sub:L('Оберіть правильний варіант','Выберите правильный вариант'),
      opts:shuffle([e.a,...e.wrong]),a:e.a,topic:g.id,why:B(e.why),sim:sim?{de:sim.de,tr:B(sim.tr)}:null,plain:e.q};
  },
  verb(inf){
    const f=VERBS[inf], p=Math.floor(Math.random()*6), a=f[p];
    const others=pick([...new Set(f.slice(0,6).filter(x=>x!==a))],2); if(others.length<2) return null;
    const g=gram(f[6]);
    return {type:'choice',kind:L('Форма дієслова','Форма глагола'),q:`<span class="q-sent">${PRON[p]} ___</span> <span class="q-hint">(${inf})</span>`,sub:L('Оберіть правильну форму','Выберите правильную форму'),
      opts:shuffle([a,...others]),a,topic:f[6],why:L('Відмінювання: ','Спряжение: ')+PRON.map((x,i)=>x+' '+f[i]).join(' · '),sim:g?{de:g.examples[0].de,tr:B(g.examples[0].tr)}:null,plain:PRON[p]+' ___ ('+inf+')'};
  },
  sortArt(ws){
    return {type:'sort',kind:L('Розподіліть за артиклями','Распределите по артиклям'),q:'',sub:L('Оберіть артикль для кожного слова','Выберите артикль для каждого слова'),
      groups:['der','die','das'],items:ws.map(w=>({t:w.bare,g:w.art,hint:B(w.tr),word:w.de})),topic:'artdef',why:L('Вчіть кожен іменник одразу з артиклем — це заощадить багато часу.','Учите каждое существительное сразу с артиклем — это сэкономит много времени.'),plain:L('Розподіл за артиклями','Распределение по артиклям')};
  },
  sortCat(a,b){
    const ga=B(CATS[a[0].cat]), gb=B(CATS[b[0].cat]);
    return {type:'sort',kind:L('Розподіліть за темами','Распределите по темам'),q:'',sub:L('До якої теми належить слово?','К какой теме относится слово?'),
      groups:[ga,gb],items:shuffle([...a.map(w=>({t:w.de,g:ga,hint:B(w.tr),word:w.de})),...b.map(w=>({t:w.de,g:gb,hint:B(w.tr),word:w.de}))]),topic:'vocab',why:L('Перегляньте переклад слів, у яких помилилися.','Просмотрите перевод слов, в которых ошиблись.'),plain:L('Розподіл за темами','Распределение по темам')};
  }
};
window.G=G;
const ok=a=>a.filter(Boolean);
function sentencesUpTo(max,min){ const out=[]; LESSONS.filter(l=>l.id<=max&&l.id>=(min||1)).forEach(l=>{ l.phrases.forEach(p=>out.push(p)); l.dialog.forEach(d=>out.push(d)); l.words.forEach(w=>out.push({de:w.ex,tr:w.exTr})); }); return out.filter(s=>!/[…\/]/.test(s.de)); }
function phrasesUpTo(max,min){ const out=[]; LESSONS.filter(l=>l.id<=max&&l.id>=(min||1)).forEach(l=>l.phrases.forEach(p=>out.push(p))); return out.filter(s=>!/[…\/]/.test(s.de)); }
window.sentencesUpTo=sentencesUpTo;
const verbsUpTo=max=>Object.keys(VERBS).filter(v=>(VERB_LESSON[v]||99)<=max);

/* Практика уроку: суміш усіх типів на матеріалі уроку */
window.lessonQuiz=function(l){
  const pool=WORDS.filter(w=>w.lesson&&w.lesson<=l.id);
  if(l.rev) return mixedQuiz(l.id,l.rev===2?20:14,l);
  const ws=shuffle(l.words), nouns=ws.filter(w=>w.art), g=gram(l.g);
  const sents=[...l.phrases,...l.dialog].filter(s=>!/[…\/]/.test(s.de));
  let q=[
    ...ws.slice(0,3).map(w=>G.vocab(w,pool,'de2tr')), ...ws.slice(3,5).map(w=>G.vocab(w,pool,'tr2de')),
    ...nouns.slice(0,2).map(w=>G.article(w)), G.listen(ws[5]||ws[0],pool),
    ...ok(ws.map(w=>G.gap(w,pool))).slice(0,2), ...ok(pick(sents,4).map(s=>G.order(s))).slice(0,2),
    ...pick(l.phrases.filter(s=>!/[…\/]/.test(s.de)),2).map(s=>G.translate(s)), ...pick(g.exercises,3).map(e=>G.gram(g,e))
  ];
  const vs=verbsUpTo(l.id).filter(v=>VERBS[v][6]===g.id||l.words.some(w=>w.de===v)); if(vs.length) q.push(G.verb(pick(vs,1)[0]));
  if(nouns.length>=4) q.push(G.sortArt(nouns.slice(0,5)));
  else { const prev=lessonById(l.id-1); if(prev&&prev.cat!==l.cat) q.push(G.sortCat(pick(l.words,3),pick(prev.words,3))); }
  return ok(q);
};
/* Повторення на початку уроку: слова й фрази попередніх занять, насамперед ті, що забуваються */
window.reviewQuiz=function(l){
  const prev=WORDS.filter(w=>w.lesson&&w.lesson<l.id); if(prev.length<6) return [];
  const hard=prev.filter(w=>isHard(w.de)), recent=prev.filter(w=>w.lesson>=l.id-3);
  const ws=uniqBy([...pick(hard,2),...pick(recent,3),...pick(prev,2)],w=>w.de).slice(0,3);
  const ph=phrasesUpTo(l.id-1,Math.max(1,l.id-8));
  return ok([...ws.map((w,i)=>G.vocab(w,prev,i%2?'tr2de':'de2tr')), ...pick(ph,1).map(s=>G.phraseChoice(s,ph)), ...ok(pick(ph,3).map(s=>G.order(s))).slice(0,1)]);
};
function mixedQuiz(max,n,l){
  const pool=WORDS.filter(w=>w.lesson&&w.lesson<=max), nouns=pool.filter(w=>w.art), sents=sentencesUpTo(max), ph=phrasesUpTo(max);
  const gs=GRAMMAR.filter(g=>LESSONS.some(x=>x.id<=max&&gram(x.g)===g));
  const makers=[()=>G.vocab(pick(pool,1)[0],pool,'de2tr'),()=>G.vocab(pick(pool,1)[0],pool,'tr2de'),()=>G.article(pick(nouns,1)[0]),()=>G.listen(pick(pool,1)[0],pool),
    ()=>G.gap(pick(pool,1)[0],pool),()=>G.order(pick(sents,1)[0]),()=>G.translate(pick(ph,1)[0]),()=>{const g=pick(gs,1)[0];return G.gram(g,pick(g.exercises,1)[0]);},
    ()=>{const g=pick(gs,1)[0];return G.gram(g,pick(g.exercises,1)[0]);},()=>G.verb(pick(verbsUpTo(max),1)[0]),()=>G.phraseChoice(pick(ph,1)[0],ph)];
  const q=[]; let guard=0;
  if(l) pick(l.words,3).forEach(w=>q.push(G.vocab(w,pool,'de2tr')));
  while(q.length<n&&guard++<n*8){ const x=makers[(q.length+guard)%makers.length](); if(x&&!q.some(y=>y.plain===x.plain)) q.push(x); }
  return q;
}
/* Тренування: mode — words | articles | translate | build | verbs | listen | grammar | mixed; level — done | A1 | A2 */
window.trainingQuiz=function(mode,level,n){
  const max=level==='done'?Math.max(1,currentLessonId()-(allDone()?0:1)):LESSONS.length;
  let pool=WORDS.filter(w=>w.lesson&&w.lesson<=max); if(level==='A2') pool=pool.concat(WORDS.filter(w=>w.lvl==='A2'));
  const nouns=pool.filter(w=>w.art), sents=sentencesUpTo(max), ph=phrasesUpTo(max);
  const gs=level==='done'?GRAMMAR.filter(g=>LESSONS.some(x=>x.id<=max&&gram(x.g)===g)):GRAMMAR;
  const vs=level==='done'?verbsUpTo(max):Object.keys(VERBS);
  const hard=pool.filter(w=>isHard(w.de)), learn=pool.filter(w=>(S.words[w.de]||{}).s==='learn');
  const wordPick=()=>{ const r=Math.random(); const src=r<0.35&&hard.length?hard:r<0.7&&learn.length?learn:pool; return pick(src,1)[0]; };
  const mk={
    words:i=>i%3===2?G.gap(wordPick(),pool):G.vocab(wordPick(),pool,i%2?'tr2de':'de2tr'),
    articles:i=>i%5===4&&nouns.length>=5?G.sortArt(pick(nouns,5)):G.article(pick(nouns,1)[0]),
    translate:i=>i%2?G.phraseChoice(pick(ph,1)[0],ph):G.translate(pick(ph,1)[0]),
    build:()=>G.order(pick(sents,1)[0]),
    verbs:()=>G.verb(pick(vs,1)[0]),
    listen:i=>i%3===2?(()=>{const s=pick(ph,1)[0];const q=G.phraseChoice(s,ph);if(q&&Speech.available()){q.kind=L('Аудіювання','Аудирование');q.q=`<button class="btn big-say" data-act="say" data-text="${esc(s.de)}">${ic('play')} ${L('Прослухати','Прослушать')}</button>`;q.auto=s.de;q.say=null;q.topic='listen';q.sub=L('Що ви почули?','Что вы услышали?');}return q;})():G.listen(wordPick(),pool),
    grammar:()=>{const g=pick(gs,1)[0];return G.gram(g,pick(g.exercises,1)[0]);}
  };
  if(mode==='mixed'){ const q=mixedQuiz(max,n); return q; }
  const q=[]; let guard=0;
  while(q.length<n&&guard++<n*10){ const x=mk[mode](q.length+guard); if(x&&!q.some(y=>y.plain===x.plain)) q.push(x); }
  return q;
};
window.topicName=function(t){
  if(GMAP[t]) return B(GMAP[t].t);
  return {vocab:L('Словниковий запас','Словарный запас'),listen:L('Сприйняття на слух','Восприятие на слух'),translate:L('Переклад фраз','Перевод фраз')}[t]||t;
};

/* ---------- Runner ---------- */
window.Runner={
  mount(box,qs,opt){
    opt=opt||{}; let i=0, res=[], cur=null, answered=false, built=[], sortSel={};
    const total=qs.length;
    if(!total){ box.innerHTML=`<p class="muted">${L('Для цієї вправи поки замало матеріалу.','Для этого упражнения пока мало материала.')}</p>`; return; }
    const draw=()=>{
      cur=qs[i]; answered=false; built=[]; sortSel={};
      let body='';
      if(cur.type==='choice') body=`<div class="opts">${cur.opts.map((o,k)=>`<button class="opt" data-r="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;
      else if(cur.type==='input') body=`<div class="inp-row"><input id="rAns" class="input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${L('Ваша відповідь…','Ваш ответ…')}"><button class="btn primary" data-r="check">${L('Перевірити','Проверить')}</button></div><div class="uml">${['ä','ö','ü','ß','Ä','Ö','Ü'].map(c=>`<button class="chip-btn" data-r="uml" data-c="${c}">${c}</button>`).join('')}</div>`;
      else if(cur.type==='order') body=`<div class="order-line" id="rLine"></div><div class="tokens" id="rTok"></div><button class="btn primary" data-r="check">${L('Перевірити','Проверить')}</button>`;
      else if(cur.type==='sort') body=`<div class="sort">${cur.items.map((it,k)=>`<div class="sort-row" data-row="${k}"><span class="sort-word">${esc(it.t)}<small>${esc(it.hint||'')}</small></span><span class="seg">${cur.groups.map(g=>`<button data-r="sort" data-k="${k}" data-g="${esc(g)}">${esc(g)}</button>`).join('')}</span></div>`).join('')}</div><button class="btn primary" data-r="check">${L('Перевірити','Проверить')}</button>`;
      box.innerHTML=`<div class="runner"><div class="r-head"><span class="r-kind">${esc(cur.kind)}</span><span class="r-count">${i+1} / ${total}</span></div>
        <div class="bar"><i style="width:${i/total*100}%"></i></div>
        <div class="r-q">${cur.q}${cur.say?sayBtn(cur.say):''}</div>${cur.sub?`<div class="r-sub">${esc(cur.sub)}</div>`:''}
        <div class="r-body">${body}</div><div class="r-fb" id="rFb" aria-live="polite"></div></div>`;
      if(cur.type==='order') drawOrder();
      if(cur.auto&&i>0) Speech.say(cur.auto);
      const inp=box.querySelector('#rAns'); if(inp){ inp.focus({preventScroll:true}); inp.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); answered?next():check(); } }; }
    };
    const drawOrder=()=>{
      box.querySelector('#rLine').innerHTML=built.length?built.map((b,k)=>`<button class="tok on" data-r="untok" data-k="${k}">${esc(cur.tokens[b])}</button>`).join(''):`<span class="muted">${L('Тут зʼявиться ваше речення','Здесь появится ваше предложение')}</span>`;
      box.querySelector('#rTok').innerHTML=cur.tokens.map((t,k)=>`<button class="tok" data-r="tok" data-k="${k}" ${built.includes(k)?'disabled':''}>${esc(t)}</button>`).join('');
    };
    const finish=(good,your,right)=>{
      answered=true; const d=day(); d.ex++; if(good) d.ok++;
      if(cur.word) wordResult(cur.word,good);
      if(cur.type==='sort') cur.items.forEach(it=>{ if(it.word) wordResult(it.word,sortSel[cur.items.indexOf(it)]===it.g); });
      res.push({ok:good,q:cur.plain,your,right,why:cur.why,topic:cur.topic,kind:cur.kind}); save();
      const last=i===total-1, g=GMAP[cur.topic];
      box.querySelector('#rFb').innerHTML=`<div class="fb ${good?'good':'bad'}">
        <div class="fb-title">${good?ic('check')+' '+L('Правильно!','Правильно!'):L('Не зовсім — і це нормально.','Не совсем — и это нормально.')}</div>
        ${good?'':`<div class="fb-right">${L('Правильна відповідь:','Правильный ответ:')} <b>${esc(right)}</b> ${/^[\x20-\x7EÄÖÜäöüß„“…—–]+$/.test(right)&&right.length>1?sayBtn(right,'sm'):''}</div>
        <div class="fb-why">${esc(cur.why||'')}</div>
        ${cur.sim?`<div class="fb-sim"><span>${L('Схожий приклад:','Похожий пример:')}</span> <b>${esc(cur.sim.de)}</b> — ${esc(cur.sim.tr)}</div>`:''}
        ${g?`<button class="link-btn" data-act="rule" data-id="${g.id}">${ic('gram')} ${L('Повторити правило: ','Повторить правило: ')}${esc(B(g.t))}</button>`:''}`}
        <button class="btn primary" data-r="next">${last?L('Завершити','Завершить'):L('Далі','Дальше')} ${ic('right')}</button></div>`;
      box.querySelectorAll('.r-body button, .r-body input').forEach(b=>b.disabled=true);
      const nb=box.querySelector('[data-r=next]'); if(nb) nb.focus({preventScroll:true});
    };
    const check=()=>{
      if(answered) return;
      if(cur.type==='input'){ const v=box.querySelector('#rAns').value; if(!v.trim()) return; finish(cur.a.some(a=>norm(a)===norm(v)),v,cur.a[0]); }
      else if(cur.type==='order'){ if(!built.length) return; const v=built.map(b=>cur.tokens[b]).join(' '); finish(norm(v)===norm(cur.a),v,cur.a); }
      else if(cur.type==='sort'){
        if(Object.keys(sortSel).length<cur.items.length){ toast(L('Оберіть варіант для кожного слова.','Выберите вариант для каждого слова.')); return; }
        let good=true; cur.items.forEach((it,k)=>{ const row=box.querySelector(`[data-row="${k}"]`); const okk=sortSel[k]===it.g; if(!okk) good=false; row.classList.add(okk?'ok':'no'); if(!okk) row.querySelector('.sort-word').insertAdjacentHTML('beforeend',` <b class="fix">→ ${esc(it.g)}</b>`); });
        finish(good,cur.items.map((it,k)=>sortSel[k]+' '+it.t).join(', '),cur.items.map(it=>it.g+' '+it.t).join(', '));
      }
    };
    const next=()=>{ if(i<total-1){ i++; draw(); box.scrollIntoView({block:'nearest',behavior:'smooth'}); } else { checkAchievements(); opt.onDone&&opt.onDone(res); } };
    box.onclick=e=>{
      const b=e.target.closest('[data-r]'); if(!b||b.disabled) return; const r=b.dataset.r, k=+b.dataset.k;
      if(r==='opt'&&!answered){ const v=cur.opts[k], good=v===cur.a; box.querySelectorAll('.opt').forEach((o,j)=>{ if(cur.opts[j]===cur.a) o.classList.add('ok'); else if(j===k) o.classList.add('no'); }); finish(good,v,cur.a); }
      else if(r==='check') check();
      else if(r==='next') next();
      else if(r==='uml'){ const inp=box.querySelector('#rAns'); const s=inp.selectionStart??inp.value.length; inp.value=inp.value.slice(0,s)+b.dataset.c+inp.value.slice(inp.selectionEnd??s); inp.focus(); inp.setSelectionRange(s+1,s+1); }
      else if(r==='tok'&&!answered){ built.push(k); drawOrder(); }
      else if(r==='untok'&&!answered){ built.splice(k,1); drawOrder(); }
      else if(r==='sort'&&!answered){ sortSel[k]=b.dataset.g; b.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); }
    };
    draw();
  }
};
/* Підсумок після серії вправ */
window.resultHTML=function(res,extra){
  const okN=res.filter(r=>r.ok).length, bad=res.filter(r=>!r.ok), pct=Math.round(okN/res.length*100);
  const topics={}; bad.forEach(r=>topics[r.topic]=(topics[r.topic]||0)+1);
  const tl=Object.keys(topics).sort((a,b)=>topics[b]-topics[a]);
  return `<div class="result"><div class="res-ring" style="--p:${pct}"><b>${pct}%</b></div>
    <h3>${pct>=90?L('Чудовий результат!','Отличный результат!'):pct>=60?L('Добра робота!','Хорошая работа!'):L('Є над чим попрацювати — ви на правильному шляху.','Есть над чем поработать — вы на верном пути.')}</h3>
    <div class="res-nums"><span class="pill ok">${L('Правильно','Правильно')}: ${okN}</span><span class="pill bad">${L('Помилок','Ошибок')}: ${bad.length}</span><span class="pill">${L('Усього','Всего')}: ${res.length}</span></div>
    ${bad.length?`<h4>${L('Розбір помилок','Разбор ошибок')}</h4><div class="err-list">${bad.map(r=>`<div class="err"><div class="err-q">${esc(r.q)}</div><div><span class="muted">${L('Ваша відповідь:','Ваш ответ:')}</span> <s>${esc(r.your)}</s></div><div><span class="muted">${L('Правильно:','Правильно:')}</span> <b>${esc(r.right)}</b></div><div class="err-why">${esc(r.why||'')}</div></div>`).join('')}</div>
    <h4>${L('Що варто повторити','Что стоит повторить')}</h4><div class="chips">${tl.map(t=>GMAP[t]?`<a class="chip link" href="#grammar-${t}">${ic('gram')} ${esc(topicName(t))} · ${topics[t]}</a>`:`<a class="chip link" href="#dictionary">${ic('dict')} ${esc(topicName(t))} · ${topics[t]}</a>`).join('')}</div>`:`<p class="muted">${L('Жодної помилки. Так тримати!','Ни одной ошибки. Так держать!')}</p>`}
    ${extra||''}</div>`;
};
})();
