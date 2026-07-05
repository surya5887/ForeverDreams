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

const images = [
  // local
  'c:/Users/Anees Chaudhary/Desktop/ForeverDreams/public/hero-bg.png',
  // services
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'https://images.unsplash.com/photo-1556910103-1c02745a8728?w=800&q=80',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  // recent work
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  // bento
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80',
  'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  'https://images.unsplash.com/photo-1617806118233-18e1c094f964?w=1000&q=80',
  // phil
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  // users
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
];

async function upload() {
  const resultObj = {};
  for (const img of images) {
    try {
      console.log('Uploading: ', img);
      const result = await cloudinary.uploader.upload(img, {
        folder: 'forever_dreams/home'
      });
      // Optimize delivery format and quality automatically
      const optimizedUrl = result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      resultObj[img] = optimizedUrl;
    } catch (e) {
      console.error('Failed: ', img, e.message);
    }
  }
  fs.writeFileSync('c:/Users/Anees Chaudhary/Desktop/ForeverDreams/cloudinary-links.json', JSON.stringify(resultObj, null, 2));
  console.log('Done uploading, results saved to cloudinary-links.json');
}

upload();
