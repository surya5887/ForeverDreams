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
  {
    title: "Modern Villa Interior",
    location: "Meerut",
    category: "Residential",
    description: "A complete interior makeover of a 4BHK villa with contemporary design elements, custom furniture, and smart home integration.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265386/forever_dreams/portfolio/proj_1_1783265382435.jpg"
  },
  {
    title: "Corporate Office Design",
    location: "Noida",
    category: "Commercial",
    description: "Designed a 5000 sq ft office space with open workstations, conference rooms, and a stunning reception area.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265387/forever_dreams/portfolio/proj_2_1783265387094.jpg"
  },
  {
    title: "Luxury Apartment",
    location: "Delhi",
    category: "Residential",
    description: "Premium 3BHK apartment featuring Italian marble flooring, custom lighting, and bespoke furniture throughout.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265389/forever_dreams/portfolio/proj_3_1783265388280.jpg"
  },
  {
    title: "Restaurant Interior",
    location: "Gurugram",
    category: "Commercial",
    description: "A fine-dining restaurant with ambient lighting, custom seating, and a sophisticated bar area design.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265390/forever_dreams/portfolio/proj_4_1783265389436.jpg"
  },
  {
    title: "3 BHK Flat Makeover",
    location: "Meerut",
    category: "Residential",
    description: "Complete renovation of a 3BHK flat with modular kitchen, false ceilings, and space-saving storage solutions.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265391/forever_dreams/portfolio/proj_5_1783265390472.jpg"
  },
  {
    title: "Boutique Hotel Lobby",
    location: "Delhi",
    category: "Commercial",
    description: "Luxurious hotel lobby design featuring crystal chandeliers, premium seating, and a grand reception desk.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265392/forever_dreams/portfolio/proj_6_1783265391608.jpg"
  },
  {
    title: "Farmhouse Renovation",
    location: "Greater Noida",
    category: "Residential",
    description: "Rustic-modern farmhouse interior with exposed brick walls, wooden beams, and contemporary furnishings.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265394/forever_dreams/portfolio/proj_7_1783265393047.jpg"
  },
  {
    title: "Dental Clinic Interior",
    location: "Meerut",
    category: "Commercial",
    description: "Calm and professional clinic design with soothing colors, ergonomic furniture, and patient-friendly layout.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265396/forever_dreams/portfolio/proj_8_1783265395437.jpg"
  },
  {
    title: "Penthouse Design",
    location: "Noida",
    category: "Residential",
    description: "Ultra-luxury penthouse with panoramic views, designer furniture, home theater, and private terrace garden.",
    imageUrl: "https://res.cloudinary.com/waqkndtu/image/upload/v1783265398/forever_dreams/portfolio/proj_9_1783265396907.jpg"
  }
];

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
          category: proj.category,
          description: proj.description,
          imageUrl: proj.imageUrl,
          createdAt: new Date()
        });
      }

      // 3. Seed Gallery Items (2 items per category)
      setStatus('Adding gallery items...');
      for (const cat of CATEGORIES) {
        const firebaseCatId = categoryMap[cat.id];
        const categoryImageUrl = CATEGORY_IMAGES[cat.id] || 'https://picsum.photos/seed/gal1/800/600';
        
        for (let i = 1; i <= 2; i++) {
          await addDoc(collection(db, 'galleryItems'), {
            categoryId: firebaseCatId,
            title: `${cat.name} Design ${i}`,
            clientName: 'Sample Client',
            location: 'Delhi NCR',
            year: '2025',
            description: `A stunning modern ${cat.name.toLowerCase()} design.`,
            images: [categoryImageUrl],
            createdAt: new Date()
          });
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
