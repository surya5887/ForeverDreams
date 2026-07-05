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
  "modular-kitchen": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272136/forever_dreams/gallery_unique/dmspxwpjas9rnoavx7wg.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272154/forever_dreams/gallery_unique/tyjx3lexbzyef2g4xfmz.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272204/forever_dreams/gallery_unique/tlzwjxgywm0yiv1esmq1.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272215/forever_dreams/gallery_unique/cvmmti80nb4urgoo4be9.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272250/forever_dreams/gallery_unique/myaxouki3pacrytr0lab.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272302/forever_dreams/gallery_unique/xrtjp7zs1qwq9kzszesj.jpg"
  ],
  "living-room": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272175/forever_dreams/gallery_unique/bbshzjpjfsna77syd3k8.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272177/forever_dreams/gallery_unique/fzhlmtbhkjctqtyodety.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272193/forever_dreams/gallery_unique/r7z79yswplkpou6xwkys.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272224/forever_dreams/gallery_unique/zi4fc2tpoqzxb6afzakf.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272273/forever_dreams/gallery_unique/uedjnyb2r9p6tqrjhzzx.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272306/forever_dreams/gallery_unique/qkpgtlqwmvps8ymciohg.jpg"
  ],
  "bedroom": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272117/forever_dreams/gallery_unique/mmagugaiq8rxdflib9bs.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272120/forever_dreams/gallery_unique/sdld22tiolzweqlqpxt9.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272190/forever_dreams/gallery_unique/edp5bmbw6k2h517mwt6k.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272217/forever_dreams/gallery_unique/r28bll0td7j1j3h7vj9f.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272290/forever_dreams/gallery_unique/sysevwmiunjikvfpf97s.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272316/forever_dreams/gallery_unique/gcsgk7qzcfn7pbo795rm.jpg"
  ],
  "kids-bedroom": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272123/forever_dreams/gallery_unique/rtd2dffp5e92y7u9zxtu.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272125/forever_dreams/gallery_unique/swqg4k8iue4x46swm51a.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272207/forever_dreams/gallery_unique/a2ty3aotw63jov2tuy66.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272263/forever_dreams/gallery_unique/cbbrfuvokrlle54pgqyw.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272265/forever_dreams/gallery_unique/ajwomfkjdqqdgxeozgz9.jpg"
  ],
  "wardrobe": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272144/forever_dreams/gallery_unique/sjrkcvf94k37w8fbygln.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272179/forever_dreams/gallery_unique/vlvz4w0x9aj3k8uhj8du.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272184/forever_dreams/gallery_unique/znjtzmplfm5w6fg2ysyz.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272209/forever_dreams/gallery_unique/yh5g76nowgli6nmrxddq.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272288/forever_dreams/gallery_unique/ifi67yqdzghpatgjgnj1.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272311/forever_dreams/gallery_unique/at4ruotwizerfde7xjf4.jpg"
  ],
  "dining-room": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272150/forever_dreams/gallery_unique/znqeesfsgawbirx6pcbb.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272171/forever_dreams/gallery_unique/sgzcunvnxx6fnefkpj89.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272268/forever_dreams/gallery_unique/zjh1kqvx84pibtjzgdnx.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272271/forever_dreams/gallery_unique/kmunduur26fupomctnhk.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272276/forever_dreams/gallery_unique/hbm4gfoumruk5eq2pznj.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272324/forever_dreams/gallery_unique/u1nub9fl9nfzdjmcungu.jpg"
  ],
  "pooja-room": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272128/forever_dreams/gallery_unique/tllwdb8yryd6s1ym2y0u.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272147/forever_dreams/gallery_unique/uokix1r6wzomfowpwe0u.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272222/forever_dreams/gallery_unique/bwen6pkyqqnvhxqmufsg.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272234/forever_dreams/gallery_unique/ncxyqoi5ldwvdagl2wz4.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272314/forever_dreams/gallery_unique/tbhlyv0dhyhysbkt0ucq.jpg"
  ],
  "space-saving": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272132/forever_dreams/gallery_unique/yelbmbgdsalrfqmdmnlj.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272152/forever_dreams/gallery_unique/wyw9w3fqajkxxldb2h3b.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272198/forever_dreams/gallery_unique/zz2wgwuwiprj6brvz2rc.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272247/forever_dreams/gallery_unique/xbjmypg6pfatmrf1uynz.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272281/forever_dreams/gallery_unique/nvwyctnjlpnozqlg9wpb.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272298/forever_dreams/gallery_unique/zbubjtz6fbnkqcqe7kuu.jpg"
  ],
  "home-office": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272201/forever_dreams/gallery_unique/v7ksxu0of1iuy17wzepz.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272240/forever_dreams/gallery_unique/jzei4o0duneurmfjv95e.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272243/forever_dreams/gallery_unique/vxtcq9192v1koiwcbhvo.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272255/forever_dreams/gallery_unique/mtwa0bonhfpqxenu9j37.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272285/forever_dreams/gallery_unique/ivpzqrrekhfuj7uxchdo.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272327/forever_dreams/gallery_unique/mre1nrahjhrgaavyecqd.jpg"
  ],
  "bathroom": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272166/forever_dreams/gallery_unique/ubzo9fpidxkvuqh7f1kl.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272212/forever_dreams/gallery_unique/uqdfpgulugiyym2drl49.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272278/forever_dreams/gallery_unique/mqv2awqagf8iuppcqsjx.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272300/forever_dreams/gallery_unique/noe7cxd5t7uvcfgyjilv.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272318/forever_dreams/gallery_unique/vdkodj2fqn2aa6ns4bb0.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272321/forever_dreams/gallery_unique/d60peqvexnklbnkj0ljq.jpg"
  ],
  "1-bhk": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272140/forever_dreams/gallery_unique/qsgub15yp44wkas0eyjr.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272182/forever_dreams/gallery_unique/vicdsf6dddxhcnymo2gx.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272195/forever_dreams/gallery_unique/mjzj4zucpdu3pttwyffv.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272227/forever_dreams/gallery_unique/ehtxitvnmxrmscshycme.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272260/forever_dreams/gallery_unique/xewvyak26wcmlign6yuq.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272308/forever_dreams/gallery_unique/uvtyouxusv3kn0gx2qdl.jpg"
  ],
  "2-bhk": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272156/forever_dreams/gallery_unique/rhmaydd7trntjfi93rpm.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272159/forever_dreams/gallery_unique/ihuliuk2fl5pbbkxuu7b.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272164/forever_dreams/gallery_unique/kxcqfemfjxewkice4tgh.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272187/forever_dreams/gallery_unique/b1x9nvoqeugmanj9wf9a.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272229/forever_dreams/gallery_unique/ni1keed1qaifm8xhqpu3.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272283/forever_dreams/gallery_unique/gohpetp6mk42ldvxzarh.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272293/forever_dreams/gallery_unique/utgd7ycgz1ifajldqoio.jpg"
  ],
  "3-bhk": [
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272219/forever_dreams/gallery_unique/z6jkthhcylpmlhu4epw3.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272237/forever_dreams/gallery_unique/jtliqzad0wuy1ehjmsxa.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272245/forever_dreams/gallery_unique/wsxwbo8drilx0d4p1mvm.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272253/forever_dreams/gallery_unique/utouz0utsj9upwiy8hmt.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272257/forever_dreams/gallery_unique/guaqnhz6tzj2en7sc9v7.jpg",
    "https://res.cloudinary.com/waqkndtu/image/upload/v1783272295/forever_dreams/gallery_unique/rulu6ejcumyjfvssw50c.jpg"
  ]
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
        const categoryImageUrls = CATEGORY_IMAGES[cat.id] || [];
        
        for (let i = 1; i <= 2; i++) {
          const imgUrl = categoryImageUrls[i - 1] || 'https://picsum.photos/seed/gal1/800/600';
          await addDoc(collection(db, 'galleryItems'), {
            categoryId: firebaseCatId,
            title: `${cat.name} Design ${i}`,
            clientName: 'Sample Client',
            location: 'Delhi NCR',
            year: '2025',
            description: `A stunning modern ${cat.name.toLowerCase()} design.`,
            images: [imgUrl],
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
