// Dev helper: builds scripts/sheet.html, a numbered contact sheet of the candidate images.
import fs from 'node:fs';
const ids = fs.readFileSync('scripts/check-images.mjs', 'utf8').match(/\b1\d{9,12}-[0-9a-f]{12}\b/g);
const cells = ids.map((id, i) =>
  `<div style="position:relative"><img style="width:100%;aspect-ratio:3/4;object-fit:cover" src="https://images.unsplash.com/photo-${id}?w=200&q=50"><b style="position:absolute;left:0;top:0;background:#000;color:#fff;font:bold 14px sans-serif;padding:1px 4px">${i}</b></div>`).join('');
fs.writeFileSync('scripts/sheet.html', `<body style="margin:0;display:grid;grid-template-columns:repeat(11,1fr);gap:2px">${cells}`);
console.log(ids.length);
