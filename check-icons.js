const fs = require('fs');
const path = require('path');

// Read all icon exports from the package
const indexPath = 'node_modules/@phosphor-icons/react/dist/index.d.ts';
const content = fs.readFileSync(indexPath, 'utf8');
const exports = new Set();
content.split('\n').forEach(line => {
  const match = line.match(/export \* from '\.\/csr\/([^']+)'/);
  if (match) exports.add(match[1]);
});

// Now check all imports in the codebase
const files = [
  'components/shared/safety-bar.tsx',
  'app/(main)/study-hub/[category]/[slug]/page.tsx',
  'app/(main)/study-hub/[category]/page.tsx',
  'components/shared/navigation.tsx',
  'app/(main)/study-hub/page.tsx',
  'app/(main)/peer-support/page.tsx',
  'components/landing/sections/AnnouncementBar.tsx',
  'app/(main)/mood/page.tsx',
  'components/landing/sections/FAQ.tsx',
  'components/landing/sections/CrisisBanner.tsx',
  'components/landing/sections/CommonConcerns.tsx',
  'components/landing/sections/MeetNova.tsx',
  'components/landing/sections/HowItWorks.tsx',
  'components/landing/sections/Hero.tsx',
  'components/landing/sections/TrustSection.tsx',
  'components/landing/sections/FeaturesGrid.tsx',
  'components/landing/sections/PeerSupport.tsx',
  'components/landing/sections/Trust.tsx',
  'components/landing/sections/Parents.tsx',
  'components/landing/sections/Testimonials.tsx',
  'components/landing/sections/Navigation.tsx',
  'components/landing/sections/Schools.tsx',
  'app/(main)/chat/page.tsx',
  'features/dashboard/components/teen-dashboard.tsx',
  'features/dashboard/components/parent-dashboard.tsx',
  'features/mood-engine/components/mood-form.tsx',
  'features/study-hub/components/search-bar.tsx',
  'features/study-hub/components/resource-card.tsx',
  'features/study-hub/components/category-grid.tsx',
  'features/peer-support/components/chat-input.tsx',
  'features/peer-support/components/chat-interface.tsx',
  'features/peer-support/components/message-bubble.tsx',
  'features/nova/components/chat-composer.tsx',
];

const importRegex = /import\s+\{([^}]+)\}\s+from\s+['\"]@phosphor-icons\/react/;
let allImports = new Set();
let fileImports = {};

files.forEach(file => {
  const fullPath = path.join('D:/TeensHelpline-Final-Project/teenshelpline-org', file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const match = content.match(importRegex);
    if (match) {
      const icons = match[1].split(',').map(i => i.trim().replace(/^['"]|['"]$/g, ''));
      fileImports[file] = icons;
      icons.forEach(i => allImports.add(i));
    }
  }
});

// Check which are invalid
console.log('=== INVALID ICONS ===');
let hasInvalid = false;
allImports.forEach(icon => {
  if (!exports.has(icon)) {
    console.log('MISSING: ' + icon);
    hasInvalid = true;
  }
});

if (!hasInvalid) {
  console.log('All imports are valid!');
}

console.log('\n=== ALL IMPORTS BY FILE ===');
Object.entries(fileImports).forEach(([file, icons]) => {
  console.log('\n' + file + ':');
  icons.forEach(icon => {
    const valid = exports.has(icon) ? 'OK' : 'MISSING';
    console.log('  ' + icon + ' - ' + valid);
  });
});