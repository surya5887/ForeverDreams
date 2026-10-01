const fs = require('fs');
let css = fs.readFileSync('src/components/QuotePopup/QuotePopup.module.css', 'utf8');

const mediaQueriesIndex = css.indexOf('@media (max-width: 480px)');
if(mediaQueriesIndex !== -1) {
  const replacement = '@media (max-width: 480px) {\n' +
  '  .rightSide {\n' +
  '    padding: 1rem;\n' +
  '    min-height: 0;\n' +
  '  }\n' +
  '  .form {\n' +
  '    gap: 0.8rem;\n' +
  '  }\n' +
  '  .formTitle {\n' +
  '    font-size: 1.4rem;\n' +
  '    margin-bottom: 0.5rem;\n' +
  '  }\n' +
  '  .formGroup {\n' +
  '    gap: 0.3rem;\n' +
  '  }\n' +
  '  .buttonGroup {\n' +
  '    display: grid;\n' +
  '    grid-template-columns: 1fr 1fr;\n' +
  '    gap: 6px;\n' +
  '  }\n' +
  '  .typeBtn {\n' +
  '    padding: 8px;\n' +
  '    font-size: 0.85rem;\n' +
  '  }\n' +
  '  .selectInput, .textInput, .phoneInput {\n' +
  '    padding: 10px 12px;\n' +
  '    font-size: 0.95rem;\n' +
  '  }\n' +
  '  .submitBtn {\n' +
  '    padding: 12px;\n' +
  '    font-size: 1rem;\n' +
  '    margin-top: 0.2rem;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  '@media (max-width: 767px) {\n' +
  '  .popupContainer {\n' +
  '    flex-direction: column;\n' +
  '    max-height: 95vh;\n' +
  '  }\n' +
  '  .overlay {\n' +
  '    align-items: flex-start;\n' +
  '    padding-top: 2.5vh;\n' +
  '  }\n' +
  '}\n';

  css = css.substring(0, mediaQueriesIndex) + replacement;
  fs.writeFileSync('src/components/QuotePopup/QuotePopup.module.css', css);
}
