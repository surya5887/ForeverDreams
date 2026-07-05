"use client";

import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import styles from '../admin.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() });
      });
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!editingId) {
      // Auto-generate slug
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !slug) return;
    setIsSaving(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, 'categories', editingId), { name, slug });
      } else {
        await addDoc(collection(db, 'categories'), { name, slug, createdAt: new Date() });
      }
      // Reset form and refresh
      setName('');
      setSlug('');
      setEditingId(null);
      await fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Error saving category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setSlug(cat.slug);
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category? Note: This will not delete the gallery items inside it.')) {
      try {
        await deleteDoc(doc(db, 'categories', id));
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category");
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Categories</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Form */}
        <div className={styles.card}>
          <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label>Category Name</label>
              <input type="text" value={name} onChange={handleNameChange} placeholder="e.g. Modular Kitchen" required />
            </div>
            
            <div className={styles.formGroup}>
              <label>URL Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="modular-kitchen" required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className={styles.btnPrimary} disabled={isSaving}>
                {isSaving ? 'Saving...' : editingId ? 'Update' : 'Add Category'}
              </button>
              {editingId && (
                <button type="button" className={styles.btnSecondary} onClick={() => { setEditingId(null); setName(''); setSlug(''); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className={styles.card}>
          <h3>Current Categories</h3>
          {isLoading ? (
            <p style={{ marginTop: '1rem' }}>Loading...</p>
          ) : categories.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#666' }}>No categories found. Add your first category.</p>
          ) : (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem 0' }}>{cat.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Slug: {cat.slug}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b98e46', padding: '0.5rem' }} title="Edit">
                      <FiEdit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', padding: '0.5rem' }} title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
