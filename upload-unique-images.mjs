import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

cloudinary.config({ 
  cloud_name: 'waqkndtu', 
  api_key: '755227162875159', 
  api_secret: 'WBEnhlmDL5iteKZ2y9wAtD_5u-8' 
});

const firebaseConfig = {
  apiKey: "AIzaSyCiyWd9WN-toJSSqrmjwTpIAoggIT8zwRU",
  authDomain: "forever-dreams-fce33.firebaseapp.com",
  projectId: "forever-dreams-fce33",
  storageBucket: "forever-dreams-fce33.firebasestorage.app",
  messagingSenderId: "423309010460",
  appId: "1:423309010460:web:d11d47df81fe6f67c1e1d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const KEYWORDS = {
  'modular-kitchen': 'kitchen',
  'living-room': 'livingroom',
  'bedroom': 'bedroom',
  'kids-bedroom': 'kidsroom',
  'wardrobe': 'wardrobe',
  'dining-room': 'diningroom',
  'pooja-room': 'temple',
  'space-saving': 'furniture',
  'home-office': 'office',
  'bathroom': 'bathroom',
  '1-bhk': 'apartment',
  '2-bhk': 'apartment',
  '3-bhk': 'apartment'
};

async function uploadAndSeed() {
  console.log('Fetching existing gallery items...');
  const catSnap = await getDocs(collection(db, 'categories'));
  const categoryMap = {}; // id -> slug
  catSnap.forEach(doc => {
    categoryMap[doc.id] = doc.data().slug;
  });

  const galSnap = await getDocs(collection(db, 'galleryItems'));
  
  let lockIndex = 1;
  const urlsByCat = {};
  
  for (const itemDoc of galSnap.docs) {
    const data = itemDoc.data();
    const catSlug = categoryMap[data.categoryId];
    
    if (catSlug) {
      const keyword = KEYWORDS[catSlug] || 'interior';
      const sourceUrl = `https://loremflickr.com/800/600/interior,${keyword}?lock=${lockIndex}`;
      lockIndex++;
      
      console.log(`Uploading for ${data.title} (${sourceUrl})...`);
      try {
        const res = await cloudinary.uploader.upload(sourceUrl, { folder: 'forever_dreams/gallery_unique' });
        console.log(`Uploaded: ${res.secure_url}`);
        
        // Update Firestore
        await updateDoc(doc(db, 'galleryItems', itemDoc.id), {
          images: [res.secure_url]
        });
        
        if (!urlsByCat[catSlug]) urlsByCat[catSlug] = [];
        urlsByCat[catSlug].push(res.secure_url);
        
      } catch (e) {
        console.error(`Error uploading for ${data.title}`, e);
      }
    }
  }

  // Save the mapping for updating seed.js later
  fs.writeFileSync('unique_urls.json', JSON.stringify(urlsByCat, null, 2));
  console.log('All unique images uploaded and database updated!');
  process.exit(0);
}

uploadAndSeed();
