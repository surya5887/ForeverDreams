const fs = require('fs');
let css = fs.readFileSync('src/components/Footer/Footer.module.css', 'utf8');

const mediaQueryStart = css.indexOf('@media (max-width: 768px)');
if (mediaQueryStart !== -1) {
  const beforeMedia = css.substring(0, mediaQueryStart);
  
  const newMediaQuery = '@media (max-width: 768px) {\n' +
  '  .footerContainer { \n' +
  '    grid-template-columns: 1fr 1fr; \n' +
  '    gap: 2rem 1.5rem; \n' +
  '    padding: 3rem 1.5rem; \n' +
  '  }\n' +
  '  .footerCol:nth-child(1) {\n' +
  '    grid-column: span 2;\n' +
  '    text-align: center;\n' +
  '  }\n' +
  '  .footerCol:nth-child(4) {\n' +
  '    grid-column: span 2;\n' +
  '  }\n' +
  '  .footerCol {\n' +
  '    text-align: left;\n' +
  '  }\n' +
  '  .footerLogo { \n' +
  '    flex-direction: column; \n' +
  '    align-items: center; \n' +
  '    justify-content: center; \n' +
  '    gap: 0.8rem; \n' +
  '    margin-bottom: 1rem;\n' +
  '  }\n' +
  '  .fLogoCircle {\n' +
  '    width: 80px;\n' +
  '    height: 80px;\n' +
  '  }\n' +
  '  .brandNameTextFooter {\n' +
  '    font-size: 1.6rem;\n' +
  '    margin-left: 0;\n' +
  '    white-space: normal;\n' +
  '  }\n' +
  '  .footerDesc { margin: 0 auto 1.5rem auto; max-width: 90%; }\n' +
  '  .socialLinks { justify-content: center; }\n' +
  '  .footerList { gap: 0.8rem; align-items: flex-start; }\n' +
  '  .footerContact li { justify-content: flex-start; flex-direction: row; gap: 0.8rem; margin-bottom: 0.8rem; }\n' +
  '  .footerBottom { flex-direction: column; gap: 1rem; text-align: center; padding-bottom: 90px; }\n' +
  '}\n' +
  '.cssLogoLetterFooter {\n' +
  '  font-family: \'Cinzel\', serif;\n' +
  '  font-size: 3.5rem;\n' +
  '  font-weight: 800;\n' +
  '  color: #b98e46;\n' +
  '  background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);\n' +
  '  -webkit-background-clip: text;\n' +
  '  color: transparent;\n' +
  '  text-shadow: 0px 2px 4px rgba(0,0,0,0.3);\n' +
  '}\n';

  fs.writeFileSync('src/components/Footer/Footer.module.css', beforeMedia + newMediaQuery);
}
