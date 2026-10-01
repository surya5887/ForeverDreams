const fs = require('fs');
let css = fs.readFileSync('src/components/QuotePopup/QuotePopup.module.css', 'utf8');

// Reduce mobile image height
css = css.replace(/height: 140px;/, 'height: 100px;');

// Update mobile media queries
css = css.replace(/@media \(max-width: 480px\) \{[\s\S]*?@media \(max-width: 767px\)/, \@media (max-width: 480px) {
  .rightSide {
    padding: 1rem;
    min-height: 0;
  }
  
  .formTitle {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  .buttonGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  
  .typeBtn {
    padding: 8px;
    font-size: 0.85rem;
  }
  
  .selectInput, .textInput, .phoneInput {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
  
  .submitBtn {
    padding: 12px;
    font-size: 1rem;
  }
}

@media (max-width: 767px)\);

// Also change align-items on overlay for mobile so it doesn't get cut
css = css.replace(/@media \(max-width: 767px\) \{[\s\S]*?\}/, \@media (max-width: 767px) {
  .popupContainer {
    flex-direction: column;
    max-height: 95vh;
  }
  .overlay {
    align-items: flex-start;
    padding-top: 2.5vh;
  }
}\);

fs.writeFileSync('src/components/QuotePopup/QuotePopup.module.css', css);
