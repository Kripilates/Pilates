(function(){
const app=document.getElementById('app'),data=window.PB40_DATA;
let currentDay=0,currentExercise=0,timer=null,lastMode='home';
let workoutCurrentSet=1, workoutTotalSets=3;
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
function isTimedDose(dose){
  return /\d+\s*s/.test(String(dose||''));
}
function workSeconds(dose){
  const txt=String(dose||'');
  const m=txt.match(/(\d+)\s*s/);
  if(m)return Number(m[1]);
  return 0;
}
function doseLabel(dose){
  const txt=String(dose||'');
  if(isTimedDose(txt))return txt;
  return `${workoutTotalSets} série × ${txt}`;
}
function setPill(dose){
  if(isTimedDose(dose))return '';
  return `<div class="setPill roundPill">Kolo ${workoutCurrentSet} z ${workoutTotalSets}</div>`;
}
function beep(freq=660,dur=90){
  try{
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return;
    const ctx=new C(), o=ctx.createOscillator(), g=ctx.createGain();
    o.frequency.value=freq;o.connect(g);g.connect(ctx.destination);g.gain.value=.04;o.start();
    setTimeout(()=>{o.stop();ctx.close();},dur);
  }catch(e){}
}
const day1RealImages={hip:'assets/exercises/hip_real_card.jpg',rdl:'assets/exercises/rdl_real_card.jpg',hydrant:'assets/exercises/hydrant_real_card.jpg',clam:'assets/exercises/clam_real_card.jpg',sideleg:'assets/exercises/sideleg_real_card.jpg',deadbug:'assets/exercises/deadbug_real_card.jpg'};
function v22ImageSrc(k){return day1RealImages[k] || data.exercises[k]?.image || '';}
function img(k,c='thumb',extra=''){
  const ex=data.exercises[k];
  const src=v22ImageSrc(k);
  const real=day1RealImages[k] ? ' realThumb v22RealThumb' : '';
  return `<img loading="lazy" class="${c}${real}" ${extra} src="${src}" alt="${ex.name}">`;
}

function detailHeroImage(k){
  const src = k==='hip' ? 'assets/exercises/hip_real_hero.jpg' : v22ImageSrc(k);
  return `<img loading="lazy" class="v20HeroPhoto v22HeroPhoto" src="${src}" alt="${data.exercises[k]?.name||'cvik'}">`;
}
function detailStepImage(k,n){
  const src = k==='hip' ? `assets/exercises/hip_real_step${n}.jpg` : v22ImageSrc(k);
  return `<img loading="lazy" class="v20StepPhoto v22StepPhoto" src="${src}" alt="${data.exercises[k]?.name||'cvik'} krok ${n}">`;
}
function detailMuscleImage(k){
  if(day1RealImages[k]) return `<img loading="lazy" class="v20MuscleImg" src="assets/exercises/day1_muscles.jpg" alt="Zapojené svaly">`;
  return '';
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
  const ex=data.exercises[k],ok=d!==undefined&&done(d,i),meta=exMeta(k);
  const rep=dose||ex.dose||'';
  const num=(i!==undefined?i+1:'');
  const isReal=!!day1RealImages[k];
  const labels = k==='hip' ? ['Hýždě (hlavně)','Zadní stehna','Spodní záda'] :
    k==='rdl' ? ['Zadní stehna (hlavně)','Hýždě','Spodní záda'] :
    k==='hydrant' ? ['Hýždě (střední sval)','Hýždě','Core'] :
    k==='clam' ? ['Hýždě (střední sval)','Hýždě','Kyčle'] :
    k==='sideleg' ? ['Hýždě (střední sval)','Kyčle','Stehno'] :
    k==='deadbug' ? ['Břicho (hlavně)','Core','Stabilizace'] : [meta.area,meta.diff,meta.knee];
  return `<article class="exercise v18exercise v22exercise ${isReal?'v22RealCard':''} ${ok?'done':''}" data-action="info" data-ex="${k}" data-day="${d??''}" data-index="${i??''}">
    <div class="v22CardHead"><span class="v22CardNum">${num||'•'}</span><h3>${ex.name}</h3><span class="repBadge">${rep}${ok?' ✓':''}</span></div>
    <div class="thumbWrap v22PhotoWrap">${img(k,'thumb')}<span class="doneMark">${ok?'✓':''}</span></div>
    <div class="v22CardLabels">${labels.map((x,j)=>`<span class="${j===0?'mainLabel':''}">${x}</span>`).join('')}</div>
    <div class="v22Open"><span>Jak provést</span><b>›</b></div>
  </article>`;
}

const introKey='pb40-intro-seen-v11';

function exportProgress(){
  const payload={version:'PB40-v27',exportedAt:new Date().toISOString(),items:{}};
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&k.startsWith('pb40-')) payload.items[k]=localStorage.getItem(k);
  }
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='pilates-body-40-zaloha-pokroku.json';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function importProgressFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result);
      const items=payload.items||{};
      Object.keys(items).forEach(k=>{if(k.startsWith('pb40-'))localStorage.setItem(k,String(items[k]));});
      alert('Pokrok je načtený.');
      home();
    }catch(e){alert('Soubor se nepodařilo načíst.');}
  };
  reader.readAsText(file);
}
function backupPanel(){
  return `<section class="card"><h2>Záloha pokroku</h2><p class="muted">Netlify nahrání ti pokrok obvykle nesmaže, pokud zůstane stejná adresa. Jistější je ale občas stáhnout zálohu.</p><div class="moreGrid"><button data-action="export-progress">⬇ Stáhnout zálohu</button><label class="fileImport">⬆ Načíst zálohu<input id="backup-file" type="file" accept="application/json"></label></div></section>`;
}

