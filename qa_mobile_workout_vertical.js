const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(file, (error, body) => {
    if (error) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  });
});

const currentCss = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const beforeCss = execFileSync('git', ['show', 'HEAD^:style.css'], { cwd: root, encoding: 'utf8' });
const sourceApp = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const qaApp = sourceApp.replace(/\}\)\(\);\s*$/, `
  window.__WORKOUT_VERTICAL_QA__ = {
    startStandingSideBend(){
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, '1');
      startTraining(24, true, { forceRestart:true });
      currentExercise = 0;
      workoutPhase = 'work';
      workoutPaused = true;
      workoutLeft = 0;
      clearInterval(timer);
      showAutoTrain({ resetScroll:true });
    }
  };
})();`);

if (qaApp === sourceApp) throw new Error('QA hook could not be attached to app.js');

async function inspect(page, width, height, mode) {
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/style.css*', route => route.fulfill({ status:200, contentType:'text/css', body:mode === 'before' ? beforeCss : currentCss }));
  await page.route('**/app.js*', route => route.fulfill({ status:200, contentType:'application/javascript', body:qaApp }));
  await page.goto('http://127.0.0.1:4183/', { waitUntil:'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('moovka-onboarding-completed-v1', '1');
    localStorage.setItem('pb40-program-difficulty-v1', 'medium');
  });
  await page.reload({ waitUntil:'networkidle' });
  await page.evaluate(() => window.__WORKOUT_VERTICAL_QA__.startStandingSideBend());
  await page.waitForSelector('.autoTrain .trainImageSlot .bigimg');
  await page.locator('.autoTrain .trainImageSlot .bigimg').evaluate(img => img.decode());
  await page.waitForTimeout(100);
  const metrics = await page.evaluate(() => {
    const rect = selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const value = element.getBoundingClientRect();
      return {
        top:+value.top.toFixed(1), bottom:+value.bottom.toFixed(1),
        width:+value.width.toFixed(1), height:+value.height.toFixed(1)
      };
    };
    const image = document.querySelector('.autoTrain .trainImageSlot .bigimg');
    const panel = document.querySelector('.autoTrain');
    const controls = document.querySelector('.autoTrain .trainControls');
    const main = document.querySelector('main');
    const panelRect = panel.getBoundingClientRect();
    const controlsRect = controls.getBoundingClientRect();
    return {
      viewport:{ width:innerWidth, height:innerHeight },
      documentHeight:document.documentElement.scrollHeight,
      main:rect('main'), panel:rect('.autoTrain'), header:rect('body > header'),
      status:rect('.autoTrain .workoutHeaderPanel'), image:rect('.autoTrain .trainImageSlot'),
      imageElement:rect('.autoTrain .trainImageSlot .bigimg'), controls:rect('.autoTrain .trainControls'),
      panelToDocumentBottom:+(document.documentElement.scrollHeight - (panelRect.bottom + scrollY)).toFixed(1),
      controlsToPanelBottom:+(panelRect.bottom - controlsRect.bottom).toFixed(1),
      controlsVisibleWithoutScroll:controlsRect.bottom <= innerHeight,
      horizontalOverflow:document.documentElement.scrollWidth > document.documentElement.clientWidth,
      panelOverflow:panel.scrollHeight > panel.clientHeight,
      imageFit:getComputedStyle(image).objectFit,
      imagePosition:getComputedStyle(image).objectPosition,
      naturalImage:{ width:image.naturalWidth, height:image.naturalHeight },
      mainPaddingBottom:getComputedStyle(main).paddingBottom,
      panelPaddingBottom:getComputedStyle(panel).paddingBottom,
      panelMinHeight:getComputedStyle(panel).minHeight
    };
  });
  metrics.errors = errors;
  if (width === 390 && height === 844) {
    const suffix = mode === 'before' ? '_before' : '';
    await page.screenshot({ path:`C:/Users/Kristy/Documents/Codex/Moovka_active_workout_390x844${suffix}.png`, fullPage:false });
  }
  return { mode, width, height, ...metrics };
}

(async () => {
  await new Promise(resolve => server.listen(4183, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless:true });
  const viewports = [
    { width:320, height:700 },
    { width:360, height:780 },
    { width:390, height:844 },
    { width:430, height:932 }
  ];
  const results = [];
  for (const viewport of viewports) {
    for (const mode of ['before', 'after']) {
      const page = await browser.newPage({ viewport, deviceScaleFactor:1 });
      results.push(await inspect(page, viewport.width, viewport.height, mode));
      await page.close();
    }
  }
  await browser.close();
  server.close();
  console.log(JSON.stringify(results, null, 2));
})().catch(error => {
  server.close();
  console.error(error);
  process.exit(1);
});
