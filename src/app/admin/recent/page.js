"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import styles from '../admin.module.css';
import { FiTrash2 } from 'react-icons/fi';

export default function RecentProjectsPage() {
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const snap = await getDocs(collection(db, 'recentProjects'));
      const items = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      // Sort by creation date if needed
      setRecentProjects(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Title and image are required.");
      return;
    }
    
    if (recentProjects.length >= 8) {
      alert("You can only have up to 8 recent projects. Please delete one first.");
      return;
    }

    setIsSaving(true);

    try {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadToCloudinary(formData);
      
      // Save to Firestore
      const newItem = {
        title,
        location,
        image: result.secure_url,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'recentProjects'), newItem);
      
      // Reset
      setTitle('');
      setLocation('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      alert("Recent project added successfully!");
      fetchData();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'recentProjects', id));
        setRecentProjects(recentProjects.filter(i => i.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Recent Projects</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Form */}
        <div className={styles.card}>
          <h3>Add Homepage Project</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
            These projects appear in the "Recent Work" section on the homepage. We recommend adding exactly 4 or 8 projects.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Location (Optional)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Mumbai, India" />
            </div>

            <div className={styles.formGroup}>
              <label>Cover Image (Portrait orientation recommended) *</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef}
                required 
              />
            </div>

            <button type="submit" className={styles.btnPrimary} disabled={isSaving}>
              {isSaving ? 'Uploading & Saving...' : 'Add Project'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3>Current Projects ({recentProjects.length}/8)</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem' }}>Loading...</p>
          ) : recentProjects.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No recent projects found.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentProjects.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                  {item.image && (
                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.3rem 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
                      {item.location || 'No location specified'}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', alignSelf: 'center' }} title="Delete">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