function markIntroSeen(){localStorage.setItem(introKey,'1');}
function intro(){
  lastMode='intro';setNav('library');
  app.innerHTML=`<section class="introHero">
    <div class="introBadge">30 dní</div>
    <h2>Vítej v Pilates Body 40+</h2>
    <p>Jemný, ale poctivý plán pro zpevnění břicha, hýždí, stehen a lepší držení těla. Cvičíš doma, většinou 20–30 minut denně.</p>
    <button class="primary cta" data-action="intro-start">Začít program</button>
    <button data-action="home">Přeskočit na domů</button>
  </section>
  <section class="card programCard"><h2>Jak funguje 30denní plán</h2>
    <div class="programSteps">
      <div><b>1</b><h3>6 dní + volno</h3><p class="muted">Každý týden máš 6 tréninků a jeden odpočinkový den.</p></div>
      <div><b>2</b><h3>Krátce a pravidelně</h3><p class="muted">Nejde o dokonalost. Důležitá je technika, dech a návrat k plánu.</p></div>
      <div><b>3</b><h3>Sleduj pokrok</h3><p class="muted">Můžeš si ukládat měření pasu, váhy a poznámku po cvičení.</p></div>
    </div>
  </section>
  <section class="card"><h2>Co budeš potřebovat</h2>
    <div class="needGrid"><span>🧘 Podložku</span><span>💧 Vodu</span><span>⭕ Miniband volitelně</span><span>🏋️ Lehké činky volitelně</span></div>
    <p class="inlineTip"><b>Pravidlo:</b> necvič přes ostrou bolest. U kolen drž menší rozsah a u hýždí tlač hlavně přes paty.</p>
  </section>`;
}
function programInfo(){
  lastMode='library';setNav('library');
  app.innerHTML=`<section class="introHero compactIntro">
    <div class="introBadge">Pilates Body 40+</div>
    <h2>O programu</h2>
    <p>30denní domácí plán pro zpevnění středu těla, hýždí, zadních stehen a držení těla. Je stavěný tak, aby šel cvičit reálně i v běžném dni.</p>
    <button class="primary cta" data-action="start-auto" data-day="${nextDayIndex()}">▶ Pokračovat v tréninku</button>
  </section>
  <section class="card programCard"><h2>Co tě čeká</h2>
    <div class="programSteps">
      <div><b>01</b><h3>Hýždě + zadní stehna</h3><p class="muted">Tlak přes paty, pomalejší tempo, žádné švihání.</p></div>
      <div><b>02</b><h3>Břicho + pas</h3><p class="muted">Core cviky bez tahání krkem a bez prohýbání beder.</p></div>
      <div><b>03</b><h3>Mobilita a celé tělo</h3><p class="muted">Odlehčené dny, záda, ramena a plynulost pohybu.</p></div>
    </div>
  </section>
  <section class="card"><h2>Jak cvičit správně</h2>
    <ul class="cleanList"><li>Raději menší rozsah a čistý pohyb než rychlé opakování.</li><li>U hýžďových cviků si hlídej, že necítíš hlavně kyčle.</li><li>U břicha dýchej a drž bedra stabilní.</li><li>Bolest kolen znamená zmenšit rozsah nebo cvik přeskočit.</li></ul>
  </section>`;
}

