const CACHE='PB40-v18-detail-redesign';
const ASSETS=['./','index.html','style.css','app.js','data.js','manifest.json',
  'assets/exercises/hip_march.jpg'
,
  'assets/exercises/rdl_slow.jpg'
,
  'assets/exercises/clam_pulse.jpg'
,
  'assets/exercises/deadbug_hold.jpg'
,
  'assets/exercises/toetap_slow.jpg'
,
  'assets/exercises/sideplank_reach.jpg'
,
  'assets/exercises/row_pause.jpg'
,
  'assets/exercises/press_slow.jpg'
,
  'assets/exercises/bird_hold.jpg'
,
  'assets/exercises/sidekick_pulse.jpg'
,
  'assets/exercises/swan_hold.jpg'
,
  'assets/exercises/frog_hold.jpg'
,
  'assets/exercises/plank_breath.jpg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match('index.html'))));});
