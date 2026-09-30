const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, updateDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCiyWd9WN-toJSSqrmjwTpIAoggIT8zwRU",
  authDomain: "forever-dreams-fce33.firebaseapp.com",
  projectId: "forever-dreams-fce33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const dRef = doc(db, 'settings', 'general');
  const snap = await getDoc(dRef);
  if (snap.exists()) {
    console.log("Current site name:", snap.data().siteName);
    if (snap.data().siteName === 'Glossix Designs') {
      await updateDoc(dRef, { siteName: 'Glossix Design' });
      console.log('Updated to Glossix Design');
    }
  } else {
    console.log('Doc not found');
  }
  process.exit(0);
}

run();