function home(){
  lastMode='home';setNav('home');
  const s=statsData(),n=nextDayIndex(),day=data.days[n],doneN=countDone(n),totalN=day.items.length,p=pct(n),lm=latestMeasurement(),ln=latestNote();
  app.innerHTML=`<div class="v22Home">
    <section class="v22HeroPanel">
      <div class="helloRow"><div><p class="eyebrow">Dnes</p><h2>Pokračuj v tréninku</h2></div><div class="streakBadge">🔥 ${streak()} dní</div></div>
      <div class="todayCompact v22TodayCompact">
        <div class="ring" style="--val:${p*3.6}deg"><span>${p}%</span></div>
        <div><h3>${day.title}</h3><p class="muted">První týden se zaměřujeme na aktivaci hýždí a zadních stehen. Tlak přes paty, pomalé tempo a kontrola pohybu.</p><div class="miniMeta"><b>${doneN}/${totalN}</b> cviků • ${lm?`pas ${fmtNum(lm.waist)} cm`:'měření zatím není'}</div><div class="progress"><div class="bar" style="width:${p}%"></div></div></div>
      </div>
      <button class="primary cta" data-action="start-auto" data-day="${n}">▶ Cvič se mnou</button>
      <div class="compactActions v22Actions"><button data-action="day" data-day="${n}">♙ Ruční režim</button><button data-action="calendar">▣ Kalendář</button><button data-action="progress">▥ Měření</button></div>
    </section>
    <aside class="v22SidePanels">
      <section class="v22InfoCard"><h3>💡 Tip pro dnešek</h3><p>${coachHint()}<br>Důležitá je pravidelnost.</p>${ln?.text?`<small>Poslední poznámka: ${ln.text}</small>`:''}</section>
      <section class="v22InfoCard v22Areas"><h3>Zaměřené oblasti</h3><img src="assets/exercises/day1_muscles.jpg" alt="Zaměřené oblasti"><div><span><i></i>Hlavní svaly</span><span><i class="secondary"></i>Vedlejší svaly</span></div></section>
    </aside>
    <section class="v22DayExercises"><div class="topLine"><h2>Cviky dne</h2><button data-action="days">Celý plán</button></div><div class="libraryGrid v22ExerciseGrid">${day.items.map(([k,dose],i)=>exCard(k,dose,n,i)).join('')}</div></section>
  </div>`;
}

