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
  const [category, setCategory] = useState('Residential');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectArea, setProjectArea] = useState('');
  const [duration, setDuration] = useState('');
  const [year, setYear] = useState('');
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
        const updateData = { title, location, category, description, clientName, projectArea, duration, year };
        if (uploadedUrl) updateData.imageUrl = uploadedUrl;
        await updateDoc(doc(db, 'recentProjects', editingId), updateData);
        alert("Project updated successfully!");
      } else {
        const newItem = {
          title,
          location,
          category,
          description,
          clientName,
          projectArea,
          duration,
          year,
          imageUrl: uploadedUrl,
          createdAt: new Date()
        };
        await addDoc(collection(db, 'recentProjects'), newItem);
        alert("Recent project added successfully!");
      }
      
      // Reset
      setTitle('');
      setLocation('');
      setCategory('Residential');
      setDescription('');
      setClientName('');
      setProjectArea('');
      setDuration('');
      setYear('');
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
    setCategory(item.category || 'Residential');
    setDescription(item.description || '');
    setClientName(item.clientName || '');
    setProjectArea(item.projectArea || '');
    setDuration(item.duration || '');
    setYear(item.year || '');
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
        <h1 className={styles.pageTitle}>Manage Portfolio Projects</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Location (Optional)</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Mumbai, India" style={{ color: '#333' }} />
              </div>
              
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', color: '#333' }}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Client Name (Optional)</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Mr. Sharma" style={{ color: '#333' }} />
              </div>
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Project Area (Optional)</label>
                <input type="text" value={projectArea} onChange={(e) => setProjectArea(e.target.value)} placeholder="e.g. 2500 sq ft" style={{ color: '#333' }} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Duration (Optional)</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 45 Days" style={{ color: '#333' }} />
              </div>
              <div className={styles.formGroup}>
                <label style={{ color: '#555' }}>Year (Optional)</label>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024" style={{ color: '#333' }} />
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label style={{ color: '#555' }}>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows="3"
                placeholder="A short description of the project..."
                style={{ color: '#333' }}
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label style={{ color: '#555' }}>Cover Image *</label>
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
                <button type="button" className={styles.btnSecondary} onClick={() => { setEditingId(null); setTitle(''); setLocation(''); setCategory('Residential'); setDescription(''); setClientName(''); setProjectArea(''); setDuration(''); setYear(''); setFile(null); if(fileInputRef.current) fileInputRef.current.value=''; }}>
                  Cancel
                </button>
              )}
            </div>
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
