"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import styles from '../admin.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function GalleryPage() {
  const [categories, setCategories] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
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
      const seenCatSlugs = new Set();
      catSnap.forEach((doc) => {
        const data = doc.data();
        if (!seenCatSlugs.has(data.slug)) {
          seenCatSlugs.add(data.slug);
          cats.push({ id: doc.id, ...data });
        }
      });
      const CATEGORY_ORDER = [
        'Modular Kitchen', 'Living Room', 'Bedroom', 'Wardrobe', 
        'Kids Bedroom', 'Bathroom', 'Home Office', 'Dining Room', 
        'Pooja Room', '1 BHK Interior', '2 BHK Interior', '3 BHK Interior'
      ];
      const filteredCats = cats.filter(cat => CATEGORY_ORDER.includes(cat.name));
      filteredCats.sort((a, b) => {
        return CATEGORY_ORDER.indexOf(a.name) - CATEGORY_ORDER.indexOf(b.name);
      });
      setCategories(filteredCats);

      // Fetch Gallery Items
      const galSnap = await getDocs(collection(db, 'galleryItems'));
      const items = [];
      galSnap.forEach((doc) => {
        const data = doc.data();
        items.push({ id: doc.id, ...data });
      });
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
    if (!title || !categoryId) {
      alert("Title and Category are required.");
      return;
    }
    
    if (!editingId && files.length === 0) {
      alert("At least one image is required for new items.");
      return;
    }

    setIsSaving(true);

    try {
      const uploadedImageUrls = [];

      // Upload each file to Cloudinary
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadToCloudinary(formData);
          uploadedImageUrls.push(result.secure_url);
        }
      }

      if (editingId) {
        const updateData = { title, categoryId };
        if (uploadedImageUrls.length > 0) {
          updateData.images = uploadedImageUrls; // Note: This replaces old images, for simplicity
        }
        await updateDoc(doc(db, 'galleryItems', editingId), updateData);
        alert("Gallery item updated successfully!");
      } else {
        const newItem = {
          title,
          categoryId,
          images: uploadedImageUrls,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'galleryItems'), newItem);
        alert("Gallery item added successfully!");
      }
      
      // Reset
      setTitle('');
      setCategoryId('');
      setFiles([]);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchData();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Error saving gallery item. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setCategoryId(item.categoryId);
    setEditingId(item.id);
    setFiles([]); // Require re-uploading if they want to change images
    if (fileInputRef.current) fileInputRef.current.value = "";
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

      <div className={styles.twoColGrid}>
        {/* Form */}
        <div className={styles.card}>
          <h3 style={{ color: '#333' }}>{editingId ? 'Edit Design Card' : 'Add New Design Card'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ color: '#333' }} />
            </div>
            
            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Category *</label>
              <select 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)} 
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', color: '#333' }}
              >
                <option value="">Select a Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>



            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Upload Images (First image will be cover) {!editingId && '*'}</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef}
                required={!editingId}
                style={{ color: '#333' }}
              />
              {files.length > 0 && <small style={{ display: 'block', marginTop: '0.5rem', color: 'green' }}>{files.length} files selected</small>}
              {editingId && <small style={{ color: '#666', marginTop: '0.5rem', display: 'block' }}>Leave blank to keep existing images. Uploading will replace them.</small>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className={styles.btnPrimary} disabled={isSaving || categories.length === 0}>
                {isSaving ? 'Saving...' : editingId ? 'Update Card' : 'Add Gallery Card'}
              </button>
              {editingId && (
                <button type="button" className={styles.btnSecondary} onClick={() => { 
                  setEditingId(null); setTitle(''); setCategoryId(''); setFiles([]); if(fileInputRef.current) fileInputRef.current.value=''; 
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3 style={{ color: '#333' }}>Existing Gallery Cards</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem', color: '#333' }}>Loading...</p>
          ) : galleryItems.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No gallery items found.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {galleryItems.map(item => {
                const cat = categories.find(c => c.id === item.categoryId);
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0]} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                      <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '12px' }}>No Img</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.3rem 0', color: '#333' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#b98e46', fontWeight: 'bold' }}>
                        {cat ? cat.name : 'Unknown Category'}
                      </span>
                      <p style={{ fontSize: '0.8rem', color: '#666', margin: '0.3rem 0 0 0' }}>
                        {item.location} • {item.images?.length || 0} images
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'center' }}>
                      <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b98e46', padding: '0.5rem' }} title="Edit">
                        <FiEdit2 size={20} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', padding: '0.5rem' }} title="Delete">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
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
