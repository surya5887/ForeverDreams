const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  { regex: /Forever Dreams Home Interior Design/gi, newStr: 'Glossix Design' },
  { regex: /Forever Dreams Home/gi, newStr: 'Glossix Design' },
  { regex: /Forever Dreams/gi, newStr: 'Glossix Design' },
  { regex: /Glossix Designs/gi, newStr: 'Glossix Design' },
  { regex: /GLOSSIX DESIGNS/g, newStr: 'GLOSSIX DESIGN' },
  { regex: /FDH/g, newStr: 'Glossix' }
];

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const rep of replacements) {
      content = content.replace(rep.regex, rep.newStr);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
console.log('Done replacing names.');
