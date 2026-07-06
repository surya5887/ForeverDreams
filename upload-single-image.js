const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const envLocal = fs.readFileSync('c:/Users/Anees Chaudhary/Desktop/ForeverDreams/.env.local', 'utf-8');
const env = envLocal.split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key && val) acc[key.trim()] = val.replace(/"/g, '').trim();
  return acc;
}, {});

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});
const newImage = process.argv[2] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg';

async function upload() {
  try {
    console.log('Uploading: ', newImage);
    const result = await cloudinary.uploader.upload(newImage, {
      folder: 'forever_dreams/home'
    });
    const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    console.log('Success URL:', optimizedUrl);
  } catch (e) {
    console.error('Failed: ', e.message);
  }
}

upload();
