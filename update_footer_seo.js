const fs = require('fs');
let code = fs.readFileSync('src/components/Footer/Footer.js', 'utf8');

const regex = /<div style=\{\{ width: '100%', textAlign: 'center', marginBottom: '1rem', color: '#999', fontSize: '0.85rem' \}\}>[\s\S]*?<\/div>/;

const replacement = "<div style={{ width: '100%', textAlign: 'center', marginBottom: '1rem', color: '#888', fontSize: '0.8rem', lineHeight: '1.5' }}>\n" +
"          <strong>Top Rated Interior Designer Serving:</strong> Noida • Greater Noida • Noida Extension • Delhi NCR • New Delhi • Gurugram (Gurgaon) • Ghaziabad • Faridabad • Meerut • Hapur • Bulandshahr • Aligarh • Mathura • Agra • Muzaffarnagar • Saharanpur • Roorkee • Dehradun • Western UP\n" +
"        </div>";

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/Footer/Footer.js', code);