function days(){
  lastMode='days';setNav('days');
  const groups=[];
  data.days.forEach((d,di)=>{const wi=Math.floor(di/7);if(!groups[wi])groups[wi]=[];groups[wi].push({d,di});});
  app.innerHTML=`<section class="card planIntro"><h2>Plán na 30 dní</h2><p class="muted">Vyber den nebo pokračuj tam, kde máš rozcvičeno. Hotové dny se propisují do pokroku i kalendáře.</p><button class="primary cta" data-action="start-auto" data-day="${nextDayIndex()}">▶ Pokračovat v tréninku</button></section>
  ${groups.map((g,wi)=>`<section class="card weekBlock"><div class="topLine"><h2>Týden ${wi+1}</h2><span class="pill">${g.filter(x=>x.d.items.length&&pct(x.di)===100).length}/6 hotovo</span></div><div class="dayGrid">${g.map(({d,di})=>{const total=d.items.length,dn=countDone(di),pc=pct(di),rest=!total;return `<article class="dayCard ${pc===100&&total?'complete':''} ${rest?'restDay':''}" data-action="day" data-day="${di}"><div class="dayNum">${di+1}</div><div class="dayInfo"><h3>${d.title}</h3><p>${rest?'Regenerace':`Splněno ${dn} z ${total} cviků`}</p><div class="progress"><div class="bar" style="width:${rest?100:pc}%"></div></div></div><div class="dayState">${rest?'☁':pc===100?'✓':'›'}</div></article>`;}).join('')}</div></section>`).join('')}`;
}

function day(di){
  lastMode='day';setNav('days');currentDay=di;
  const day=data.days[di];
  app.innerHTML=`<section class="dashboardHero dayHero">
    <div class="topLine"><button data-action="home">← Domů</button><span class="pill">${countDone(di)}/${day.items.length||0} hotovo</span></div>
    <h2>${day.title}</h2><p class="muted">${day.note}</p>
    ${daySummary(di)}
    <div class="progress"><div class="bar" style="width:${pct(di)}%"></div></div>
    ${day.items.length?`<button class="primary cta" data-action="start-auto" data-day="${di}">▶ Cvič se mnou</button><div class="compactActions"><button data-action="start" data-day="${di}">Ruční režim</button><button data-action="reset-day" data-day="${di}">Vynulovat den</button></div>`:'<p class="muted">Dnes volno.</p>'}
  </section>
  <section class="card"><h2>Cviky dne</h2><div class="libraryGrid v22ExerciseGrid">${day.items.map(([k,dose],i)=>exCard(k,dose,di,i)).join('')}</div></section>`;
}
function startTraining(di,auto=false){
  clearInterval(timer);workoutAuto=auto;workoutRunning=false;workoutPaused=false;workoutPhase='work';workoutCurrentSet=1;
  lastMode='train';setNav('train');currentDay=di;
  const items=data.days[di].items;
  currentExercise=items.findIndex((_,i)=>!done(di,i));
  if(currentExercise<0)currentExercise=0;
  if(auto){workoutLeft=5;workoutPhase='prep';showAutoTrain();startWorkoutTimer();}
  else showTrain();
}

