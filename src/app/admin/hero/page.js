"use client";

import { useState, useEffect, useRef } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary, deleteFromCloudinary } from '../../../lib/cloudinary';
import styles from '../admin.module.css';
import { FiTrash2, FiUploadCloud } from 'react-icons/fi';

export default function HeroSliderPage() {
  const [existingImages, setExistingImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'settings', 'heroImages');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().images) {
        setExistingImages(docSnap.data().images);
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (existingImages.length + files.length + selectedFiles.length > 10) {
        alert("You can only have up to 10 images in the hero slider.");
        return;
      }
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDeleteExisting = async (indexToDelete) => {
    if (confirm("Are you sure you want to remove this image?")) {
      const newImages = existingImages.filter((_, i) => i !== indexToDelete);
      setExistingImages(newImages);
      // We also update DB immediately
      try {
        await setDoc(doc(db, 'settings', 'heroImages'), { images: newImages });
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    
    if (existingImages.length + files.length > 10) {
      alert("You can only have up to 10 images in total.");
      return;
    }

    setIsSaving(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadToCloudinary(formData);
        uploadedUrls.push(result.secure_url);
      }

      const allImages = [...existingImages, ...uploadedUrls];
      await setDoc(doc(db, 'settings', 'heroImages'), { images: allImages });
      
      setExistingImages(allImages);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading hero images:", error);
      alert("Failed to upload images.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className={styles.mainContent}>Loading...</div>;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Hero Slider Images</h1>
        <p>Upload up to 10 images for the home page slider. Images are uploaded in original quality (no compression).</p>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleUpload}>
          <div className={styles.formGroup}>
            <label>Add New Images (Max 10 total)</label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
              ref={fileInputRef}
              disabled={existingImages.length >= 10 || isSaving}
            />
          </div>

          {files.length > 0 && (
            <div className={styles.formGroup}>
              <p>Selected Files ({files.length}):</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {files.map((file, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span>{file.name}</span>
                    <button type="button" onClick={() => handleRemoveFile(i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button 
            type="submit" 
            className={styles.primaryBtn}
            disabled={isSaving || files.length === 0}
          >
            {isSaving ? 'Uploading...' : 'Upload Images'} <FiUploadCloud />
          </button>
        </form>
      </div>

      <div className={styles.tableContainer} style={{ marginTop: '2rem' }}>
        <h3>Current Slider Images ({existingImages.length}/10)</h3>
        {existingImages.length === 0 ? (
          <p style={{ padding: '1rem' }}>No custom images uploaded yet. The default 10 fallback images will be shown on the home page.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {existingImages.map((imgUrl, i) => (
              <div key={i} style={{ position: 'relative', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={imgUrl} alt={`Slider image ${i+1}`} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                <button 
                  onClick={() => handleDeleteExisting(i)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove Image"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
