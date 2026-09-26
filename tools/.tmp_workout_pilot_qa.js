const { chromium } = require('playwright');

const widths = [320, 360, 390, 430];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const results = [];
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('moovka-onboarding-completed-v1', '1');
      localStorage.setItem('pb40-program-difficulty-v1', 'medium');
      const dayIndex = 12;
      const day = window.PB40_DATA.days[dayIndex];
      const items = day.items.map(([id, dose]) => [id, typeof dose === 'object' ? dose.medium : dose]);
      const stretch = day.stretch ? [day.stretch[0], typeof day.stretch[1] === 'object' ? day.stretch[1].medium : day.stretch[1]] : null;
      localStorage.setItem('pb40-workout-resume-v1', JSON.stringify({
        version: 1,
        dayIndex,
        currentExercise: 0,
        workoutCurrentSet: 1,
        workoutTotalSets: 3,
        workoutPhase: 'prep',
        workoutLeft: 1000,
        workoutFinalStretch: false,
        workoutAuto: true,
        workoutPaused: false,
        programWasCompleteAtWorkoutStart: false,
        sideNoticeDone: '',
        sideNoticeNext: '',
        workoutContext: { dayIndex, difficulty: 'medium', totalSets: 3, items, stretch, activeElapsedMs: 0, activeSince: null },
        savedAt: new Date().toISOString()
      }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('[data-action="resume-workout"]').first().click();
    await page.waitForSelector('[data-workout-image-pilot="standing_side_bend"]');

    const initialGeometry = await page.$eval('[data-workout-image-pilot]', root => {
      const box = root.getBoundingClientRect();
      return {
        root: [box.width, box.height],
        frames: [...root.querySelectorAll('img')].map(img => {
          const b = img.getBoundingClientRect();
          const css = getComputedStyle(img);
          return [b.width, b.height, css.objectFit, css.objectPosition];
        }),
        overflow: document.documentElement.scrollWidth > innerWidth
      };
    });

    const samples = [];
    const started = Date.now();
    while (Date.now() - started < 10150) {
      samples.push(await page.$eval('[data-workout-image-pilot]', root => ({
        t: performance.now(),
        frame: root.dataset.pilotFrame,
        opacity: [...root.querySelectorAll('img')].map(img => Number(getComputedStyle(img).opacity))
      })));
      await sleep(25);
    }
    const observed = samples.filter((sample, index) => index === 0 || sample.frame !== samples[index - 1].frame).map(sample => sample.frame);
    const simultaneousFades = samples.filter(sample => sample.opacity.every(value => value > 0.03 && value < 0.97)).length;
    const blankSamples = samples.filter(sample => sample.opacity.every(value => value < 0.03)).length;

    const pauseButton = page.locator('[data-action="toggle-auto"]');
    await pauseButton.click();
    const pausedAt = await page.$eval('[data-workout-image-pilot]', root => root.dataset.pilotFrame);
    await sleep(1000);
    const pausedAfter = await page.$eval('[data-workout-image-pilot]', root => root.dataset.pilotFrame);
    await pauseButton.click();
    await sleep(650);
    const resumedAt = await page.$eval('[data-workout-image-pilot]', root => root.dataset.pilotFrame);

    const finalGeometry = await page.$eval('[data-workout-image-pilot]', root => {
      const box = root.getBoundingClientRect();
      return {
        root: [box.width, box.height],
        frames: [...root.querySelectorAll('img')].map(img => {
          const b = img.getBoundingClientRect();
          const css = getComputedStyle(img);
          return [b.width, b.height, css.objectFit, css.objectPosition];
        }),
        overflow: document.documentElement.scrollWidth > innerWidth
      };
    });
    results.push({ width, observed, simultaneousFades, blankSamples, initialGeometry, finalGeometry, pausedAt, pausedAfter, resumedAt });
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
