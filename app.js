(function(){
const app=document.getElementById('app'),data=window.PB40_DATA;
let currentDay=0,currentExercise=0,timer=null,lastMode='home';
let workoutCurrentSet=1, workoutTotalSets=3;
let workoutRunning=false, workoutPaused=false, workoutLeft=0, workoutPhase='work', workoutAuto=false, workoutPausedByDetail=false;
let detailReturnDay=null, detailReturnExercise=null, detailReturnScroll=0;
if(!data||!data.days||!data.exercises){
  app.innerHTML='<section class="card"><h2>Chyba načtení dat</h2><p class="muted">Nenalezl se window.PB40_DATA v data.js.</p></section>';return;
}
const $=id=>document.getElementById(id);
function scrollTop(){
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));
}
function detailHash(k,d=currentDay,i=currentExercise){
  const params=new URLSearchParams({ex:k});
  if(Number.isFinite(Number(d)))params.set('day',String(Number(d)));
  if(Number.isFinite(Number(i)))params.set('i',String(Number(i)));
  return `#detail?${params.toString()}`;
}
function setDetailRoute(k,replace=false){
  const hash=detailHash(k);
  if(location.hash===hash)return;
  (replace?history.replaceState:history.pushState).call(history,null,'',hash);
}
function clearDetailRoute(replace=false){
  if(!location.hash.startsWith('#detail'))return;
  const target=location.pathname+location.search;
  (replace?history.replaceState:history.pushState).call(history,null,'',target);
}
function restoreDetailRoute(){
  if(!location.hash.startsWith('#detail'))return false;
  const params=new URLSearchParams(location.hash.replace(/^#detail\??/,''));
  const k=params.get('ex');
  if(!k||!data.exercises[k])return false;
  const d=Number(params.get('day'));
  const i=Number(params.get('i'));
  if(Number.isInteger(d)&&data.days[d])currentDay=d;
  if(Number.isInteger(i))currentExercise=i;
  info(k,{replaceRoute:true});
  return true;
}
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
function esc(v){
  return String(v??'').replace(/[&<>\"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'
  }[ch]));
}
function cleanText(v,max=240){return String(v??'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,max);}
function cleanDate(v){
  const s=String(v??'').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(s)?s:todayKey();
}
function cleanNumberText(v){
  const s=String(v??'').replace(',','.').trim();
  if(s==='')return '';
  const n=Number(s);
  return Number.isFinite(n)?String(Math.round(n*10)/10):'';
}
function normalizeMeasurement(m){
  if(!m||typeof m!=='object')return null;
  return {
    date:cleanDate(m.date),
    weight:cleanNumberText(m.weight),
    waist:cleanNumberText(m.waist),
    hips:cleanNumberText(m.hips),
    thigh:cleanNumberText(m.thigh),
    note:cleanText(m.note,240)
  };
}
function normalizeMeasurements(arr){
  if(!Array.isArray(arr))return [];
  return arr.map(normalizeMeasurement).filter(Boolean).slice(-120).sort((a,b)=>a.date.localeCompare(b.date));
}
function measurements(){
  try{return normalizeMeasurements(JSON.parse(localStorage.getItem(measureKey)||'[]'))}
  catch(e){return []}
}
function saveMeasurements(arr){localStorage.setItem(measureKey,JSON.stringify(normalizeMeasurements(arr)));}
function fmtNum(v){return (v===undefined||v===null||v==='')?'—':String(v).replace('.',',')}
function safeFmtNum(v){return esc(fmtNum(v));}
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
function normalizeWorkoutNote(n){
  if(!n||typeof n!=='object')return null;
  const moods=new Set(['good','tough','pain','']);
  const mood=cleanText(n.mood,20);
  return {
    date:cleanDate(n.date),
    day:Number.isFinite(Number(n.day))?Number(n.day):0,
    title:cleanText(n.title,120),
    mood:moods.has(mood)?mood:'',
    text:cleanText(n.text,500)
  };
}
function normalizeWorkoutNotes(arr){
  if(!Array.isArray(arr))return [];
  return arr.map(normalizeWorkoutNote).filter(Boolean).slice(-60);
}
function workoutNotes(){try{return normalizeWorkoutNotes(JSON.parse(localStorage.getItem(noteKey)||'[]'))}catch(e){return []}}
function saveWorkoutNotes(arr){localStorage.setItem(noteKey,JSON.stringify(normalizeWorkoutNotes(arr)));}
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
  return `${workoutTotalSets} kola × ${txt}`;
}
function setPill(dose){
  if(isTimedDose(dose))return '';
  return `<div class="setPill roundPill">Kolo ${workoutCurrentSet} z ${workoutTotalSets}</div>`;
}
let audioCtx=null;
function ensureAudio(){
  try{
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return null;
    if(!audioCtx)audioCtx=new C();
    if(audioCtx.state==='suspended')audioCtx.resume();
    return audioCtx;
  }catch(e){return null;}
}
function beep(freq=660,dur=90){
  try{
    const ctx=ensureAudio(); if(!ctx)return;
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.frequency.value=freq;o.type='sine';o.connect(g);g.connect(ctx.destination);
    g.gain.setValueAtTime(.0001,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.05,ctx.currentTime+.015);
    g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+(dur/1000));
    o.start();
    o.stop(ctx.currentTime+(dur/1000)+.02);
    if(navigator.vibrate) navigator.vibrate(dur>100?70:35);
  }catch(e){}
}
function cue(kind){
  if(kind==='go'){beep(920,120);return;}
  if(kind==='done'){beep(520,90);setTimeout(()=>beep(780,120),120);return;}
  if(kind==='switch'){beep(700,80);setTimeout(()=>beep(700,80),110);return;}
  beep(660,80);
}
// v50: vypnuté staré ruční přesměrování obrázků.
// Dříve prvních 6 cviků používalo *_main.jpg a karta se proto lišila od data.js.
const day1RealImages={};

const masterCards={
  hip:'assets/exercises/mastercards/glute-bridge-master.webp?v=55cards',
  toetap:'assets/exercises/mastercards/toe-taps-master.webp?v=55cards',
  clam:'assets/exercises/mastercards/clamshell-master.webp?v=55cards',
  hydrant:'assets/exercises/mastercards/fire-hydrant-master.webp?v=55cards',
  sideleg:'assets/exercises/mastercards/side-leg-lift-master.webp?v=55cards',
  bird:'assets/exercises/mastercards/bird-dog-master.webp?v=55cards'
};
function detailMasterCard(k){
  const src=masterCards[k];
  if(!src) return '';
  const ex=data.exercises[k]||{};
  const alt=ex.name||'cvik';
  return `<section class="v20Card masterCardSection"><button class="masterCardOpen" type="button" data-action="open-master-card" data-src="${esc(src)}" data-alt="${esc(alt)}"><img loading="lazy" class="masterCardImg" src="${esc(src)}" alt="${esc(alt)}"></button></section>`;
}
function openMasterCard(src,alt){
  if(!src)return;
  document.querySelector('.masterLightbox')?.remove();
  app.insertAdjacentHTML('beforeend',`<div class="masterLightbox" data-action="close-master-card" role="dialog" aria-modal="true" aria-label="${esc(alt||'Kompletní karta cviku')}"><button class="masterLightboxClose" type="button" data-action="close-master-card" aria-label="Zavřít">×</button><img src="${esc(src)}" alt="${esc(alt||'Kompletní karta cviku')}"></div>`);
}
function v22ImageSrc(k){return data.exercises[k]?.image || '';}
function img(k,c='thumb',extra=''){
  const ex=data.exercises[k];
  const src=v22ImageSrc(k);
  return `<img loading="lazy" class="${c}" ${extra} src="${src}" alt="${ex.name}">`;
}

function detailHeroImage(k){
  const src = v22ImageSrc(k);
  return `<img loading="lazy" class="v20HeroPhoto v22HeroPhoto" src="${src}" alt="${data.exercises[k]?.name||'cvik'}">`;
}
const day1StepFiles={
  hip:['assets/exercises/glute_bridge_step1.jpg','assets/exercises/glute_bridge_step2.jpg','assets/exercises/glute_bridge_step3.jpg'],
  rdl:['assets/exercises/rdl_step1.jpg','assets/exercises/rdl_step2.jpg','assets/exercises/rdl_step3.jpg'],
  hydrant:['assets/exercises/hydrant_step1.jpg','assets/exercises/hydrant_step2.jpg','assets/exercises/hydrant_step3.jpg'],
  clam:['assets/exercises/clam_step1.jpg','assets/exercises/clam_step2.jpg','assets/exercises/clam_step3.jpg'],
  sideleg:['assets/exercises/sideleg_step1.jpg','assets/exercises/sideleg_step2.jpg','assets/exercises/sideleg_step3.jpg'],
  deadbug:['assets/exercises/deadbug_step1.jpg','assets/exercises/deadbug_step2.jpg','assets/exercises/deadbug_step3.jpg']
};
function detailStepImage(k,n){
  const src = (day1StepFiles[k]||[])[n-1] || v22ImageSrc(k);
  return `<img loading="lazy" class="v20StepPhoto v22StepPhoto" src="${src}" alt="${data.exercises[k]?.name||'cvik'} krok ${n}">`;
}
function detailMuscleImage(k){
  if(day1RealImages[k]) return `<img loading="lazy" class="v20MuscleImg" src="assets/exercises/day1_muscles.jpg" alt="Zapojené svaly">`;
  return '';
}


// v34: hlavní fotky jsou samostatné snímky, krokové fotky se nezalamují ani neořezávají.
// U cviků, kde nemáme 3 ověřené odlišné fotky, už nezobrazujeme stejné obrázky 3×.
// Místo toho zobrazujeme přesné kroky pohybu textově. Jakmile budou k dispozici
// 3 skutečné fotky pro konkrétní cvik, stačí přidat soubory a povolit je zde.
const verifiedStepPhotos={hip:true,rdl:true,hydrant:true,clam:true,sideleg:true,deadbug:true};
const day1RealPhotoFallback={};
const day1StepMap={
  hip:[
    {title:'Výchozí pozice',text:'Lehni si na záda na podložku, chodidla dej pod kolena a ruce podél těla.'},
    {title:'Zvednutí pánve',text:'Zatlač přes paty a zvedni pánev nahoru, aby tělo tvořilo přímku od ramen ke kolenům.'},
    {title:'Návrat dolů',text:'Pomalu spusť pánev zpět dolů těsně nad podložku a udrž napětí v hýždích.'}
  ],
  rdl:[
    {title:'Výchozí stoj',text:'Postav se na šířku boků, kolena jen lehce pokrčená, ruce nebo činky u stehen.'},
    {title:'Boky dozadu',text:'Posuň boky dozadu, záda drž dlouhá a ruce nech klouzat po stehnech směrem ke kolenům.'},
    {title:'Návrat nahoru',text:'Zatlač přes paty, stáhni hýždě a vrať se do vzpřímeného stoje bez záklonu.'}
  ],
  hydrant:[
    {title:'Na všech čtyřech',text:'Dlaně pod rameny, kolena pod kyčlemi, břicho lehce aktivní.'},
    {title:'Koleno do strany',text:'Zvedni pokrčené koleno do strany jen tak vysoko, aby se nepřeklápěla pánev.'},
    {title:'Kontrolovaný návrat',text:'Vrať koleno zpět pod kyčel pomalu, bez švihu a bez zhoupnutí v bedrech.'}
  ],
  clam:[
    {title:'Výchozí pozice',text:'Lehni na bok, paty u sebe, kolena pokrčená. Neotáčej pánev.'},
    {title:'Zvednutí kolena',text:'Pomalu zvedni horní koleno vzhůru. Paty zůstávají u sebe.'},
    {title:'Návrat',text:'Pomalu vrať horní koleno zpět. Pohyb prováděj bez otáčení pánve.'}
  ],
  sideleg:[
    {title:'Lehni na bok',text:'Spodní noha může být pokrčená, horní noha je dlouhá a pánev stabilní.'},
    {title:'Zvednutí nohy',text:'Zvedni horní nohu bez švihu. Špičku lehce přitáhni k sobě.'},
    {title:'Spuštění dolů',text:'Spouštěj nohu kontrolovaně zpět, nepovol břicho ani pánev.'}
  ],
  deadbug:[
    {title:'Výchozí pozice',text:'Leh na zádech, kolena nad kyčlemi v 90° a obě ruce směřují ke stropu.'},
    {title:'Pravá ruka + levá noha',text:'Natáhni pravou ruku dozadu za hlavu a levou nohu dopředu. Druhá ruka i noha zůstávají nahoře.'},
    {title:'Návrat',text:'Vrať ruku a nohu zpět do výchozí pozice, pak opakuj na druhou stranu.'}
  ]
};
function detailSteps(k,ex){
  if(day1StepMap[k]) return day1StepMap[k];
  const arr=(ex.how&&ex.how.length?ex.how:[]).slice(0,3).map((text,i)=>({title:i===0?'Výchozí pozice':i===1?'Hlavní pohyb':'Návrat',text}));
  while(arr.length<3)arr.push({title:arr.length===1?'Hlavní pohyb':'Návrat',text:'Drž plynulý, kontrolovaný pohyb bez bolesti.'});
  return arr;
}
function detailStepMedia(k,n){
  if(verifiedStepPhotos[k]) return detailStepImage(k,n);
  const ex=data.exercises[k];
  if(n===1){
    return `<figure class="v50StepFallback"><img src="${ex.image}" alt="${ex.name} - ukázka cviku" loading="lazy"><figcaption>Ukázka cviku</figcaption></figure>`;
  }
  return `<div class="v50StepIcon" aria-hidden="true">${n}</div>`;
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
  const isReal=false;
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
  const payload={version:'PB40-v53',exportedAt:new Date().toISOString(),items:{}};
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
function allowedBackupKey(k){
  return /^pb40-d\d+-e\d+$/.test(k) ||
    /^pb40-log-\d{4}-\d{2}-\d{2}$/.test(k) ||
    /^pb40-fav-[a-z0-9_-]+$/i.test(k) ||
    k===measureKey || k===noteKey || k===introKey;
}
function cleanBackupValue(k,v){
  if(k===measureKey){
    try{return JSON.stringify(normalizeMeasurements(typeof v==='string'?JSON.parse(v):v));}
    catch(e){return JSON.stringify([]);}
  }
  if(k===noteKey){
    try{return JSON.stringify(normalizeWorkoutNotes(typeof v==='string'?JSON.parse(v):v));}
    catch(e){return JSON.stringify([]);}
  }
  if(/^pb40-d\d+-e\d+$/.test(k) || /^pb40-log-/.test(k) || /^pb40-fav-/.test(k) || k===introKey){
    return String(v)==='1'?'1':'0';
  }
  return null;
}
function importProgressFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result);
      if(!payload || typeof payload!=='object' || !payload.items || typeof payload.items!=='object' || Array.isArray(payload.items)){
        throw new Error('bad backup');
      }
      let imported=0;
      Object.keys(payload.items).forEach(k=>{
        if(!allowedBackupKey(k))return;
        const clean=cleanBackupValue(k,payload.items[k]);
        if(clean!==null){localStorage.setItem(k,clean);imported++;}
      });
      if(!imported)throw new Error('empty backup');
      alert('Pokrok je načtený.');
      home();
    }catch(e){alert('Soubor se nepodařilo načíst nebo nemá správný formát zálohy.');}
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
  clearDetailRoute();
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
  scrollTop();
}

