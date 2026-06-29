(function(){
const app=document.getElementById('app'),data=window.PB40_DATA;
let currentDay=0,currentExercise=0,timer=null,lastMode='home';
let workoutRunning=false, workoutPaused=false, workoutLeft=0, workoutPhase='work', workoutAuto=false;
if(!data||!data.days||!data.exercises){
  app.innerHTML='<section class="card"><h2>Chyba načtení dat</h2><p class="muted">Nenalezl se window.PB40_DATA v data.js.</p></section>';return;
}
const $=id=>document.getElementById(id);
const key=(d,i)=>`pb40-d${d}-e${i}`; // SAME KEYS as V3_full: progress stays
const done=(d,i)=>localStorage.getItem(key(d,i))==='1';
const setDone=(d,i)=>{localStorage.setItem(key(d,i),'1');markToday();};
const favKey=k=>`pb40-fav-${k}`;
const isFav=k=>localStorage.getItem(favKey(k))==='1';
const toggleFav=k=>localStorage.setItem(favKey(k),isFav(k)?'0':'1');
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const logKey=d=>`pb40-log-${d}`;
const todayKey=()=>dateKey(new Date());
function markToday(){localStorage.setItem(logKey(todayKey()),'1');}
function hasLog(d){return localStorage.getItem(logKey(d))==='1';}
function loggedDates(){
  const out=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&k.startsWith('pb40-log-')&&localStorage.getItem(k)==='1')out.push(k.replace('pb40-log-',''));
  }
  return out.sort();
}
function streak(){
  const set=new Set(loggedDates());
  let n=0,d=new Date();
  while(set.has(dateKey(d))){n++;d.setDate(d.getDate()-1);} 
  return n;
}
function monthName(d){return d.toLocaleDateString('cs-CZ',{month:'long',year:'numeric'});}
const measureKey='pb40-measurements';
function measurements(){try{return JSON.parse(localStorage.getItem(measureKey)||'[]')}catch(e){return []}}
function saveMeasurements(arr){localStorage.setItem(measureKey,JSON.stringify(arr));}
function fmtNum(v){return (v===undefined||v===null||v==='')?'—':String(v).replace('.',',')}
function latestMeasurement(){const arr=measurements();return arr.length?arr[arr.length-1]:null}
function firstMeasurement(){const arr=measurements();return arr.length?arr[0]:null}
function deltaText(a,b,unit='cm'){if(!a||!b)return '—';const d=(Number(b)-Number(a));if(!Number.isFinite(d))return '—';return (d>0?'+':'')+d.toFixed(1).replace('.',',')+' '+unit;}

