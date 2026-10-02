const fs = require('fs');
['src/app/layout.js', 'src/app/sitemap.js', 'src/app/robots.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/https:\/\/glossixdesigns\.vercel\.app/g, 'https://www.glossixdesign.in');
  fs.writeFileSync(file, content);
});
