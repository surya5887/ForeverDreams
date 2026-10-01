const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'fnrtbqfx',
  api_key: '326391352514327',
  api_secret: 'RLNyc_ZTI6_HZZfhP3SWz6HuGjM',
});

const baseFolderPath = 'C:\\\\Users\\\\AneesChaudhary\\\\Desktop\\\\Glossix';
const outputJson = 'glossix_media.json';

// Read existing JSON
let mediaList = [];
if (fs.existsSync(outputJson)) {
  mediaList = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
}

async function uploadFiles(folderPath) {
  const items = fs.readdirSync(folderPath);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      console.log('Entering directory: ' + item);
      await uploadFiles(fullPath);
    } else {
      // Check if already uploaded
      if (mediaList.some(m => m.filename === item)) {
        console.log('Skipping already uploaded file: ' + item);
        continue;
      }

      const isVideo = item.toLowerCase().endsWith('.mp4');
      console.log('Uploading: ' + item);
      
      try {
        const result = await cloudinary.uploader.upload(fullPath, {
          folder: 'forever_dreams/client_glossix',
          resource_type: isVideo ? 'video' : 'image'
        });
        
        mediaList.push({
          url: result.secure_url,
          type: isVideo ? 'video' : 'image',
          filename: item
        });
        console.log('Success: ' + result.secure_url);
        // Save intermediate
        fs.writeFileSync(outputJson, JSON.stringify(mediaList, null, 2));
      } catch (err) {
        console.error('Error uploading ' + item + ':', err.message);
      }
    }
  }
}

async function run() {
  try {
    await uploadFiles(baseFolderPath);
    console.log('All missing files processed and saved.');
  } catch(e) {
    console.error(e);
  }
}

run();
