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
  const [category, setCategory] = useState('Residential');
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
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
      snap.forEach((doc) => {
        const data = doc.data();
        items.push({ id: doc.id, ...data });
      });
      setRecentProjects(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length + existingImages.length > 3) {
        alert("You can only have up to 3 images per project.");
        return;
      }
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleRemoveExisting = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Title is required.");
      return;
    }

    if (!editingId && files.length === 0) {
      alert("At least one image is required for new projects.");
      return;
    }

    if (files.length + existingImages.length > 3) {
      alert("You cannot exceed 3 images.");
      return;
    }

    setIsSaving(true);

    try {
      const uploadedUrls = [];
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadToCloudinary(formData);
          uploadedUrls.push(result.secure_url);
        }
      }
      
      const allImages = [...existingImages, ...uploadedUrls];

      if (editingId) {
        const updateData = { title, category, images: allImages };
        // For backwards compatibility on front-end where it checks imageUrl if images doesn't exist
        if (allImages.length > 0) {
          updateData.imageUrl = allImages[0];
        }
        await updateDoc(doc(db, 'recentProjects', editingId), updateData);
        alert("Project updated successfully!");
      } else {
        const newItem = {
          title,
          category,
          images: allImages,
          imageUrl: allImages[0] || null,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'recentProjects'), newItem);
        alert("Recent project added successfully!");
      }
      
      // Reset
      setTitle('');
      setCategory('Residential');
      setFiles([]);
      setExistingImages([]);
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
    setCategory(item.category || 'Residential');
    setEditingId(item.id);
    setFiles([]);
    
    let imgs = [];
    if (item.images && item.images.length > 0) {
      imgs = item.images;
    } else if (item.imageUrl) {
      imgs = [item.imageUrl];
    }
    setExistingImages(imgs);
    
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
        <h1 className={styles.pageTitle}>Manage Portfolio Projects</h1>
      </div>

      <div className={styles.twoColGrid}>
        {/* Form */}
        <div className={styles.card}>
          <h3 style={{ color: '#333' }}>{editingId ? 'Edit Project' : 'Add Project'}</h3>
          {!editingId && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              These projects appear in the "Recent Projects" page and the homepage.
            </p>
          )}
          
          <form onSubmit={handleSubmit} style={{ marginTop: editingId ? '1.5rem' : '0' }}>
            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Project Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ color: '#333' }} />
            </div>
            
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', color: '#333' }}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Images (Max 3) *</label>
                <input type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef} style={{ color: '#333' }} disabled={files.length + existingImages.length >= 3} />
                
                {existingImages.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Current Images:</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {existingImages.map((img, i) => (
                        <div key={i} style={{ position: 'relative', width: '80px', height: '80px' }}>
                          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                          <button type="button" onClick={() => handleRemoveExisting(i)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', border: 'none', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>&times;</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {files.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>New Files:</p>
                    <ul style={{ paddingLeft: '20px', margin: '0.5rem 0 0 0', color: '#333' }}>
                      {files.map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{f.name}</span>
                          <button type="button" onClick={() => handleRemoveFile(i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FiTrash2 size={14} /></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <button type="submit" className={styles.btnPrimary} disabled={isSaving} style={{ width: '100%' }}>
                {isSaving ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
              </button>
              {editingId && (
                <button type="button" className={styles.btnSecondary} onClick={() => { setEditingId(null); setTitle(''); setCategory('Residential'); setFiles([]); setExistingImages([]); if(fileInputRef.current) fileInputRef.current.value=''; }}>
                  Cancel
                </button>
              )}
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3 style={{ color: '#333' }}>Current Projects ({recentProjects.length})</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem', color: '#333' }}>Loading...</p>
          ) : recentProjects.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No recent projects found.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentProjects.map(item => {
                const img = item.imageUrl || item.image;
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                    {img ? (
                      <img src={img} alt={item.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '80px', height: '60px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px' }}>No Img</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.3rem 0', color: '#333' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
                        {item.location || 'No location specified'} • <span style={{ color: '#b98e46', fontWeight: 'bold' }}>{item.category || 'Residential'}</span>
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