function timerCircleStyle(){
  const [k,dose]=data.days[currentDay].items[currentExercise]||[];
  const total=workoutPhase==='prep'?5:(workoutPhase==='rest'||workoutPhase==='roundRest')?restSeconds(k,dose):workSeconds(dose);
  if(total<=0)return 'var(--p2)';
  const deg=360-(Math.max(0,workoutLeft)/Math.max(1,total))*360;
  return `conic-gradient(var(--p) ${deg}deg, var(--p2) ${deg}deg)`;
}
function phaseLabel(){
  const dose=data.days[currentDay].items[currentExercise]?.[1]||'';
  if(workoutPhase==='work' && !isTimedDose(dose)) return 'Cvič bez časovače';
  if(workoutPhase==='roundRest') return 'Odpočinek mezi koly';
  return workoutPhase==='prep'?'Připrav se':workoutPhase==='rest'?'Pauza před dalším cvikem':'Cvič';
}
function showAutoTrain(){
  const dayObj=data.days[currentDay];
  if(!dayObj.items.length){day(currentDay);return;}
  const [k,dose]=dayObj.items[currentExercise],ex=data.exercises[k];
  const progress=Math.round(((currentExercise+1)/dayObj.items.length)*100);
  app.innerHTML=`<section class="card fullTrain autoTrain">
    <div class="trainTop2"><button data-action="stop-auto">← Ukončit</button><span class="dose">${currentExercise+1}/${dayObj.items.length}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <div class="phasePill">${phaseLabel()}</div>
    <h2 class="trainName">${ex.name}</h2>
    <div class="trainDose">${isTimedDose(dose||ex.dose)?(dose||ex.dose):'15 opakování'.replace('15', String(dose||ex.dose).replace('×',''))}</div>${(!isTimedDose(dose||ex.dose)&&workoutPhase==='work')?setPill(dose||ex.dose):''}
    ${img(k,'bigimg','data-action="info" data-ex="'+k+'"')}
    ${isTimedDose(dose||ex.dose)||workoutPhase!=='work'?`<div class="restBlock"><div class="restLabel">${workoutPhase==='roundRest'?'Odpočinek před dalším kolem':workoutPhase==='rest'?'Cvik dokončen • odpočinek před dalším cvikem':'Připrav se'}</div><div class="timerCircle restOnly" style="background:${timerCircleStyle()}"><span id="autoTimer">${workoutLeft}</span></div><small>${workoutPhase==='roundRest'?'Až pauza doběhne, začne další kolo.':'Můžeš pauzu přeskočit.'}</small></div>`:`<div class="repBox noTimerBox"><span>Kolo ${workoutCurrentSet} z ${workoutTotalSets}</span><b>${dose||ex.dose}</b><small>Teď necvičíš na čas. Až dokončíš celé kolo, klepni na Dokončeno.</small></div>`}
    <div class="detailMini"><b>Teď:</b> ${workoutPhase==='roundRest'||workoutPhase==='rest'?'Odpočiň si, uvolni ramena a připrav se na pokračování.':ex.how[0]}</div>
    <div class="row">${!isTimedDose(dose||ex.dose)&&workoutPhase==='work'?`<button class="primary doneRoundBtn" data-action="set-complete-auto">✓ Dokončeno</button>`:`<button class="primary" data-action="toggle-auto">${workoutPaused?'Pokračovat':'Pauza'}</button>`}<button data-action="skip-auto">${workoutPhase==='roundRest'||workoutPhase==='rest'?'Přeskočit pauzu':(!isTimedDose(dose||ex.dose)&&workoutPhase==='work'?'Přeskočit cvik':'Přeskočit')}</button><button data-action="info" data-ex="${k}">Jak provést</button></div>
  </section>`;
}
function tickAuto(){
  if(workoutPaused)return;
  workoutLeft--;
  if(workoutLeft<=3&&workoutLeft>0)beep(760,80);
  if(workoutLeft<=0){beep(workoutPhase==='work'?900:620,120);advanceAutoPhase();return;}
  const el=document.getElementById('autoTimer'); if(el)el.textContent=workoutLeft;
  const circle=document.querySelector('.timerCircle'); if(circle)circle.style.background=timerCircleStyle();
}
function startWorkoutTimer(){
  clearInterval(timer);
  const dose=data.days[currentDay].items[currentExercise]?.[1]||'';
  if(workoutPhase==='work' && !isTimedDose(dose)){showAutoTrain();return;}
  timer=setInterval(tickAuto,1000);
  showAutoTrain();
}
function advanceAutoPhase(){
  const [k,dose]=data.days[currentDay].items[currentExercise];
  if(workoutPhase==='prep'){
    workoutPhase='work'; workoutCurrentSet=1; workoutLeft=workSeconds(dose); showAutoTrain();
    if(isTimedDose(dose)) startWorkoutTimer();
    return;
  }
  if(workoutPhase==='work'){
    if(!isTimedDose(dose) && workoutCurrentSet<workoutTotalSets){
      workoutPhase='roundRest';
      workoutLeft=restSeconds(k,dose);
      showAutoTrain();
      startWorkoutTimer();
      return;
    }
    setDone(currentDay,currentExercise);
    workoutCurrentSet=1;
    const max=data.days[currentDay].items.length-1;
    if(currentExercise>=max){clearInterval(timer);doneNext(false);return;}
    workoutPhase='rest';workoutLeft=restSeconds(k,dose);showAutoTrain();startWorkoutTimer();return;
  }
  if(workoutPhase==='roundRest'){
    workoutCurrentSet++;
    workoutPhase='work';
    workoutLeft=workSeconds(dose);
    showAutoTrain();
    if(isTimedDose(dose))startWorkoutTimer();
    return;
  }
  if(workoutPhase==='rest'){
    currentExercise++;workoutPhase='work';workoutCurrentSet=1;
    const nextDose=data.days[currentDay].items[currentExercise][1];
    workoutLeft=workSeconds(nextDose);showAutoTrain();
    if(isTimedDose(nextDose))startWorkoutTimer();
    return;
  }
}
function skipAuto(){
  if(workoutPhase==='roundRest'){
    const dose=data.days[currentDay].items[currentExercise][1];
    workoutCurrentSet++;
    workoutPhase='work';
    workoutLeft=workSeconds(dose);
    showAutoTrain();
    if(isTimedDose(dose))startWorkoutTimer();
    return;
  }
  if(workoutPhase==='work')advanceAutoPhase();
  else if(workoutPhase==='rest'){
    currentExercise++;workoutPhase='work';workoutCurrentSet=1;
    const dose=data.days[currentDay].items[currentExercise][1];
    workoutLeft=workSeconds(dose);showAutoTrain();if(isTimedDose(dose))startWorkoutTimer();
  }
  else {workoutPhase='work';workoutCurrentSet=1;const dose=data.days[currentDay].items[currentExercise][1];workoutLeft=workSeconds(dose);showAutoTrain();if(isTimedDose(dose))startWorkoutTimer();}
}


