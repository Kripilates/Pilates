(function(){
const app=document.getElementById('app'),data=window.PB40_DATA;
<<<<<<< Updated upstream
const APP_VERSION='v59.91-dev';
=======
const APP_VERSION='v59.92-dev';
>>>>>>> Stashed changes
const versionEl=document.getElementById('app-version');
const brandBadge=document.querySelector('.brandBadge');
if(versionEl)versionEl.textContent=APP_VERSION;
document.title='Moovka '+APP_VERSION;
let currentDay=0,currentExercise=0,timer=null,lastMode='home';
let workoutCurrentSet=1, workoutTotalSets=3;
let workoutContext=null;
let workoutRunning=false, workoutPaused=false, workoutLeft=0, workoutPhase='work', workoutAuto=false, workoutPausedByDetail=false;
let workoutTransitionLock=false;
let workoutFinalStretch=false;
let workoutExitDialogOpen=false, workoutExitWasPaused=false, workoutHistoryArmed=false;
let programCycleDialogOpen=false;
let workoutHistoryGuardSequence=0, workoutHistoryGuardId=null;
let pendingWorkoutExitDay=null;
let appHistoryRendering=false, rootExitDialogOpen=false, rootExitAllowed=false;
let screenWakeLock=null;
let wakeLockRequestPending=false;
let sideNoticeUntil=0;
let sideNoticeDone='', sideNoticeNext='';
const WORKOUT_PREP_SECONDS=10;
const WORKOUT_SWITCH_SECONDS=5;
const WORKOUT_SERIES_REST_SECONDS=30;
const PROGRAM_DIFFICULTY_KEY='pb40-program-difficulty-v1';
const DIFFICULTY_MIGRATION_NOTICE_KEY='pb40-difficulty-migration-notice-v1';
const PROGRAM_LAYOUT_KEY='pb40-program-layout-v2';
const PROGRAM_LAYOUT_VERSION='2';
const ONBOARDING_COMPLETED_KEY='moovka-onboarding-completed-v1';
const DIFFICULTY_VALUES=['easy','medium','hard'];
const PROGRAM_WEEK_HINTS=[
  {from:0,to:9,text:'První týden se zaměřujeme na techniku, klidné tempo a kontrolovaný pohyb.'},
  {from:10,to:19,text:'Druhý týden přidáváme pomalejší tempo, krátké výdrže a lepší kontrolu.'},
  {from:20,to:29,text:'Třetí týden zpevni střed a pracuj přesněji. Cvič poctivě, ale ne přes bolest.'}
];
let detailReturnDay=null, detailReturnExercise=null, detailReturnScroll=0;
let onboardingSession=null;
if(!data||!data.days||!data.exercises){
  app.innerHTML='<section class="card"><h2>Chyba načtení dat</h2><p class="muted">Nenalezl se window.PB40_DATA v data.js.</p></section>';return;
}
const $=id=>document.getElementById(id);
function scrollTop(){
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));
}
function appRouteUrl(view,params={}){
  return view==='exercise-detail' ? detailHash(params.exerciseId,params.day,params.exercise) : location.pathname+location.search;
}
function appRouteKey(view,params={}){
  if(view==='day')return `day:${params.day}`;
  if(view==='exercise-detail')return `exercise-detail:${params.exerciseId}:${params.day}:${params.exercise}`;
  if(view==='exercise-library-category')return `exercise-library-category:${params.category}`;
  if(view==='workout')return `workout:${params.day}`;
  return view;
}
function setAppView(view,params={},opts={}){
  if(appHistoryRendering)return;
  const state={pb40App:true,appView:view,...params};
  state.pb40RouteKey=appRouteKey(view,state);
  const current=history.state;
  const same=current?.pb40App&&current.pb40RouteKey===state.pb40RouteKey;
  const method=opts.replace||same?'replaceState':'pushState';
  history[method](state,'',appRouteUrl(view,state));
}
function showRootExitDialog(){
  if(rootExitDialogOpen)return;
  rootExitDialogOpen=true;
  app.insertAdjacentHTML('beforeend',`<div class="workoutExitOverlay rootExitOverlay" role="dialog" aria-modal="true" aria-labelledby="rootExitTitle">
    <div class="workoutExitDialog">
      <h2 id="rootExitTitle">Ukončit aplikaci?</h2>
      <p>Opravdu chceš opustit Moovka?</p>
      <button class="primary" data-action="stay-in-app">Zůstat</button>
      <button class="workoutExitConfirm" data-action="confirm-exit-app">Ukončit</button>
    </div>
  </div>`);
}
function closeRootExitDialog(){
  document.querySelector('.rootExitOverlay')?.remove();
  rootExitDialogOpen=false;
}
function confirmRootExit(){
  closeRootExitDialog();
  rootExitAllowed=true;
  history.back();
}
function showProgramCycleDialog(){
  if(programCycleDialogOpen)return;
  programCycleDialogOpen=true;
  app.insertAdjacentHTML('beforeend',`<div class="workoutExitOverlay programCycleOverlay" role="dialog" aria-modal="true" aria-labelledby="programCycleTitle">
    <div class="workoutExitDialog">
      <h2 id="programCycleTitle">Začít nový 30denní cyklus?</h2>
      <p>Průběh aktuálního plánu se vynuluje a začneš znovu Dnem 1. Historie, kalendář, poznámky, měření, oblíbené cviky i zvolená obtížnost zůstanou zachované.</p>
      <button class="primary" data-action="confirm-new-program-cycle">Ano, začít nový cyklus</button>
      <button data-action="cancel-new-program-cycle">Zrušit</button>
    </div>
  </div>`);
}
function closeProgramCycleDialog(){
  document.querySelector('.programCycleOverlay')?.remove();
  programCycleDialogOpen=false;
}
function setWorkoutHeaderPosition(active=false){
  if(!brandBadge)return;
  const total=data.days?.[currentDay]?.items?.length||0;
  if(active&&total){
    const position=workoutFinalStretch?total:Math.min(total,currentExercise+1);
    brandBadge.textContent=`Cvik ${position} z ${total}`;
    brandBadge.classList.add('workoutPositionBadge');
    return;
  }
  brandBadge.textContent='';
  brandBadge.classList.remove('workoutPositionBadge');
}
function renderTrainingScreen(html){
  app.replaceChildren();
  app.insertAdjacentHTML('afterbegin',html);
  setWorkoutHeaderPosition(true);
  armWorkoutHistoryGuard();
}
function armWorkoutHistoryGuard(){
  if(!workoutRunning)return;
  if(workoutHistoryGuardId===null)workoutHistoryGuardId=++workoutHistoryGuardSequence;
  if(history.state?.pb40WorkoutGuard===workoutHistoryGuardId){
    workoutHistoryArmed=true;
    return;
  }
  const nextState=history.state&&typeof history.state==='object'?{...history.state}:{};
  history.pushState({...nextState,pb40WorkoutGuard:workoutHistoryGuardId},'',location.href);
  workoutHistoryArmed=true;
}
function clearWorkoutHistoryGuard(url=location.href){
  const currentState=history.state&&typeof history.state==='object'?{...history.state}:{};
  if(currentState.pb40WorkoutGuard===workoutHistoryGuardId)delete currentState.pb40WorkoutGuard;
  history.replaceState(Object.keys(currentState).length?currentState:null,'',url);
  workoutHistoryArmed=false;
  workoutHistoryGuardId=null;
}
function resumeWorkoutTimer(){
  if(workoutPaused || !shouldRunWorkoutTimer())return;
  clearInterval(timer);
  timer=setInterval(tickAuto,1000);
}
function showWorkoutExitDialog(){
  if(!workoutRunning || workoutExitDialogOpen)return;
  workoutExitDialogOpen=true;
  workoutExitWasPaused=workoutPaused;
  if(!workoutPaused){
    workoutPaused=true;
    clearInterval(timer);
  }
  app.insertAdjacentHTML('beforeend',`<div class="workoutExitOverlay" role="dialog" aria-modal="true" aria-labelledby="workoutExitTitle">
    <div class="workoutExitDialog">
      <h2 id="workoutExitTitle">Ukončit trénink?</h2>
      <p>Průběh zůstane uložený a můžeš se vrátit přesně tam, kde končíš.</p>
      <button class="primary" data-action="continue-workout">Pokračovat v tréninku</button>
      <button class="workoutExitConfirm" data-action="confirm-stop-auto">Ukončit trénink</button>
    </div>
  </div>`);
}
function continueWorkoutFromDialog(){
  document.querySelector('.workoutExitOverlay')?.remove();
  workoutExitDialogOpen=false;
  armWorkoutHistoryGuard();
  workoutPaused=workoutExitWasPaused;
  resumeWorkoutTimer();
}
function exitWorkoutToDay(){
  document.querySelector('.workoutExitOverlay')?.remove();
  workoutExitDialogOpen=false;
  clearInterval(timer);
  workoutRunning=false;
  workoutPaused=false;
  workoutAuto=false;
  workoutContext=null;
  workoutHistoryArmed=false;
  workoutHistoryGuardId=null;
  void releaseWorkoutWakeLock();
  pendingWorkoutExitDay=currentDay;
  history.go(-2);
}
function isWorkoutScreenActive(){
  return workoutRunning && Boolean(app.querySelector('.autoTrain'));
}
async function requestWorkoutWakeLock(){
  if(!('wakeLock' in navigator) || screenWakeLock || wakeLockRequestPending || document.visibilityState!=='visible' || !isWorkoutScreenActive())return;
  wakeLockRequestPending=true;
  try{
    const lock=await navigator.wakeLock.request('screen');
    if(!isWorkoutScreenActive() || document.visibilityState!=='visible'){
      await lock.release();
      return;
    }
    screenWakeLock=lock;
    lock.addEventListener('release',()=>{
      if(screenWakeLock===lock)screenWakeLock=null;
    });
  }catch(e){}
  finally{wakeLockRequestPending=false;}
}
async function releaseWorkoutWakeLock(){
  const lock=screenWakeLock;
  screenWakeLock=null;
  if(!lock || lock.released)return;
  try{await lock.release();}catch(e){}
}
function syncWorkoutWakeLock(){
  if(isWorkoutScreenActive())void requestWorkoutWakeLock();
  else void releaseWorkoutWakeLock();
}
new MutationObserver(syncWorkoutWakeLock).observe(app,{childList:true});
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible' && isWorkoutScreenActive())void requestWorkoutWakeLock();
});
function detailHash(k,d=currentDay,i=currentExercise){
  const params=new URLSearchParams({ex:k});
  if(Number.isFinite(Number(d)))params.set('day',String(Number(d)));
  if(Number.isFinite(Number(i)))params.set('i',String(Number(i)));
  return `#detail?${params.toString()}`;
}
function detailStateFromHash(){
  if(!location.hash.startsWith('#detail'))return false;
  const params=new URLSearchParams(location.hash.replace(/^#detail\??/,''));
  const k=params.get('ex');
  if(!k||!data.exercises[k])return false;
  const d=Number(params.get('day'));
  const i=Number(params.get('i'));
  const dayIndex=Number.isInteger(d)&&data.days[d]?d:0;
  const exerciseIndex=Number.isInteger(i)?i:0;
  return {pb40App:true,appView:'exercise-detail',exerciseId:k,day:dayIndex,exercise:exerciseIndex,pb40RouteKey:appRouteKey('exercise-detail',{exerciseId:k,day:dayIndex,exercise:exerciseIndex})};
}
const legacyProgramItemIds={
  0:['rdl','hydrant','clam','sideleg','inner_thigh','hip'],
  3:['rollup','clam','swan','toetap','standing_side_bend'],
  10:['rollup','hundred','scissors','swan','standing_side_bend'],
  19:['glute_bridge_march','raise','standing_side_bend','chest_press','sideplank_reach','swan'],
  24:['rollup','clam','swimming','hundred','swan','standing_side_bend']
};
function validDifficulty(value){return DIFFICULTY_VALUES.includes(value)?value:null;}
function getProgramDifficulty(){return validDifficulty(localStorage.getItem(PROGRAM_DIFFICULTY_KEY));}
function effectiveProgramDifficulty(){return getProgramDifficulty()||data.program?.defaultDifficulty||'medium';}
function difficultyConfig(value=effectiveProgramDifficulty()){
  return data.program?.difficulties?.[validDifficulty(value)||'medium']||{label:'Střední',sets:3};
}
function difficultyLabel(value=effectiveProgramDifficulty()){return difficultyConfig(value).label;}
function difficultySets(value=effectiveProgramDifficulty()){return Number(difficultyConfig(value).sets)||3;}
function setProgramDifficulty(value){
  const clean=validDifficulty(value);
  if(!clean)return false;
  localStorage.setItem(PROGRAM_DIFFICULTY_KEY,clean);
  localStorage.removeItem(DIFFICULTY_MIGRATION_NOTICE_KEY);
  return true;
}
function resolveDose(rawDose,difficulty=effectiveProgramDifficulty()){
  if(typeof rawDose==='string')return rawDose;
  if(!rawDose||typeof rawDose!=='object')return '';
  return String(rawDose[validDifficulty(difficulty)||'medium']??rawDose.medium??'');
}
function resolvedDayItems(di,difficulty=effectiveProgramDifficulty()){
  return (data.days?.[di]?.items||[]).map(([id,dose])=>[id,resolveDose(dose,difficulty)]);
}
function resolvedDayStretch(di,difficulty=effectiveProgramDifficulty()){
  const stretch=data.days?.[di]?.stretch;
  return Array.isArray(stretch)&&stretch[0]&&data.exercises[stretch[0]]?[stretch[0],resolveDose(stretch[1],difficulty)]:null;
}
function hasLegacyProgramData(){
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(!k)continue;
    if(/^pb40-d\d+-e\d+$/.test(k)||/^pb40-log-/.test(k)||/^pb40-fav-/.test(k)||k==='pb40-measurements'||k==='pb40-workout-notes')return true;
  }
  return false;
}
function onboardingCompleted(){return localStorage.getItem(ONBOARDING_COMPLETED_KEY)==='1';}
function migrateExistingProfileOnboarding(){
  if(!onboardingCompleted()&&hasLegacyProgramData())localStorage.setItem(ONBOARDING_COMPLETED_KEY,'1');
}
function shouldStartRequiredOnboarding(){return !onboardingCompleted()&&!hasLegacyProgramData();}
function migrateLegacyDifficulty(){
  if(getProgramDifficulty())return;
  if(localStorage.getItem(PROGRAM_DIFFICULTY_KEY)!==null)localStorage.removeItem(PROGRAM_DIFFICULTY_KEY);
  if(!hasLegacyProgramData())return;
  localStorage.setItem(PROGRAM_DIFFICULTY_KEY,'medium');
  localStorage.setItem(DIFFICULTY_MIGRATION_NOTICE_KEY,'1');
}
function migrateProgramLayout(){
  if(localStorage.getItem(PROGRAM_LAYOUT_KEY)===PROGRAM_LAYOUT_VERSION)return;
  Object.entries(legacyProgramItemIds).forEach(([dayIndex,oldIds])=>{
    const di=Number(dayIndex);
    const completedIds=new Set(oldIds.filter((_,i)=>localStorage.getItem(`pb40-d${di}-e${i}`)==='1'));
    oldIds.forEach((_,i)=>localStorage.removeItem(`pb40-d${di}-e${i}`));
    (data.days?.[di]?.items||[]).forEach(([id],i)=>{
      if(completedIds.has(id))localStorage.setItem(`pb40-d${di}-e${i}`,'1');
    });
  });
  localStorage.setItem(PROGRAM_LAYOUT_KEY,PROGRAM_LAYOUT_VERSION);
}
function importedProgressKey(k,layoutVersion){
  if(layoutVersion===PROGRAM_LAYOUT_VERSION)return k;
  const match=String(k).match(/^pb40-d(\d+)-e(\d+)$/);
  if(!match)return k;
  const di=Number(match[1]),oldIndex=Number(match[2]),oldIds=legacyProgramItemIds[di];
  if(!oldIds||!oldIds[oldIndex])return k;
  const nextIndex=(data.days?.[di]?.items||[]).findIndex(([id])=>id===oldIds[oldIndex]);
  return nextIndex<0?k:`pb40-d${di}-e${nextIndex}`;
}
function createWorkoutContext(di){
  const difficulty=effectiveProgramDifficulty();
  return {
    dayIndex:di,
    difficulty,
    startedAt:Date.now(),
    totalSets:difficultySets(difficulty),
    items:resolvedDayItems(di,difficulty),
    stretch:resolvedDayStretch(di,difficulty)
  };
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
  if(a!=='train')setWorkoutHeaderPosition(false);
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
function isProgramComplete(){
  const trainingDays=data.days.filter(day=>day.items.length);
  return trainingDays.length>0&&data.days.every((day,di)=>!day.items.length||pct(di)===100);
}
function resetProgramCycleProgress(){
  const progressKeys=[];
  for(let i=0;i<localStorage.length;i++){
    const storageKey=localStorage.key(i);
    if(storageKey&&/^pb40-d\d+-e\d+$/.test(storageKey))progressKeys.push(storageKey);
  }
  progressKeys.forEach(storageKey=>localStorage.removeItem(storageKey));
  currentDay=0;
  currentExercise=0;
  workoutCurrentSet=1;
  workoutContext=null;
}
function startNewProgramCycle(){
  resetProgramCycleProgress();
  closeProgramCycleDialog();
  day(0);
}
function nextDayIndex(){
  let n=data.days.findIndex((d,i)=>d.items.length&&pct(i)<100);
  return n<0?Math.max(0,data.days.length-1):n;
}
function programWeekHint(dayIndex){
  return PROGRAM_WEEK_HINTS.find(phase=>dayIndex>=phase.from&&dayIndex<=phase.to)?.text||'';
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
let audioCtx=null,audioMasterGain=null,audioUnlockPromise=null;
const AUDIO_MASTER_GAIN=.18;
function ensureAudio(){
  try{
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return null;
    if(!audioCtx){
      audioCtx=new C();
      audioMasterGain=audioCtx.createGain();
      audioMasterGain.gain.value=AUDIO_MASTER_GAIN;
      audioMasterGain.connect(audioCtx.destination);
    }
    return audioCtx;
  }catch(e){return null;}
}
async function unlockAudio(){
  const ctx=ensureAudio();
  if(!ctx)return null;
  try{
    if(ctx.state==='suspended'){
      if(!audioUnlockPromise){
        audioUnlockPromise=ctx.resume().catch(()=>{}).finally(()=>{audioUnlockPromise=null;});
      }
      await audioUnlockPromise;
    }
    return ctx;
  }catch(e){return null;}
}
function beep(freq=700,dur=140,delay=0){
  try{
    const ctx=ensureAudio(); if(!ctx)return;
    if(ctx.state!=='running')return;
    const o=ctx.createOscillator(), g=ctx.createGain();
    const start=ctx.currentTime+(delay/1000);
    const end=start+(dur/1000);
    o.frequency.value=freq;o.type='sine';o.connect(g);g.connect(audioMasterGain);
    g.gain.setValueAtTime(.0001,start);
    g.gain.exponentialRampToValueAtTime(1,start+.012);
    g.gain.setValueAtTime(1,Math.max(start+.012,end-.035));
    g.gain.exponentialRampToValueAtTime(.0001,end);
    o.start(start);
    o.stop(end+.02);
    if(!delay&&navigator.vibrate)navigator.vibrate(dur>140?70:35);
  }catch(e){}
}
function cue(kind){
  if(kind==='go'){beep(720,140);beep(900,140,200);return;}
  if(kind==='done'){beep(600,150);beep(800,150,210);return;}
  if(kind==='switch'){beep(680,140);beep(680,140,200);return;}
  if(kind==='complete'){beep(620,140);beep(780,140,190);beep(940,160,380);return;}
  beep(700,140);
}
// v50: vypnuté staré ruční přesměrování obrázků.
// Dříve prvních 6 cviků používalo *_main.jpg a karta se proto lišila od data.js.
const day1RealImages={};

const masterCards={
};
const referenceExerciseAssets={
  hip:{
    start:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge/glute_bridge_start_v1.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge/glute_bridge_hero_v1.png',
    guide:{
      breath:['Výdech při zvedání.','Nádech při návratu.'],
      focus:['Aktivuj hýždě a střed těla.','Neprohýbej bedra.'],
      reps:['12 opakování','2–3 série']
    },
    steps:[
      {title:'START',caption:'Výchozí',text:'Lehni si na záda, pokrč kolena a chodidla polož na šířku boků.',photo:'start'},
      {title:'HLAVNÍ POHYB',caption:'Zvedni',text:'S výdechem zvedni pánev. Aktivuj hýždě a drž střed těla pevný.',photo:'hero'},
      {title:'NÁVRAT',caption:'Pomalu zpět',text:'Pomalu a kontrolovaně polož pánev zpět do výchozí polohy.',photo:'start'}
    ]
  },
  rdl:{
    start:'Pilates%20Assets/02_Exercise_Cards/Romanian%20Deadlift/romanian_deadlift_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Romanian%20Deadlift/romanian_deadlift_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Činky drž u stehen.',photo:'start'},
      {n:2,title:'HIP HINGE',caption:'Pánev dozadu.',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Zpět do stoje.',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Postav se na šířku boků. Činky drž u stehen, ramena stáhni dolů a páteř drž dlouhou.',photo:'start'},
      {title:'HIP HINGE',text:'Posuň pánev dozadu. Holeně zůstávají téměř svislé, záda neutrální a krk v prodloužení páteře.',photo:'hero'},
      {title:'NÁVRAT',text:'Zatlač chodidla do podložky, aktivuj hýždě a vrať se zpět do stoje bez zaklánění.',photo:'start'}
    ]
  },
  hydrant:{
    start:'Pilates%20Assets/02_Exercise_Cards/Fire%20Hydrant/fire_hydrant_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Fire%20Hydrant/fire_hydrant_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Na všech čtyřech',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Zvedni koleno',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Začni na všech čtyřech. Dlaně jsou pod rameny, kolena pod kyčlemi a páteř je neutrální.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem zvedni pokrčené koleno do strany. Pánev zůstává stabilní a pohyb vychází z kyčle.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať koleno zpět pod kyčel. Neprohýbej bedra a neotáčej trup.',photo:'start'}
    ]
  },
  donkey:{
    start:'Pilates%20Assets/02_Exercise_Cards/Donkey%20Kick/donkey_kick_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Donkey%20Kick/donkey_kick_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Donkey%20Kick/donkey_kick_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Donkey%20Kick/donkey_kick_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Donkey%20Kick/donkey_kick_step_by_step_v01.png',
    subtitle:'Hýždě • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Na všech čtyřech',photo:'start'},
      {n:2,title:'ZANOŽENÍ',caption:'Pokrčená noha vzhůru',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Koleno pod kyčel',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Začni na všech čtyřech. Dlaně dej pod ramena, kolena pod kyčle a záda drž neutrálně.',photo:'start'},
      {title:'ZANOŽENÍ',text:'S výdechem zvedni jednu pokrčenou nohu dozadu a nahoru. Koleno drž přibližně v úhlu 90° a pánev vodorovně.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať koleno kontrolovaně pod kyčel. Opakuj podle programu a potom vystřídej strany.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Hýždě / pánev',knees:'Na všech čtyřech'},
    breath:{inhale:'Při návratu',exhale:'Při zvednutí nohy',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci v hýždích, aktivní střed těla a stabilní pánev bez tlaku v bedrech.',
      watch:['Pánev drž stabilní a vodorovnou.','Břicho nech aktivní a ramena daleko od uší.','Pohyb veď z kyčle bez švihu.'],
      mistakes:['Prohýbání beder.','Vytáčení pánve.','Zvedání nohy příliš vysoko.','Švihání nohou místo kontrolovaného pohybu.']
    }
  },
  frog:{
    start:'Pilates%20Assets/02_Exercise_Cards/Frog%20Pumps/frog_pumps_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Frog%20Pumps/frog_pumps_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Frog%20Pumps/frog_pumps_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Frog%20Pumps/frog_pumps_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Frog%20Pumps/frog_pumps_step_by_step_v01.png',
    subtitle:'Hýždě • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Plosky spolu',photo:'start'},
      {n:2,title:'ZDVIH PÁNVE',caption:'Krátký most',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na záda, spoj plosky chodidel a nech kolena otevřená do stran.',photo:'start'},
      {title:'ZDVIH PÁNVE',text:'Zpevni střed těla a s výdechem zvedni pánev do krátkého mostu. Nahoře aktivuj hýždě.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem vrať pánev kontrolovaně na podložku. Chodidla nech spojená a kolena otevřená.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Hýždě / pánev',knees:'Kolena otevřená'},
    breath:{inhale:'Při návratu dolů',exhale:'Při zvednutí pánve',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci v hýždích a stabilní pánev při krátkém kontrolovaném zdvihu.',
      watch:['Plosky chodidel nech po celý pohyb spojené.','Kolena zůstávají otevřená do stran.','Břicho drž aktivní a žebra nevytlačuj vzhůru.'],
      mistakes:['Příliš vysoký zdvih pánve.','Prohýbání beder.','Zavírání kolen nebo rozdělení chodidel.','Odraz a švih místo práce hýždí.']
    }
  },
  clam:{
    start:'Pilates%20Assets/02_Exercise_Cards/Clamshell/clamshell_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Clamshell/clamshell_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Leh na boku',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Otevři koleno',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na bok. Pokrč kolena přibližně do 90°. Chodidla zůstávají u sebe.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem otevři horní koleno. Pohyb vychází z kyčle a pánev zůstává stabilní.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať koleno zpět. Chodidla zůstávají u sebe a trup se neotáčí dozadu.',photo:'start'}
    ]
  },
  sideleg:{
    start:'Pilates%20Assets/02_Exercise_Cards/Side%20Leg%20Lift/side_leg_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Side%20Leg%20Lift/side_leg_lift_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Leh na boku',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Zvedni nohu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na bok. Spodní nohu nech lehce pokrčenou nebo nataženou podle varianty. Horní noha je natažená.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem zvedni horní nohu přibližně do 35–45°. Pánev zůstává stabilní.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem pomalu spusť nohu zpět. Pohyb prováděj kontrolovaně a bez švihu.',photo:'start'}
    ]
  },
  sideplank:{
    start:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank/side_plank_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank/side_plank_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank/side_plank_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank/side_plank_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank/side_plank_step_by_step_v01.png',
    subtitle:'Střed těla • pas • ramena',
    miniSteps:[
      {n:1,title:'START',caption:'Pánev na podložce',photo:'start'},
      {n:2,title:'SIDE PLANK',caption:'Zvedni pánev',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Lehni si na bok. Spodní loket dej přímo pod rameno, předloktí opři o podložku a nohy natáhni. Pánev zůstává dole.',photo:'start'},
      {title:'SIDE PLANK',text:'S výdechem zpevni břicho a zvedni pánev z podložky. Tělo drž v dlouhé linii a spodní rameno aktivní.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem spusť pánev pomalu zpět na podložku. Zachovej oporu předloktí a pohyb dokonči bez propadnutí v rameni.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / pas',knees:'Nohy natažené'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při zvednutí pánve',tempo:'Plynule a kontrolovaně'},
    recommendations:{
      feel:'Práci středu těla, boční strany trupu a stabilní oporu spodního ramene.',
      watch:['Loket drž přímo pod ramenem.','Rameno nech daleko od ucha a aktivně se odtlačuj od podložky.','Pánev drž stabilní a tělo v dlouhé linii.'],
      mistakes:['Propadnutí ve spodním rameni.','Klesající pánev.','Prohnutí v bedrech.','Rychlý nebo nekontrolovaný návrat.']
    }
  },
  sideplank_reach:{
    start:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank%20Reach/side_plank_reach_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank%20Reach/side_plank_reach_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank%20Reach/side_plank_reach_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank%20Reach/side_plank_reach_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Side%20Plank%20Reach/side_plank_reach_step_by_step_v01.png',
    subtitle:'Střed těla • pas • stabilita ramene',
    miniSteps:[
      {n:1,title:'START',caption:'Stabilní boční prkno',photo:'start'},
      {n:2,title:'REACH POD TRUP',caption:'Kontrolovaná rotace',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Otevři hrudník',photo:'end'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Nastav boční prkno na předloktí. Loket dej přímo pod rameno, nohy natáhni a pánev drž vysoko. Horní paže je podél těla.',photo:'start'},
      {title:'REACH POD TRUP',text:'S výdechem veď horní paži pod trup a současně kontrolovaně rotuj hrudník k podložce. Opěrné rameno zůstává aktivní.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem otevři hrudník a vrať horní paži vzhůru podle koncové polohy. Pánev drž stabilní a tělo v dlouhé linii.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / pas',knees:'Nohy natažené'},
    breath:{inhale:'Při otevření a návratu',exhale:'Při reach pod trup',tempo:'Plynule bez švihu'},
    recommendations:{
      feel:'Práci šikmých břišních svalů, stabilní pánev a aktivní oporu spodního ramene.',
      watch:['Loket drž přímo pod ramenem.','Pánev drž stabilní a nenechávej ji klesat.','Rotuj společně paží a hrudníkem bez švihu.'],
      mistakes:['Propadnutí v opěrném rameni.','Klesající nebo vytáčená pánev.','Švih horní paží bez kontroly trupu.','Nadměrné prohnutí v bedrech.']
    }
  },
  deadbug:{
    start:'Pilates%20Assets/02_Exercise_Cards/Dead%20Bug/dead_bug_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Dead%20Bug/dead_bug_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Připrav střed',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Natáhni ruku a nohu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na záda. Ruce směřují vzhůru, kyčle a kolena jsou přibližně v 90° a střed těla je aktivní.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem natahuj současně protilehlou ruku a nohu. Bedra zůstávají přitisknutá k podložce.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať ruku i nohu zpět do startu a střídej strany.',photo:'start'}
    ]
  },
  toetap:{
    start:'Pilates%20Assets/02_Exercise_Cards/Toe%20Tap/toe_tap_start.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Toe%20Tap/toe_tap_hero.png',
    miniSteps:[
      {n:1,title:'START',caption:'Nohy v 90/90',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Špička k podložce',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na záda. Pánev je stabilní, bedra neutrální a obě nohy jsou v pozici 90/90.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem pomalu pokládej špičku jedné nohy směrem k podložce. Pánev zůstává stabilní.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať nohu zpět do výchozí pozice a střídej strany.',photo:'start'}
    ]
  },
  revcrunch:{
    start:'Pilates%20Assets/02_Exercise_Cards/Reverse%20Crunch/reverse_crunch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Reverse%20Crunch/reverse_crunch_hero_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Reverse%20Crunch/reverse_crunch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Reverse%20Crunch/reverse_crunch_step_by_step_v01.png',
    subtitle:'Spodní břicho • kontrola pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Nohy v tabletop',photo:'start'},
      {n:2,title:'PODSADIT PÁNEV',caption:'Kolena jemně k hrudníku',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Zpět do startu',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, paže nech podél těla a nohy zvedni do tabletop. Hlava a ramena zůstávají na podložce.',photo:'start'},
      {title:'PODSADIT PÁNEV',text:'S výdechem veď pohyb z břicha, jemně podsaď pánev a přitáhni kolena směrem k hrudníku.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem vrať pánev dolů bez švihu a nastav nohy zpět do tabletop.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Spodní břicho',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu',exhale:'Při podsazení pánve',tempo:'Pomalu bez švihu'},
    recommendations:{
      feel:'Práci ve spodní části břicha a jemné kontrolované podsazení pánve bez švihu nohou.',
      watch:['Pohyb veď z břicha, ne švihem nohou.','Ramena a krk nech uvolněné na podložce.','Bedra pokládej zpět kontrolovaně.'],
      mistakes:['Švihání nohama.','Zvedání ramen k uším.','Přenášení pohybu do krku.','Nekontrolované položení beder.']
    }
  },
  bicycle:{
    start:'Pilates%20Assets/02_Exercise_Cards/Bicycle%20Crunch/bicycle_crunch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Bicycle%20Crunch/bicycle_crunch_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Bicycle%20Crunch/bicycle_crunch_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Bicycle%20Crunch/bicycle_crunch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Bicycle%20Crunch/bicycle_crunch_step_by_step_v01.png',
    subtitle:'Břicho • pas • střídání stran',
    miniSteps:[
      {n:1,title:'START',caption:'Nohy v tabletop',photo:'start'},
      {n:2,title:'ROTACE',caption:'Loket ke kolenu',photo:'hero'},
      {n:3,title:'VÝMĚNA',caption:'Vystřídej strany',photo:'end'}
    ],
    steps:[
      {title:'START',text:'Lehni si na záda. Ruce polož lehce za hlavu a nohy zvedni do tabletop. Pánev drž stabilní.',photo:'start'},
      {title:'ROTACE',text:'S výdechem přibliž levý loket k pravému kolenu. Levou nohu natáhni jen tak nízko, jak udržíš bedra.',photo:'hero'},
      {title:'VÝMĚNA STRAN',text:'Plynule vystřídej strany. Pravý loket směřuje k levému kolenu a pravá noha se natahuje.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Břicho / pas',knees:'Bez zátěže kolen'},
    breath:{inhale:'Při výměně stran',exhale:'Při rotaci',tempo:'Plynule a kontrolovaně'},
    recommendations:{
      feel:'Práci šikmých břišních svalů, stabilní pánev a kontrolovanou rotaci hrudníku bez tahu za krk.',
      watch:['Ruce nech lehce za hlavou a netahej za krk.','Lokty nezavírej silou, pohyb veď hrudníkem.','Bedra drž klidná a druhou nohu natahuj jen do bezpečného rozsahu.'],
      mistakes:['Tahání rukama za krk.','Zavírání loktů místo rotace hrudníku.','Prohýbání beder.','Příliš rychlé střídání stran bez kontroly.']
    }
  },

  catcow:{
    start:'Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Cat-Cow/cat_cow_step_by_step_v01.png',
    subtitle:'Mobilita páteře • uvolnění zad',
    miniSteps:[
      {n:1,title:'START',caption:'Neutrální záda',photo:'start'},
      {n:2,title:'KOČKA',caption:'Vyhrb záda',photo:'hero'},
      {n:3,title:'KRÁVA',caption:'Otevři hrudník',photo:'end'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Začni na všech čtyřech. Dlaně dej pod ramena, kolena pod kyčle a záda drž neutrálně.',photo:'start'},
      {title:'KOČKA',text:'S výdechem podsadíš pánev, vyhrbíš záda a necháš hlavu přirozeně klesnout.',photo:'hero'},
      {title:'KRÁVA',text:'S nádechem jemně otevři hrudník, prodluž páteř a pohyb veď bez propadnutí do beder.',photo:'end'}
    ],
    info:{difficulty:'Lehké',focus:'Páteř / záda',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Do krávy',exhale:'Do kočky',tempo:'Plynule s dechem'},
    recommendations:{
      feel:'Uvolnění páteře, ramen a kyčlí a plynulý pohyb obratel po obratli bez tlaku do beder.',
      watch:['Začni na všech čtyřech s rukama pod rameny a koleny pod kyčlemi.','Výdech veď do kočky, nádech do krávy.','Pohyb veď plynule a bez propadání mezi lopatkami.'],
      mistakes:['Propadání mezi lopatkami.','Zvedání ramen k uším.','Silové prohýbání beder.','Rychlý pohyb bez dechu.']
    }
  },
  childs_pose:{
    start:'Pilates%20Assets/02_Exercise_Cards/Child\'s%20Pose/childs_pose_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Child\'s%20Pose/childs_pose_hero_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Child\'s%20Pose/childs_pose_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Child\'s%20Pose/childs_pose_step_by_step_v01.png',
    subtitle:'Uvolnění zad • mobilita kyčlí',
    miniSteps:[
      {n:1,title:'START',caption:'Na všech čtyřech',photo:'start'},
      {n:2,title:'POZICE DÍTĚTE',caption:'Boky k patám',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Zpět na všechny čtyři',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Začni na všech čtyřech. Dlaně dej pod ramena a kolena pod kyčle.',photo:'start'},
      {title:'POZICE DÍTĚTE',text:'Pomalu posuň boky dozadu k patám, natáhni paže před sebe a uvolni hlavu k podložce.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem se vrať zpět na všechny čtyři a drž ramena daleko od uší.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Záda / kyčle',knees:'Zkrať rozsah při tlaku'},
    breath:{inhale:'Do zad a žeber',exhale:'Plynule uvolni tělo',tempo:'Klidně bez tlaku'},
    recommendations:{
      feel:'Uvolnění zad, ramen a kyčlí a klidný dech do zad a žeber.',
      watch:['Boky nech klesat směrem k patám jen do příjemného rozsahu.','Ramena nech daleko od uší.','Dýchej klidně do zad a žeber.'],
      mistakes:['Tlačení kolen nebo kyčlí přes bolest.','Zvedání ramen k uším.','Zadržování dechu.','Příliš velký rozsah při tlaku v kolenou.']
    }
  },
  chest_opener:{
    start:'Pilates%20Assets/02_Exercise_Cards/Chest%20Opener/chest_opener_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Chest%20Opener/chest_opener_hero_v04.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Chest%20Opener/chest_opener_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Chest%20Opener/chest_opener_guide_card_v04.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Chest%20Opener/chest_opener_step_by_step_v04.png',
    subtitle:'Hrudník • ramena • držení těla',
    miniSteps:[
      {n:1,title:'START',caption:'Paže podél těla',photo:'start'},
      {n:2,title:'OTEVŘENÍ',caption:'Ruce spoj za tělem',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu uvolni',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Postav se vzpřímeně, chodidla dej přibližně na šířku kyčlí a paže nech volně podél těla.',photo:'start'},
      {title:'OTEVŘENÍ HRUDNÍKU',text:'S nádechem spoj ruce za tělem, stáhni ramena dolů a dozadu a jemně otevři hrudník.',photo:'hero'},
      {title:'NÁVRAT',text:'S výdechem pomalu uvolni ruce a vrať paže do výchozí polohy.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Hrudník / ramena',knees:'Bez zátěže kolen'},
    breath:{inhale:'Při otevření hrudníku',exhale:'Při návratu',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Jemné otevření hrudníku a ramen při vzpřímeném držení těla bez tlaku v bedrech.',
      watch:['Žebra nevytlačuj dopředu.','Ramena stáhni dolů a dozadu.','Hlavu drž v neutrální poloze.'],
      mistakes:['Zvedání ramen k uším.','Zaklánění hlavy.','Prohýbání beder.','Vytlačování žeber dopředu.']
    }
  },
  bird:{
    start:'Pilates%20Assets/02_Exercise_Cards/Bird%20Dog/bird_dog_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Bird%20Dog/bird_dog_hero_v01.png',
    miniSteps:[
      {n:1,title:'START',caption:'Na všech čtyřech',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Natáhni ruku a nohu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Začni na všech čtyřech. Dlaně jsou pod rameny, kolena pod kyčlemi a páteř je neutrální.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem natáhni protilehlou ruku a nohu. Pánev drž stabilní a krk dlouhý.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať ruku i koleno zpět pod tělo a vystřídej stranu.',photo:'start'}
    ]
  },
  hip_march:{
    start:'Pilates%20Assets/02_Exercise_Cards/Hip%20March/hip_march_start_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Hip%20March/hip_march_hero_v02.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Hip%20March/hip_march_guide_card_v02.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Hip%20March/hip_march_step_by_step_v02.png',
    subtitle:'Střed těla • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Výchozí',photo:'start'},
      {n:2,title:'HLAVNÍ POHYB',caption:'Zvedni nohu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Pánev zůstává dole.',photo:'start'},
      {title:'HLAVNÍ POHYB',text:'S výdechem zvedni jednu nohu do tabletop. Pánev, bedra, ramena a hlava zůstávají na podložce.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem vrať chodidlo kontrolovaně zpět a opakuj na druhou stranu.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Core / pánev',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu',exhale:'Při zvednutí nohy',tempo:'Pomalu bez švihu'},
    recommendations:{
      feel:'Aktivní střed těla, klidnou pánev a kontrolované zvednutí nohy bez pohybu v bedrech.',
      watch:['Pánev zůstává na podložce.','Bedra, ramena a hlava zůstávají klidné.','Koleno zvedej do tabletop bez švihu.'],
      mistakes:['Zvedání pánve do mostu.','Prohýbání beder.','Přitahování kolene příliš k hrudníku.','Odraz opěrnou nohou.']
    }
  },
  glute_bridge_march:{
    start:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge%20March/glute_bridge_march_start_v02.png',
    mid:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge%20March/glute_bridge_march_mid_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge%20March/glute_bridge_march_hero_v02.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge%20March/glute_bridge_march_guide_card_v02.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge%20March/glute_bridge_march_step_by_step_v02.png',
    subtitle:'Hýždě • zadní stehna • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Pánev na podložce',photo:'start'},
      {n:2,title:'POCHOD V MOSTU',caption:'Jedna noha v tabletop',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Stabilizuj most',photo:'mid'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Paže nech podél těla.',photo:'start'},
      {title:'MOST A POCHOD',text:'Nejprve zvedni pánev do stabilního mostu. S výdechem zvedni jednu nohu do tabletop a pánev drž vodorovnou.',photo:'hero'},
      {title:'STABILNÍ NÁVRAT',text:'Vrať chodidlo na podložku a stabilizuj most. Vystřídej nohy, potom polož pánev kontrolovaně dolů.',photo:'mid'}
    ],
    info:{difficulty:'Lehké',focus:'Hýždě / pánev',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu',exhale:'Při zvednutí',tempo:'Pomalu a stabilně'},
    recommendations:{
      feel:'Práci v hýždích a zadní straně stehen, stabilní pánev a klidný pochod v mostu.',
      watch:['Nejprve zvedni pánev do stabilního mostu.','Pánev drž vodorovnou a nenechávej ji klesat.','Opři se o chodidlo, ne o krk.'],
      mistakes:['Současné zvednutí pánve a nohy.','Vytáčení nebo klesání pánve.','Prohýbání beder.','Odraz opěrnou nohou.']
    }
  },
  abduction:{
    start:'Pilates%20Assets/02_Exercise_Cards/Bridge%20Abduction/bridge_abduction_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Bridge%20Abduction/bridge_abduction_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Bridge%20Abduction/bridge_abduction_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Bridge%20Abduction/bridge_abduction_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Bridge%20Abduction/bridge_abduction_step_by_step_v01.png',
    subtitle:'Hýždě • boky • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Stabilní most',photo:'start'},
      {n:2,title:'OTEVŘENÍ',caption:'Kolena do stran',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kolena zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ MOST',text:'Lehni si na záda, chodidla polož na podložku a zvedni pánev. Kolena směřují vpřed.',photo:'start'},
      {title:'OTEVŘENÍ KOLEN',text:'S výdechem otevři obě kolena do stran. Pánev drž stabilní, vodorovnou a stále nahoře.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem vrať kolena do výchozí polohy. Chodidla se neposouvají a pánev neklesá.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Hýždě / boky',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu kolen',exhale:'Při otevření kolen',tempo:'Pomalu bez švihu'},
    recommendations:{
      feel:'Práci v hýždích a bocích při stabilní, vodorovné pánvi v mostu.',
      watch:['Pánev drž vodorovnou a stále nahoře.','Chodidla nech pevně na podložce.','Kolena otevírej plynule z kyčlí.'],
      mistakes:['Klesání nebo vytáčení pánve.','Prohýbání beder.','Vytáčení chodidel.','Otevírání kolen švihem.']
    }
  },
  rainbow:{
    start:'Pilates%20Assets/02_Exercise_Cards/Rainbow%20Leg%20Raise/rainbow_leg_raise_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Rainbow%20Leg%20Raise/rainbow_leg_raise_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Rainbow%20Leg%20Raise/rainbow_leg_raise_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Rainbow%20Leg%20Raise/rainbow_leg_raise_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Rainbow%20Leg%20Raise/rainbow_leg_raise_step_by_step_v01.png',
    subtitle:'Hýždě • boky • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Noha nízko vpravo',photo:'start'},
      {n:2,title:'OBLOUK',caption:'Zvedni přes střed',photo:'hero'},
      {n:3,title:'END',caption:'Překřiž doleva',photo:'end'}
    ],
    steps:[
      {title:'START',text:'Začni na všech čtyřech. Pracovní nohu nech téměř nataženou nízko na pravé straně.',photo:'start'},
      {title:'OBLOUK',text:'S výdechem zvedni téměř nataženou nohu plynulým obloukem přes střed. Pánev směřuje k podložce.',photo:'hero'},
      {title:'END',text:'Kontrolovaně spusť nohu za opěrnou nohu na levou stranu a vrať se stejným obloukem zpět.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Hýždě / boky',knees:'Na všech čtyřech'},
    breath:{inhale:'Při návratu',exhale:'Při zvednutí přes střed',tempo:'Plynule bez švihu'},
    recommendations:{
      feel:'Práci v hýždích a boku stehna, stabilní střed těla a kontrolovaný oblouk pracovní nohy.',
      watch:['Pánev drž stabilní a směřující k podložce.','Pohyb veď z kyčle bez švihu.','Ramena nech daleko od uší a pracovní koleno téměř natažené.'],
      mistakes:['Švihání nohou místo kontrolovaného oblouku.','Překlápění pánve do strany.','Prohýbání beder.','Krčení ramen k uším.']
    }
  },
  hamstring_supine:{
    start:'Pilates%20Assets/02_Exercise_Cards/Hamstring%20Stretch/hamstring_stretch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Hamstring%20Stretch/hamstring_stretch_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Hamstring%20Stretch/hamstring_stretch_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Hamstring%20Stretch/hamstring_stretch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Hamstring%20Stretch/hamstring_stretch_step_by_step_v01.png',
    subtitle:'Zadní strana stehna • jemné protažení',
    miniSteps:[
      {n:1,title:'START',caption:'Koleno pokrčené',photo:'start'},
      {n:2,title:'PROPNUTÍ',caption:'Pata vzhůru',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda. Jedno koleno pokrč a chodidlo polož celé na podložku. Druhé stehno přitáhni k trupu a oběma rukama ho podepři zezadu nad kolenem.',photo:'start'},
      {title:'PROPNUTÍ NOHY',text:'S výdechem pomalu propínej pracovní koleno a směruj patu vzhůru. Propni pouze do příjemného tahu.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem koleno kontrolovaně znovu pokrč. Pracovní stehno i pánev drž ve stejné poloze.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Zadní strana stehna',knees:'Rozsah bez bolesti'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při propnutí nohy',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Příjemné protažení zadní strany pracovního stehna bez bolesti v koleni nebo kyčli.',
      watch:['Hlavu, ramena a pánev nech na podložce.','Rukama podpírej stehno zezadu nad kolenem, ne přímo v kloubu.','Pracovní koleno propínej pouze do příjemného tahu.'],
      mistakes:['Zvedání pánve nebo ramen.','Tlak rukama do kolenního kloubu.','Násilné zamykání kolena.','Propínání nohy přes bolest.']
    }
  },
  figure_four:{
    start:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_start_v01.png',
    mid:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_mid_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_hero_v02.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_guide_card_v02.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Figure%20Four%20Stretch/figure_four_stretch_step_by_step_v02.png',
    subtitle:'Hýždě • kyčle • protažení',
    miniSteps:[
      {n:1,title:'START',caption:'Chodidla na podložce',photo:'start'},
      {n:2,title:'NASTAVENÍ',caption:'Kotník přes stehno',photo:'mid'},
      {n:3,title:'PROTAŽENÍ',caption:'Přitáhni nohy k trupu',photo:'hero'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, pokrč kolena a nech obě chodidla na podložce. Hlava, ramena a pánev zůstávají položené.',photo:'start'},
      {title:'NASTAVENÍ',text:'Polož kotník pracovní nohy přes opačné stehno těsně nad kolenem a pracovní koleno otevři do strany.',photo:'mid'},
      {title:'PROTAŽENÍ',text:'Sepni ruce za stehnem opěrné nohy a jemně přitáhni nohy směrem k trupu. Dýchej klidně a potom se vrať do startu.',photo:'hero'}
    ],
    info:{difficulty:'Lehké',focus:'Hýždě / kyčle',knees:'Rozsah bez bolesti'},
    breath:{inhale:'Plynule do žeber',exhale:'Jemně uvolni napětí',tempo:'Klidná výdrž'},
    recommendations:{
      feel:'Příjemné protažení hýždě a vnější strany kyčle bez tlaku v koleni nebo třísle.',
      watch:['Kotník polož přes stehno těsně nad kolenem, ne přímo na kloub.','Hlavu, ramena a pánev nech na podložce.','Rozsah zmenši při nepříjemném tlaku v koleni nebo kyčli.'],
      mistakes:['Tlačení rukou do pracovního kolena.','Kotník položený přímo na kolenním kloubu.','Zvedání hlavy nebo ramen z podložky.','Přitahování nohou přes bolest.']
    }
  },
  row:{
    start:'Pilates%20Assets/02_Exercise_Cards/Bent%20Over%20Row/bent_over_row_start_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Bent%20Over%20Row/bent_over_row_hero_v02.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Bent%20Over%20Row/bent_over_row_start_v02.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Bent%20Over%20Row/bent_over_row_guide_card_v02.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Bent%20Over%20Row/bent_over_row_step_by_step_v02.png',
    subtitle:'Záda • lopatky • zadní ramena',
    miniSteps:[
      {n:1,title:'START',caption:'Činky pod rameny',photo:'start'},
      {n:2,title:'PŘÍTAH',caption:'Lokty dozadu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně dolů',photo:'start'}
    ],
    steps:[
      {title:'START',text:'Postav se na šířku kyčlí. Kolena lehce pokrč, boky posuň dozadu a předkloň se z kyčlí. Paže nech natažené, činky pod rameny.',photo:'start'},
      {title:'PŘÍTAH',text:'S výdechem veď lokty dozadu těsně kolem trupu. Přitáhni činky k dolním žebrům a lopatky jemně stáhni k sobě a dolů.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem spouštěj činky kontrolovaně dolů. Natáhni paže zpět pod ramena a udrž stabilní pánev i neutrální záda.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Záda / lopatky',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu',exhale:'Při přítahu',tempo:'Kontrolovaně bez švihu'},
    recommendations:{
      feel:'Práci v horní části zad, lopatkách a zadních ramenech při stabilním předklonu.',
      watch:['Záda a krk drž neutrálně.','Lokty veď dozadu těsně kolem trupu.','Zápěstí drž rovná a ramena daleko od uší.'],
      mistakes:['Kulatá nebo nadměrně prohnutá záda.','Zvedání ramen k uším.','Švihání trupem.','Bicepsový zdvih místo přítahu lokty.','Zalamování zápěstí.']
    }
  },
  press:{
    start:'Pilates%20Assets/02_Exercise_Cards/Shoulder%20Press/shoulder_press_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Shoulder%20Press/shoulder_press_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Shoulder%20Press/shoulder_press_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Shoulder%20Press/shoulder_press_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Shoulder%20Press/shoulder_press_step_by_step_v01.png',
    subtitle:'Ramena • paže • stabilita trupu',
    miniSteps:[
      {n:1,title:'START',caption:'Činky u ramen',photo:'start'},
      {n:2,title:'TLAK VZHŮRU',caption:'Činky nad hlavu',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Činky zpět k ramenům',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Postav se vzpřímeně. Činky drž u ramen, lokty pokrčené, zápěstí rovná a střed těla zpevněný.',photo:'start'},
      {title:'TLAK NAD HLAVU',text:'S výdechem vytlač činky kontrolovaně vzhůru nad hlavu. Ramena drž daleko od uší a trup stabilní.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem vrať činky pomalu k ramenům. Neprohýbej bedra a pohyb dokonči bez švihu.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Ramena / paže',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu k ramenům',exhale:'Při tlaku vzhůru',tempo:'Plynule a kontrolovaně'},
    recommendations:{
      feel:'Práci ramen a paží při stabilním trupu a kontrolovaném tlaku nad hlavu.',
      watch:['Střed těla drž zpevněný.','Ramena drž daleko od uší.','Zápěstí drž rovná a trup vzpřímený.'],
      mistakes:['Prohýbání v bedrech.','Zvedání ramen k uším.','Švihání činkami.','Zalamování zápěstí.']
    }
  },
  raise:{
    start:'Pilates%20Assets/02_Exercise_Cards/Lateral%20Raise/lateral_raise_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Lateral%20Raise/lateral_raise_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Lateral%20Raise/lateral_raise_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Lateral%20Raise/lateral_raise_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Lateral%20Raise/lateral_raise_step_by_step_v01.png',
    subtitle:'Ramena • stabilita trupu',
    miniSteps:[
      {n:1,title:'START',caption:'Činky podél těla',photo:'start'},
      {n:2,title:'UPAŽENÍ',caption:'Paže do výšky ramen',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Postav se vzpřímeně. Do každé ruky vezmi lehkou činku. Paže jsou podél těla, lokty mírně pokrčené.',photo:'start'},
      {title:'UPAŽENÍ',text:'Se zpevněným středem těla zvedni paže do stran přibližně do výšky ramen. Ramena drž dole a pohyb veď plynule.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'Pomalu spusť paže zpět do výchozí polohy. Pohyb kontroluj po celou dobu.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Ramena / stabilita trupu',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při zvednutí paží',tempo:'Plynule bez švihu'},
    recommendations:{
      feel:'Práci ramen při stabilním trupu a plynulém kontrolovaném pohybu.',
      watch:['Ramena drž daleko od uší.','Lokty nech mírně pokrčené.','Paže zvedej nejvýše do úrovně ramen.'],
      mistakes:['Švihání činkami.','Zvedání ramen k uším.','Prohýbání beder.','Zvedání paží nad úroveň ramen.']
    }
  },
  heeltaps:{
    start:'Pilates%20Assets/02_Exercise_Cards/Heel%20Taps/heel_taps_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Heel%20Taps/heel_taps_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Heel%20Taps/heel_taps_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Heel%20Taps/heel_taps_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Heel%20Taps/heel_taps_step_by_step_v01.png',
    subtitle:'Břicho • pas • střídavý dosah',
    miniSteps:[
      {n:1,title:'START',caption:'Lopatky zvednuté',photo:'start'},
      {n:2,title:'DOSAH',caption:'Ruka ke stejné patě',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Přes střed',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Lopatky lehce zvedni a paže natáhni podél těla.',photo:'start'},
      {title:'DOSAH K PATĚ',text:'S výdechem se malým kontrolovaným úklonem přibliž pravou rukou k pravé patě.',photo:'hero'},
      {title:'VYSTŘÍDÁNÍ STRAN',text:'Vrať se přes střed a stejným pohybem dosáhni levou rukou k levé patě. Pánev drž klidnou.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Břicho / pas',knees:'Chodidla na podložce'},
    breath:{inhale:'Při návratu přes střed',exhale:'Při dosahu k patě',tempo:'Pomalu a střídavě'},
    recommendations:{
      feel:'Práci šikmých břišních svalů při stabilní pánvi a malém střídavém úklonu.',
      watch:['Pravou rukou dosahuj k pravé patě a levou k levé.','Krk drž dlouhý a lopatky jen lehce zvednuté.','Pánev a chodidla nech klidné.'],
      mistakes:['Dosah oběma rukama k jedné patě.','Příliš vysoké zvedání ramen.','Švihání trupem.','Pohyb pánve nebo chodidel.']
    }
  },
  standing_oblique:{
    start:'Pilates%20Assets/02_Exercise_Cards/Standing%20Oblique%20Crunch/standing_oblique_crunch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Standing%20Oblique%20Crunch/standing_oblique_crunch_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Standing%20Oblique%20Crunch/standing_oblique_crunch_hero_opposite_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Standing%20Oblique%20Crunch/standing_oblique_crunch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Standing%20Oblique%20Crunch/standing_oblique_crunch_step_by_step_v01.png',
    subtitle:'Břicho • šikmé břišní svaly • střed těla',
    miniSteps:[{n:1,title:'START',caption:'Výchozí postoj',photo:'start'},{n:2,title:'PŘITAŽENÍ',caption:'Koleno k lokti',photo:'hero'},{n:3,title:'DRUHÁ STRANA',caption:'Střídej strany',photo:'end'}],
    steps:[
      {title:'VÝCHOZÍ POSTOJ',text:'Postav se vzpřímeně, chodidla přibližně na šířku boků. Ruce dej za hlavu a lokty nech otevřené.',photo:'start'},
      {title:'PŘITAŽENÍ KOLENA',text:'Zpevni střed těla a zvedni koleno do strany směrem k lokti na stejné straně. Trup lehce ukloň.',photo:'hero'},
      {title:'DRUHÁ STRANA',text:'Vrať se do vzpřímeného stoje a pohyb zopakuj na druhou stranu. Pokračuj plynule střídavě.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Břicho / šikmé břišní svaly',knees:'Stojná noha stabilní'},
    breath:{inhale:'Při návratu do stoje',exhale:'Při přitažení kolena',tempo:'Plynule a střídavě'},
    recommendations:{feel:'Práci šikmých břišních svalů a středu těla při stabilním postoji.',watch:['Netahej rukama za hlavu.','Lokty nech otevřené a nehrb záda.','Stojnou nohu drž stabilní.'],mistakes:['Tahání za hlavu.','Zavírání loktů dopředu.','Švihový pohyb.','Ztráta stability stojné nohy.']}
  },
  standing_side_bend:{
    start:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_hero_v01.png',
    opposite:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_hero_opposite_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Standing%20Side%20Bend/standing_side_bend_step_by_step_v01.png',
    subtitle:'Pas • boční linie těla • mobilita',
    miniSteps:[
      {n:1,title:'START',caption:'Vzpřímený stoj',photo:'start'},
      {n:2,title:'BOČNÍ ÚKLON',caption:'Jedna strana',photo:'hero'},
      {n:3,title:'OPAČNÁ STRANA',caption:'Plynule vystřídej',photo:'opposite'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Postav se vzpřímeně, chodidla dej přibližně na šířku boků. Ruce polož lehce za hlavu, lokty nech otevřené a ramena spusť od uší.',photo:'start'},
      {title:'ÚKLON NA JEDNU STRANU',text:'S výdechem se kontrolovaně ukloň do strany. Pánev drž stabilní, hrudník směřuje stále dopředu a hlava přirozeně navazuje na páteř.',photo:'hero'},
      {title:'NÁVRAT DO STŘEDU',text:'S nádechem se vrať do vzpřímeného postoje. Neprohýbej bedra a lokty nech otevřené.',photo:'start'},
      {title:'ÚKLON NA OPAČNOU STRANU',text:'Stejným kontrolovaným pohybem se ukloň na opačnou stranu. Pánev neposouvej do protisměru a trup neotáčej.',photo:'opposite'}
    ],
    info:{difficulty:'Lehké',focus:'Pas / boční linie těla',knees:'Přirozeně měkká'},
    breath:{inhale:'Při návratu do středu',exhale:'Do bočního úklonu',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Protažení boční linie trupu a jemnou práci pasu při stabilní pánvi.',
      watch:['Chodidla drž přibližně na šířku boků a kolena přirozeně měkká.','Hrudník směřuje dopředu a hlava zůstává v prodloužení páteře.','Strany střídej plynule bez švihu.'],
      mistakes:['Rotace hrudníku.','Předklon místo čistého úklonu do strany.','Vystrčení pánve do protisměru.','Přitahování lokte ke koleni.']
    }
  },
  sidekick:{
    start:'Pilates%20Assets/02_Exercise_Cards/Side%20Kick/side_kick_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Side%20Kick/side_kick_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Side%20Kick/side_kick_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Side%20Kick/side_kick_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Side%20Kick/side_kick_step_by_step_v01.png',
    subtitle:'Hýždě • boky • střed těla',
    miniSteps:[
      {n:1,title:'START',caption:'Výchozí poloha',photo:'start'},
      {n:2,title:'DOPŘEDU',caption:'Horní nohu veď vpřed',photo:'hero'},
      {n:3,title:'DOZADU',caption:'Kontrolovaně vzad',photo:'end'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Lehni si na bok, hlavu podepři dlaní a spodní loket nech na podložce. Horní dlaň opři před tělem a nohy natáhni.',photo:'start'},
      {title:'POHYB DOPŘEDU',text:'Horní nohu zvedni přibližně do výšky kyčle a kontrolovaně ji veď dopředu. Pánev ani trup neotáčej.',photo:'hero'},
      {title:'POHYB DOZADU',text:'Plynule veď horní nohu zpět a mírně za osu těla. Rozsah ukonči dřív, než začneš prohýbat bedra nebo pohybovat pánví.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Hýždě / boky',knees:'Bez zátěže kolen'},
    breath:{inhale:'Plynule při návratu',exhale:'Při pohybu nohy',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci hýždí, boků a středu těla při stabilní pánvi a klidném trupu.',
      watch:['Pánev drž stabilní a trup klidný.','Spodní nohu nech na podložce.','Rozsah přizpůsob tak, aby ses nezačala prohýbat nebo přetáčet.'],
      mistakes:['Houpání pánví nebo trupem.','Kopání švihem.','Prohýbání v bedrech.','Příliš velký rozsah pohybu dozadu.']
    }
  },  russian:{
    start:'Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_step_by_step_v01.png',
    subtitle:'Střed těla • šikmé břišní svaly',
    miniSteps:[
      {n:1,title:'START',caption:'Středová poloha',photo:'start'},
      {n:2,title:'OTOČENÍ',caption:'Trup do strany',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Zpět na střed',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Sedni si, pokrč kolena a chodidla polož na šířku boků. Trup mírně zakloň, páteř drž dlouhou a ruce spoj před hrudníkem.',photo:'start'},
      {title:'OTOČENÍ TRUPU',text:'Zpevni břicho a s výdechem otoč hrudník do jedné strany. Pánev, kolena a chodidla drž klidné.',photo:'hero'},
      {title:'VYSTŘÍDÁNÍ STRAN',text:'Vrať se přes střed a plynule proveď pohyb na druhou stranu. Záklon trupu ani polohu chodidel neměň.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / pas',knees:'Chodidla na podložce'},
    breath:{inhale:'Při návratu na střed',exhale:'Při otočení',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci šikmých břišních svalů při stabilní pánvi a kontrolované rotaci hrudníku.',
      watch:['Chodidla nech po celou dobu na podložce.','Páteř drž dlouhou a ramena daleko od uší.','Otáčej celý hrudník, ne pouze spojené ruce.'],
      mistakes:['Kulatá záda.','Zvedání chodidel z podložky.','Švihání pažemi.','Pohyb pánve nebo kolen.']
    }
  },
  scissors:{
    start:'Pilates%20Assets/02_Exercise_Cards/Scissors/scissors_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Scissors/scissors_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Scissors/scissors_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Scissors/scissors_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Scissors/scissors_step_by_step_v01.png',
    subtitle:'Spodní břicho • stehna • střídání nohou',
    miniSteps:[
      {n:1,title:'START',caption:'Nohy natažené',photo:'start'},
      {n:2,title:'NŮŽKY',caption:'Jedna noha výš',photo:'hero'},
      {n:3,title:'STŘÍDEJ NOHY',caption:'Plynule vyměň nohy',photo:'hero'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Lehni si na záda, nohy natáhni a paže polož podél těla. Dlaně opři o podložku, pánev drž neutrálně a bedra pod kontrolou.',photo:'start'},
      {title:'NŮŽKOVÁ POLOHA',text:'Zpevni střed těla. Jednu nataženou nohu zvedni výš a druhou drž níže nad podložkou. Hlavu, ramena a pánev nech klidné.',photo:'hero'},
      {title:'STŘÍDEJ NOHY',text:'Plynule vystřídej nohy – horní spouštěj dolů a spodní současně zvedej vzhůru. Pánev drž stabilní.',photo:'hero'}
    ],
    info:{difficulty:'Střední',focus:'Spodní břicho / stehna',knees:'Bez zátěže kolen'},
    breath:{inhale:'Při kontrolovaném pohybu',exhale:'Při vystřídání nohou',tempo:'Pomalu a plynule'},
    recommendations:{
      feel:'Práci spodního břicha a stehen při stabilní pánvi a kontrolovaných bedrech.',
      watch:['Hlavu a ramena nech na podložce.','Pánev nezvedej ani nenakláněj.','Kolena drž natažená, ale nepřepínej je.','Nohy nepřitahuj rukama.'],
      mistakes:['Prohýbání v bedrech.','Pokrčování kolen.','Zvedání pánve.','Švihání nohama.']
    }
  },
  hollow:{
    start:'Pilates%20Assets/02_Exercise_Cards/Hollow%20Hold/hollow_hold_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Hollow%20Hold/hollow_hold_hero_v02.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Hollow%20Hold/hollow_hold_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Hollow%20Hold/hollow_hold_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Hollow%20Hold/hollow_hold_step_by_step_v01.png',
    subtitle:'Střed těla • bezpečná Pilates výdrž',
    miniSteps:[
      {n:1,title:'START',caption:'Chodidla na podložce',photo:'start'},
      {n:2,title:'VÝDRŽ',caption:'Bedra přitisknutá',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Lehni si na záda, pokrč kolena přibližně do pravého úhlu a chodidla polož na podložku. Paže nech podél těla.',photo:'start'},
      {title:'ZVEDNUTÍ DO HOLLOW HOLD',text:'S výdechem lehce podsaď pánev, přitiskni bedra a zvedni hlavu i lopatky. Natáhni nohy šikmo vzhůru a paže drž nízko.',photo:'hero'},
      {title:'VÝDRŽ A NÁVRAT',text:'Plynule dýchej. Potom kontrolovaně pokrč kolena, polož chodidla a vrať hlavu na podložku.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Hluboký střed těla',knees:'Bez zátěže kolen'},
    breath:{inhale:'Plynule během výdrže',exhale:'Při přechodu do výdrže',tempo:'Statická kontrolovaná výdrž'},
    recommendations:{
      feel:'Aktivní hluboký střed těla při bedrech pevně přitisknutých k podložce.',
      watch:['Bedra drž po celou dobu na podložce.','Paže nech klidné a ramena daleko od uší.','Obě natažené nohy drž ve stejné výšce.'],
      mistakes:['Odlepení beder od podložky.','Kmitání pažemi jako u The Hundred.','Příliš nízké nohy za cenu prohnutí beder.','Zadržování dechu nebo švih.']
    }
  },
  inner_thigh:{
    start:'Pilates%20Assets/02_Exercise_Cards/Inner%20Thigh%20Lift/inner_thigh_lift_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Inner%20Thigh%20Lift/inner_thigh_lift_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Inner%20Thigh%20Lift/inner_thigh_lift_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Inner%20Thigh%20Lift/inner_thigh_lift_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Inner%20Thigh%20Lift/inner_thigh_lift_step_by_step_v01.png',
    subtitle:'Vnitřní stehna • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Spodní noha natažená',photo:'start'},
      {n:2,title:'ZDVIH',caption:'Několik centimetrů',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na bok. Spodní nohu nech nataženou, horní pokrč a chodidlo polož před spodní koleno. Hlava je pohodlně opřená o paži.',photo:'start'},
      {title:'ZVEDNUTÍ SPODNÍ NOHY',text:'Zpevni střed těla a pomalu zvedni spodní nataženou nohu několik centimetrů nad podložku. Pánev zůstává stabilní.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'Pomalu spusť spodní nohu zpět k podložce. Pokračuj plynule bez švihu a potom vystřídej stranu.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Vnitřní stehna',knees:'Bez tlaku na kolena'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při zvednutí spodní nohy',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci vnitřního stehna spodní nohy při stabilní pánvi a malém kontrolovaném pohybu.',
      watch:['Pánev drž stabilní a neotáčej se dozadu.','Spodní nohu zvedej jen několik centimetrů.','Po dokončení dávky vystřídej stranu.'],
      mistakes:['Švihání spodní nohou.','Zvedání nohy příliš vysoko.','Otáčení pánve dozadu.','Napětí v krku a ramenou.']
    }
  },
  legraises:{
    start:'Pilates%20Assets/02_Exercise_Cards/Leg%20Raises/leg_raises_start_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Leg%20Raises/leg_raises_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Leg%20Raises/leg_raises_start_v02.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Leg%20Raises/leg_raises_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Leg%20Raises/leg_raises_step_by_step_v01.png',
    subtitle:'Spodní břicho • stabilita trupu',
    miniSteps:[
      {n:1,title:'START',caption:'Nohy vzhůru',photo:'start'},
      {n:2,title:'SPOUŠTĚNÍ',caption:'Kontrolovaně dolů',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Pomalu vzhůru',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, paže nech podél těla a obě nohy natáhni vzhůru. Bedra drž opřená o podložku.',photo:'start'},
      {title:'SPOUŠTĚNÍ NOHOU',text:'S nádechem spouštěj obě natažené nohy pouze do výšky, ve které udržíš bedra na podložce.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S výdechem vrať nohy pomalu vzhůru. Pohyb veď bez švihu a pánev nech stabilní.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Spodní břicho',knees:'Bez zátěže kolen'},
    breath:{inhale:'Při spouštění nohou',exhale:'Při návratu vzhůru',tempo:'Pomalu a kontrolovaně'},
    recommendations:{
      feel:'Práci spodní části břicha při stabilní pánvi a bedrech opřených o podložku.',
      watch:['Bedra drž po celou dobu na podložce.','Obě nohy spouštěj stejně vysoko a pomalu.','Rozsah zmenši, pokud se bedra začnou odlepovat.'],
      mistakes:['Odlepení beder od podložky.','Spuštění nohou příliš nízko.','Švihání nohama.','Zvedání ramen nebo napětí v krku.']
    }
  },
  spine:{
    start:'Pilates%20Assets/02_Exercise_Cards/Spine%20Stretch/spine_stretch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Spine%20Stretch/spine_stretch_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Spine%20Stretch/spine_stretch_start_v01.png',
    subtitle:'Záda • střed těla • mobilita páteře',
    miniSteps:[
      {n:1,title:'START',caption:'Vzpřímený sed',photo:'start'},
      {n:2,title:'PROTAŽENÍ',caption:'Zakulať páteř',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Zpět do vzpřímení',photo:'end'}
    ],
    steps:[
      {title:'VÝCHOZÍ POLOHA',text:'Sedni si vzpřímeně, nohy natáhni před sebe a chodidla dej do flexe. Paže natáhni vpřed ve výšce ramen.',photo:'start'},
      {title:'ZAKULACENÍ PÁTEŘE',text:'S výdechem skloň hlavu a postupně zakulacuj páteř. Paže veď vpřed a ramena drž daleko od uší.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem se postupně vrať do vzpřímeného sedu. Páteř znovu vytáhni vzhůru a zachovej stabilní pánev.',photo:'end'}
    ],
    info:{difficulty:'Lehké',focus:'Záda / střed těla',knees:'Bez tlaku na kolena'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při zakulacení a pohybu vpřed',tempo:'Pomalu a plynule'},
    recommendations:{
      feel:'Plynulé zakulacení a protažení páteře při stabilní pánvi a uvolněných ramenou.',
      watch:['Pánev drž stabilní.','Ramena nech daleko od uší.','Pohyb veď zakulacením páteře, ne pouze předklonem z kyčlí.'],
      mistakes:['Předklon pouze z kyčlí.','Ramena vytažená k uším.','Přetahování pohybu silou.','Ztráta stabilní polohy pánve.']
    }
  },
  sphinx:{
    start:'Pilates%20Assets/02_Exercise_Cards/Sphinx%20Stretch/sphinx_stretch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Sphinx%20Stretch/sphinx_stretch_start_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Sphinx%20Stretch/sphinx_stretch_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Sphinx%20Stretch/sphinx_stretch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Sphinx%20Stretch/sphinx_stretch_step_by_step_v01.png',
    subtitle:'Záda • hrudník • mobilita páteře',
    miniSteps:[
      {n:1,title:'NASTAVENÍ',caption:'Leh na břiše',photo:'start'},
      {n:2,title:'SPHINX',caption:'Opři se o předloktí',photo:'hero'},
      {n:3,title:'VÝDRŽ',caption:'Uvolni ramena',photo:'end'}
    ],
    steps:[
      {title:'NASTAVENÍ',text:'Lehni si na břicho a natáhni nohy dozadu. Předloktí polož na podložku a lokty nastav přibližně pod ramena.',photo:'start'},
      {title:'SPHINX',text:'Opři se do předloktí a jemně zvedni hrudník. Pánev a stehna nech na podložce a ramena drž daleko od uší.',photo:'hero'},
      {title:'VÝDRŽ',text:'Prodluž páteř, krk nech přirozeně a v pozici klidně dýchej. Záklon zvětšuj jen do příjemného rozsahu.',photo:'end'}
    ],
    info:{difficulty:'Lehké',focus:'Záda / hrudník',knees:'Bez tlaku na kolena'},
    breath:{inhale:'Prodlužuj páteř a otevírej hrudník',exhale:'Uvolni ramena a drž pozici',tempo:'Statická výdrž'},
    recommendations:{
      feel:'Jemné otevření hrudníku a protažení přední strany těla bez tlaku v bedrech.',
      watch:['Ramena drž daleko od uší.','Pánev a stehna nech na podložce.','Záklon zvětšuj pouze do příjemného rozsahu.'],
      mistakes:['Ramena vytažená k uším.','Zaklánění hlavy.','Násilné prohnutí v bedrech.','Zvedání pánve nebo stehen z podložky.']
    }
  },
  mermaid:{
    start:'Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_step_by_step_v01.png',
    subtitle:'Bok trupu • mobilita páteře',
    miniSteps:[
      {n:1,title:'START',caption:'Vzpřímený sed',photo:'start'},
      {n:2,title:'BOČNÍ ÚKLON',caption:'Paže nad hlavou',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Plynule zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Sedni si vzpřímeně, obě kolena pokrč na jednu stranu. Jednu ruku lehce opři o podložku.',photo:'start'},
      {title:'BOČNÍ ÚKLON',text:'S výdechem se ukláněj k opěrné ruce. Opačnou paži protáhni obloukem nad hlavou.',photo:'hero'},
      {title:'NÁVRAT',text:'S nádechem se plynule vrať do vzpřímeného sedu. Pánev zůstává stabilní.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Bok trupu / páteř',knees:'Pohodlný rozsah'},
    breath:{inhale:'Ve vzpřímeném sedu a při návratu',exhale:'Do bočního úklonu',tempo:'Pomalu a plynule'},
    recommendations:{
      feel:'Příjemné protažení boku trupu při vzpřímené a stabilní pánvi.',
      watch:['Sedací kosti drž co nejvíce na podložce.','Ramena nech daleko od uší a hrudník směřuj dopředu.','Protahuj se pouze do příjemného rozsahu.'],
      mistakes:['Otáčení trupu.','Předklánění místo bočního úklonu.','Zvedání ramene k uchu.','Tlačení do bolestivého rozsahu.']
    }
  },
  plie:{
    start:'Pilates%20Assets/02_Exercise_Cards/Plie%20Squat/plie_squat_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Plie%20Squat/plie_squat_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Plie%20Squat/plie_squat_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Plie%20Squat/plie_squat_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Plie%20Squat/plie_squat_step_by_step_v01.png',
    subtitle:'Hýždě • stehna • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Široký stoj',photo:'start'},
      {n:2,title:'PLIÉ DŘEP',caption:'Kolena ke špičkám',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Vzpřímený stoj',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POSTOJ',text:'Postav se do širokého postoje. Špičky vytoč mírně ven, paty nech na podložce, pánev drž neutrální a trup vzpřímený.',photo:'start'},
      {title:'PLIÉ DŘEP',text:'S nádechem pokrč kolena ve směru špiček. Klesej plynule jen do bezpečné hloubky a paty drž na podložce.',photo:'hero'},
      {title:'NÁVRAT DO STOJE',text:'S výdechem zatlač chodidla do podložky a plynule narovnej kolena. Pánev drž neutrální a trup stále vzpřímený.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Hýždě / stehna',knees:'Bezpečný rozsah'},
    breath:{inhale:'Při klesání',exhale:'Při návratu do stoje',tempo:'Plynule a kontrolovaně'},
    recommendations:{
      feel:'Práci hýždí a stehen při stabilní pánvi a vzpřímeném trupu.',
      watch:['Kolena veď ve směru špiček.','Paty nech po celou dobu na podložce.','Klesej pouze do bezpečného rozsahu.'],
      mistakes:['Vtáčení kolen dovnitř.','Zvedání pat.','Příliš hluboký dřep.','Předklánění nebo podsazování pánve.']
    }
  },
  rollup:{
    start:'Pilates%20Assets/02_Exercise_Cards/Roll%20Up/roll_up_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Roll%20Up/roll_up_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Roll%20Up/roll_up_end_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Roll%20Up/roll_up_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Roll%20Up/roll_up_step_by_step_v01.png',
    subtitle:'Střed těla • kontrola páteře',
    miniSteps:[
      {n:1,title:'START',caption:'Leh na zádech',photo:'start'},
      {n:2,title:'ROLOVÁNÍ',caption:'Paže vpřed',photo:'hero'},
      {n:3,title:'SED',caption:'Kontrolované dokončení',photo:'end'}
    ],
    steps:[
      {title:'VÝCHOZÍ LEH',text:'Lehni si na záda. Nohy natáhni a drž těsně vedle sebe. Paže veď za hlavu a střed těla jemně zpevni.',photo:'start'},
      {title:'ROLOVÁNÍ VZHŮRU',text:'S výdechem zvedej hlavu, ramena a páteř obratel po obratli. Paže veď plynule vpřed a nohy nech na podložce.',photo:'hero'},
      {title:'SED A NÁVRAT',text:'Dokonči pohyb v kontrolovaném sedu s pažemi vpřed. Poté se pomalu obratel po obratli vrať do výchozí polohy.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / páteř',knees:'Nohy na podložce'},
    breath:{inhale:'Při kontrolovaném návratu',exhale:'Při rolování vzhůru',tempo:'Obratel po obratli'},
    recommendations:{
      feel:'Práci středu těla a plynulé postupné rolování páteře bez švihu.',
      watch:['Nohy drž po celou dobu na podložce.','Páteř roluj postupně obratel po obratli.','Ramena drž daleko od uší.'],
      mistakes:['Použití švihu.','Zvedání nohou z podložky.','Trhavý pohyb páteře.','Ramena vytažená k uším.']
    }
  },
  plank:{
    start:'Pilates%20Assets/02_Exercise_Cards/Forearm%20Plank/forearm_plank_start_v01.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Forearm%20Plank/forearm_plank_start_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Forearm%20Plank/forearm_plank_start_v01.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Forearm%20Plank/forearm_plank_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Forearm%20Plank/forearm_plank_step_by_step_v01.png',
    subtitle:'Střed těla • ramena • hýždě',
    miniSteps:[
      {n:1,title:'START',caption:'Lokty pod rameny',photo:'start'},
      {n:2,title:'VÝDRŽ',caption:'Tělo v jedné linii',photo:'hero'},
      {n:3,title:'KONEC VÝDRŽE',caption:'Potom polož kolena',photo:'end'}
    ],
    steps:[
      {title:'START',text:'Opři se o předloktí, lokty dej přímo pod ramena a natáhni nohy dozadu.',photo:'start'},
      {title:'VÝDRŽ',text:'Zapři špičky do podložky, zpevni břicho a hýždě a drž tělo v jedné dlouhé linii.',photo:'hero'},
      {title:'KONEC VÝDRŽE',text:'Plynule dýchej až do konce výdrže. Potom polož kolena kontrolovaně na podložku.',photo:'end'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / ramena',knees:'Bez zátěže kolen'},
    breath:{inhale:'Plynule do žeber',exhale:'Plynule bez zadržení',tempo:'Statická výdrž'},
    recommendations:{
      feel:'Aktivní střed těla, ramena a hýždě při stabilní časové výdrži.',
      watch:['Lokty drž přímo pod rameny.','Tělo drž v jedné dlouhé linii.','Hlavu a krk drž neutrálně a ramena daleko od uší.'],
      mistakes:['Propadnutí v bedrech.','Příliš vysoko zvednutá pánev.','Ramena vytažená k uším.','Zadržování dechu.']
    }
  },
  tap:{
    start:'Pilates%20Assets/02_Exercise_Cards/Plank%20Shoulder%20Taps/plank_shoulder_taps_start_v02.png',
    hero:'Pilates%20Assets/02_Exercise_Cards/Plank%20Shoulder%20Taps/plank_shoulder_taps_hero_v01.png',
    end:'Pilates%20Assets/02_Exercise_Cards/Plank%20Shoulder%20Taps/plank_shoulder_taps_start_v02.png',
    guideCard:'Pilates%20Assets/02_Exercise_Cards/Plank%20Shoulder%20Taps/plank_shoulder_taps_guide_card_v01.png',
    stepByStep:'Pilates%20Assets/02_Exercise_Cards/Plank%20Shoulder%20Taps/plank_shoulder_taps_step_by_step_v01.png',
    subtitle:'Střed těla • ramena • stabilita pánve',
    miniSteps:[
      {n:1,title:'START',caption:'Vysoký plank',photo:'start'},
      {n:2,title:'DOTYK',caption:'Opačné rameno',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Dlaň pod rameno',photo:'start'}
    ],
    steps:[
      {title:'VYSOKÝ PLANK',text:'Zaujmi vysoký plank. Dlaně polož pod ramena a chodidla dej mírně šíře než boky. Tělo drž v jedné dlouhé linii.',photo:'start'},
      {title:'DOTYK RAMENE',text:'Zpevni břicho a s výdechem zvedni jednu ruku. Kontrolovaně se dotkni opačného ramene a pánev drž klidnou.',photo:'hero'},
      {title:'VYSTŘÍDÁNÍ STRAN',text:'Vrať dlaň pod rameno a proveď pohyb druhou rukou. Boky drž stále co nejvíce bez pohybu.',photo:'start'}
    ],
    info:{difficulty:'Střední',focus:'Střed těla / ramena',knees:'Bez zátěže kolen'},
    breath:{inhale:'Při návratu dlaně',exhale:'Při dotyku ramene',tempo:'Pomalu a střídavě'},
    recommendations:{
      feel:'Aktivní střed těla a ramena při stabilní pánvi a kontrolovaném střídání rukou.',
      watch:['Dlaně drž přímo pod rameny.','Pánev a boky drž co nejvíce bez pohybu.','Hlavu nech v prodloužení páteře.'],
      mistakes:['Otáčení nebo houpání pánve.','Propadnutí v bedrech.','Propadnutí mezi rameny.','Příliš úzký postoj chodidel.']
    }
  },
  chest_press:{
    start:'assets/exercises/chest_press_step1.jpg?v=5930chestpress',
    hero:'assets/exercises/chest_press.jpg?v=5930chestpress',
    miniSteps:[
      {n:1,title:'START',caption:'Činky u hrudníku',photo:'start'},
      {n:2,title:'TLAK NAHORU',caption:'Činky nad hrudník',photo:'hero'},
      {n:3,title:'NÁVRAT',caption:'Kontrolovaně zpět',photo:'start'}
    ],
    steps:[
      {title:'VÝCHOZÍ POZICE',text:'Lehni si na záda, pokrč kolena a chodidla polož na podložku. Činky drž u hrudníku.',photo:'start'},
      {title:'TLAK NAHORU',text:'S výdechem vytlač činky nad hrudník. Zápěstí drž rovně, paže veď kontrolovaně a bedra nech klidně na podložce.',photo:'hero'},
      {title:'KONTROLOVANÝ NÁVRAT',text:'S nádechem vrať činky k hrudníku. Lokty veď asi 45° od trupu a pohyb zastav lehkým dotykem paží o podložku.',photo:'start'}
    ],
    info:{difficulty:'Lehké',focus:'Hrudník / paže',knees:'Šetrné ke kolenům'},
    breath:{inhale:'Při návratu',exhale:'Při vytlačení',tempo:'Kontrolovaně'},
    recommendations:{
      feel:'Práci v hrudníku, ramenou a tricepsech bez napětí v krku.',
      watch:['Zápěstí drž rovně.','Ramena nech daleko od uší.','Bedra neprohýbej a pohyb veď kontrolovaně.'],
      mistakes:['Zvedání ramen k uším.','Prohýbání beder.','Odražení loktů od podložky.']
    }
  }
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
function v22ImageSrc(k){return referenceExerciseAssets[k]?.hero || data.exercises[k]?.image || '';}
function noImageCue(text){
  return String(text||'')
    .replace(/\s+/g,' ')
    .replace(/^[•\-\s]+/,'')
    .split(/[.;]/)[0]
    .trim()
    .slice(0,64);
}
function noImageCues(ex){
  const raw=[
    ...(Array.isArray(ex?.shortDescription)?ex.shortDescription:[ex?.shortDescription]),
    ...(Array.isArray(ex?.instructions)?ex.instructions:[ex?.instructions]),
    ...(Array.isArray(ex?.steps)?ex.steps:[ex?.steps]),
    ...(Array.isArray(ex?.cues)?ex.cues:[ex?.cues]),
    ...(Array.isArray(ex?.how)?ex.how:[]),
    ex?.watch,
    ex?.focus,
    ...(Array.isArray(ex?.notes)?ex.notes:[ex?.notes])
  ].filter(Boolean);
  const seen=new Set();
  const cues=[];
  raw.forEach(item=>{
    const cue=noImageCue(item);
    const key=cue.toLowerCase();
    if(cue&&cue.length>4&&!seen.has(key)){
      seen.add(key);
      cues.push(cue);
    }
  });
  return cues.slice(0,4);
}
function noImage(k,c='thumb',extra=''){
  const ex=data.exercises[k]||{};
  const name=ex.name||'Cvik';
  const cues=noImageCues(ex);
  const list=cues.length?`<ul>${cues.map(cue=>`<li>${esc(cue)}</li>`).join('')}</ul>`:'';
  return `<div class="${c} noImageState" ${extra} role="img" aria-label="${esc(name)} - obrázek připravujeme"><div class="noImageInner"><div class="noImageIcon" aria-hidden="true">📷</div><strong>Obrázek připravujeme</strong><b>${esc(name)}</b>${list}<small>Obrázek bude doplněn v další aktualizaci.</small></div></div>`;
}
function img(k,c='thumb',extra=''){
  const ex=data.exercises[k];
  const src=v22ImageSrc(k);
  if(!src)return noImage(k,c,extra);
  return `<img loading="lazy" class="${c}" ${extra} src="${src}" alt="${ex.name}">`;
}

function detailHeroImage(k){
  const src = v22ImageSrc(k);
  if(!src)return noImage(k,'v20HeroPhoto v22HeroPhoto');
  return `<img loading="lazy" class="v20HeroPhoto v22HeroPhoto" src="${src}" alt="${data.exercises[k]?.name||'cvik'}">`;
}
function referencePhoto(ref,photo){
  if(!ref)return '';
  if(!photo)return ref.hero||'';
  return ref.photos?.[photo] || ref[photo] || photo || ref.hero || '';
}
function referenceMiniSteps(ref){
  return (ref.miniSteps||[
    {n:1,title:'START',caption:'Lehni si',photo:'start'},
    {n:2,title:'HERO',caption:'Zvedni pánev',photo:'hero'},
    {n:3,title:'START',caption:'Polož pánev',photo:'start'}
  ]).map(s=>({...s,photo:referencePhoto(ref,s.photo)}));
}
function referenceSubtitle(k,meta,ex){
  const ref=referenceExerciseAssets[k];
  return ref?.subtitle || (k==='hip' ? 'Hýždě • zadní stehna' : `${meta.area.replace(' / ',' • ')}${ex.focus?` • ${ex.focus}`:''}`);
}
function referenceHeroBlock(k){
  const ref=referenceExerciseAssets[k];
  if(!ref)return '';
  const ex=data.exercises[k]||{};
  return `<div class="referenceTopHero"><img loading="lazy" src="${ref.hero}" alt="${esc(ex.name||'Cvik')} - hlavní poloha"></div>`;
}
function referenceGuideCard(k){
  const ref=referenceExerciseAssets[k];
  if(!ref)return '';
  const ex=data.exercises[k]||{};
  const stepData=referenceMiniSteps(ref);
  return `<section class="referenceGuideCard" aria-label="${esc(ex.name||'Cvik')} mini Guide Card">
    <div class="referenceFlow">${stepData.map((s,i)=>`<article class="referenceFlowStep"><div class="referenceStepPhoto"><img loading="lazy" src="${s.photo}" alt="${esc(ex.name||'Cvik')} ${s.title}"></div><b>${s.n}</b>${i<2?'<i aria-hidden="true">→</i>':''}</article>`).join('')}</div>
  </section>`;
}
function referenceStepByStep(k){
  const ref=referenceExerciseAssets[k];
  if(!ref)return '';
  const ex=data.exercises[k]||{};
  return `<details class="referenceStepByStep" aria-label="${esc(ex.name||'Cvik')} krok za krokem">
    <summary><span>Krok za krokem</span><b aria-hidden="true">⌄</b></summary>
    <div class="referenceStepByStepContent">
    ${ref.steps.map((s,i)=>{
      const src=referencePhoto(ref,s.photo)||ref.hero;
      return `<article><div class="referenceSbsPhoto"><img loading="lazy" src="${src}" alt="${esc(ex.name||'Cvik')} ${esc(s.title)}"><b>${i+1}</b></div><strong>${esc(s.title)}</strong><span>${esc(s.text)}</span></article>${i<ref.steps.length-1?'<div class="referenceDownArrow" aria-hidden="true">↓</div>':''}`;
    }).join('')}
    </div>
  </details>`;
}
function referenceCompactInfoPanel(k,meta){
  const ref=referenceExerciseAssets[k]||{};
  const info=ref.info||{};
  const breath=ref.breath||{};
  const icon=(path)=>`<svg class="referenceMiniIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
  const difficultyIcon=icon('<path d="M12 4v4"/><path d="M12 16v4"/><path d="M4 12h4"/><path d="M16 12h4"/><path d="m7.8 7.8 2.1 2.1"/><path d="m14.1 14.1 2.1 2.1"/><path d="m16.2 7.8-2.1 2.1"/><path d="m9.9 14.1-2.1 2.1"/>');
  const focusIcon=icon('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>');
  const kneeIcon=icon('<path d="M9 4c2.6 1.6 3.8 4 3.8 6.4 0 2.1-.8 3.9-2.1 5.2"/><path d="M15 5c-1.4 2-1.7 4.1-.8 6.2.7 1.6 1.1 3.2.6 4.8-.4 1.2-1.2 2.3-2.4 3.2"/><path d="M9 16h7"/>');
  const inhaleIcon=icon('<path d="M12 19V5"/><path d="m7 10 5-5 5 5"/>');
  const exhaleIcon=icon('<path d="M12 5v14"/><path d="m7 14 5 5 5-5"/>');
  const tempoIcon=icon('<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>');
  return `<section class="referenceCompactInfoPanel" aria-label="Informace o cviku a dech">
    <article><h3>Info</h3><ul><li>${difficultyIcon}<span><b>Obtížnost</b><strong>${esc(info.difficulty||meta.diff||'Lehké')}</strong></span></li><li>${focusIcon}<span><b>Zaměření</b><strong>${esc(info.focus||meta.area||'Hýždě / nohy')}</strong></span></li><li>${kneeIcon}<span><b>Kolena</b><strong>${esc(info.knees||meta.knee||'Šetrné ke kolenům')}</strong></span></li></ul></article>
    <article><h3>Dech</h3><p>${inhaleIcon}<span><b>Nádech</b><strong>${esc(breath.inhale||'Výchozí pozice')}</strong></span></p><p>${exhaleIcon}<span><b>Výdech</b><strong>${esc(breath.exhale||'Při zvednutí')}</strong></span></p><p>${tempoIcon}<span><b>Tempo</b><strong>${esc(breath.tempo||'Pomalu')}</strong></span></p></article>
  </section>`;
}
function referenceRecommendations(k,meta,ex){
  const rec=referenceExerciseAssets[k]?.recommendations||{};
  const feel=rec.feel||'Práci v hýždích, stabilní střed těla a klidný, kontrolovaný pohyb bez bolesti.';
  const watch=rec.watch||['Zatlačuj přes paty, ne přes špičky.','Drž pánev v jedné linii a neprohýbej se v bedrech.','Ramena zůstávají na zemi, krk je uvolněný.','Aktivuj břišní svaly po celou dobu.'];
  const mistakes=rec.mistakes||[...meta.mistakes,'Zvedání příliš vysoko a ztráta kontroly.','Zatínání krku a ramen.'];
  return `<section class="referenceRecommendations" aria-label="Doporučení při cvičení">
    <h3>Doporučení při cvičení</h3>
    <div class="referenceAdviceGrid">
      <article class="referenceAdviceFeel"><h4><span aria-hidden="true">●</span>Co bys měla cítit</h4><p>${esc(feel)}</p></article>
      <article class="referenceAdviceWatch"><h4><span aria-hidden="true">✓</span>Na co si dát pozor</h4><ul class="checkList">${watch.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>
      <article class="referenceAdviceMistakes"><h4><span aria-hidden="true">×</span>Nejčastější chyby</h4><ul class="xList">${mistakes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>
    </div>
  </section>`;
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
    if(!ex.image)return `<figure class="v50StepFallback">${noImage(k,'v20StepPhoto v22StepPhoto')}<figcaption>Ukázka cviku</figcaption></figure>`;
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
  const minutes=Math.max(14,Math.round(items.length*1.5*difficultySets()));
  return `<div class="daySummary"><span>⏱ ${minutes} min</span><span>🎯 ${main}</span></div>`;
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
  const payload={version:'PB40-v60-difficulty1',exportedAt:new Date().toISOString(),items:{}};
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&(k.startsWith('pb40-')||k===ONBOARDING_COMPLETED_KEY)) payload.items[k]=localStorage.getItem(k);
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
    k===measureKey || k===noteKey || k===introKey || k===ONBOARDING_COMPLETED_KEY ||
    k===PROGRAM_DIFFICULTY_KEY || k===DIFFICULTY_MIGRATION_NOTICE_KEY || k===PROGRAM_LAYOUT_KEY;
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
  if(k===PROGRAM_DIFFICULTY_KEY)return validDifficulty(String(v))||'medium';
  if(k===PROGRAM_LAYOUT_KEY)return String(v)===PROGRAM_LAYOUT_VERSION?PROGRAM_LAYOUT_VERSION:null;
  if(/^pb40-d\d+-e\d+$/.test(k) || /^pb40-log-/.test(k) || /^pb40-fav-/.test(k) || k===introKey || k===ONBOARDING_COMPLETED_KEY){
    return String(v)==='1'?'1':'0';
  }
  if(k===DIFFICULTY_MIGRATION_NOTICE_KEY)return String(v)==='1'?'1':'0';
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
      const importedLayoutVersion=String(payload.items[PROGRAM_LAYOUT_KEY]??'');
      Object.keys(payload.items).forEach(k=>{
        if(!allowedBackupKey(k))return;
        const clean=cleanBackupValue(k,payload.items[k]);
        if(clean!==null){localStorage.setItem(importedProgressKey(k,importedLayoutVersion),clean);imported++;}
      });
      if(!imported)throw new Error('empty backup');
      migrateLegacyDifficulty();
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
  setAppView('intro');
  lastMode='intro';setNav('library');
  app.innerHTML=`<section class="introHero">
    <div class="introBadge">30 dní</div>
    <h2>Vítej v Moovka</h2>
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
    <div class="needGrid"><span>🧘 Podložku</span><span>💧 Vodu</span><span>⭕ Odporová guma volitelně</span><span>🏋️ Lehké činky volitelně</span></div>
    <p class="inlineTip"><b>Pravidlo:</b> necvič přes ostrou bolest. U kolen drž menší rozsah a u hýždí tlač hlavně přes paty.</p>
  </section>`;
}
function programInfo(){
  setAppView('program');
  lastMode='library';setNav('library');
<<<<<<< Updated upstream
  app.innerHTML=`<div class="programAboutPage">
  <section class="aboutHero">
    <div class="aboutHeroMedia"><img src="Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_start_v01.png" alt="Cvičení na podložce"></div>
    <div class="aboutHeroContent">
      <h2>O programu</h2>
      <h3>30 dní pro silnější a pevnější tělo</h3>
      <p>Domácí tréninky zaměřené na zpevnění, sílu a pohyblivost.</p>
      <div class="aboutProgramFacts">
        <div>${lineIcon('clock')}<span><strong>20–30 min</strong><small>na trénink</small></span></div>
        <div>${lineIcon('levels')}<span><strong>3 úrovně</strong><small>obtížnosti</small></span></div>
        <div>${lineIcon('equipment')}<span><strong>Činky + podložka</strong><small>činky lze nahradit PET lahvemi</small></span></div>
      </div>
      <div class="aboutHeroActions">
        <button class="primary aboutPrimaryCta" data-action="start-auto" data-day="${nextDayIndex()}">Pokračovat v tréninku</button>
        <button class="onboardingReplayButton aboutSecondaryAction" data-action="show-onboarding">Zobrazit úvodní průvodce</button>
      </div>
=======
  const programComplete=isProgramComplete();
  app.innerHTML=`<section class="introHero compactIntro">
    <div class="introBadge">Pilates Body 40+</div>
    <h2>O programu</h2>
    <p>30denní domácí plán pro zpevnění středu těla, hýždí, zadních stehen a držení těla. Je stavěný tak, aby šel cvičit reálně i v běžném dni.</p>
    <button class="primary cta" data-action="${programComplete?'days':'start-auto'}"${programComplete?'':` data-day="${nextDayIndex()}"`}>${programComplete?'Zobrazit dokončený plán':'▶ Pokračovat v tréninku'}</button>
  </section>
  <section class="card programCard"><h2>Co tě čeká</h2>
    <div class="programSteps">
      <div><b>01</b><h3>Hýždě + zadní stehna</h3><p class="muted">Tlak přes paty, pomalejší tempo, žádné švihání.</p></div>
      <div><b>02</b><h3>Břicho + pas</h3><p class="muted">Core cviky bez tahání krkem a bez prohýbání beder.</p></div>
      <div><b>03</b><h3>Mobilita a celé tělo</h3><p class="muted">Odlehčené dny, záda, ramena a plynulost pohybu.</p></div>
>>>>>>> Stashed changes
    </div>
  </section>
  <section class="aboutProgramSection"><h2>Co tě čeká</h2>
    <div class="aboutFocusList">
      <article><img src="Pilates%20Assets/02_Exercise_Cards/Glute%20Bridge/glute_bridge_hero_v1.png" alt="Glute Bridge"><div><span class="aboutFocusAccent">${lineIcon('glutes')}</span><h3>Hýždě + zadní stehna</h3><p>Síla a zpevnění spodní části těla.</p></div></article>
      <article><img src="Pilates%20Assets/02_Exercise_Cards/Russian%20Twist/russian_twist_hero_v01.png" alt="Russian Twist"><div><span class="aboutFocusAccent">${lineIcon('core')}</span><h3>Břicho + pas</h3><p>Stabilní střed těla.</p></div></article>
      <article><img src="Pilates%20Assets/02_Exercise_Cards/Mermaid%20Stretch/mermaid_stretch_hero_v01.png" alt="Mermaid"><div><span class="aboutFocusAccent">${lineIcon('mobility')}</span><h3>Mobilita + celé tělo</h3><p>Záda, ramena a pohyblivost.</p></div></article>
    </div>
  </section>
  <section class="trainingPrinciplesSection"><h2>Jak cvičit správně</h2>
    <div class="trainingPrinciples">
      <div class="trainingPrinciple"><span>${lineIcon('quality')}</span><div><h3>Kvalita před rychlostí</h3><p>Cvič pomalu a kontrolovaně.</p></div></div>
      <div class="trainingPrinciple"><span>${lineIcon('breathe')}</span><div><h3>Dýchej</h3><p>Nezadržuj dech.</p></div></div>
      <div class="trainingPrinciple"><span>${lineIcon('listen')}</span><div><h3>Poslouchej tělo</h3><p>Ostrá nebo kloubní bolest není v pořádku.</p></div></div>
      <div class="trainingPrinciple"><span>${lineIcon('adjust')}</span><div><h3>Přizpůsob si cvik</h3><p>Zmenši rozsah nebo zvol lehčí variantu.</p></div></div>
    </div>
    <aside class="trainingSafety">${lineIcon('shield')}<div><strong>Cvič bezpečně</strong><p>Při ostré nebo neobvyklé bolesti cvik přeruš. Při zdravotních potížích se poraď s lékařem nebo fyzioterapeutem.</p></div></aside>
  </section>
  </div>`;
  scrollTop();
}
function home(){
  setAppView('home');
  lastMode='home';setNav('home');
  const s=statsData(),programComplete=isProgramComplete(),n=nextDayIndex(),day=data.days[n],doneN=countDone(n),totalN=day.items.length,p=pct(n),lm=latestMeasurement(),ln=latestNote();
  app.innerHTML=`<div class="v22Home">
    <section class="v22HeroPanel">
      <div class="helloRow"><div><p class="eyebrow">${programComplete?'30denní program':'Dnes'}</p><h2>${programComplete?'Program dokončen':'Pokračuj v tréninku'}</h2></div><div class="streakBadge">🔥 ${streak()} dní</div></div>
      <div class="todayCompact v22TodayCompact">
        <div class="ring" style="--val:${p*3.6}deg"><span>${p}%</span></div>
        <div><h3>${day.title}</h3><p class="muted">${programWeekHint(n)}</p><div class="miniMeta"><b>${doneN}/${totalN}</b> cviků • ${lm?`pas ${fmtNum(lm.waist)} cm`:'měření zatím není'}</div><div class="progress"><div class="bar" style="width:${p}%"></div></div></div>
      </div>
      <button class="primary cta" data-action="${programComplete?'days':'start-auto'}"${programComplete?'':` data-day="${n}"`}>${programComplete?'Zobrazit dokončený plán':'▶ Cvič se mnou'}</button>
      <div class="compactActions v22Actions"><button data-action="day" data-day="${n}">♙ Ruční režim</button><button data-action="calendar">▣ Kalendář</button><button data-action="progress">▥ Měření</button></div>
    </section>
    <aside class="v22SidePanels">
      <section class="v22InfoCard"><h3>💡 Tip pro dnešek</h3><p>${coachHint()}<br>Důležitá je pravidelnost.</p>${ln?.text?`<small>Poslední poznámka: ${esc(ln.text)}</small>`:''}</section>
      <section class="v22InfoCard v22Areas"><h3>Zaměřené oblasti</h3><img src="assets/exercises/day1_muscles.jpg" alt="Zaměřené oblasti"><div><span><i></i>Hlavní svaly</span><span><i class="secondary"></i>Vedlejší svaly</span></div></section>
    </aside>
    <section class="v22DayExercises"><div class="topLine"><h2>Cviky dne</h2><button data-action="days">Celý plán</button></div><div class="libraryGrid v22ExerciseGrid">${resolvedDayItems(n).map(([k,dose],i)=>exCard(k,dose,n,i)).join('')}</div></section>
  </div>`;
  scrollTop();
}

function onboardingStepIndicator(step){
  return `<div class="onboardingProgress" aria-label="Krok ${step} ze 3"><span>${step} z 3</span><div aria-hidden="true">${[1,2,3].map(value=>`<i class="${value===step?'active':''}"></i>`).join('')}</div></div>`;
}
function onboardingDifficultyOptions(selected){
  const descriptions={
    easy:['Pozvolnější start · 2 série','Pro pozvolnější začátek nebo návrat ke cvičení.'],
    medium:['3 série','Plnohodnotný trénink s rozumnou výzvou.'],
    hard:['Větší výzva · 3 série','Pro zkušenější a pro větší výzvu.']
  };
  return DIFFICULTY_VALUES.map(value=>{
    const [meta,copy]=descriptions[value];
    const isSelected=value===selected;
    return `<button class="onboardingDifficulty ${isSelected?'selected':''}" data-action="onboarding-select" data-difficulty="${value}" role="radio" aria-checked="${isSelected}"><span class="onboardingDifficultyTitle"><b>${difficultyLabel(value)}</b>${value==='medium'?'<em>Doporučená</em>':''}</span><strong>${meta}</strong><small>${copy}</small></button>`;
  }).join('');
}
function renderOnboarding(step=1,opts={}){
  const safeStep=Math.max(1,Math.min(3,Number(step)||1));
  if(!onboardingSession){
    const hasProgress=hasLegacyProgramData();
    onboardingSession={manual:Boolean(opts.manual),required:Boolean(opts.required),hasProgress,selected:getProgramDifficulty()||'medium'};
  }
  onboardingSession.selected=validDifficulty(onboardingSession.selected)||getProgramDifficulty()||'medium';
  if(!opts.skipRoute){
    setAppView('onboarding',{
      step:safeStep,
      manual:onboardingSession.manual,
      required:onboardingSession.required,
      hasProgress:onboardingSession.hasProgress,
      selected:onboardingSession.selected
    },{replace:Boolean(opts.replaceRoute)});
  }
  lastMode='onboarding';setNav('days');
  const close=onboardingSession.manual?'<button class="onboardingClose" data-action="history-back" aria-label="Zavřít průvodce">Zavřít</button>':'';
  let content='';
  if(safeStep===1){
    content=`<div class="onboardingWelcome"><img src="Pilates%20Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt="Moovka"><h1>Vítej v Moovce</h1><p class="onboardingLead">30 dní pohybu pro pevnější tělo, lepší kondici<br class="wideOnly"> a dobrý pocit ze cvičení.</p><p>Cvičíš svým tempem a obtížnost můžeš kdykoliv změnit.</p><button class="primary onboardingPrimary" data-action="onboarding-next" data-step="2">Začít</button></div>`;
  }else if(safeStep===2){
    content=`<div class="onboardingChoice"><p class="eyebrow">30denní program</p><h1>Jak chceš začít?</h1><p class="onboardingChoiceHelp">Vyber si obtížnost, která ti bude nejvíc vyhovovat.</p><div class="onboardingDifficultyList" role="radiogroup" aria-label="Obtížnost programu">${onboardingDifficultyOptions(onboardingSession.selected)}</div><p class="onboardingHint">Nevíš? Začni Střední. Kdykoliv můžeš přepnout.</p><button class="primary onboardingPrimary" data-action="onboarding-next" data-step="3">Pokračovat</button></div>`;
  }else{
    const existing=onboardingSession.manual||onboardingSession.hasProgress;
    content=`<div class="onboardingDone"><p class="eyebrow">Hotovo</p><h1>Máš všechno nastavené</h1><div class="onboardingSelectedDifficulty"><span>Tvoje obtížnost</span><strong>${difficultyLabel(onboardingSession.selected)}</strong><small>${difficultySets(onboardingSession.selected)} série</small></div><p class="onboardingDoneHint">Obtížnost můžeš kdykoliv změnit v Plánu.</p><div class="onboardingActions"><button class="primary onboardingPrimary" data-action="onboarding-complete-primary">${existing?'Pokračovat v programu':'Začít program'}</button><button class="onboardingSecondary" data-action="onboarding-complete-plan">Prohlédnout plán</button></div></div>`;
  }
  app.innerHTML=`<section class="onboardingScreen" aria-labelledby="onboardingTitle"><div class="onboardingTop">${onboardingStepIndicator(safeStep)}${close}</div>${content}</section>`;
  const heading=app.querySelector('.onboardingScreen h1');
  if(heading)heading.id='onboardingTitle';
  scrollTop();
}
function startOnboarding(manual=false){
  const hasProgress=hasLegacyProgramData();
  onboardingSession={manual:Boolean(manual),required:!manual&&!hasProgress,hasProgress,selected:getProgramDifficulty()||'medium'};
  renderOnboarding(1);
}
function maybeStartRequiredOnboarding(){
  if(!shouldStartRequiredOnboarding())return false;
  startOnboarding(false);
  return true;
}
function completeOnboarding(destination){
  if(!onboardingSession)return;
  const session={...onboardingSession};
  if(!setProgramDifficulty(session.selected))return;
  localStorage.setItem(ONBOARDING_COMPLETED_KEY,'1');
  onboardingSession=null;
  if(destination==='plan')return days();
  if(session.hasProgress)return day(nextDayIndex());
  return startTraining(0,true);
}
function difficultyOptionButtons(next,dayIndex){
  return DIFFICULTY_VALUES.map(value=>{
    const cfg=difficultyConfig(value);
    const description=value==='easy'?'Pozvolnější start · 2 série':value==='medium'?'Doporučená · 3 série':'Větší výzva · 3 série';
    return `<button class="difficultyOption ${value==='medium'?'recommended':''}" data-action="choose-difficulty" data-difficulty="${value}" data-next="${next}" data-day="${dayIndex}"><span><b>${cfg.label}</b><small>${description}</small></span>${value==='medium'?'<em>Doporučujeme</em>':''}</button>`;
  }).join('');
}
function difficultyChooser(next='plan',dayIndex=0,opts={}){
  if(!opts.skipRoute)setAppView('difficulty',{next,day:dayIndex});
  lastMode='difficulty';setNav('days');
  app.innerHTML=`<section class="difficultyOnboarding" aria-labelledby="difficultyTitle">
    <p class="eyebrow">30denní program</p>
    <h2 id="difficultyTitle">Jak chceš začít?</h2>
    <div class="difficultyOptions">${difficultyOptionButtons(next,dayIndex)}</div>
    <p class="difficultyHint">Obtížnost můžeš kdykoliv změnit.</p>
  </section>`;
  scrollTop();
}
function difficultyControl(view,dayIndex=0){
  const current=effectiveProgramDifficulty();
  return `<details class="difficultyControl"><summary>Obtížnost: <b>${difficultyLabel(current)}</b><span aria-hidden="true">▾</span></summary><div class="difficultyMenu" role="group" aria-label="Změnit obtížnost">${DIFFICULTY_VALUES.map(value=>`<button class="${value===current?'selected':''}" data-action="set-difficulty" data-difficulty="${value}" data-view="${view}" data-day="${dayIndex}"><b>${difficultyLabel(value)}</b><small>${value==='easy'?'2 série':value==='medium'?'3 série · doporučená':'3 série'}</small></button>`).join('')}</div></details>`;
}
function difficultyMigrationNotice(){
  if(localStorage.getItem(DIFFICULTY_MIGRATION_NOTICE_KEY)!=='1')return '';
  localStorage.removeItem(DIFFICULTY_MIGRATION_NOTICE_KEY);
  return `<div class="difficultyMigrationNote"><b>Pokračuješ na Střední obtížnost.</b><span>Tvůj dosavadní pokrok zůstal zachovaný. Úroveň můžeš kdykoliv změnit.</span></div>`;
}

function days(){
  if(maybeStartRequiredOnboarding())return;
  if(!getProgramDifficulty())return difficultyChooser('plan');
  setAppView('plan');
  lastMode='days';setNav('days');
<<<<<<< Updated upstream
  const groups=[
    {title:'1. etapa · Rozjezd',from:0,to:7},
    {title:'2. etapa · Budujeme sílu',from:7,to:14},
    {title:'3. etapa · Posouváme se dál',from:14,to:21},
    {title:'4. etapa · Finále',from:21,to:30}
  ].map(group=>({...group,days:data.days.slice(group.from,group.to).map((d,index)=>({d,di:group.from+index}))}));
  app.innerHTML=`${difficultyMigrationNotice()}<section class="card planIntro"><div class="planDifficultyHead"><h2>Plán na 30 dní</h2>${difficultyControl('plan')}</div><p class="muted">Vyber den nebo pokračuj tam, kde máš rozcvičeno. Hotové dny se propisují do pokroku i kalendáře.</p><button class="primary cta" data-action="start-auto" data-day="${nextDayIndex()}">▶ Pokračovat v tréninku</button></section>
  ${groups.map(group=>{const active=group.days.filter(({d})=>d.items.length);return `<section class="card weekBlock"><div class="topLine stageHead"><h2>${group.title}</h2><span class="pill">${active.filter(({di})=>pct(di)===100).length}/${active.length} hotovo</span></div><div class="dayGrid">${group.days.map(({d,di})=>{const total=d.items.length,dn=countDone(di),pc=pct(di),rest=!total;return `<article class="dayCard ${pc===100&&total?'complete':''} ${rest?'restDay':''}" data-action="day" data-day="${di}"><div class="dayNum">${di+1}</div><div class="dayInfo"><h3>${d.title}</h3><p>${rest?'Regenerace':`Splněno ${dn} z ${total} cviků`}</p><div class="progress"><div class="bar" style="width:${rest?100:pc}%"></div></div></div><div class="dayState">${rest?'☁':pc===100?'✓':'›'}</div></article>`;}).join('')}</div></section>`;}).join('')}`;
=======
  const programComplete=isProgramComplete();
  const groups=[];
  data.days.forEach((d,di)=>{const wi=Math.floor(di/7);if(!groups[wi])groups[wi]=[];groups[wi].push({d,di});});
  app.innerHTML=`${difficultyMigrationNotice()}<section class="card planIntro"><div class="planDifficultyHead"><h2>Plán na 30 dní</h2>${difficultyControl('plan')}</div><p class="muted">${programComplete?'Program je dokončený. Výsledky v historii, kalendáři a měřeních zůstávají uložené.':'Vyber den nebo pokračuj tam, kde máš rozcvičeno. Hotové dny se propisují do pokroku i kalendáře.'}</p><button class="primary cta" data-action="${programComplete?'new-program-cycle':'start-auto'}"${programComplete?'':` data-day="${nextDayIndex()}"`}>${programComplete?'Začít nový 30denní cyklus':'▶ Pokračovat v tréninku'}</button></section>
  ${groups.map((g,wi)=>`<section class="card weekBlock"><div class="topLine"><h2>Týden ${wi+1}</h2><span class="pill">${g.filter(x=>x.d.items.length&&pct(x.di)===100).length}/6 hotovo</span></div><div class="dayGrid">${g.map(({d,di})=>{const total=d.items.length,dn=countDone(di),pc=pct(di),rest=!total;return `<article class="dayCard ${pc===100&&total?'complete':''} ${rest?'restDay':''}" data-action="day" data-day="${di}"><div class="dayNum">${di+1}</div><div class="dayInfo"><h3>${d.title}</h3><p>${rest?'Regenerace':`Splněno ${dn} z ${total} cviků`}</p><div class="progress"><div class="bar" style="width:${rest?100:pc}%"></div></div></div><div class="dayState">${rest?'☁':pc===100?'✓':'›'}</div></article>`;}).join('')}</div></section>`).join('')}`;
>>>>>>> Stashed changes
  scrollTop();
}

const baseDayEquipment=['Podložka'];
const equipmentLabels={
  dumbbells:'Činky',
  long_band:'Dlouhá odporová guma',
  mini_band:'Odporová guma',
  pilates_ball:'Malý pilates míč'
};
function dayEquipment(items){
  const gear=new Set(baseDayEquipment);
  items.forEach(([k])=>{
    const exercise=data.exercises[k];
    (exercise?.equipment||[]).forEach(item=>gear.add(equipmentLabels[item]||item));
  });
  return [...gear];
}
function dayEquipmentSection(items){
  const gear=dayEquipment(items);
  return `<section class="card dayEquipmentCard"><h2>PŘIPRAV SI</h2><div class="dayEquipmentList">${gear.map(item=>`<span>${item}</span>`).join('')}</div></section>`;
}
function dayEquipmentInline(items){
  const gear=dayEquipment(items);
  return `<div class="dayEquipmentInline"><p class="eyebrow">PŘIPRAV SI</p><div class="dayEquipmentList">${gear.map(item=>`<span>${esc(item)}</span>`).join('')}</div></div>`;
}
function dayInfoGrid(di,items){
  return `<div class="dayInfoGrid"><div class="dayInfoLeft">${daySummary(di)}${difficultyControl('day',di)}</div><div class="dayInfoRight">${dayEquipmentInline(items)}</div></div>`;
}
function day(di,opts={}){
  if(maybeStartRequiredOnboarding())return;
  if(!getProgramDifficulty())return difficultyChooser('day',di);
  setAppView('day',{day:di},{replace:Boolean(opts.replaceRoute)});
  lastMode='day';setNav('days');currentDay=di;
  const day=data.days[di];
  const selectedItems=resolvedDayItems(di);
  const stretch=resolvedDayStretch(di);
  const equipmentItems=stretch?[...selectedItems,stretch]:selectedItems;
  app.innerHTML=`${difficultyMigrationNotice()}<section class="dashboardHero dayHero">
    <div class="topLine"><button data-action="home">&larr; Domů</button><span class="pill">${countDone(di)}/${day.items.length||0} hotovo</span></div>
    <h2>${day.title}</h2><p class="muted">${day.note}</p>
    ${dayInfoGrid(di,equipmentItems)}
    <div class="progress"><div class="bar" style="width:${pct(di)}%"></div></div>
    ${day.items.length?`<button class="primary cta" data-action="start-auto" data-day="${di}">▶ Cvič se mnou</button><div class="compactActions"><button data-action="start" data-day="${di}">Ruční režim</button><button data-action="reset-day" data-day="${di}">Vynulovat den</button></div>`:'<p class="muted">Dnes volno.</p>'}
  </section>
  <section class="card"><h2>Cviky dne</h2><div class="libraryGrid v22ExerciseGrid">${selectedItems.map(([k,dose],i)=>exCard(k,dose,di,i)).join('')}</div></section>
  ${stretch?`<section class="card finalStretchCard"><div class="finalStretchHead"><span>ZÁVĚREČNÉ PROTAŽENÍ</span><small>po ${difficultySets()}. sérii, jednou</small></div><div class="libraryGrid v22ExerciseGrid finalStretchGrid">${exCard(stretch[0],stretch[1],di,day.items.length)}</div></section>`:''}`;
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
const alternatingExerciseIds=new Set(['bird','bird_hold','deadbug','deadbug_hold','toetap','toetap_slow','tap','bicycle','scissors']);
function isAlternatingExercise(k,dose=''){
  return alternatingExerciseIds.has(k) || /střídavě/i.test(String(dose||''));
}
function alternatingLabel(k,dose=''){
  return isAlternatingExercise(k,dose) ? 'Střídej pravou a levou stranu' : '';
}
function isSideDose(dose){return sideInfo(dose).side;}
function currentSideLabel(info){
  if(!info?.side)return '';
  if(workoutPhase==='left')return 'Pravá strana';
  if(workoutPhase==='right'||workoutPhase==='switch')return 'Levá strana';
  return '';
}
function workoutMovementLabel(k,dose,info){
  return alternatingLabel(k,dose) || currentSideLabel(info);
}
function oppositeSideLabel(label){
  return label.includes('Levá') ? 'Pravá strana' : 'Levá strana';
}
function sideContinueText(label){
  return label.includes('Pravá') ? 'pravou stranou' : 'levou stranou';
}
function dayStretch(di=currentDay){
  const stretch=data.days?.[di]?.stretch;
  return Array.isArray(stretch) && stretch[0] && data.exercises[stretch[0]] ? stretch : null;
}
function currentWorkoutEntry(){
  if(workoutFinalStretch){
    return workoutContext?.stretch || resolvedDayStretch(currentDay,workoutContext?.difficulty) || [];
  }
  return workoutContext?.items?.[currentExercise] || resolvedDayItems(currentDay,workoutContext?.difficulty)[currentExercise] || [];
}
function finishWorkoutDay(){
  data.days[currentDay].items.forEach((_,i)=>setDone(currentDay,i));
  currentExercise=Math.max(0,data.days[currentDay].items.length-1);
  clearInterval(timer);
  workoutRunning=false;
  workoutPaused=false;
  clearWorkoutHistoryGuard();
  workoutCurrentSet=1;
  workoutFinalStretch=false;
  void releaseWorkoutWakeLock();
  cue('complete');
  doneNext(false);
  workoutContext=null;
}
function beginFinalStretch(){
  if(!(workoutContext?.stretch||resolvedDayStretch(currentDay,workoutContext?.difficulty))){
    finishWorkoutDay();
    return;
  }
  workoutFinalStretch=true;
  currentExercise=0;
  beginCurrentExercise();
}
function phaseSideText(){
  const [k,dose]=currentWorkoutEntry();
  const label=workoutMovementLabel(k,dose,sideInfo(dose));
  if(label)return label;
  if(workoutPhase==='switch')return 'Změň stranu';
  return '';
}
function beginCurrentExercise(){
  // Při vstupu do dalšího cviku vždy zastavit starý odpočet.
  clearInterval(timer);
  workoutRunning=true;
  workoutPaused=false;
  workoutPhase='prep';
  workoutLeft=WORKOUT_PREP_SECONDS;
  startWorkoutTimer(true);
}
function shouldRunWorkoutTimer(){
  const dose=currentWorkoutEntry()?.[1]||'';
  const info=sideInfo(dose);
  return ['prep','switch','roundRest'].includes(workoutPhase) || (info.timed && ['left','right','work'].includes(workoutPhase));
}
function openCurrentTraining(){
  void unlockAudio();
  if(workoutRunning){
    const resumeTimer=workoutPausedByDetail;
    workoutPausedByDetail=false;
    if(resumeTimer)workoutPaused=false;
    showAutoTrain();
    void requestWorkoutWakeLock();
    if(resumeTimer&&shouldRunWorkoutTimer()){
      clearInterval(timer);
      timer=setInterval(tickAuto,1000);
    }
    return;
  }
  if(isProgramComplete())return days();
  return startTraining(nextDayIndex(),true);
}
function startTraining(di,auto=true){
  if(maybeStartRequiredOnboarding())return;
  if(!getProgramDifficulty())return difficultyChooser('workout',di);
  void unlockAudio();
  // v54/texty8: sjednocený trénink. Už nepoužíváme zvláštní ruční režim.
  clearInterval(timer);
  clearWorkoutHistoryGuard();
  setAppView('workout',{day:di});
  workoutAuto=true;
  workoutRunning=true;
  workoutPaused=false;
  workoutCurrentSet=1;
  workoutContext=createWorkoutContext(di);
  workoutTotalSets=workoutContext.totalSets;
  workoutFinalStretch=false;
  lastMode='train';
  setNav('train');
  currentDay=di;
  currentExercise=0;
  beginCurrentExercise();
  void requestWorkoutWakeLock();
}

function timerCircleStyle(){
  const [k,dose]=currentWorkoutEntry();
  const info=sideInfo(dose);
  let total=workoutPhase==='prep'?WORKOUT_PREP_SECONDS:workoutPhase==='switch'?WORKOUT_SWITCH_SECONDS:(workoutPhase==='roundRest'||workoutPhase==='rest')?WORKOUT_SERIES_REST_SECONDS:(info.timed?info.seconds:workSeconds(dose));
  if(total<=0)return 'var(--p2)';
  const deg=360-(Math.max(0,workoutLeft)/Math.max(1,total))*360;
  return `conic-gradient(var(--p) ${deg}deg, var(--p2) ${deg}deg)`;
}
function formatCountdown(seconds){
  const s=Math.max(0,Number(seconds)||0);
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
function phaseLabel(){
  const [k,dose]=currentWorkoutEntry();
  const info=sideInfo(dose);
  if(workoutFinalStretch) return 'Z\u00c1V\u011aRE\u010cN\u00c9 PROTA\u017dEN\u00cd';
  if(workoutPhase==='prep') return 'Připrav se';
  if(isAlternatingExercise(k,dose) && ['work','left','right','switch'].includes(workoutPhase)) return 'Střídavě';
  if(workoutPhase==='switch') return 'Změň stranu';
  if(workoutPhase==='roundRest') return 'Odpočinek';
  if(workoutPhase==='confirm') return 'Dokonči cvik';
  if(workoutPhase==='left'||workoutPhase==='right') return currentSideLabel(info);
  if(workoutPhase==='work' && !info.timed) return 'Cvič';
  return 'Cvič';
}
function prettyDose(dose){
  const info=sideInfo(dose);
  if(info.side && info.timed)return `${info.seconds} sekund / strana`;
  if(info.side && !info.timed)return `${info.left}/${info.right} opakování`;
  if(info.timed)return `${info.seconds} sekund`;
  return String(dose||'');
}
function workoutDoseLabel(dose){
  const info=sideInfo(dose);
  if(info.side&&info.timed)return `${info.seconds} s / strana`;
  if(info.side&&!info.timed)return `${info.left}/${info.right}`;
  if(info.timed)return `${info.seconds} s`;
  return String(dose||'').replace(/\s+střídavě$/i,'');
}
function currentInstruction(ex,dose){
  if(workoutFinalStretch && workoutPhase==='prep')return 'P\u0159iprav z\u00e1v\u011bre\u010dn\u00e9 prota\u017een\u00ed.';
  if(workoutFinalStretch && ['work','left','right'].includes(workoutPhase))return 'Uvolni se a d\u00fdchej.';
  if(workoutPhase==='prep')return 'Připrav pozici.';
  if(workoutPhase==='switch')return isAlternatingExercise(Object.keys(data.exercises).find(id=>data.exercises[id]===ex),dose) ? 'Střídej pravou a levou stranu.' : 'Změň stranu.';
  if(workoutPhase==='roundRest'||workoutPhase==='rest')return 'Další kolo za chvíli.';
  if(workoutPhase==='confirm')return 'Dokonči cvik a pokračuj.';
  const info=sideInfo(dose);
  const k=Object.keys(data.exercises).find(id=>data.exercises[id]===ex);
  if(isAlternatingExercise(k,dose))return 'Střídej pravou a levou stranu.';
  if(info.side && (workoutPhase==='left'||workoutPhase==='right'))return `${currentSideLabel(info)}.`;
  return '';
}
function setProgressText(){return `Série ${workoutCurrentSet} ze ${workoutTotalSets} • Cvik ${currentExercise+1}/${data.days[currentDay].items.length}`;}
function showSeriesRest(){
  const dayObj=data.days[currentDay];
  const completedSet=Math.max(1,workoutCurrentSet-1);
  const progress=Math.min(100, Math.round((completedSet*dayObj.items.length/Math.max(1,dayObj.items.length*workoutTotalSets))*100));
  const restProgress=Math.max(0,Math.min(100,(workoutLeft/WORKOUT_SERIES_REST_SECONDS)*100));
  renderTrainingScreen(`<section class="card fullTrain autoTrain v50Train v53CleanTrain seriesRestScreen workoutTransitionScreen" data-current-day="${currentDay}" data-current-index="${currentExercise}">
    <div class="trainTop2 trainTop2--compact"><span class="dose">Den ${currentDay+1} \u2022 Pauza mezi s\u00e9riemi</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <div class="workoutTransitionState" role="status" aria-live="polite">
      <div class="workoutBrandMark" aria-hidden="true"><img src="Pilates Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt=""></div>
      <p class="workoutTransitionEyebrow">S\u00e9rie ${completedSet} dokon\u010dena</p>
      <h2>Kr\u00e1tk\u00fd odpo\u010dinek</h2>
      <strong class="workoutTransitionCountdown" id="autoTimer">${formatCountdown(workoutLeft)}</strong>
      <div class="workoutTransitionProgress" aria-hidden="true"><i id="workoutTransitionProgress" style="width:${restProgress}%"></i></div>
      <small>N\u00e1sleduje: S\u00e9rie ${workoutCurrentSet} ze ${workoutTotalSets}</small>
    </div>
    <div class="row trainControls"><button class="primary" data-action="toggle-auto">${lineIcon(workoutPaused?'play':'pause')}${workoutPaused?'Pokra\u010dovat':'Pauza'}</button><button data-action="skip-auto">${lineIcon('skip')}P\u0159esko\u010dit</button><button class="trainStopBtn" data-action="stop-auto">${lineIcon('stop')}Ukon\u010dit</button></div>
  </section>`);
  scrollTop();
}
function showAutoTrain(opts={}){
  const dayObj=data.days[currentDay];
  if(!dayObj.items.length){day(currentDay);return;}
  if(workoutPhase==='roundRest')return showSeriesRest();
  const [k,dose]=currentWorkoutEntry(),ex=data.exercises[k],info=sideInfo(dose);
  if(!ex){day(currentDay);return;}
  const totalItems=dayObj.items.length*workoutTotalSets;
  const doneItems=workoutFinalStretch ? totalItems : (workoutCurrentSet-1)*dayObj.items.length + currentExercise;
  const progress=Math.min(100, Math.round((doneItems/Math.max(1,totalItems))*100));
  const isSideSwitch = !workoutFinalStretch && info.side && !isAlternatingExercise(k,dose) && workoutPhase==='switch';
  const isTimedActive = ['prep','switch','roundRest'].includes(workoutPhase) || (info.timed && ['left','right','work'].includes(workoutPhase));
  const isConfirm = workoutPhase==='confirm';
  const isRepWork = !info.timed && ['work','left','right'].includes(workoutPhase);
  const sideLabel=workoutFinalStretch ? '' : workoutMovementLabel(k,dose,info);
  const statusShowsCurrentSide=!workoutFinalStretch && !isAlternatingExercise(k,dose) && ['left','right'].includes(workoutPhase);
  const sideSlotText=(!workoutFinalStretch && !isAlternatingExercise(k,dose) && workoutPhase==='switch' && Date.now()<sideNoticeUntil)
    ? `✓ ${sideNoticeDone||'Strana'} hotová · Pokračujeme ${sideContinueText(sideNoticeNext)}.`
    : (!statusShowsCurrentSide && sideLabel&&(['left','right'].includes(workoutPhase)||isAlternatingExercise(k,dose)) ? sideLabel : '');
  const doseLabel=workoutDoseLabel(dose||ex.dose);
  const doseClass=doseLabel.length>7?' compactWorkoutDose--long':'';
  const phaseText=phaseLabel();
  const hasTimerLayout=isTimedActive || workoutPhase==='roundRest';
  const seriesLabel=workoutFinalStretch ? 'Z\u00c1V\u011aRE\u010cN\u00c9 PROTA\u017dEN\u00cd' : `S\u00e9rie ${workoutCurrentSet} ze ${workoutTotalSets}`;
  const statusLabel=workoutPaused ? 'Pauza' : (workoutFinalStretch ? 'Z\u00c1V\u011aRE\u010cN\u00c9 PROTA\u017dEN\u00cd' : (workoutPhase==='switch'&&sideSlotText ? sideSlotText : (statusShowsCurrentSide ? sideLabel : (sideSlotText || (workoutPhase==='work'&&!info.timed ? seriesLabel : phaseText)))));
  const timerContent=`<div class="restBlock compactTimer"><div class="timerCircle restOnly" style="background:${timerCircleStyle()}"><span id="autoTimer">${workoutLeft}</span></div></div>`;
  const workoutHeaderClass=`workoutHeaderPanel ${hasTimerLayout?'workoutHeaderPanel--timed':'workoutHeaderPanel--center'}`;
  const statusHtml=(workoutPhase==='prep'&&!workoutPaused) ? '' : `<div class="workoutPhaseText">${statusLabel}</div>`;
  const workoutHeaderHtml=isSideSwitch
    ? `<div class="workoutHeaderText"><h2 class="trainName">${ex.name}</h2><div class="trainDose compactWorkoutDose${doseClass}">${doseLabel}</div><div class="workoutPhaseText">${seriesLabel}</div></div>`
    : hasTimerLayout
    ? `<div class="workoutHeaderText"><h2 class="trainName">${ex.name}</h2><div class="trainDose compactWorkoutDose${doseClass}">${doseLabel}</div>${statusHtml}</div><div class="workoutTimerSlot">${timerContent}</div>`
    : `<div class="workoutHeaderText"><h2 class="trainName">${ex.name}</h2><div class="trainDose compactWorkoutDose${doseClass}">${doseLabel}</div><div class="workoutPhaseText">${seriesLabel}</div></div>`;
  const showSkip=(workoutPhase==='roundRest'||workoutPhase==='switch'||workoutPhase==='prep'||(workoutFinalStretch&&isTimedActive&&!isConfirm));
  const controlsHtml=`${(isRepWork)||isConfirm?`<button class="primary doneRoundBtn" data-action="set-complete-auto">${lineIcon('quality')}Dokon\u010deno</button>`:`<button class="primary" data-action="toggle-auto">${lineIcon(workoutPaused?'play':'pause')}${workoutPaused?'Pokra\u010dovat':'Pauza'}</button>${showSkip?`<button data-action="skip-auto">${lineIcon('skip')}P\u0159esko\u010dit</button>`:''}`}<button class="trainStopBtn" data-action="stop-auto">${lineIcon('stop')}Ukon\u010dit</button><button data-action="info" data-ex="${k}">${lineIcon('info')}Detail cviku</button>`;
  const existing=document.querySelector('.autoTrain');
  const canPatchExisting=existing && !opts.resetScroll && existing.dataset.currentExercise===k && Number(existing.dataset.currentDay)===currentDay && Number(existing.dataset.currentIndex)===currentExercise && existing.dataset.finalStretch===(workoutFinalStretch?'1':'0') && (existing.dataset.workoutPhase==='switch')===(workoutPhase==='switch');
  if(canPatchExisting){
    existing.dataset.workoutPhase=workoutPhase;
    const bar=existing.querySelector('.progress .bar'); if(bar)bar.style.width=`${progress}%`;
    const headerPanel=existing.querySelector('.workoutHeaderPanel');
    if(headerPanel){
      headerPanel.className=workoutHeaderClass;
      headerPanel.innerHTML=workoutHeaderHtml;
    }
    const controls=existing.querySelector('.trainControls'); if(controls)controls.innerHTML=controlsHtml;
    return;
  }
  const imgClass='bigimg';
  const topLabel=workoutFinalStretch
    ? `<strong>ZÁVĚREČNÉ PROTAŽENÍ</strong><small>Den ${currentDay+1} • ${workoutTotalSets} s\u00e9rie dokon\u010den\u00e9</small>`
    : `<small>Den ${currentDay+1} • S\u00e9rie ${workoutCurrentSet} ze ${workoutTotalSets}</small>`;
  const switchDetail=sideNoticeNext ? `${ex.name} \u2022 ${sideNoticeNext.toLowerCase()}` : ex.name;
  const workoutVisualHtml=isSideSwitch
    ? `<div class="workoutTransitionState sideSwitchState" role="status" aria-live="polite">
        <div class="workoutBrandMark" aria-hidden="true"><img src="Pilates Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt=""></div>
        <p class="workoutTransitionEyebrow">Druh\u00e1 strana</p>
        <h2>P\u0159iprav se na druhou stranu</h2>
        <strong class="workoutTransitionCountdown" id="autoTimer">${workoutLeft}</strong>
        <div class="workoutTransitionProgress" aria-hidden="true"><i id="workoutTransitionProgress" style="width:${Math.max(0,Math.min(100,(workoutLeft/WORKOUT_SWITCH_SECONDS)*100))}%"></i></div>
        <small>${switchDetail}</small>
      </div>`
    : `<div class="trainImageSlot">${img(k,imgClass,'data-action="info" data-ex="'+k+'"')}</div>`;
  renderTrainingScreen(`<section class="card fullTrain autoTrain v50Train v53CleanTrain" data-current-exercise="${esc(k)}" data-current-day="${currentDay}" data-current-index="${currentExercise}" data-workout-phase="${workoutPhase}" data-final-stretch="${workoutFinalStretch?'1':'0'}">
    <div class="trainTop2 trainTop2--compact"><span class="dose trainProgressLabel">${topLabel}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <div class="${workoutHeaderClass}" aria-label="Stav cviku">${workoutHeaderHtml}</div>
    ${workoutVisualHtml}
    <div class="row trainControls">${controlsHtml}</div>
  </section>`);
  if(opts.resetScroll)scrollTop();
}
function tickAuto(){
  if(workoutPaused)return;
  workoutLeft--;
  if(workoutLeft<=3&&workoutLeft>0)beep(760,130);
  if(workoutLeft<=0){
    if(workoutPhase==='roundRest')cue('go');
    else if(!workoutFinalStretch&&(workoutPhase==='work'||workoutPhase==='right'))cue('done');
    advanceAutoPhase();
    return;
  }
  const el=document.getElementById('autoTimer'); if(el)el.textContent=workoutPhase==='roundRest'?formatCountdown(workoutLeft):workoutLeft;
  const circle=document.querySelector('.timerCircle'); if(circle)circle.style.background=timerCircleStyle();
  const transitionLine=document.getElementById('workoutTransitionProgress');
  if(transitionLine){
    const total=workoutPhase==='switch' ? WORKOUT_SWITCH_SECONDS : workoutPhase==='roundRest' ? WORKOUT_SERIES_REST_SECONDS : 1;
    transitionLine.style.width=`${Math.max(0,Math.min(100,(workoutLeft/total)*100))}%`;
  }
}
function startWorkoutTimer(resetScroll=false){
  clearInterval(timer);
  if(['left','right','work'].includes(workoutPhase))cue('go');
  if(workoutPhase==='switch')cue('switch');
  timer=setInterval(tickAuto,1000);
  showAutoTrain({resetScroll});
}
function startNextExerciseOrRound(){
  if(workoutTransitionLock)return;
  workoutTransitionLock=true;
  setTimeout(()=>{workoutTransitionLock=false;},300);
  if(workoutFinalStretch){
    finishWorkoutDay();
    return;
  }
  const max=(workoutContext?.items?.length||data.days[currentDay].items.length)-1;
  // Serie/kolo: nejdriv vsechny hlavni cviky, potom dalsi kolo.
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
    workoutLeft=WORKOUT_SERIES_REST_SECONDS;
    startWorkoutTimer();
    return;
  }
  if(workoutContext?.stretch||resolvedDayStretch(currentDay,workoutContext?.difficulty)){
    beginFinalStretch();
    return;
  }
  finishWorkoutDay();
}
function nextExerciseOrFinish(){startNextExerciseOrRound();}
function completeOneSet(){startNextExerciseOrRound();}
function advanceAutoPhase(){
  const [k,dose]=currentWorkoutEntry();
  const info=sideInfo(dose);
  if(workoutPhase==='prep'){
    workoutPhase=info.side?'left':'work';
    workoutLeft=info.seconds||workSeconds(dose);
    if(info.timed){
      startWorkoutTimer();
    }else{
      clearInterval(timer);
      showAutoTrain();
    }
    return;
  }
  if(workoutPhase==='left'){
    sideNoticeDone=currentSideLabel(info);
    sideNoticeNext=oppositeSideLabel(sideNoticeDone);
    sideNoticeUntil=Date.now()+1100;
    workoutPhase='switch'; workoutLeft=WORKOUT_SWITCH_SECONDS; startWorkoutTimer();
    setTimeout(()=>{if(workoutRunning&&workoutPhase==='switch'&&document.querySelector('.autoTrain'))showAutoTrain();},1100);
    return;
  }
  if(workoutPhase==='switch'){
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
  if(workoutPhase==='right' || workoutPhase==='work'){
    if(info.timed){
      if(workoutFinalStretch){
        finishWorkoutDay();
        return;
      }
      clearInterval(timer);
      completeOneSet();
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
    const dose=currentWorkoutEntry()[1],info=sideInfo(dose);
    workoutPhase=info.side?'left':'work'; workoutLeft=info.seconds||workSeconds(dose);
    if(info.timed){
      startWorkoutTimer();
    }else{
      clearInterval(timer);
      showAutoTrain();
    }
    return;
  }
  if(workoutPhase==='switch'){
    const dose=currentWorkoutEntry()[1],info=sideInfo(dose);
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
  if(workoutFinalStretch && ['work','left','right','confirm'].includes(workoutPhase)){
    finishWorkoutDay();
    return;
  }
  // B?hem samotn?ho cvi?en? u? tla??tko nep?eskakuje cvik.
  return;
}




function showTrain(){
  clearInterval(timer);
  const items=workoutContext?.items||resolvedDayItems(currentDay,workoutContext?.difficulty);
  if(!items.length){day(currentDay);return;}
  const [k,dose]=items[currentExercise],ex=data.exercises[k];
  const progress=Math.round((((workoutCurrentSet-1)*items.length + currentExercise)/(workoutTotalSets*items.length))*100);
  const imgClass='bigimg';
  renderTrainingScreen(`<section class="card fullTrain v53CleanTrain" data-current-exercise="${esc(k)}" data-current-day="${currentDay}" data-current-index="${currentExercise}">
    <div class="trainTop2"><button data-action="day" data-day="${currentDay}">← Den</button><span class="dose">Den ${currentDay+1} • Série ${workoutCurrentSet} ze ${workoutTotalSets}</span></div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
    <h2 class="trainName">${ex.name}</h2>
    <div class="trainDose">${prettyDose(dose||ex.dose)}</div>
    <div class="trainImageSlot">${img(k,imgClass,'data-action="info" data-ex="'+k+'"')}</div>
    <button class="primary doneBtn" data-action="set-complete-manual">✓ Dokončeno</button>
    <div class="row trainControls"><button data-action="prev">← Zpět</button>${isTimedDose(dose)?`<button data-action="rest">Pauza ${restSeconds(k,dose)} s</button>`:''}<button data-action="info" data-ex="${k}">Detail cviku</button></div>
  </section>`);
  scrollTop();
}
function restScreen(){
  const [k,dose]=currentWorkoutEntry();
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
  setWorkoutHeaderPosition(false);
  if(mark)setDone(currentDay,currentExercise);
  const max=data.days[currentDay].items.length-1;
  if(currentExercise<max){currentExercise++;showTrain();return;}
  const completedItems=workoutContext?.items||resolvedDayItems(currentDay);
  const dayTitle=data.days[currentDay].title.replace(/^Den\s+\d+\s*•\s*/i,'');
  const completedCount=completedItems.length;
  const workoutStartedAt=Number(workoutContext?.startedAt);
  const elapsedMinutes=workoutStartedAt>0 ? Math.max(1,Math.round((Date.now()-workoutStartedAt)/60000)) : null;
  app.innerHTML=`<section class="finishExperience">
    <div class="finishHero">
      <img class="finishHeroImage" src="Pilates Assets/02_Exercise_Cards/Mermaid Stretch/mermaid_stretch_start_v01.png" alt="Z\u00e1v\u011bre\u010dn\u00e9 prota\u017een\u00ed Mermaid Stretch">
      <div class="finishBrandMark" aria-hidden="true"><img src="Pilates Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt=""></div>
      <div class="finishCompleteBadge">Den ${currentDay+1} dokon\u010den <span class="finishCompleteCheck">${lineIcon('quality')}</span></div>
      <div class="finishHeroCopy">
        <p>Skv\u011bl\u00e1 pr\u00e1ce!</p>
        <h2>M\u00e1\u0161<br>hotovo!</h2>
        <span>Dne\u0161n\u00ed tr\u00e9nink<br>je za tebou.</span>
      </div>
      <div class="finishWave" aria-hidden="true"><svg viewBox="0 0 760 92" preserveAspectRatio="none"><path class="finishWaveFill" d="M-12 58C145 8 282 4 430 40c111 27 205 53 342 21v38H-12Z"/><path class="finishWaveCoral" d="M-15 53C137 3 279 1 431 37c116 27 205 52 344 18"/><path class="finishWaveTeal" d="M-15 66C143 16 284 12 432 47c115 27 204 48 343 15"/></svg></div>
    </div>
    <div class="finishContent">
      <p class="finishDayMeta">Den ${currentDay+1} \u2022 ${esc(dayTitle)}</p>
      <div class="finishSummary" aria-label="Souhrn tr\u00e9ninku">
        <div><b>${completedCount}</b><span>cvik\u016f</span></div>
        <div><b>${workoutTotalSets}</b><span>s\u00e9rie</span></div>
        ${elapsedMinutes!==null?`<div><b>${elapsedMinutes}</b><span>minut</span></div>`:''}
      </div>
      <div class="finishForm">
        <h3>Jak se ti dnes cvi\u010dilo?</h3>
        <div class="moodRow">
          <button data-action="select-mood" data-mood="good">Dob\u0159e</button>
          <button data-action="select-mood" data-mood="tough">N\u00e1ro\u010dn\u011bj\u0161\u00ed</button>
          <button data-action="select-mood" data-mood="pain">P\u0159\u00edli\u0161 n\u00e1ro\u010dn\u00e9</button>
        </div>
        <button class="finishNoteToggle" data-action="toggle-finish-note" aria-expanded="false"><span class="finishNoteToggleLabel">${lineIcon('note')}<span>+ P\u0159idat pozn\u00e1mku</span></span><span class="finishNoteChevron">${lineIcon('chevron')}</span></button>
        <div class="finishNoteField" hidden><textarea id="finish-note" placeholder="Co si chce\u0161 zapamatovat pro p\u0159\u00ed\u0161t\u011b?"></textarea></div>
      </div>
      <button class="primary finishSaveButton" data-action="save-workout-note"><span>Ulo\u017eit a dom\u016f</span>${lineIcon('chevron')}</button>
    </div>
  </section>`;
  workoutRunning=false;
  workoutContext=null;
  scrollTop();
}
function info(k,opts={}){
  setWorkoutHeaderPosition(false);
  if(!workoutRunning&&!opts.skipRoute)setAppView('exercise-detail',{exerciseId:k,day:currentDay,exercise:currentExercise},{replace:Boolean(opts.replaceRoute)});
  const ex=data.exercises[k], meta=exMeta(k);
  const steps=detailSteps(k,ex);
  const stretchPlanned=dayStretch(currentDay);
  const planned=(data.days[currentDay]?.items||[]).find(x=>x[0]===k) || (stretchPlanned&&stretchPlanned[0]===k?stretchPlanned:null);
  const dose=workoutRunning&&currentWorkoutEntry()[0]===k
    ? currentWorkoutEntry()[1]
    : resolveDose((planned&&planned[1])||ex.dose||'',effectiveProgramDifficulty());
  const doseInfo=sideInfo(dose);
  const doseUnit=doseInfo.timed ? (doseInfo.side?'na stranu':'') : (!isAlternatingExercise(k,dose) && !doseInfo.side && String(dose).match(/\d/) && !/opakování/i.test(String(dose)) ? 'opakování' : '');
  const detailMoveLabel=workoutRunning ? workoutMovementLabel(k,dose,doseInfo) : '';
  const detailSideLabel=detailMoveLabel ? `<div class="sidePlainText detailSideText">${detailMoveLabel}</div>` : '';
  const muscleClass = meta.area.includes('Hýždě') ? 'glutes' : meta.area.includes('Core') ? 'core' : meta.area.includes('Záda') ? 'upper' : 'mobility';
  const back=workoutRunning ? `<button data-action="train-current">← Zpět ke cviku</button>` : `<button data-action="history-back">← Zpět</button>`;
  const muscleImg=detailMuscleImage(k);
  const hasReference=Boolean(referenceExerciseAssets[k]);
  const hasMasterCard=Boolean(masterCards[k])&&!hasReference;
  app.innerHTML=`<section class="exerciseDetailPage v20Detail ${hasMasterCard?'v20MasterDetail':''} ${hasReference?'referenceExerciseDetail':''}">
    <div class="v20Shell">
      <aside class="v20SideNav" aria-label="Navigace">
        <h2>Moovka</h2>
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
            ${hasReference ? referenceHeroBlock(k) : hasMasterCard ? '' : `<div class="v20Hero">${detailHeroImage(k)}</div>`}
            ${hasReference ? referenceGuideCard(k) : ''}
            <div class="v20TitleRow">
              <div>
                <p class="eyebrow">Detail cviku</p>
                <h2>${ex.name}</h2>
                ${detailSideLabel}
                <p class="v20Sub">${hasReference?referenceSubtitle(k,meta,ex):`${meta.area.replace(' / ',' • ')}${ex.focus?` • ${ex.focus}`:''}`}</p>
              </div>
              ${dose&&!hasReference?`<div class="v20Dose"><b>${prettyDose(dose)}</b><span>${doseUnit}</span></div>`:''}
            </div>
            ${hasReference ? referenceCompactInfoPanel(k,meta) : ''}
            ${hasReference ? '' : hasMasterCard ? detailMasterCard(k).replace('masterCardSection','masterCardSection masterCardHero') : `<section class="v20Card v20FlowCard"><div class="v20CardHead"><h3>Průběh cviku</h3><span>krok za krokem</span></div><div class="v20Flow">${steps.map((x,i)=>`<article class="${verifiedStepPhotos[k]?'':'v32TextStep'}"><div class="v20StepTitle"><b>${i+1}</b><strong>${x.title}</strong></div>${detailStepMedia(k,i+1)}<p>${x.text}</p></article>${i<2?'<div class="v20Arrow">→</div>':''}`).join('')}</div></section>`}
          </main>

          <aside class="v20Aside">
            ${hasReference ? '' : `<section class="v20Card v20InfoCard"><h3>Informace o cviku</h3><dl class="v20InfoList"><div><dt>Obtížnost</dt><dd>${meta.diff}</dd></div><div><dt>Zaměření</dt><dd>${meta.area}</dd></div><div><dt>Kolena</dt><dd>${meta.knee}</dd></div></dl></section>`}
            ${hasReference?'':`<section class="v20Card v20Muscle"><h3>Zapojené svaly</h3>${muscleImg||`<div class="bodyMap v19BodyMap"><div class="bodySilhouetteV2 ${muscleClass}"><span class="head"></span><span class="torso"></span><span class="arms"></span><span class="leftLeg"></span><span class="rightLeg"></span><span class="highlight h1"></span><span class="highlight h2"></span></div></div>`}<ul class="dotList"><li>${meta.area}</li><li>${ex.feel||'střed těla a stabilita'}</li><li>${meta.knee}</li></ul></section>`}
            ${hasReference ? '' : `<section class="v20Card v20Breath"><h3>Dech & tempo</h3><div class="v20BreathRow"><span>↥</span><p><b>Nádech</b>ve výchozí pozici</p></div><div class="v20BreathRow"><span>↧</span><p><b>Výdech</b>${meta.breath}</p></div><div class="v20BreathRow"><span>◷</span><p><b>Tempo</b>${meta.tempo}</p></div></section>`}
            ${hasReference ? referenceRecommendations(k,meta,ex) : `<section class="v20Card v20Feel"><h3>Co bys měla cítit</h3><p>Práci v hýždích, stabilní střed těla a klidný, kontrolovaný pohyb bez bolesti.</p></section>
            <section class="v20Card v20Watch"><h3>Na co si dát pozor</h3><ul class="checkList"><li>Zatlačuj přes paty, ne přes špičky.</li><li>Drž pánev v jedné linii a neprohýbej se v bedrech.</li><li>Ramena zůstávají na zemi, krk je uvolněný.</li><li>Aktivuj břišní svaly po celou dobu.</li></ul></section>
            <section class="v20Card v20Mistakes"><h3>Nejčastější chyby</h3><ul class="xList">${meta.mistakes.map(x=>`<li>${x}</li>`).join('')}<li>Zvedání příliš vysoko a ztráta kontroly.</li><li>Zatínání krku a ramen.</li></ul></section>`}
          </aside>
        </section>
        ${hasReference ? referenceStepByStep(k) : ''}
        ${hasReference ? '' : `<div class="v20Footer"><button data-action="prev">← Předchozí cvik</button><strong>${currentExercise+1 || 1} / ${data.days[currentDay]?.items?.length || 6} cviků</strong><button class="primary" data-action="train-current">▶ Zpět ke cviku</button></div>`}
      </div>
    </div>
  </section>`;
  scrollTop();
}
const exerciseLibraryCategories={
  core:{title:'Břicho + pas',support:'Stabilita středu těla, břicho a pas.',icon:'core',ids:['sideplank','deadbug','toetap','revcrunch','hollow','rollup','standing_side_bend','tap','glute_bridge_march','hip_march','standing_oblique','sideplank_reach','heeltaps','bicycle','hundred','scissors','russian','legraises','bird']},
  glutes:{title:'Hýždě',support:'Síla, stabilita a kontrola hýždí.',icon:'glutes',ids:['rdl','hydrant','clam','sideleg','hip','plie','donkey','rainbow','abduction','frog','glute_bridge_march','bird','swimming']},
  legs:{title:'Nohy',support:'Stehna, kyčle a pevná opora.',icon:'legs',ids:['rdl','inner_thigh','sideleg','plie','hip_march','scissors','hip','abduction']},
  upper:{title:'Horní část + prsa',support:'Paže, ramena, hrudník a opora trupu.',icon:'upper',ids:['row','press','raise','triceps_kickback','chest_press','chest_fly','knee_pushup','plank','tap','sideplank','sideplank_reach']},
  back:{title:'Záda + držení těla',support:'Silnější záda a jistější držení těla.',icon:'back',ids:['row','bird','swimming','swan','spine','rdl','plank','sideplank','sideplank_reach','thread','chest_opener']},
  mobility:{title:'Mobilita + protažení',support:'Uvolnění, rozsah pohybu a klidný dech.',icon:'mobility',ids:['swan','standing_side_bend','spine','sphinx','mermaid','supine_twist','catcow','thread','chest_opener','figure_four','hamstring_supine']}
};
const exerciseLibraryOrder=['core','glutes','legs','upper','back','mobility'];
function lineIcon(name){
  const paths={
    stats:'<path d="M5 19V10M12 19V5M19 19v-7"/><path d="M3 19h18"/>',
    measure:'<path d="M4 7h16v10H4z"/><path d="M8 7v4m4-4v2m4-2v4"/>',
    library:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    backup:'<path d="M12 3v11m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
    moon:'<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5z"/>',
    core:'<path d="M8 4c1.5 2 1.6 4.2.5 6.2C7.4 12.4 8 17 12 20c4-3 4.6-7.6 3.5-9.8C14.4 8.2 14.5 6 16 4"/><path d="M9 12h6"/>',
    glutes:'<path d="M7 5c-1 3-2 5-2 8 0 4 2.8 7 7 7s7-3 7-7c0-3-1-5-2-8"/><path d="M12 6v14"/>',
    legs:'<path d="M8 3c0 5 1 8 3 11l-2 7m7-18c0 5-1 8-3 11l2 7"/>',
    upper:'<path d="M5 10c2-4 4-5 7-5s5 1 7 5"/><path d="M4 13h16M8 13v7m8-7v7"/>',
    back:'<path d="M9 4 6 9v9l6 3 6-3V9l-3-5"/><path d="M12 5v15"/>',
    mobility:'<path d="M5 12h14M8 8l-4 4 4 4m8-8 4 4-4 4"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    all:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    quality:'<path d="m5 13 4 4L19 7"/><path d="M4 4h16v16H4z"/>',
    breathe:'<path d="M11 5v14"/><path d="M11 10c-1-2-2-4-3.5-4C5 6 4 9 4 12.5S5.5 19 9 19c1.2 0 2-.8 2-2.2z"/><path d="M13 10c1-2 2-4 3.5-4C19 6 20 9 20 12.5S18.5 19 15 19c-1.2 0-2-.8-2-2.2z"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    levels:'<path d="M5 19V13h4v6M10 19V9h4v10M15 19V5h4v14"/><path d="M3 19h18"/>',
    equipment:'<path d="M7 8v8M4 10v4m13-6v8m3-6v4M7 12h10"/>',
    play:'<path d="m9 6 9 6-9 6z"/>',
    pause:'<path d="M9 6v12M15 6v12"/>',
    skip:'<path d="m6 7 6 5-6 5zM12 7l6 5-6 5z"/>',
    stop:'<rect x="7" y="7" width="10" height="10" rx="1"/>',
    note:'<path d="M5 19h4l10-10-4-4L5 15z"/><path d="m13 7 4 4"/>',
    listen:'<path d="M12 21s7-4.4 7-11a4 4 0 0 0-7-2.6A4 4 0 0 0 5 10c0 6.6 7 11 7 11z"/><path d="M9 12h2l1-3 1.5 6 1-3H17"/>',
    adjust:'<path d="M4 7h10m4 0h2M4 17h2m4 0h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    shield:'<path d="M12 3 5 6v5c0 4.7 2.8 8 7 10 4.2-2 7-5.3 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    backArrow:'<path d="m15 18-6-6 6-6"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>'
  };
  return `<svg class="lineIcon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.library}</svg>`;
}
function libraryImageFallback(){
  return `<div class="libraryImageFallback"><img src="Pilates%20Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt=""><span>Správná technika</span></div>`;
}
function libraryExerciseMedia(k){
  const src=v22ImageSrc(k),name=data.exercises[k]?.name||'Cvik';
  if(!src)return libraryImageFallback();
  return `<img class="libraryExercisePhoto" loading="lazy" src="${esc(src)}" alt="${esc(name)}"><div class="libraryImageFallback" hidden><img src="Pilates%20Assets/01_Master_Reference/MooVka_logo_FINAL.svg" alt=""><span>Správná technika</span></div>`;
}
function libraryExerciseCard(k,categoryId){
  const ex=data.exercises[k],meta=exMeta(k);
  if(!ex)return '';
  const category=exerciseLibraryCategories[categoryId];
  const tags=(category?[category.title,meta.area]:[meta.area,meta.diff]).filter((tag,index,list)=>tag&&list.indexOf(tag)===index).slice(0,2);
  return `<button class="libraryExerciseCard" type="button" data-action="info" data-ex="${esc(k)}" aria-label="Otevřít detail cviku ${esc(ex.name)}"><span class="libraryExerciseMedia">${libraryExerciseMedia(k)}</span><span class="libraryExerciseText"><strong>${esc(ex.name)}</strong><span class="libraryExerciseTags">${tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</span></span><span class="libraryExerciseChevron">${lineIcon('chevron')}</span></button>`;
}
function library(){
  setAppView('library');
  lastMode='library';setNav('library');
  const dark=document.body.classList.contains('dark');
  app.innerHTML=`<section class="programDashboard"><div class="programDashboardIntro"><p>Program</p><h2>Vše pro tvůj pokrok</h2><span>Výsledky, měření a správná technika na jednom místě.</span></div><div class="programFeatureGrid"><button class="programFeature programFeatureWide" type="button" data-action="stats"><span class="programFeatureIcon">${lineIcon('stats')}</span><span><strong>Statistiky</strong><small>Aktivita a pokrok</small></span><span class="programFeatureArrow">${lineIcon('chevron')}</span></button><button class="programFeature" type="button" data-action="progress"><span class="programFeatureIcon">${lineIcon('measure')}</span><span><strong>Měření</strong><small>Sleduj své výsledky</small></span><span class="programFeatureArrow">${lineIcon('chevron')}</span></button><button class="programFeature" type="button" data-action="library-list"><span class="programFeatureIcon coralAccent">${lineIcon('library')}</span><span><strong>Knihovna cviků</strong><small>Technika podle partií</small></span><span class="programFeatureArrow">${lineIcon('chevron')}</span></button></div><section class="programSettings"><h3>Nastavení a informace</h3><button class="programSettingRow" type="button" data-action="program-info"><span>${lineIcon('info')}</span><strong>O Moovce</strong><i>${lineIcon('chevron')}</i></button><button class="programSettingRow" type="button" data-action="export-progress"><span>${lineIcon('backup')}</span><strong>Záloha dat</strong><i>${lineIcon('chevron')}</i></button><button class="programSettingRow" type="button" data-action="toggle-theme" role="switch" aria-checked="${dark}"><span>${lineIcon('moon')}</span><strong>Tmavý režim</strong><i class="programSwitch ${dark?'on':''}" aria-hidden="true"><b></b></i></button></section></section>`;
  scrollTop();
}
function exerciseLibrary(){
  setAppView('exercise-library');
  lastMode='library';setNav('library');
  const categoryTiles=exerciseLibraryOrder.map(id=>{const c=exerciseLibraryCategories[id];return `<button class="libraryCategoryTile libraryCategory-${id}" type="button" data-action="library-category" data-category="${id}"><span>${lineIcon(c.icon)}</span><strong>${c.title}</strong><small>${c.ids.filter(k=>data.exercises[k]).length} cviků</small></button>`;}).join('');
  app.innerHTML=`<section class="exerciseLibrary"><button class="libraryBack" type="button" data-action="history-back">${lineIcon('backArrow')}<span>Zpět na Program</span></button><div class="libraryIntro"><p>Knihovna cviků</p><h2>Co chceš procvičit?</h2><span>Vyber si partii a prohlédni si správnou techniku cviků.</span></div><div class="libraryCategoryGrid">${categoryTiles}</div><div class="libraryUtilityGrid"><button class="libraryUtilityTile" type="button" data-action="library-category" data-category="favorites"><span>${lineIcon('heart')}</span><strong>Oblíbené</strong><small>Tvoje uložené cviky</small></button><button class="libraryUtilityTile" type="button" data-action="library-category" data-category="all"><span>${lineIcon('all')}</span><strong>Všechny cviky</strong><small>Celý katalog</small></button></div></section>`;
  scrollTop();
}
function exerciseLibraryCategory(categoryId,routeView='exercise-library-category'){
  const special=categoryId==='favorites'||categoryId==='all';
  const category=exerciseLibraryCategories[categoryId];
  if(!special&&!category)return exerciseLibrary();
  setAppView(routeView,routeView==='exercise-library-category'?{category:categoryId}:{});
  lastMode='library';setNav('library');
  const allKeys=Object.keys(data.exercises);
  const keys=categoryId==='favorites'?allKeys.filter(k=>isFav(k)):categoryId==='all'?allKeys:category.ids.filter(k=>data.exercises[k]);
  const title=categoryId==='favorites'?'Oblíbené':categoryId==='all'?'Všechny cviky':category.title;
  const support=categoryId==='favorites'?'Cviky, ke kterým se chceš vracet.':categoryId==='all'?'Kompletní knihovna techniky cviků.':category.support;
  const content=keys.length?`<div class="libraryCatalogGrid">${keys.map(k=>libraryExerciseCard(k,categoryId)).join('')}</div>`:`<div class="libraryEmptyState">${lineIcon('heart')}<h3>Zatím tu nemáš žádný oblíbený cvik.</h3><p>Oblíbené si uložíš v detailu cviku.</p></div>`;
  app.innerHTML=`<section class="exerciseLibrary libraryCategoryScreen"><button class="libraryBack" type="button" data-action="history-back">${lineIcon('backArrow')}<span>Zpět do knihovny</span></button><div class="libraryCategoryHead"><div><p>Knihovna cviků</p><h2>${title}</h2><span>${support}</span></div><b>${keys.length} ${keys.length===1?'cvik':'cviků'}</b></div>${content}</section>`;
  scrollTop();
}
function favs(){return exerciseLibraryCategory('favorites','favourites');}
function calendar(){
  setAppView('calendar');
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
  setAppView('progress');
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
  setAppView('stats');
  lastMode='stats';setNav('stats');const s=statsData();
  app.innerHTML=`<section class="card"><h2>Statistiky</h2><p class="muted">${s.percent}% programu</p><div class="progress"><div class="bar" style="width:${s.percent}%"></div></div>
  <div class="statGrid"><div class="statBox"><b>${s.daysComplete}</b><span class="muted">hotových dní</span></div><div class="statBox"><b>${s.complete}</b><span class="muted">cviků</span></div><div class="statBox"><b>${streak()}</b><span class="muted">série dní</span></div></div><div class="row"><button data-action="calendar">Kalendář</button><button data-action="progress">Měření</button></div></section>`;
}
function renderAppState(state){
  if(!state?.pb40App)return home();
  appHistoryRendering=true;
  try{
    switch(state.appView){
      case 'intro': intro(); break;
      case 'home': home(); break;
      case 'difficulty': difficultyChooser(state.next||'plan',Number(state.day)||0,{skipRoute:true}); break;
      case 'onboarding':
        onboardingSession={manual:Boolean(state.manual),required:Boolean(state.required),hasProgress:Boolean(state.hasProgress),selected:validDifficulty(state.selected)||getProgramDifficulty()||'medium'};
        renderOnboarding(Number(state.step)||1,{skipRoute:true});
        break;
      case 'plan': days(); break;
      case 'day': day(Number(state.day)||0); break;
      case 'exercise-detail':
        currentDay=Number(state.day)||0;
        currentExercise=Number(state.exercise)||0;
        info(state.exerciseId,{skipRoute:true});
        break;
      case 'calendar': calendar(); break;
      case 'program': programInfo(); break;
      case 'library': library(); break;
      case 'exercise-library': exerciseLibrary(); break;
      case 'exercise-library-category': exerciseLibraryCategory(state.category); break;
      case 'favourites': favs(); break;
      case 'progress': progressTracker(); break;
      case 'stats': showStats(); break;
      case 'workout': day(Number(state.day)||0); break;
      default: home();
    }
  }finally{
    appHistoryRendering=false;
  }
}
function initialiseAppHistory(){
  if(history.state?.pb40App){
    renderAppState(history.state);
    return;
  }
  const directDetail=detailStateFromHash();
  const rootUrl=location.pathname+location.search;
  const homeState={pb40App:true,appView:'home',pb40RouteKey:'home'};
  history.replaceState({pb40Boundary:true},'',rootUrl);
  history.pushState(homeState,'',rootUrl);
  if(directDetail){
    history.pushState(directDetail,'',appRouteUrl('exercise-detail',directDetail));
    renderAppState(directDetail);
    return;
  }

  renderAppState(homeState);
}
app.addEventListener('error',e=>{
  const image=e.target;
  if(!(image instanceof HTMLImageElement)||!image.classList.contains('libraryExercisePhoto'))return;
  image.hidden=true;
  const fallback=image.nextElementSibling;
  if(fallback)fallback.hidden=false;
},true);
app.addEventListener('click',e=>{
  void unlockAudio();
  const t=e.target.closest('[data-action],.exercise[data-day],.exercise[data-ex]');
  if(!t)return;
  const a=t.dataset.action;
  if(a==='open-master-card')return openMasterCard(t.dataset.src,t.dataset.alt);
  if(a==='close-master-card'){t.closest('.masterLightbox')?.remove();return;}
  if(a==='stay-in-app'){closeRootExitDialog();return;}
  if(a==='confirm-exit-app')return confirmRootExit();
  if(a==='new-program-cycle')return showProgramCycleDialog();
  if(a==='cancel-new-program-cycle'){closeProgramCycleDialog();return;}
  if(a==='confirm-new-program-cycle')return startNewProgramCycle();
  if(a==='history-back'){history.back();return;}
  if(a==='home')return home();
  if(a==='intro-start'){markIntroSeen();return startTraining(0,true);}
  if(a==='choose-difficulty'){
    if(!setProgramDifficulty(t.dataset.difficulty))return;
    const next=t.dataset.next||'plan',di=Number(t.dataset.day)||0;
    if(next==='workout')return startTraining(di,true);
    if(next==='day')return day(di);
    return days();
  }
  if(a==='set-difficulty'){
    if(!setProgramDifficulty(t.dataset.difficulty))return;
    return t.dataset.view==='day'?day(Number(t.dataset.day)||0):days();
  }
  if(a==='program-info')return programInfo();
  if(a==='show-onboarding')return startOnboarding(true);
  if(a==='onboarding-next')return renderOnboarding(Number(t.dataset.step)||1,{replaceRoute:true});
  if(a==='onboarding-select'){onboardingSession.selected=validDifficulty(t.dataset.difficulty)||onboardingSession.selected;return renderOnboarding(2,{replaceRoute:true});}
  if(a==='onboarding-complete-primary')return completeOnboarding('primary');
  if(a==='onboarding-complete-plan')return completeOnboarding('plan');
  if(a==='days')return days();
  if(a==='stats')return showStats();
  if(a==='calendar')return calendar();
  if(a==='progress')return progressTracker();
  if(a==='save-measure')return saveMeasureFromForm();
  if(a==='export-progress')return exportProgress();
  if(a==='save-workout-note')return saveWorkoutNote();
  if(a==='toggle-finish-note'){
    const field=document.querySelector('.finishNoteField');
    if(!field)return;
    field.hidden=!field.hidden;
    t.setAttribute('aria-expanded',String(!field.hidden));
    if(!field.hidden)document.getElementById('finish-note')?.focus();
    return;
  }
  if(a==='select-mood'){document.querySelectorAll('.moodRow button').forEach(b=>b.classList.remove('selected'));t.classList.add('selected');return;}
  if(a==='library')return library();
  if(a==='library-list')return exerciseLibrary();
  if(a==='library-category')return exerciseLibraryCategory(t.dataset.category);
  if(a==='toggle-theme'){
    const dark=document.body.classList.toggle('dark');
    localStorage.setItem('dark',dark?'1':'0');
    return library();
  }
  if(a==='delete-measure'){const arr=measurements();arr.splice(Number(t.dataset.index),1);saveMeasurements(arr);return progressTracker();}
  if(a==='mark-today'){markToday();return calendar();}
  if(a==='unmark-today'){localStorage.removeItem(logKey(todayKey()));return calendar();}
  if(a==='calendar-day'){const k=logKey(t.dataset.date);localStorage.getItem(k)==='1'?localStorage.removeItem(k):localStorage.setItem(k,'1');return calendar();}
  if(a==='fav'){toggleFav(t.dataset.ex);return info(t.dataset.ex,{replaceRoute:true});}
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
  if(a==='day-return'){history.back();return;}
  if(a==='day'||(t.classList.contains('exercise')&&t.dataset.day!==''))return day(Number(t.dataset.day));
  if(a==='start')return startTraining(Number(t.dataset.day),true);
  if(a==='start-auto')return startTraining(Number(t.dataset.day),true);
  if(a==='set-complete-manual'){setDone(currentDay,currentExercise); const max=data.days[currentDay].items.length-1; if(currentExercise<max){currentExercise++;return showTrain();} if(workoutCurrentSet<workoutTotalSets){workoutCurrentSet++;currentExercise=0;return showTrain();} data.days[currentDay].items.forEach((_,i)=>setDone(currentDay,i)); workoutCurrentSet=1; return doneNext(false);}
  if(a==='set-complete-auto')return advanceAutoPhase();
  if(a==='done-next')return doneNext(true);
  if(a==='done-next-nomark')return doneNext(false);
  if(a==='toggle-auto'){workoutPaused=!workoutPaused;return showAutoTrain();}
  if(a==='skip-auto')return skipAuto();
  if(a==='stop-auto')return showWorkoutExitDialog();
  if(a==='continue-workout')return continueWorkoutFromDialog();
  if(a==='confirm-stop-auto')return exitWorkoutToDay();
  if(a==='reset-day'){data.days[Number(t.dataset.day)].items.forEach((_,i)=>localStorage.removeItem(key(Number(t.dataset.day),i)));return day(Number(t.dataset.day));}
  if(a==='prev'){if(currentExercise>0)currentExercise--;return showTrain();}
  if(a==='rest')return restScreen();
  if(a==='train-current')return openCurrentTraining();
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
window.addEventListener('popstate',event=>{
  if(workoutRunning){
    workoutHistoryArmed=false;
    armWorkoutHistoryGuard();
    if(!workoutExitDialogOpen)showWorkoutExitDialog();
    return;
  }
  if(pendingWorkoutExitDay!==null){
    const exitDay=pendingWorkoutExitDay;
    pendingWorkoutExitDay=null;
    day(exitDay);
    return;
  }
  if(onboardingSession?.required&&event.state?.appView!=='onboarding'){
    history.forward();
    return;
  }
  if(onboardingSession&&event.state?.appView!=='onboarding')onboardingSession=null;
  if(event.state?.pb40Boundary){
    if(rootExitAllowed){
      rootExitAllowed=false;
      history.back();
      return;
    }
    history.forward();
    showRootExitDialog();
    return;
  }
  if(rootExitDialogOpen&&event.state?.appView==='home')return;
  workoutHistoryArmed=false;
  workoutHistoryGuardId=null;
  if(event.state?.pb40App)renderAppState(event.state);
});
migrateProgramLayout();
migrateLegacyDifficulty();
migrateExistingProfileOnboarding();
initialiseAppHistory();
})();
