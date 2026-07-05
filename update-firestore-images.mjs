import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

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

const CATEGORY_IMAGES = {
  'modular-kitchen': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271725/forever_dreams/gallery/s26nper78bnirvylnkvk.jpg',
  'living-room': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258294/forever_dreams/home/z7kt6zfn17iqsq5vitiq.jpg',
  'bedroom': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271726/forever_dreams/gallery/y7nysauhogytxmgz3gtl.jpg',
  'kids-bedroom': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271727/forever_dreams/gallery/okx4hby684lcmgq2dk42.jpg',
  'wardrobe': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271728/forever_dreams/gallery/orrdm4qvrfxainq3iqyn.jpg',
  'dining-room': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258287/forever_dreams/home/u0ksx3rcw5cicmmgg6hi.jpg',
  'pooja-room': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258288/forever_dreams/home/p0dwuoqs1psbgzacpkjn.jpg',
  'space-saving': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258289/forever_dreams/home/e5i4tdncsmwixg2s934p.jpg',
  'home-office': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271732/forever_dreams/gallery/jifmmyibafnciyo17ii0.jpg',
  'bathroom': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271732/forever_dreams/gallery/pm6z33o1evabw1nam0ed.jpg',
  '1-bhk': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258295/forever_dreams/home/jnkbabjs9ofhznox9dr3.jpg',
  '2-bhk': 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258297/forever_dreams/home/pi202ukiqeffnahthaiy.jpg',
  '3-bhk': 'https://res.cloudinary.com/waqkndtu/image/upload/v1783271735/forever_dreams/gallery/xdukpzyr7fobpxghqspd.jpg'
};

async function run() {
  console.log('Fetching categories...');
  const catSnap = await getDocs(collection(db, 'categories'));
  const categoryMap = {}; // id -> slug
  catSnap.forEach(doc => {
    categoryMap[doc.id] = doc.data().slug;
  });

  console.log('Fetching gallery items...');
  const galSnap = await getDocs(collection(db, 'galleryItems'));
  
  let count = 0;
  for (const itemDoc of galSnap.docs) {
    const data = itemDoc.data();
    const catSlug = categoryMap[data.categoryId];
    
    if (catSlug && CATEGORY_IMAGES[catSlug]) {
      const img = CATEGORY_IMAGES[catSlug];
      // Check if it already has this image
      if (!data.images || data.images[0] !== img || data.images[0].includes('picsum')) {
        console.log(`Updating item ${itemDoc.id} (${data.title}) to use image for ${catSlug}`);
        await updateDoc(doc(db, 'galleryItems', itemDoc.id), {
          images: [img]
        });
        count++;
      }
    }
  }

  console.log(`Successfully updated ${count} items!`);
  process.exit(0);
}

run().catch(console.error);
