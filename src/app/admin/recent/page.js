"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../lib/cloudinary';
import styles from '../admin.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function RecentProjectsPage() {
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
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
    if (!title) {
      alert("Title is required.");
      return;
    }
    
    if (!editingId && recentProjects.length >= 8) {
      alert("You can only have up to 8 recent projects. Please delete one first.");
      return;
    }

    if (!editingId && !file) {
      alert("Image is required for new projects.");
      return;
    }

    setIsSaving(true);

    try {
      let uploadedUrl = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadToCloudinary(formData);
        uploadedUrl = result.secure_url;
      }
      
      if (editingId) {
        const updateData = { title, location };
        if (uploadedUrl) updateData.image = uploadedUrl;
        await updateDoc(doc(db, 'recentProjects', editingId), updateData);
        alert("Project updated successfully!");
      } else {
        const newItem = {
          title,
          location,
          image: uploadedUrl,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'recentProjects'), newItem);
        alert("Recent project added successfully!");
      }
      
      // Reset
      setTitle('');
      setLocation('');
      setFile(null);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchData();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setLocation(item.location || '');
    setEditingId(item.id);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          <h3 style={{ color: '#333' }}>{editingId ? 'Edit Project' : 'Add Homepage Project'}</h3>
          {!editingId && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              These projects appear in the "Recent Work" section on the homepage. We recommend adding exactly 4 or 8 projects.
            </p>
          )}
          
          <form onSubmit={handleSubmit} style={{ marginTop: editingId ? '1.5rem' : '0' }}>
            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ color: '#333' }} />
            </div>
            
            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Location (Optional)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Mumbai, India" style={{ color: '#333' }} />
            </div>

            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Cover Image (Portrait orientation recommended)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef}
                required={!editingId}
                style={{ color: '#333' }}
              />
              {editingId && <small style={{ color: '#666', marginTop: '0.5rem', display: 'block' }}>Leave blank to keep existing image</small>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className={styles.btnPrimary} disabled={isSaving}>
                {isSaving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className={styles.btnSecondary} onClick={() => { setEditingId(null); setTitle(''); setLocation(''); setFile(null); if(fileInputRef.current) fileInputRef.current.value=''; }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3 style={{ color: '#333' }}>Current Projects ({recentProjects.length}/8)</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem', color: '#333' }}>Loading...</p>
          ) : recentProjects.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No recent projects found.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentProjects.map(item => {
                const img = item.image || item.imageUrl;
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                    {img ? (
                      <img src={img} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '60px', height: '80px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px' }}>No Img</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.3rem 0', color: '#333' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
                        {item.location || 'No location specified'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'center' }}>
                      <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b98e46', padding: '0.5rem' }} title="Edit">
                        <FiEdit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', padding: '0.5rem' }} title="Delete">
                        <FiTrash2 size={18} />
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
