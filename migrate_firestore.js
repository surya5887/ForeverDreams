const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, setDoc, getDoc } = require('firebase/firestore');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'fnrtbqfx',
  api_key: '326391352514327',
  api_secret: 'RLNyc_ZTI6_HZZfhP3SWz6HuGjM',
});

const firebaseConfig = {
  apiKey: "AIzaSyCiyWd9WN-toJSSqrmjwTpIAoggIT8zwRU",
  authDomain: "forever-dreams-fce33.firebaseapp.com",
  projectId: "forever-dreams-fce33",
  storageBucket: "forever-dreams-fce33.firebasestorage.app",
  messagingSenderId: "423309010460",
  appId: "1:423309010460:web:d11d47df81fe6f67c1e1d9",
  measurementId: "G-E87Q4B0L5S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadToNewCloudinary(url) {
  if (!url || typeof url !== 'string' || !url.includes('waqkndtu')) return url;
  console.log('Migrating:', url);
  try {
    const result = await cloudinary.uploader.upload(url, { folder: "forever_dreams" });
    return result.secure_url;
  } catch (err) {
    console.error('Failed to migrate', url, err.message);
    return url;
  }
}

async function migrateCollection(collectionName) {
  console.log('--- Migrating collection:', collectionName);
  const snap = await getDocs(collection(db, collectionName));
  for (const document of snap.docs) {
    const data = document.data();
    let updated = false;

    if (data.image && typeof data.image === 'string' && data.image.includes('waqkndtu')) {
      data.image = await uploadToNewCloudinary(data.image);
      updated = true;
    }

    if (data.images && Array.isArray(data.images)) {
      for (let i = 0; i < data.images.length; i++) {
        if (data.images[i] && typeof data.images[i] === 'string' && data.images[i].includes('waqkndtu')) {
          data.images[i] = await uploadToNewCloudinary(data.images[i]);
          updated = true;
        }
      }
    }

    if (updated) {
      console.log('Updating document:', document.id);
      await updateDoc(doc(db, collectionName, document.id), data);
    }
  }
}

async function migrateHeroSettings() {
  console.log('--- Migrating heroImages in settings');
  const dRef = doc(db, 'settings', 'heroImages');
  const snap = await getDoc(dRef);
  if (snap.exists()) {
    const data = snap.data();
    let updated = false;
    if (data.images && Array.isArray(data.images)) {
      for (let i = 0; i < data.images.length; i++) {
        if (data.images[i] && typeof data.images[i] === 'string' && data.images[i].includes('waqkndtu')) {
          data.images[i] = await uploadToNewCloudinary(data.images[i]);
          updated = true;
        }
      }
    }
    if (updated) {
      console.log('Updating heroImages setting');
      await updateDoc(dRef, data);
    }
  }
}

async function run() {
  await migrateCollection('categories');
  await migrateCollection('galleryItems');
  await migrateCollection('recentProjects');
  await migrateHeroSettings();
  console.log('All migrations completed!');
  process.exit(0);
}

run();
