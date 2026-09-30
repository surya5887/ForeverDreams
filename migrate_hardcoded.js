const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'fnrtbqfx',
  api_key: '326391352514327',
  api_secret: 'RLNyc_ZTI6_HZZfhP3SWz6HuGjM',
});

async function run() {
  const file = 'src/app/page.js';
  let content = fs.readFileSync(file, 'utf8');
  const regex = /https:\/\/res\.cloudinary\.com\/waqkndtu\/image\/upload\/[^"'\s]+/g;
  const urls = [...new Set(content.match(regex) || [])];

  console.log('Found URLs to migrate:', urls.length);
  
  for (const oldUrl of urls) {
    console.log('Migrating:', oldUrl);
    try {
      const result = await cloudinary.uploader.upload(oldUrl, {
        folder: "forever_dreams"
      });
      const newUrl = result.secure_url;
      console.log('New URL:', newUrl);
      
      // Replace in content
      content = content.split(oldUrl).join(newUrl);
    } catch (err) {
      console.error('Failed for', oldUrl, err);
    }
  }

  fs.writeFileSync(file, content);
  console.log('Done updating page.js');
}

run();
