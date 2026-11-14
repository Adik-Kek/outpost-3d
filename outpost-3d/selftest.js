// Headless self-test: runs the exact simulation code inside index.html with Node (no 3D code involved).
// Usage:  node selftest.js         (good vs random, formula + dataset checks)
//         node selftest.js modes   (win rates for every location, site and difficulty)
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const cut = (a, b) => { const i = html.indexOf(a); return html.slice(i, html.indexOf(b, i)); };
const code = cut('/* ==================== NASA DATA START', '/* ==================== NASA DATA END') +
  cut('const CONFIG = {', '</script>') + cut('/* ==================== SIM START', '/* ==================== SIM END');
const SIM = new Function(code + '; return SIM;')();
if (process.argv[2] === 'modes') {
  for (const loc of ['moon', 'mars']) for (const site of loc === 'moon' ? ['ridge', 'rim', 'malapert'] : ['gale']) for (const d of ['explorer', 'pioneer', 'survivor']) {
    const o = { location: loc, siteId: site, difficulty: d }, g = SIM.batch(SIM.goodPolicy, 300, o, 3), r = SIM.batch(SIM.randomPolicy, 300, o, 3);
    console.log(`${loc.padEnd(4)} ${site.padEnd(9)} ${d.padEnd(9)} good ${String(Math.round(g.winRate * 100)).padStart(3)}% ${JSON.stringify(g.fails)}  random ${Math.round(r.winRate * 100)}% ${JSON.stringify(r.fails)}`);
  }
} else {
  const t = Date.now(), r = SIM.selfTest(1000);
  r.checks.forEach(c => console.log((c.pass ? 'PASS ' : 'FAIL ') + c.name + ' — ' + c.detail));
  console.log('Good failures:', JSON.stringify(r.good.fails), '\nRandom failures:', JSON.stringify(r.random.fails), '\n' + (Date.now() - t) + ' ms');
  process.exit(r.passed ? 0 : 1);
}
