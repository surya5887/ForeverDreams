const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'fnrtbqfx',
  api_key: '326391352514327',
  api_secret: 'RLNyc_ZTI6_HZZfhP3SWz6HuGjM',
});

const folderPath = 'C:\\\\Users\\\\AneesChaudhary\\\\Desktop\\\\Glossix';
const outputJson = 'glossix_media.json';

async function uploadFiles() {
  try {
    const files = fs.readdirSync(folderPath);
    let mediaList = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(folderPath, file);
      const isVideo = file.toLowerCase().endsWith('.mp4');
      
      console.log('Uploading ' + (i+1) + '/' + files.length + ': ' + file);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'forever_dreams/client_glossix',
          resource_type: isVideo ? 'video' : 'image'
        });
        
        mediaList.push({
          url: result.secure_url,
          type: isVideo ? 'video' : 'image',
          filename: file
        });
        console.log('Success: ' + result.secure_url);
      } catch (err) {
        console.error('Error uploading ' + file + ':', err);
      }
    }

    fs.writeFileSync(outputJson, JSON.stringify(mediaList, null, 2));
    console.log('All files processed and saved to', outputJson);
  } catch(e) {
    console.error(e);
  }
}

uploadFiles();