function num(v){const n=Number(String(v??'').replace(',','.'));return Number.isFinite(n)?n:null;}
function trendClass(start,end,lowerBetter=true){const a=num(start),b=num(end);if(a===null||b===null||a===b)return 'trendNeutral';const good=lowerBetter?b<a:b>a;return good?'trendGood':'trendBad';}
function sparkChart(arr,field,label,unit=''){
  const pts=arr.map(m=>({date:m.date,value:num(m[field])})).filter(x=>x.value!==null);
  if(pts.length<2)return `<div class="chartBox"><div class="chartTitle"><span>${label}</span><span>aspoň 2 záznamy</span></div><p class="muted">Graf se zobrazí, jakmile uložíš minimálně dvě měření.</p></div>`;
  const w=320,h=150,pad=28;
  const vals=pts.map(p=>p.value),min=Math.min(...vals),max=Math.max(...vals),range=(max-min)||1;
  const xy=pts.map((p,i)=>{
    const x=pad+(i/(pts.length-1))*(w-pad*2);
    const y=pad+(1-(p.value-min)/range)*(h-pad*2);
    return {...p,x,y};
  });
  const path=xy.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const first=pts[0].value,last=pts[pts.length-1].value,d=last-first;
  const delta=(d>0?'+':'')+d.toFixed(1).replace('.',',')+(unit?' '+unit:'');
  const cls=trendClass(first,last,true);
  return `<div class="chartBox"><div class="chartTitle"><span>${label}</span><span class="${cls}">${delta}</span></div>
    <svg class="chartSvg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Graf ${label}">
      <line class="chartGrid" x1="${pad}" y1="${pad}" x2="${w-pad}" y2="${pad}"></line>
      <line class="chartGrid" x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}"></line>
      <text class="chartLabel" x="4" y="${pad+4}">${fmtNum(max.toFixed(1))}</text>
      <text class="chartLabel" x="4" y="${h-pad+4}">${fmtNum(min.toFixed(1))}</text>
      <path class="chartLine" d="${path}"></path>
      ${xy.map(p=>`<circle class="chartPoint" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4"><title>${p.date}: ${fmtNum(p.value)} ${unit}</title></circle>`).join('')}
    </svg>
    <p class="muted">${pts[0].date} → ${pts[pts.length-1].date}</p>
  </div>`;
}

const noteKey='pb40-workout-notes';
function workoutNotes(){try{return JSON.parse(localStorage.getItem(noteKey)||'[]')}catch(e){return []}}
function saveWorkoutNotes(arr){localStorage.setItem(noteKey,JSON.stringify(arr));}
function latestNote(){const arr=workoutNotes();return arr.length?arr[arr.length-1]:null}
function saveWorkoutNote(){
  const mood=document.querySelector('.moodRow button.selected')?.dataset.mood||'';
  const text=document.getElementById('finish-note')?.value?.trim()||'';
  const arr=workoutNotes();
  arr.push({date:todayKey(),day:currentDay,title:data.days[currentDay].title,mood,text});
  saveWorkoutNotes(arr.slice(-60));
  home();
}
function coachHint(){
  const n=latestNote();
  if(n&&n.mood==='tough')return 'Včera to bylo těžší. Dnes zmenši rozsah, ale nevynechávej úplně.';
  if(n&&n.mood==='good')return 'Minule ses cítila dobře. Drž techniku a klidně přidej o trochu větší soustředění.';
  if(streak()>=3)return 'Máš pěknou sérii. Teď hlavně nepřepálit tempo.';
  return 'Dnes stačí odcvičit poctivě. Nemusí to být dokonalé.';
}

function weeklyHint(arr){
  if(arr.length<2)return 'Ulož první dvě měření a aplikace začne ukazovat trend.';
  const f=arr[0],l=arr[arr.length-1];
  const w1=num(f.weight),w2=num(l.weight),p1=num(f.waist),p2=num(l.waist);
  if(p1!==null&&p2!==null&&p2<p1)return 'Pas jde dolů. To je u zpevnění často lepší ukazatel než samotná váha.';
  if(w1!==null&&w2!==null&&Math.abs(w2-w1)<=0.5)return 'Váha je stabilní. Sleduj hlavně pas, fotky a pocit v oblečení.';
  return 'Trend sleduj týdně, ne denně. Jedno měření samo o sobě nic nerozhoduje.';
}


function setNav(a){
  ['home','days','train','calendar','library','stats','progress'].forEach(n=>{
    const el=$(`nav-${n}`); if(el) el.classList.toggle('active',n===a);
  });
}
function pct(di){
  const items=data.days[di].items;
  if(!items.length)return 100;
  let n=0;items.forEach((_,i)=>{if(done(di,i))n++});
  return Math.round(n/items.length*100);
}
function countDone(di){let n=0;data.days[di].items.forEach((_,i)=>{if(done(di,i))n++});return n}
function statsData(){
  let total=0,complete=0,daysComplete=0;
  data.days.forEach((d,di)=>{
    if(d.items.length&&pct(di)===100)daysComplete++;
    d.items.forEach((_,i)=>{total++;if(done(di,i))complete++});
  });
  return{total,complete,daysComplete,percent:total?Math.round(complete/total*100):0};
}
function nextDayIndex(){
  let n=data.days.findIndex((d,i)=>d.items.length&&pct(i)<100);
  return n<0?0:n;
}
function restSeconds(k,dose){
  const ex=data.exercises[k];
  if((ex.icon||'')==='🧘') return 8;
  if((dose||'').includes('/')) return 10;
  if((dose||'').includes('s')) return 15;
  return 15;
}
function workSeconds(dose){
  const txt=String(dose||'');
  const m=txt.match(/(\d+)\s*s/);
  if(m)return Number(m[1]);
  if(txt.includes('/strana'))return 50;
  if(txt.includes('/'))return 45;
  const reps=txt.match(/(\d+)/);
  if(reps){const n=Number(reps[1]);return Math.min(60,Math.max(30,n*3));}
  return 40;
}
function beep(freq=660,dur=90){
  try{
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return;
    const ctx=new C(), o=ctx.createOscillator(), g=ctx.createGain();
    o.frequency.value=freq;o.connect(g);g.connect(ctx.destination);g.gain.value=.04;o.start();
    setTimeout(()=>{o.stop();ctx.close();},dur);
  }catch(e){}
}
function img(k,c='thumb',extra=''){
  const ex=data.exercises[k];
  return `<img loading="lazy" class="${c}" ${extra} src="${ex.image}" alt="${ex.name}">`;
}

function exMeta(k){
  const ex=data.exercises[k], f=(ex.focus||'').toLowerCase(), icon=ex.icon||'';
  let area='Technika', diff='Lehké', knee='Šetrné ke kolenům';
  if(icon==='🍑')area='Hýždě / nohy';
  if(icon==='🔥')area='Core';
  if(icon==='💪')area='Záda / ramena';
  if(icon==='🧘')area='Mobilita';
  if(['plank','sideplank','hollow','tap','plie','wall'].includes(k))diff='Střední';
  if(['wall','plie'].includes(k))knee='Pozor na kolena';
  const tempo = icon==='🧘' ? 'plynule s dechem' : (icon==='🔥' ? '2 s tam / 2 s zpět' : 'pomalu bez švihu');
  const breath = icon==='🔥' ? 'Vydechni při záběru břicha.' : (icon==='🍑' ? 'Vydechni při zvednutí / zatlačení.' : 'Dýchej klidně do žeber.');
  const mistakes = [];
  if(ex.watch) mistakes.push(ex.watch);
  if(icon==='🔥') mistakes.push('Zadržování dechu a odlepování beder.');
  else if(icon==='🍑') mistakes.push('Švih místo pomalé kontroly pohybu.');
  else if(icon==='💪') mistakes.push('Ramena vytažená k uším.');
  else mistakes.push('Tlačení do bolesti místo jemného rozsahu.');
  return {area,diff,knee,tempo,breath,mistakes};
}
function daySummary(di){
  const items=data.days[di].items;
  if(!items.length)return '';
  const counts={};
  items.forEach(([k])=>{const a=exMeta(k).area;counts[a]=(counts[a]||0)+1;});
  const main=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,3).join(' • ');
  const minutes=Math.max(18, Math.round(items.length*4.5));
  const hard=items.some(([k])=>exMeta(k).diff==='Střední');
  return `<div class="daySummary"><span>⏱ ${minutes} min</span><span>${hard?'🔥 Střední':'🟢 Lehké'}</span><span>🎯 ${main}</span></div>`;
}

function exCard(k,dose,d,i){
  const ex=data.exercises[k],ok=d!==undefined&&done(d,i), meta=exMeta(k);
  const rep=dose||ex.dose||'';
  return `<article class="exercise v16exercise ${ok?'done':''}" data-day="${d??''}" data-index="${i??''}" data-ex="${k}">
    <div class="exAccent"></div>
    <div class="exBody">
      <div class="exTop"><h3>${ex.name}</h3><span class="repBadge">${rep}${ok?' ✓':''}</span></div>
      <p>${ex.focus||ex.how?.[0]||''}</p>
      <div class="metaLine"><span>${meta.area}</span><span>${meta.diff}</span><span>${meta.knee}</span></div>
    </div>
  </article>`;
}

function muscleItems(k){
  const ex=data.exercises[k], icon=ex.icon||'', f=(ex.focus||'').toLowerCase();
  if(icon==='🍑')return ['Hýždě','Zadní stehna','Stabilita pánve','Střed těla'];
  if(icon==='🔥')return ['Hluboké břišní svaly','Šikmé břišní svaly','Stabilita beder','Dech do žeber'];
  if(icon==='💪')return ['Lopatky','Ramena','Horní záda','Držení těla'];
  if(f.includes('kyč')||f.includes('mobil'))return ['Mobilita kyčlí','Hrudník','Páteř','Uvolnění napětí'];
  return ['Střed těla','Kontrola pohybu','Dech','Stabilita'];
}
function renderMuscles(k){
  const items=muscleItems(k);
  return `<div class="muscleCard"><div class="muscleFigure" aria-hidden="true"><span></span><i></i><b></b></div><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
}
function renderSteps(ex){
  const steps=(ex.how&&ex.how.length?ex.how:[ex.focus||'Proveď cvik pomalu a kontrolovaně.']).slice(0,4);
  return steps.map((x,i)=>`<div class="stepCard"><b>${i+1}</b><p>${x}</p></div>`).join('');
}
function info(k){
  const ex=data.exercises[k], meta=exMeta(k);
  const dose = (()=>{
    const item=data.days[currentDay]?.items?.find(x=>x[0]===k);
    return item?.[1] || ex.dose || 'podle plánu';
  })();
  app.innerHTML=`<section class="exerciseDetail">
    <div class="detailNav"><button data-action="day" data-day="${currentDay}">← Zpět k tréninku</button><button class="favBtn" data-action="fav" data-ex="${k}">${isFav(k)?'♥ Uloženo':'♡ Uložit cvik'}</button></div>
    <div class="detailGrid">
      <div class="detailMain">
        <div class="heroExercise">
          ${img(k,'heroImg')}
          <div class="heroOverlay"><span>${meta.area}</span><strong>${dose}</strong></div>
        </div>
        <div class="processPanel">
          <div class="topLine"><h2>Průběh cviku</h2><span class="pill">pomalu a kontrolovaně</span></div>
          <div class="processGrid">${renderSteps(ex)}</div>
        </div>
        <div class="coachPanel goodPanel">
          <h2>Tipy pro správné provedení</h2>
          <ul><li>${meta.breath}</li><li>${meta.tempo}</li><li>${ex.watch||'Drž čistou techniku a necvič přes ostrou bolest.'}</li></ul>
        </div>
      </div>
      <aside class="detailSide">
        <div class="titlePanel">
          <p class="eyebrow">Detail cviku</p>
          <h1>${ex.name}</h1>
          <div class="tagRow"><span>${meta.area}</span><span>${meta.diff}</span><span>${meta.knee}</span></div>
        </div>
        <div class="sideBox"><h2>Zapojené svaly</h2>${renderMuscles(k)}</div>
        <div class="sideBox"><h2>Jak provést</h2><ol>${(ex.how||[]).map(x=>`<li>${x}</li>`).join('')}</ol></div>
        <div class="sideBox dangerBox"><h2>Časté chyby</h2><ul>${meta.mistakes.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="sideBox"><h2>Co máš cítit</h2><p>${ex.feel||'Kontrolovanou práci svalů bez ostré bolesti.'}</p></div>
        <button class="primary bigbtn" data-action="done-current-from-detail">✓ Hotovo</button>
      </aside>
    </div>
  </section>`;
}

