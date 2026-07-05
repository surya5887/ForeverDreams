"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import styles from '../admin.module.css';
import { FiTrash2 } from 'react-icons/fi';

export default function GalleryPage() {
  const [categories, setCategories] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch Categories
      const catSnap = await getDocs(collection(db, 'categories'));
      const cats = [];
      catSnap.forEach((doc) => cats.push({ id: doc.id, ...doc.data() }));
      setCategories(cats);

      // Fetch Gallery Items
      const galSnap = await getDocs(collection(db, 'galleryItems'));
      const items = [];
      galSnap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !categoryId || files.length === 0) {
      alert("Title, Category, and at least one image are required.");
      return;
    }
    setIsSaving(true);

    try {
      const uploadedImageUrls = [];

      // Upload each file to Cloudinary
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadToCloudinary(formData);
        uploadedImageUrls.push(result.secure_url);
      }

      // Save to Firestore
      const newItem = {
        title,
        categoryId,
        clientName,
        location,
        year,
        description,
        images: uploadedImageUrls,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'galleryItems'), newItem);
      
      // Reset
      setTitle('');
      setCategoryId('');
      setClientName('');
      setLocation('');
      setYear('');
      setDescription('');
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      alert("Gallery item added successfully!");
      fetchData();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Error saving gallery item. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await deleteDoc(doc(db, 'galleryItems', id));
        setGalleryItems(galleryItems.filter(i => i.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Gallery Cards</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Form */}
        <div className={styles.card}>
          <h3>Add New Design Card</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label>Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Category *</label>
              <select 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="">Select a Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label>Client Name</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Year</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2026" />
            </div>

            <div className={styles.formGroup}>
              <label>Project Description (Sidebar details)</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows="4"
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>Upload Images (First image will be cover) *</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef}
                required 
              />
              {files.length > 0 && <small style={{ display: 'block', marginTop: '0.5rem', color: 'green' }}>{files.length} files selected</small>}
            </div>

            <button type="submit" className={styles.btnPrimary} disabled={isSaving || categories.length === 0}>
              {isSaving ? 'Uploading & Saving...' : 'Add Gallery Card'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3>Existing Gallery Cards</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem' }}>Loading...</p>
          ) : galleryItems.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No gallery items found.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {galleryItems.map(item => {
                const cat = categories.find(c => c.id === item.categoryId);
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                    {item.images && item.images.length > 0 && (
                      <img src={item.images[0]} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.3rem 0' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#b98e46', fontWeight: 'bold' }}>
                        {cat ? cat.name : 'Unknown Category'}
                      </span>
                      <p style={{ fontSize: '0.8rem', color: '#666', margin: '0.3rem 0 0 0' }}>
                        {item.location} • {item.images?.length || 0} images
                      </p>
                    </div>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', alignSelf: 'center' }} title="Delete">
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
