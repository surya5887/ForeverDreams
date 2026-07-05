"use client";

import { useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const CATEGORIES = [
  { id: 'modular-kitchen', name: 'Modular Kitchen' },
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kids-bedroom', name: 'Kids Bedroom' },
  { id: 'wardrobe', name: 'Wardrobe' },
  { id: 'dining-room', name: 'Dining Room' },
  { id: 'pooja-room', name: 'Pooja Room' },
  { id: 'space-saving', name: 'Space Saving' },
  { id: 'home-office', name: 'Home Office' },
  { id: 'bathroom', name: 'Bathroom' },
  { id: '1-bhk', name: '1 BHK Interior' },
  { id: '2-bhk', name: '2 BHK Interior' },
  { id: '3-bhk', name: '3 BHK Interior' }
];

const RECENT_PROJECTS = [
  { title: 'Modern Living Room', location: 'Meerut', imageUrl: 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258290/forever_dreams/home/rfsm5hkug7ary3rdls7m.jpg' },
  { title: 'Luxury Bedroom', location: 'Noida', imageUrl: 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258291/forever_dreams/home/xi7mmmxwd4gf5njvi6bq.jpg' },
  { title: 'Elegant Kitchen', location: 'Delhi', imageUrl: 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258292/forever_dreams/home/ekqyrpv1zjvze8wiff2p.jpg' },
  { title: 'Contemporary Office', location: 'Gurugram', imageUrl: 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258293/forever_dreams/home/rajqvbq7p8pihihduqev.jpg' }
];

const GALLERY_IMAGES = [
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258290/forever_dreams/home/rfsm5hkug7ary3rdls7m.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258291/forever_dreams/home/xi7mmmxwd4gf5njvi6bq.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258292/forever_dreams/home/ekqyrpv1zjvze8wiff2p.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258293/forever_dreams/home/rajqvbq7p8pihihduqev.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258294/forever_dreams/home/z7kt6zfn17iqsq5vitiq.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258295/forever_dreams/home/jnkbabjs9ofhznox9dr3.jpg',
  'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783258297/forever_dreams/home/pi202ukiqeffnahthaiy.jpg'
];

export default function SeedPage() {
  const [status, setStatus] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    setStatus('Seeding started...');

    try {
      // 1. Seed Categories & keep map of their new Firebase IDs
      const categoryMap = {};
      setStatus('Adding categories...');
      for (const cat of CATEGORIES) {
        const docRef = await addDoc(collection(db, 'categories'), {
          name: cat.name,
          slug: cat.id,
          createdAt: new Date()
        });
        categoryMap[cat.id] = docRef.id; // Map original slug to new Firebase doc ID
      }

      // 2. Seed Recent Projects
      setStatus('Adding recent projects...');
      for (const proj of RECENT_PROJECTS) {
        await addDoc(collection(db, 'recentProjects'), {
          title: proj.title,
          location: proj.location,
          imageUrl: proj.imageUrl,
          createdAt: new Date()
        });
      }

      // 3. Seed Gallery Items (2 items per category)
      setStatus('Adding gallery items...');
      let imgIndex = 0;
      for (const cat of CATEGORIES) {
        const firebaseCatId = categoryMap[cat.id];
        for (let i = 1; i <= 2; i++) {
          await addDoc(collection(db, 'galleryItems'), {
            categoryId: firebaseCatId,
            title: `${cat.name} Design ${i}`,
            clientName: 'Sample Client',
            location: 'Delhi NCR',
            year: '2025',
            description: `A stunning modern ${cat.name.toLowerCase()} design.`,
            images: [GALLERY_IMAGES[imgIndex % GALLERY_IMAGES.length]],
            createdAt: new Date()
          });
          imgIndex++;
        }
      }

      setStatus('Seeding completed successfully! You can now check the Admin Panel.');
    } catch (error) {
      console.error(error);
      setStatus('Error during seeding: ' + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Database Seeder</h1>
      <p>This will migrate all the hardcoded categories, gallery items, and recent projects into Firebase.</p>
      
      <button 
        onClick={handleSeed} 
        disabled={isSeeding}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#d4af37',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isSeeding ? 'Seeding...' : 'Seed Database Now'}
      </button>

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>
    </div>
  );
}