function home(){
  clearDetailRoute();
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
      <section class="v22InfoCard"><h3>💡 Tip pro dnešek</h3><p>${coachHint()}<br>Důležitá je pravidelnost.</p>${ln?.text?`<small>Poslední poznámka: ${esc(ln.text)}</small>`:''}</section>
      <section class="v22InfoCard v22Areas"><h3>Zaměřené oblasti</h3><img src="assets/exercises/day1_muscles.jpg" alt="Zaměřené oblasti"><div><span><i></i>Hlavní svaly</span><span><i class="secondary"></i>Vedlejší svaly</span></div></section>
    </aside>
    <section class="v22DayExercises"><div class="topLine"><h2>Cviky dne</h2><button data-action="days">Celý plán</button></div><div class="libraryGrid v22ExerciseGrid">${day.items.map(([k,dose],i)=>exCard(k,dose,n,i)).join('')}</div></section>
  </div>`;
  scrollTop();
}

function days(){
  clearDetailRoute();
  lastMode='days';setNav('days');
  const groups=[];
  data.days.forEach((d,di)=>{const wi=Math.floor(di/7);if(!groups[wi])groups[wi]=[];groups[wi].push({d,di});});
  app.innerHTML=`<section class="card planIntro"><h2>Plán na 30 dní</h2><p class="muted">Vyber den nebo pokračuj tam, kde máš rozcvičeno. Hotové dny se propisují do pokroku i kalendáře.</p><button class="primary cta" data-action="start-auto" data-day="${nextDayIndex()}">▶ Pokračovat v tréninku</button></section>
  ${groups.map((g,wi)=>`<section class="card weekBlock"><div class="topLine"><h2>Týden ${wi+1}</h2><span class="pill">${g.filter(x=>x.d.items.length&&pct(x.di)===100).length}/6 hotovo</span></div><div class="dayGrid">${g.map(({d,di})=>{const total=d.items.length,dn=countDone(di),pc=pct(di),rest=!total;return `<article class="dayCard ${pc===100&&total?'complete':''} ${rest?'restDay':''}" data-action="day" data-day="${di}"><div class="dayNum">${di+1}</div><div class="dayInfo"><h3>${d.title}</h3><p>${rest?'Regenerace':`Splněno ${dn} z ${total} cviků`}</p><div class="progress"><div class="bar" style="width:${rest?100:pc}%"></div></div></div><div class="dayState">${rest?'☁':pc===100?'✓':'›'}</div></article>`;}).join('')}</div></section>`).join('')}`;
  scrollTop();
}

function day(di,opts={}){
  clearDetailRoute();
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
  if(opts.restoreScroll){
    requestAnimationFrame(()=>{
      const card=document.querySelector(`.exercise[data-day="${di}"][data-index="${detailReturnExercise}"]`);
      if(card){
        if(detailReturnScroll)window.scrollTo({top:detailReturnScroll,behavior:'auto'});
        else card.scrollIntoView({block:'center'});
        card.classList.add('returnFocus');
        setTimeout(()=>card.classList.remove('returnFocus'),1100);
      }
      else window.scrollTo({top:detailReturnScroll||0,behavior:'auto'});
    });
  }else scrollTop();
}

function sideInfo(dose){
  const txt=String(dose||'').toLowerCase();
  if(txt.includes('/strana')) return {side:true,timed:true,seconds:workSeconds(txt),label:'na každou stranu'};
  const m=txt.match(/(\d+)\s*\/\s*(\d+)/);
  if(m) return {side:true,timed:false,left:m[1],right:m[2],label:'na každou stranu'};
  return {side:false,timed:isTimedDose(txt),seconds:workSeconds(txt),label:''};
}
function isSideDose(dose){return sideInfo(dose).side;}
function phaseSideText(){
  if(workoutPhase==='left')return 'Levá strana';
  if(workoutPhase==='right')return 'Pravá strana';
  if(workoutPhase==='switch')return 'Změň stranu';
  return '';
}
function beginCurrentExercise(){
  // Při vstupu do dalšího cviku vždy zastavit starý odpočet.
  clearInterval(timer);
  workoutRunning=true;
  const [k,dose]=data.days[currentDay].items[currentExercise]||[];
  const info=sideInfo(dose);
  workoutPaused=false;
  if(info.timed){
    workoutPhase='prep';
    workoutLeft=5;
    startWorkoutTimer();
  }else{
    workoutPhase=info.side?'left':'work';
    workoutLeft=0;
    showAutoTrain();
  }
}
function shouldRunWorkoutTimer(){
  const dose=data.days[currentDay]?.items?.[currentExercise]?.[1]||'';
  const info=sideInfo(dose);
  return ['prep','switch','roundRest'].includes(workoutPhase) || (info.timed && ['left','right','work'].includes(workoutPhase));
}
function openCurrentTraining(){
  if(workoutRunning){
    const resumeTimer=workoutPausedByDetail;
    workoutPausedByDetail=false;
    if(resumeTimer)workoutPaused=false;
    showAutoTrain();
    if(resumeTimer&&shouldRunWorkoutTimer()){
      clearInterval(timer);
      timer=setInterval(tickAuto,1000);
    }
    return;
  }
  return startTraining(nextDayIndex(),true);
}
function startTraining(di,auto=true){
  clearDetailRoute();
  // v54/texty8: sjednocený trénink. Už nepoužíváme zvláštní ruční režim.
  clearInterval(timer);
  workoutAuto=true;
  workoutRunning=true;
  workoutPaused=false;
  workoutCurrentSet=1;
  lastMode='train';
  setNav('train');
  currentDay=di;
  currentExercise=0;
  beginCurrentExercise();
}

function timerCircleStyle(){
  const [k,dose]=data.days[currentDay].items[currentExercise]||[];
  const info=sideInfo(dose);
  let total=workoutPhase==='prep'?5:workoutPhase==='switch'?5:(workoutPhase==='roundRest'||workoutPhase==='rest')?restSeconds(k,dose):(info.timed?info.seconds:workSeconds(dose));
  if(total<=0)return 'var(--p2)';
  const deg=360-(Math.max(0,workoutLeft)/Math.max(1,total))*360;
  return `conic-gradient(var(--p) ${deg}deg, var(--p2) ${deg}deg)`;
}
function phaseLabel(){
  const dose=data.days[currentDay].items[currentExercise]?.[1]||'';
  const info=sideInfo(dose);
  if(workoutPhase==='prep') return 'Připrav se';
  if(workoutPhase==='switch') return 'Změň stranu';
  if(workoutPhase==='roundRest') return 'Odpočinek';
  if(workoutPhase==='confirm') return 'Dokonči cvik';
  if(workoutPhase==='left') return 'Levá strana';
  if(workoutPhase==='right') return 'Pravá strana';
  if(workoutPhase==='work' && !info.timed) return 'Cvič';
  return 'Cvič';
}
function prettyDose(dose){
  const info=sideInfo(dose);
  if(info.side && info.timed)return `${info.seconds} s / strana`;
  if(info.side && !info.timed)return `${info.left}/${info.right} opakování`;
  return String(dose||'');
}
function currentInstruction(ex,dose){
  if(workoutPhase==='prep')return 'Připrav pozici.';
  if(workoutPhase==='switch')return 'Změň stranu.';
  if(workoutPhase==='roundRest'||workoutPhase==='rest')return 'Další kolo za chvíli.';
  if(workoutPhase==='confirm')return 'Dokonči cvik a pokračuj.';
  const info=sideInfo(dose);
  if(info.side && workoutPhase==='left')return 'Levá strana.';
  if(info.side && workoutPhase==='right')return 'Pravá strana.';
  return '';
}
function setProgressText(){return `Série ${workoutCurrentSet} ze ${workoutTotalSets} • Cvik ${currentExercise+1}/${data.days[currentDay].items.length}`;}
function showAutoTrain(){
  const dayObj=data.days[currentDay];
  if(!dayObj.items.length){day(currentDay);return;}
  const [k,dose]=dayObj.items[currentExercise],ex=data.exercises[k],info=sideInfo(dose);
  const totalItems=dayObj.items.length*workoutTotalSets;
  const doneItems=(workoutCurrentSet-1)*dayObj.items.length + currentExercise;
  const progress=Math.min(100, Math.round((doneItems/Math.max(1,totalItems))*100));
  const isTimedActive = ['prep','switch','roundRest'].includes(workoutPhase) || (info.timed && ['left','right','work'].includes(workoutPhase));
  const isConfirm = workoutPhase==='confirm';
  const isRepWork = !info.timed && ['work','left','right'].includes(workoutPhase);
  const showPhase = !((workoutPhase==='work' && !info.timed) || workoutPhase==='confirm');
  const timerBlock=(isTimedActive || workoutPhase==='roundRest') ? `<div class="restBlock compactTimer"><div class="timerCircle restOnly" style="background:${timerCircleStyle()}"><span id="autoTimer">${workoutLeft}</span></div></div>` : `<div class="repBox noTimerBox"><span>Série ${workoutCurrentSet} ze ${workoutTotalSets}</span><b>${prettyDose(dose||ex.dose)}</b></div>`;
  const imgClass='bigimg '+(workoutPhase==='right'?'mirrorSide':'');
  app.innerHTML=`<section class="card fullTrain autoTrain v50Train v53CleanTrain">
    <div class="trainTop2"><button data-action="stop-auto">← Ukončit</button><span class="dose">Den ${currentDay+1} • Série ${workoutCurrentSet} ze ${workoutTotalSets}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    ${showPhase?`<div class="phasePill">${phaseLabel()}</div>`:''}
    <h2 class="trainName">${ex.name}</h2>
    <div class="trainDose">${prettyDose(dose||ex.dose)}</div>
    ${img(k,imgClass,'data-action="info" data-ex="'+k+'"')}
    ${timerBlock}
    <div class="row trainControls">${(isRepWork)||isConfirm?`<button class="primary doneRoundBtn" data-action="set-complete-auto">✓ Dokončeno</button>`:`<button class="primary" data-action="toggle-auto">${workoutPaused?'Pokračovat':'Pauza'}</button>${(workoutPhase==='roundRest'||workoutPhase==='switch'||workoutPhase==='prep')?`<button data-action="skip-auto">Přeskočit</button>`:''}`}<button data-action="info" data-ex="${k}">Detail cviku</button></div>
  </section>`;
  scrollTop();
}
function tickAuto(){
  if(workoutPaused)return;
  workoutLeft--;
  if(workoutLeft<=3&&workoutLeft>0)beep(760,80);
  if(workoutLeft<=0){cue(workoutPhase==='work'||workoutPhase==='left'||workoutPhase==='right'?'done':'go');advanceAutoPhase();return;}
  const el=document.getElementById('autoTimer'); if(el)el.textContent=workoutLeft;
  const circle=document.querySelector('.timerCircle'); if(circle)circle.style.background=timerCircleStyle();
}
function startWorkoutTimer(){
  clearInterval(timer);
  if(['left','right','work'].includes(workoutPhase))cue('go');
  if(workoutPhase==='switch')cue('switch');
  timer=setInterval(tickAuto,1000);
  showAutoTrain();
}
function startNextExerciseOrRound(){
  const max=data.days[currentDay].items.length-1;
  // Série/kolo se počítá přes CELÝ DEN: nejdřív všech 6 cviků, potom druhé kolo.
  setDone(currentDay,currentExercise);
  if(currentExercise<max){
    currentExercise++;
    beginCurrentExercise();
    return;
  }
  if(workoutCurrentSet<workoutTotalSets){
    workoutCurrentSet++;
    currentExercise=0;
    workoutPhase='roundRest';
    workoutLeft=8;
    startWorkoutTimer();
    return;
  }
  data.days[currentDay].items.forEach((_,i)=>setDone(currentDay,i));
  clearInterval(timer);
  workoutRunning=false;
  workoutCurrentSet=1;
  doneNext(false);
}
function nextExerciseOrFinish(){startNextExerciseOrRound();}
function completeOneSet(){startNextExerciseOrRound();}
function advanceAutoPhase(){
  const [k,dose]=data.days[currentDay].items[currentExercise];
  const info=sideInfo(dose);
  if(workoutPhase==='prep'){
    workoutPhase=info.side?'left':'work';
    workoutLeft=info.seconds||workSeconds(dose);
    startWorkoutTimer();
    return;
  }
  if(workoutPhase==='left'){
    workoutPhase='switch'; workoutLeft=5; startWorkoutTimer(); return;
  }
  if(workoutPhase==='switch'){
    workoutPhase='right';
    workoutLeft=info.timed ? (info.seconds||workSeconds(dose)) : 0;
    // U cviků na počet (např. 15/15) po změně strany NESMÍ dál běžet odpočet ze switch fáze.
    // Jinak se pravá strana po pár sekundách sama označí jako dokončená.
    if(info.timed){
      startWorkoutTimer();
    }else{
      clearInterval(timer);
      showAutoTrain();
    }
    return;
  }
  if(workoutPhase==='right' || workoutPhase==='work'){
    if(info.timed){
      clearInterval(timer);
      workoutPhase='confirm';
      workoutLeft=0;
      showAutoTrain();
      return;
    }
    completeOneSet();
    return;
  }
  if(workoutPhase==='confirm'){
    completeOneSet();
    return;
  }
  if(workoutPhase==='roundRest'){
    beginCurrentExercise();
    return;
  }
}
function skipAuto(){
  if(workoutPhase==='prep'){
    const dose=data.days[currentDay].items[currentExercise][1],info=sideInfo(dose);
    workoutPhase=info.side?'left':'work'; workoutLeft=info.seconds||workSeconds(dose);
    if(info.timed)startWorkoutTimer(); else showAutoTrain(); return;
  }
  if(workoutPhase==='switch'){
    const dose=data.days[currentDay].items[currentExercise][1],info=sideInfo(dose);
    workoutPhase='right';
    workoutLeft=info.timed ? (info.seconds||workSeconds(dose)) : 0;
    if(info.timed){
      startWorkoutTimer();
    }else{
      clearInterval(timer);
      showAutoTrain();
    }
    return;
  }
  if(workoutPhase==='roundRest'){
    beginCurrentExercise();
    return;
  }
  // Během samotného cvičení už tlačítko nepřeskakuje cvik.
  return;
}




function showTrain(){
  clearInterval(timer);
  const dayObj=data.days[currentDay];
  if(!dayObj.items.length){day(currentDay);return;}
  const [k,dose]=dayObj.items[currentExercise],ex=data.exercises[k];
  const progress=Math.round((((workoutCurrentSet-1)*dayObj.items.length + currentExercise)/(workoutTotalSets*dayObj.items.length))*100);
  const imgClass='bigimg';
  app.innerHTML=`<section class="card fullTrain v53CleanTrain">
    <div class="trainTop2"><button data-action="day" data-day="${currentDay}">← Den</button><span class="dose">Den ${currentDay+1} • Série ${workoutCurrentSet} ze ${workoutTotalSets}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <h2 class="trainName">${ex.name}</h2>
    <div class="trainDose">${prettyDose(dose||ex.dose)}</div>
    ${img(k,imgClass,'data-action="info" data-ex="'+k+'"')}
    <button class="primary doneBtn" data-action="set-complete-manual">✓ Dokončeno</button>
    <div class="row trainControls"><button data-action="prev">← Zpět</button>${isTimedDose(dose)?`<button data-action="rest">Pauza ${restSeconds(k,dose)} s</button>`:''}<button data-action="info" data-ex="${k}">Detail cviku</button></div>
  </section>`;
  scrollTop();
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
  scrollTop();
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
  scrollTop();
}
function info(k,opts={}){
  if(!opts.skipRoute)setDetailRoute(k,Boolean(opts.replaceRoute));
  const ex=data.exercises[k], meta=exMeta(k);
  const steps=detailSteps(k,ex);
  const planned=(data.days[currentDay]?.items||[]).find(x=>x[0]===k);
  const dose=(planned&&planned[1]) || ex.dose || '';
  const doseInfo=sideInfo(dose);
  const doseUnit=doseInfo.timed ? (doseInfo.side?'na stranu':'') : (!doseInfo.side && String(dose).match(/\d/) && !/opakování/i.test(String(dose)) ? 'opakování' : '');
  const muscleClass = meta.area.includes('Hýždě') ? 'glutes' : meta.area.includes('Core') ? 'core' : meta.area.includes('Záda') ? 'upper' : 'mobility';
  const back=workoutRunning ? `<button data-action="train-current">← Zpět ke cviku</button>` : (currentDay!==undefined ? `<button data-action="day-return" data-day="${currentDay}">← Zpět na seznam cviků</button>` : `<button data-action="home">← Domů</button>`);
  const muscleImg=detailMuscleImage(k);
  const hasMasterCard=Boolean(masterCards[k]);
  app.innerHTML=`<section class="exerciseDetailPage v20Detail ${hasMasterCard?'v20MasterDetail':''}">
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
            ${hasMasterCard ? '' : `<div class="v20Hero">${detailHeroImage(k)}</div>`}
            <div class="v20TitleRow">
              <div>
                <p class="eyebrow">Detail cviku</p>
                <h2>${ex.name}</h2>
                <p class="v20Sub">${meta.area.replace(' / ',' • ')}${ex.focus?` • ${ex.focus}`:''}</p>
              </div>
              ${dose?`<div class="v20Dose"><b>${prettyDose(dose)}</b><span>${doseUnit}</span></div>`:''}
            </div>
            ${hasMasterCard ? detailMasterCard(k).replace('masterCardSection','masterCardSection masterCardHero') : `<section class="v20Card v20FlowCard"><div class="v20CardHead"><h3>Průběh cviku</h3><span>krok za krokem</span></div><div class="v20Flow">${steps.map((x,i)=>`<article class="${verifiedStepPhotos[k]?'':'v32TextStep'}"><div class="v20StepTitle"><b>${i+1}</b><strong>${x.title}</strong></div>${detailStepMedia(k,i+1)}<p>${x.text}</p></article>${i<2?'<div class="v20Arrow">→</div>':''}`).join('')}</div></section>`}
          </main>

          <aside class="v20Aside">
            <section class="v20Card v20InfoCard"><h3>Informace o cviku</h3><dl class="v20InfoList"><div><dt>Obtížnost</dt><dd>${meta.diff}</dd></div><div><dt>Zaměření</dt><dd>${meta.area}</dd></div><div><dt>Kolena</dt><dd>${meta.knee}</dd></div></dl></section>
            <section class="v20Card v20Muscle"><h3>Zapojené svaly</h3>${muscleImg||`<div class="bodyMap v19BodyMap"><div class="bodySilhouetteV2 ${muscleClass}"><span class="head"></span><span class="torso"></span><span class="arms"></span><span class="leftLeg"></span><span class="rightLeg"></span><span class="highlight h1"></span><span class="highlight h2"></span></div></div>`}<ul class="dotList"><li>${meta.area}</li><li>${ex.feel||'střed těla a stabilita'}</li><li>${meta.knee}</li></ul></section>
            <section class="v20Card v20Breath"><h3>Dech & tempo</h3><div class="v20BreathRow"><span>↥</span><p><b>Nádech</b>ve výchozí pozici</p></div><div class="v20BreathRow"><span>↧</span><p><b>Výdech</b>${meta.breath}</p></div><div class="v20BreathRow"><span>◷</span><p><b>Tempo</b>${meta.tempo}</p></div></section>
            <section class="v20Card v20Feel"><h3>Co bys měla cítit</h3><p>Práci v hýždích, stabilní střed těla a klidný, kontrolovaný pohyb bez bolesti.</p></section>
            <section class="v20Card v20Watch"><h3>Na co si dát pozor</h3><ul class="checkList"><li>Zatlačuj přes paty, ne přes špičky.</li><li>Drž pánev v jedné linii a neprohýbej se v bedrech.</li><li>Ramena zůstávají na zemi, krk je uvolněný.</li><li>Aktivuj břišní svaly po celou dobu.</li></ul></section>
            <section class="v20Card v20Mistakes"><h3>Nejčastější chyby</h3><ul class="xList">${meta.mistakes.map(x=>`<li>${x}</li>`).join('')}<li>Zvedání příliš vysoko a ztráta kontroly.</li><li>Zatínání krku a ramen.</li></ul></section>
          </aside>
        </section>
        <div class="v20Footer"><button data-action="prev">← Předchozí cvik</button><strong>${currentExercise+1 || 1} / ${data.days[currentDay]?.items?.length || 6} cviků</strong><button class="primary" data-action="train-current">▶ Zpět ke cviku</button></div>
      </div>
    </div>
  </section>`;
  scrollTop();
}
function library(){
  clearDetailRoute();
  lastMode='library';setNav('library');
  app.innerHTML=`<section class="card"><h2>Program</h2><div class="moreGrid"><button data-action="program-info">✦ O programu</button><button data-action="progress">◎ Měření</button><button data-action="stats">↗ Statistiky</button><button data-action="library-list">◈ Knihovna cviků</button><button data-action="export-progress">⬇ Záloha</button><button onclick="document.body.classList.toggle('dark');localStorage.setItem('dark',document.body.classList.contains('dark')?'1':'0')">🌙 Tmavý režim</button></div></section>
  <section class="card"><h2>Knihovna cviků</h2><p class="muted">Klepni na cvik pro detail techniky.</p><div class="libraryGrid">${Object.keys(data.exercises).map(k=>exCard(k,data.exercises[k].dose)).join('')}</div></section>`;
  scrollTop();
}
function favs(){
  clearDetailRoute();
  lastMode='library';setNav('library');
  const keys=Object.keys(data.exercises).filter(k=>isFav(k));
  app.innerHTML=`<section class="card"><h2>Oblíbené cviky</h2>${keys.length?'<div class="libraryGrid">'+keys.map(k=>exCard(k,data.exercises[k].dose)).join('')+'</div>':'<p class="muted">Zatím žádné oblíbené.</p>'}</section>`;
  scrollTop();
}
function calendar(){
  clearDetailRoute();
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
  scrollTop();
}

function progressTracker(){
  clearDetailRoute();
  lastMode='progress';setNav('progress');
  const arr=measurements(), first=firstMeasurement(), last=latestMeasurement();
  const today=todayKey();
  const rows=arr.slice().reverse().map((m,ri)=>`<tr><td>${esc(m.date)}</td><td>${safeFmtNum(m.weight)}</td><td>${safeFmtNum(m.waist)}</td><td>${safeFmtNum(m.hips)}</td><td>${safeFmtNum(m.thigh)}</td><td><button class="smallBtn" data-action="delete-measure" data-index="${arr.length-1-ri}">Smazat</button></td></tr>`).join('');
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
    ${last&&last.note?`<div class="inlineTip"><b>Poslední poznámka:</b><br>${esc(last.note)}</div>`:''}
  </section>`;
  scrollTop();
}
function saveMeasureFromForm(){
  const val=id=>document.getElementById(id)?.value?.trim()||'';
  const rec={date:val('m-date')||todayKey(),weight:val('m-weight'),waist:val('m-waist'),hips:val('m-hips'),thigh:val('m-thigh'),note:val('m-note')};
  const arr=measurements().filter(x=>x.date!==rec.date);
  arr.push(rec);arr.sort((a,b)=>a.date.localeCompare(b.date));saveMeasurements(arr);progressTracker();
}