function showTrain(){
  clearInterval(timer);
  const dayObj=data.days[currentDay];
  if(!dayObj.items.length){day(currentDay);return;}
  const [k,dose]=dayObj.items[currentExercise],ex=data.exercises[k];
  const progress=Math.round(((currentExercise+1)/dayObj.items.length)*100);
  app.innerHTML=`<section class="card fullTrain">
    <div class="trainTop2"><button data-action="day" data-day="${currentDay}">← Den</button><span class="dose">${currentExercise+1}/${dayObj.items.length}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <h2 class="trainName">${ex.name}</h2>
    <div class="trainDose">${doseLabel(dose||ex.dose)}</div>${!isTimedDose(dose||ex.dose)?setPill(dose||ex.dose):''}
    ${img(k,'bigimg','data-action="info" data-ex="'+k+'"')}
    <div class="trainHint">Klepni na obrázek pro podrobný popis.</div>
    <div class="detailMini"><b>Rychle:</b> ${ex.how[0]}</div>
    <button class="primary doneBtn" data-action="set-complete-manual">${isTimedDose(dose||ex.dose)?'Hotovo + další':'✓ Dokončeno'}</button>
    <div class="row"><button data-action="prev">← Zpět</button>${isTimedDose(dose)?`<button data-action="rest">Pauza ${restSeconds(k,dose)} s</button>`:''}<button data-action="info" data-ex="${k}">Jak provést</button></div>
  </section>`;
}
function restScreen(){
  const [k,dose]=data.days[currentDay].items[currentExercise];
  let left=restSeconds(k,dose);
  app.innerHTML=`<section class="card restScreen">
    <button data-action="train-current">← Cvik</button>
    <h2>Pauza</h2>
    <div class="restNumber" id="timer">${left}</div>
    <p class="muted">Další cvik se otevře automaticky.</p>
    <button class="primary bigbtn" data-action="done-next-nomark">Další cvik hned</button>
  </section>`;
  timer=setInterval(()=>{left--;const el=document.getElementById('timer');if(el)el.textContent=left;if(left<=0){clearInterval(timer);doneNext(false)}},1000);
}
function doneNext(mark=true){
  if(mark)setDone(currentDay,currentExercise);
  const max=data.days[currentDay].items.length-1;
  if(currentExercise<max){currentExercise++;showTrain();return;}
  const next=currentDay+1<data.days.length?currentDay+1:0;
  app.innerHTML=`<section class="card finishCard">
    <div class="finishEmoji">🎉</div>
    <h2>Den hotový</h2>
    <p class="muted">${data.days[currentDay].title}</p>
    <div class="finishSummary"><div><b>${data.days[currentDay].items.length}</b><span>cviků</span></div><div><b>${data.days[currentDay].items.filter(x=>!isTimedDose(x[1])).length*workoutTotalSets}</b><span>kol</span></div><div><b>${data.days[currentDay].items.filter(x=>isTimedDose(x[1])).length}</b><span>časové cviky</span></div></div>
    <div class="finishForm">
      <b>Jaké to dnes bylo?</b>
      <div class="moodRow"><button data-action="select-mood" data-mood="good">😊 dobré</button><button data-action="select-mood" data-mood="tough">😅 těžší</button><button data-action="select-mood" data-mood="pain">⚠ něco bolelo</button></div>
      <textarea id="finish-note" placeholder="Krátká poznámka: co šlo dobře, co bolelo, co upravit příště…"></textarea>
    </div>
    <button class="primary bigbtn" data-action="save-workout-note">Uložit a domů</button>
    <div class="row"><button data-action="home">Přeskočit poznámku</button><button data-action="day" data-day="${next}">Další den</button></div>
  </section>`;
}
function info(k){
  const ex=data.exercises[k], meta=exMeta(k);
  const steps=(ex.how&&ex.how.length?ex.how:[]).slice(0,3);
  while(steps.length<3)steps.push(steps[steps.length-1]||'Drž plynulý, kontrolovaný pohyb bez bolesti.');
  const dose=(ex.dose||'15×');
  const muscleClass = meta.area.includes('Hýždě') ? 'glutes' : meta.area.includes('Core') ? 'core' : meta.area.includes('Záda') ? 'upper' : 'mobility';
  const back=currentDay!==undefined ? `<button data-action="day" data-day="${currentDay}">← Zpět na den</button>` : `<button data-action="home">← Domů</button>`;
  const muscleImg=detailMuscleImage(k);
  app.innerHTML=`<section class="exerciseDetailPage v20Detail">
    <div class="v20Shell">
      <aside class="v20SideNav" aria-label="Navigace">
        <h2>Pilates Body 40+</h2>
        <button data-action="home"><span>⌂</span>Domů</button>
        <button data-action="days"><span>☑</span>Plán</button>
        <button class="active" data-action="train-current"><span>▶</span>Cvičit</button>
        <button data-action="calendar"><span>▦</span>Kalendář</button>
        <button data-action="program-info"><span>☰</span>Program</button>
      </aside>
      <div class="v20Content">
        <div class="v20TopBar">${back}<button class="favBtn" data-action="fav" data-ex="${k}">${isFav(k)?'♥ Uloženo':'♡ Uložit cvik'}</button></div>
        <section class="v20Grid">
          <main class="v20Main">
            <div class="v20Hero">${detailHeroImage(k)}</div>
            <div class="v20TitleRow">
              <div>
                <p class="eyebrow">Detail cviku</p>
                <h2>${ex.name}</h2>
                <p class="v20Sub">${meta.area.replace(' / ',' • ')}${ex.focus?` • ${ex.focus}`:''}</p>
                <div class="v20Badges"><span>dle plánu</span><span>${meta.diff}</span><span>${meta.area}</span><span>${meta.knee}</span></div>
              </div>
              <div class="v20Dose"><b>${dose}</b><span>opakování</span></div>
            </div>

            <section class="v20Card v20FlowCard">
              <div class="v20CardHead"><h3>Průběh cviku</h3><span>krok za krokem</span></div>
              <div class="v20Flow">
                ${steps.map((x,i)=>`<article><div class="v20StepTitle"><b>${i+1}</b><strong>${i===0?'Výchozí pozice':i===1?'Pohyb nahoru':'Horní pozice'}</strong></div>${detailStepImage(k,i+1)}<p>${x}</p></article>${i<2?'<div class="v20Arrow">→</div>':''}`).join('')}
              </div>
            </section>

            <div class="v20BottomGrid">
              <section class="v20Card"><h3>Na co si dát pozor</h3><ul class="checkList"><li>Zatlačuj přes paty, ne přes špičky.</li><li>Drž pánev v jedné linii a neprohýbej se v bedrech.</li><li>Ramena zůstávají na zemi, krk je uvolněný.</li><li>Aktivuj břišní svaly po celou dobu.</li></ul></section>
              <section class="v20Card"><h3>Nejčastější chyby</h3><ul class="xList">${meta.mistakes.map(x=>`<li>${x}</li>`).join('')}<li>Zvedání příliš vysoko a ztráta kontroly.</li><li>Zatínání krku a ramen.</li></ul></section>
            </div>
          </main>

          <aside class="v20Aside">
            <section class="v20Card v20Muscle"><h3>Zapojené svaly</h3>${muscleImg||`<div class="bodyMap v19BodyMap"><div class="bodySilhouetteV2 ${muscleClass}"><span class="head"></span><span class="torso"></span><span class="arms"></span><span class="leftLeg"></span><span class="rightLeg"></span><span class="highlight h1"></span><span class="highlight h2"></span></div></div>`}<ul class="dotList"><li>${meta.area}</li><li>${ex.feel||'střed těla a stabilita'}</li><li>${meta.knee}</li></ul></section>
            <section class="v20Card v20Breath"><h3>Dech & tempo</h3><div class="v20BreathRow"><span>↥</span><p><b>Nádech</b>ve výchozí pozici</p></div><div class="v20BreathRow"><span>↧</span><p><b>Výdech</b>${meta.breath}</p></div><div class="v20BreathRow"><span>◷</span><p><b>Tempo</b>${meta.tempo}</p></div></section>
            <section class="v20Card v20Feel"><h3>Co bys měla cítit</h3><p>Práci v hýždích, stabilní střed těla a klidný, kontrolovaný pohyb bez bolesti.</p></section>
          </aside>
        </section>
        <div class="v20Footer"><button data-action="prev">← Předchozí cvik</button><strong>${currentExercise+1 || 1} / ${data.days[currentDay]?.items?.length || 6} cviků</strong><button class="primary" data-action="train-current">▶ Zpět ke cviku</button></div>
      </div>
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
  if(a==='info'||t.dataset.ex)return info(t.dataset.ex);
  if(a==='day'||(t.classList.contains('exercise')&&t.dataset.day!==''))return day(Number(t.dataset.day));
  if(a==='start')return startTraining(Number(t.dataset.day),false);
  if(a==='start-auto')return startTraining(Number(t.dataset.day),true);
  if(a==='set-complete-manual'){const dose=data.days[currentDay].items[currentExercise]?.[1]||''; if(!isTimedDose(dose)&&workoutCurrentSet<workoutTotalSets){workoutCurrentSet++;return showTrain();} workoutCurrentSet=1; return doneNext(true);}
  if(a==='set-complete-auto')return advanceAutoPhase();
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