function library(){
  lastMode='library';setNav('library');
  app.innerHTML=`<section class="card"><h2>Program</h2><div class="moreGrid"><button data-action="program-info">✦ O programu</button><button data-action="progress">◎ Měření</button><button data-action="stats">↗ Statistiky</button><button data-action="library-list">◈ Knihovna cviků</button><button data-action="export-progress">⬇ Záloha</button><button onclick="document.body.classList.toggle('dark');localStorage.setItem('dark',document.body.classList.contains('dark')?'1':'0')">🌙 Tmavý režim</button></div></section>
  <section class="card"><h2>Knihovna cviků</h2><p class="muted">Klepni na cvik pro detail techniky.</p><div class="libraryGrid">${Object.keys(data.exercises).map(k=>exCard(k,data.exercises[k].dose)).join('')}</div></section>`;
}
function favs(){
  lastMode='library';setNav('library');
  const keys=Object.keys(data.exercises).filter(k=>isFav(k));
  app.innerHTML=`<section class="card"><h2>Oblíbené cviky</h2>${keys.length?'<div class="libraryGrid">'+keys.map(k=>exCard(k,data.exercises[k].dose)).join('')+'</div>':'<p class="muted">Zatím žádné oblíbené.</p>'}</section>`;
}
function calendar(){
  lastMode='calendar';setNav('calendar');
  const now=new Date(), y=now.getFullYear(), m=now.getMonth();
  const first=new Date(y,m,1), last=new Date(y,m+1,0);
  const start=(first.getDay()+6)%7;
  const cells=[];
  for(let i=0;i<start;i++)cells.push('<div class="calCell empty"></div>');
  for(let d=1;d<=last.getDate();d++){
    const dt=new Date(y,m,d), dk=dateKey(dt), isToday=dk===todayKey(), ok=hasLog(dk);
    cells.push(`<button class="calCell ${ok?'trained':''} ${isToday?'today':''}" data-action="calendar-day" data-date="${dk}"><span>${d}</span>${ok?'<b>✓</b>':''}</button>`);
  }
  const logs=loggedDates();
  app.innerHTML=`<section class="card"><h2>Kalendář cvičení</h2>
    <p class="muted">${monthName(now)} • odcvičené dny se označí automaticky, jakmile dokončíš aspoň jeden cvik.</p>
    <div class="statGrid"><div class="statBox"><b>${streak()}</b><span class="muted">série dní</span></div><div class="statBox"><b>${logs.length}</b><span class="muted">dní celkem</span></div><div class="statBox"><b>${hasLog(todayKey())?'ano':'ne'}</b><span class="muted">dnes</span></div></div>
    <div class="weekHead"><span>Po</span><span>Út</span><span>St</span><span>Čt</span><span>Pá</span><span>So</span><span>Ne</span></div>
    <div class="calendarGrid">${cells.join('')}</div>
    <div class="row"><button data-action="mark-today">Označit dnešek ručně</button><button data-action="unmark-today">Odebrat dnešek</button></div>
  </section>`;
}