function showStats(){
  clearDetailRoute();
  lastMode='stats';setNav('stats');const s=statsData();
  app.innerHTML=`<section class="card"><h2>Statistiky</h2><p class="muted">${s.percent}% programu</p><div class="progress"><div class="bar" style="width:${s.percent}%"></div></div>
  <div class="statGrid"><div class="statBox"><b>${s.daysComplete}</b><span class="muted">hotových dní</span></div><div class="statBox"><b>${s.complete}</b><span class="muted">cviků</span></div><div class="statBox"><b>${streak()}</b><span class="muted">série dní</span></div></div><div class="row"><button data-action="calendar">Kalendář</button><button data-action="progress">Měření</button></div></section>`;
}
app.addEventListener('click',e=>{
  ensureAudio();
  const t=e.target.closest('[data-action],.exercise[data-day],.exercise[data-ex]');
  if(!t)return;
  const a=t.dataset.action;
  if(a==='open-master-card')return openMasterCard(t.dataset.src,t.dataset.alt);
  if(a==='close-master-card'){t.closest('.masterLightbox')?.remove();return;}
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
  if(a==='info'||t.dataset.ex){
    if(t.dataset.day!==undefined && t.dataset.day!==''){
      detailReturnDay=Number(t.dataset.day);
      detailReturnExercise=t.dataset.index!==undefined && t.dataset.index!=='' ? Number(t.dataset.index) : null;
      detailReturnScroll=window.scrollY||0;
    }
// Když otevřeš detail během tréninku, časovač se zastaví a nic tě samo nevrátí zpět.
    if(workoutRunning){
      clearInterval(timer);
      workoutPausedByDetail=!workoutPaused;
      workoutPaused=true;
    }
    if(t.dataset.day!==undefined && t.dataset.day!=='') currentDay=Number(t.dataset.day);
    if(t.dataset.index!==undefined && t.dataset.index!=='') currentExercise=Number(t.dataset.index);
    return info(t.dataset.ex);
  }
  if(a==='day-return')return day(Number(t.dataset.day),{restoreScroll:true});
  if(a==='day'||(t.classList.contains('exercise')&&t.dataset.day!==''))return day(Number(t.dataset.day));
  if(a==='start')return startTraining(Number(t.dataset.day),true);
  if(a==='start-auto')return startTraining(Number(t.dataset.day),true);
  if(a==='set-complete-manual'){setDone(currentDay,currentExercise); const max=data.days[currentDay].items.length-1; if(currentExercise<max){currentExercise++;return showTrain();} if(workoutCurrentSet<workoutTotalSets){workoutCurrentSet++;currentExercise=0;return showTrain();} data.days[currentDay].items.forEach((_,i)=>setDone(currentDay,i)); workoutCurrentSet=1; return doneNext(false);}
  if(a==='set-complete-auto')return advanceAutoPhase();
  if(a==='done-next')return doneNext(true);
  if(a==='done-next-nomark')return doneNext(false);
  if(a==='toggle-auto'){workoutPaused=!workoutPaused;return showAutoTrain();}
  if(a==='skip-auto')return skipAuto();
  if(a==='stop-auto'){clearInterval(timer);workoutAuto=false;return day(currentDay);}
  if(a==='reset-day'){data.days[Number(t.dataset.day)].items.forEach((_,i)=>localStorage.removeItem(key(Number(t.dataset.day),i)));return day(Number(t.dataset.day));}
  if(a==='prev'){if(currentExercise>0)currentExercise--;return showTrain();}
  if(a==='rest')return restScreen();
  if(a==='train-current')return openCurrentTraining();
  if(a==='fav'){toggleFav(t.dataset.ex);return info(t.dataset.ex,{replaceRoute:true});}
});
app.addEventListener('change',e=>{if(e.target&&e.target.id==='backup-file')importProgressFile(e.target.files[0]);});
$('nav-home').onclick=home;
$('nav-days').onclick=days;
$('nav-train').onclick=openCurrentTraining;
$('nav-calendar').onclick=calendar;
$('nav-library').onclick=library;
$('nav-stats').onclick=showStats;
const progressNav=document.getElementById('nav-progress'); if(progressNav) progressNav.onclick=progressTracker;
const favNav=document.getElementById('nav-favs'); if(favNav) favNav.onclick=favs;
$('nav-dark').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('dark',document.body.classList.contains('dark')?'1':'0')};
/* v50: service worker registration removed to prevent stale PWA cache. */
window.addEventListener('popstate',()=>{if(!restoreDetailRoute())home();});
if(!restoreDetailRoute()){
  if(localStorage.getItem(introKey)!=='1') intro(); else home();
}
})();
