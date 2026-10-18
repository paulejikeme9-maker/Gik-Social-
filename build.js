
const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'styles.css',
  'app.js',
  'admin.html',
  'admin.css',
  'admin.js'
];

const output = path.join(__dirname, 'dist');

fs.mkdirSync(output, { recursive: true });

for (const file of files) {
  const source = path.join(__dirname, file);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing required file: ${file}`);
  }

  fs.copyFileSync(source, path.join(output, file));
}

console.log('Gik Social build completed successfully.');