function progressTracker(){
  lastMode='progress';setNav('progress');
  const arr=measurements(), first=firstMeasurement(), last=latestMeasurement();
  const today=todayKey();
  const rows=arr.slice().reverse().map((m,ri)=>`<tr><td>${m.date}</td><td>${fmtNum(m.weight)}</td><td>${fmtNum(m.waist)}</td><td>${fmtNum(m.hips)}</td><td>${fmtNum(m.thigh)}</td><td><button class="smallBtn" data-action="delete-measure" data-index="${arr.length-1-ri}">Smazat</button></td></tr>`).join('');
  app.innerHTML=`<section class="card"><h2>Měření pokroku</h2>
    <p class="muted">Stačí jednou týdně. Neřeš denní výkyvy — u těla je důležitý trend, ne jedno číslo.</p>
    <div class="statGrid"><div class="statBox"><b>${last?fmtNum(last.weight):'—'}</b><span class="muted">poslední váha kg</span></div><div class="statBox"><b>${first&&last?deltaText(first.waist,last.waist):'—'}</b><span class="muted">pas od začátku</span></div><div class="statBox"><b>${arr.length}</b><span class="muted">záznamů</span></div></div>
    <div class="inlineTip"><b>Vyhodnocení:</b><br>${weeklyHint(arr)}</div>
  </section>
  ${backupPanel()}
  <section class="card"><h2>Grafy</h2>
    ${sparkChart(arr,'weight','Váha','kg')}
    ${sparkChart(arr,'waist','Pas','cm')}
    ${sparkChart(arr,'hips','Boky','cm')}
    ${sparkChart(arr,'thigh','Stehno','cm')}
  </section>
  <section class="card"><h2>Nový záznam</h2>
    <div class="measureForm">
      <label>Datum<input id="m-date" type="date" value="${today}"></label>
      <label>Váha kg<input id="m-weight" type="number" step="0.1" inputmode="decimal" placeholder="např. 66.0"></label>
      <label>Pas cm<input id="m-waist" type="number" step="0.1" inputmode="decimal" placeholder="pas"></label>
      <label>Boky cm<input id="m-hips" type="number" step="0.1" inputmode="decimal" placeholder="boky"></label>
      <label>Stehno cm<input id="m-thigh" type="number" step="0.1" inputmode="decimal" placeholder="stehno"></label>
      <label>Poznámka<input id="m-note" type="text" placeholder="např. po ránu / po cvičení"></label>
    </div>
    <button class="primary bigbtn" data-action="save-measure">Uložit měření</button>
  </section>
  <section class="card"><h2>Historie</h2>
    ${arr.length?`<div class="tableWrap"><table><thead><tr><th>Datum</th><th>kg</th><th>Pas</th><th>Boky</th><th>Stehno</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`:'<p class="muted">Zatím nemáš uložené žádné měření.</p>'}
    ${last&&last.note?`<div class="inlineTip"><b>Poslední poznámka:</b><br>${last.note}</div>`:''}
  </section>`;
}
function saveMeasureFromForm(){
  const val=id=>document.getElementById(id)?.value?.trim()||'';
  const rec={date:val('m-date')||todayKey(),weight:val('m-weight'),waist:val('m-waist'),hips:val('m-hips'),thigh:val('m-thigh'),note:val('m-note')};
  const arr=measurements().filter(x=>x.date!==rec.date);
  arr.push(rec);arr.sort((a,b)=>a.date.localeCompare(b.date));saveMeasurements(arr);progressTracker();
}

