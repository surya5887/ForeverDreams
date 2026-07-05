const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: 'waqkndtu', 
  api_key: '755227162875159', 
  api_secret: 'WBEnhlmDL5iteKZ2y9wAtD_5u-8' 
});

const IMAGES = {
  'modular-kitchen': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800',
  'living-room': 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?q=80&w=800',
  'bedroom': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800',
  'kids-bedroom': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
  'wardrobe': 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800',
  'dining-room': 'https://images.unsplash.com/photo-1617806118233-18e1ce8e3d81?q=80&w=800',
  'pooja-room': 'https://images.unsplash.com/photo-1585002621455-d0c75c87a5dc?q=80&w=800',
  'space-saving': 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?q=80&w=800',
  'home-office': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800',
  'bathroom': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800',
  '1-bhk': 'https://images.unsplash.com/photo-1502672260266-1c1de242488a?q=80&w=800',
  '2-bhk': 'https://images.unsplash.com/photo-1493809842364-78817add7ff6?q=80&w=800',
  '3-bhk': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800'
};

async function uploadAll() {
  const result = {};
  for (const [cat, url] of Object.entries(IMAGES)) {
    try {
      console.log(`Uploading ${cat}...`);
      const res = await cloudinary.uploader.upload(url, { folder: 'forever_dreams/gallery' });
      result[cat] = res.secure_url;
      console.log(`Success: ${res.secure_url}`);
    } catch (e) {
      console.error(`Failed to upload ${cat}`, e);
    }
  }
  fs.writeFileSync('uploaded_urls.json', JSON.stringify(result, null, 2));
  console.log('All done!');
}

uploadAll();
