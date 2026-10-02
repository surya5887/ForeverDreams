const fs = require('fs');
let code = fs.readFileSync('src/components/Footer/Footer.js', 'utf8');
const regex = /<div style=\{\{ width: '100%', textAlign: 'center', marginBottom: '1rem', color: '#888', fontSize: '0.8rem', lineHeight: '1.5' \}\}>[\s\S]*?<\/div>/;
const replacement = '<div style={{ width: \'100%\', textAlign: \'center\', marginBottom: \'1.5rem\', marginTop: \'1rem\', padding: \'15px 0\', borderTop: \'1px solid rgba(185, 142, 70, 0.2)\', borderBottom: \'1px solid rgba(185, 142, 70, 0.2)\' }}>\n' +
'          <p style={{ color: \'#b98e46\', fontSize: \'0.9rem\', fontWeight: \'600\', marginBottom: \'8px\', letterSpacing: \'1px\', textTransform: \'uppercase\' }}>Top Rated Interior Designer Serving</p>\n' +
'          <p style={{ color: \'#a0aec0\', fontSize: \'0.8rem\', lineHeight: \'1.8\', maxWidth: \'900px\', margin: \'0 auto\' }}>\n' +
'            Noida <span style={{color:\'#b98e46\'}}>|</span> Greater Noida <span style={{color:\'#b98e46\'}}>|</span> Noida Extension <span style={{color:\'#b98e46\'}}>|</span> Delhi NCR <span style={{color:\'#b98e46\'}}>|</span> New Delhi <span style={{color:\'#b98e46\'}}>|</span> Gurugram <span style={{color:\'#b98e46\'}}>|</span> Ghaziabad <span style={{color:\'#b98e46\'}}>|</span> Faridabad <span style={{color:\'#b98e46\'}}>|</span> Meerut <span style={{color:\'#b98e46\'}}>|</span> Hapur <span style={{color:\'#b98e46\'}}>|</span> Bulandshahr <span style={{color:\'#b98e46\'}}>|</span> Aligarh <span style={{color:\'#b98e46\'}}>|</span> Mathura <span style={{color:\'#b98e46\'}}>|</span> Agra <span style={{color:\'#b98e46\'}}>|</span> Muzaffarnagar <span style={{color:\'#b98e46\'}}>|</span> Saharanpur <span style={{color:\'#b98e46\'}}>|</span> Roorkee <span style={{color:\'#b98e46\'}}>|</span> Dehradun <span style={{color:\'#b98e46\'}}>|</span> Western UP\n' +
'          </p>\n' +
'        </div>';
if (code.match(regex)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/Footer/Footer.js', code);
} else {
  console.log('Regex not found');
}
