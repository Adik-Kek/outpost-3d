// Headless self-test: runs the exact engine code inside index.html with Node.
// Usage:  node selftest.js            (1,000 good + 1,000 random runs, formula + dataset checks)
//         node selftest.js modes      (win rates for every location, site and difficulty)
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const grab = (a, b) => html.slice(html.indexOf(a), html.indexOf(b));
const code = grab('/* ==================== NASA DATA START', '/* ==================== NASA DATA END') +
             grab('/* ==================== ENGINE START', '/* ==================== ENGINE END');
const Engine = new Function(code + '; return Engine;')();

if (process.argv[2] === 'modes') {
  for (const loc of ['moon', 'mars']) for (const site of loc === 'moon' ? ['ridge', 'rim', 'malapert'] : ['gale']) for (const d of ['explorer', 'pioneer', 'survivor']) {
    const o = { location: loc, siteId: site, difficulty: d };
    const g = Engine.batch(Engine.goodPolicy, 300, o, 3), r = Engine.batch(Engine.randomPolicy, 300, o, 3);
    console.log(`${loc.padEnd(4)} ${site.padEnd(9)} ${d.padEnd(9)} good ${Math.round(g.winRate * 100)}%  random ${Math.round(r.winRate * 100)}%`);
  }
} else {
  const r = Engine.runSelfTest(1000);
  r.checks.forEach(c => console.log((c.pass ? 'PASS ' : 'FAIL ') + c.name + ' — ' + c.detail));
  console.log('Good strategy failures:', JSON.stringify(r.good.fails));
  console.log('Random play failures:  ', JSON.stringify(r.random.fails));
  process.exit(r.passed ? 0 : 1);
}
