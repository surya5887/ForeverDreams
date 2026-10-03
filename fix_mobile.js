const fs = require('fs');
let code = fs.readFileSync('src/app/page.module.css', 'utf8');

code = code.replace('.heroLeft { padding: 100px 1.5rem 60px 1.5rem; text-align: center; align-items: center; }', '.heroContent { padding: 130px 1rem 40px 1rem; margin: 0; width: 100%; }');

code = code.replace('.heroTitle { font-size: 2.8rem; }', '.heroTitle { font-size: 2.2rem; margin-bottom: 1rem; line-height: 1.2; }');
code = code.replace('.heroTitleScript { font-size: 3.5rem; display: block; margin-top: -10px; margin-left: 0; }', '.heroTitleScript { font-size: 2.8rem; display: block; margin-top: -5px; margin-left: 0; }');
code = code.replace('.heroSubtitle { font-size: 0.9rem; text-align: center; }', '.heroSubtitle { font-size: 0.8rem; line-height: 1.4; margin-bottom: 1.5rem; text-shadow: 0 1px 3px rgba(0,0,0,0.8); text-align: center; }');

const r = \.hero {
      background: #fff url('https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783330684/forever_dreams/home/t2vsfjd1j7f5zsykrfpy.png') no-repeat left center;
      background-size: cover;
      align-items: flex-start !important;
      justify-content: center !important;
      height: auto !important;
    }\;

code = code.replace(/.hero \{\s*background: #fff url\([^)]+\) no-repeat left center;\s*background-size: cover;\s*\}/, r);

fs.writeFileSync('src/app/page.module.css', code);