function showStats(){
  lastMode='stats';setNav('stats');const s=statsData();
  app.innerHTML=`<section class="card"><h2>Statistiky</h2><p class="muted">${s.percent}% programu</p><div class="progress"><div class="bar" style="width:${s.percent}%"></div></div>
  <div class="statGrid"><div class="statBox"><b>${s.daysComplete}</b><span class="muted">hotových dní</span></div><div class="statBox"><b>${s.complete}</b><span class="muted">cviků</span></div><div class="statBox"><b>${streak()}</b><span class="muted">série dní</span></div></div><div class="row"><button data-action="calendar">Kalendář</button><button data-action="progress">Měření</button></div></section>`;
}
app.addEventListener('click',e=>{
  const t=e.target.closest('[data-action],.exercise[data-day],.exercise[data-ex]');
  if(!t)return;
  const a=t.dataset.action;
  if(a==='home')return home();
  if(a==='intro-start'){markIntroSeen();return startTraining(0,true);}
  if(a==='program-info')return programInfo();
  if(a==='days')return days();
  if(a==='stats')return showStats();
  if(a==='calendar')return calendar();
  if(a==='progress')return progressTracker();
  if(a==='save-measure')return saveMeasureFromForm();
  if(a==='export-progress')return exportProgress();
  if(a==='save-workout-note')return saveWorkoutNote();
  if(a==='select-mood'){document.querySelectorAll('.moodRow button').forEach(b=>b.classList.remove('selected'));t.classList.add('selected');return;}
  if(a==='library'||a==='library-list')return library();
  if(a==='delete-measure'){const arr=measurements();arr.splice(Number(t.dataset.index),1);saveMeasurements(arr);return progressTracker();}
  if(a==='mark-today'){markToday();return calendar();}
  if(a==='unmark-today'){localStorage.removeItem(logKey(todayKey()));return calendar();}
  if(a==='calendar-day'){const k=logKey(t.dataset.date);localStorage.getItem(k)==='1'?localStorage.removeItem(k):localStorage.setItem(k,'1');return calendar();}
  if(a==='day'||(!a&&t.classList.contains('exercise')&&t.dataset.day!==''))return day(Number(t.dataset.day));
  if(a==='start')return startTraining(Number(t.dataset.day),false);
  if(a==='start-auto')return startTraining(Number(t.dataset.day),true);
  if(a==='done-next')return doneNext(true);
  if(a==='done-next-nomark')return doneNext(false);
  if(a==='toggle-auto'){workoutPaused=!workoutPaused;return showAutoTrain();}
  if(a==='skip-auto')return skipAuto();
  if(a==='stop-auto'){clearInterval(timer);workoutAuto=false;return day(currentDay);}
  if(a==='reset-day'){data.days[Number(t.dataset.day)].items.forEach((_,i)=>localStorage.removeItem(key(Number(t.dataset.day),i)));return day(Number(t.dataset.day));}
  if(a==='prev'){if(currentExercise>0)currentExercise--;return showTrain();}
  if(a==='rest')return restScreen();
  if(a==='train-current')return workoutAuto?showAutoTrain():showTrain();
  if(a==='fav'){toggleFav(t.dataset.ex);return info(t.dataset.ex);}
  if(a==='done-current-from-detail'){setDone(currentDay,currentExercise);return day(currentDay);}
  if(a==='info'||t.dataset.ex)return info(t.dataset.ex);
});
app.addEventListener('change',e=>{if(e.target&&e.target.id==='backup-file')importProgressFile(e.target.files[0]);});
$('nav-home').onclick=home;
$('nav-days').onclick=days;
$('nav-train').onclick=()=>startTraining(nextDayIndex(),true);
$('nav-calendar').onclick=calendar;
$('nav-library').onclick=library;
$('nav-stats').onclick=showStats;
const progressNav=document.getElementById('nav-progress'); if(progressNav) progressNav.onclick=progressTracker;
const favNav=document.getElementById('nav-favs'); if(favNav) favNav.onclick=favs;
$('nav-dark').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('dark',document.body.classList.contains('dark')?'1':'0')};
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{})}
if(localStorage.getItem(introKey)!=='1') intro(); else home();
})();