const fs = require('fs');
const files = [
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/not-found.tsx',
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/api/contact/route.ts',
  'src/app/careers/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/fonts/Archivo-Variable.woff2',
  'src/app/pricing/page.tsx',
  'src/app/services/page.tsx',
  'src/app/services/[slug]/page.tsx',
  'src/components/Blocks.tsx',
  'src/components/BookButton.tsx',
  'src/components/ContactForm.tsx',
  'src/components/Faq.tsx',
  'src/components/Flow.tsx',
  'src/components/Footer.tsx',
  'src/components/Icons.tsx',
  'src/components/MotionProvider.tsx',
  'src/components/Nav.tsx',
  'src/components/PriceTable.tsx',
  'src/content/site.ts',
  'src/lib/motion.ts',
  'src/lib/utils.ts'
];
let ok = true;
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error('Missing file:', f);
    ok = false;
  } else {
    const s = fs.statSync(f).size;
    if (s === 0) {
      console.error('Empty file:', f);
      ok = false;
    } else {
      console.log(`OK: ${f} (${s} bytes)`);
    }
  }
}
if (ok) console.log('All 25 files exist and have non-zero size.');
