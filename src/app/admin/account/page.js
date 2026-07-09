"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase';
import { 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  updateEmail, 
  updatePassword 
} from 'firebase/auth';
import { logoutAdmin } from '../../actions/authActions';
import styles from './account.module.css';

export default function AccountSettingsPage() {
  const router = useRouter();
  
  const [currentEmail, setCurrentEmail] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Set initial email from current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentEmail(user.email || '');
        setFormData(prev => ({ ...prev, newEmail: user.email || '' }));
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const user = auth.currentUser;
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to change settings.' });
      setIsLoading(false);
      return;
    }

    if (!formData.currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password to authorize changes.' });
      setIsLoading(false);
      return;
    }

    // Check if new password matches confirm password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      setIsLoading(false);
      return;
    }

    try {
      // 1. Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      let isUpdated = false;
      let emailChanged = false;

      // 2. Update Email if changed
      if (formData.newEmail && formData.newEmail !== user.email) {
        await updateEmail(user, formData.newEmail);
        emailChanged = true;
        isUpdated = true;
      }

      // 3. Update Password if provided
      if (formData.newPassword) {
        await updatePassword(user, formData.newPassword);
        isUpdated = true;
      }

      if (isUpdated) {
        setMessage({ type: 'success', text: 'Account settings updated successfully!' });
        
        // Clear sensitive fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));

        // If email or password was changed, we might need to log them out for security
        // or just let them stay logged in. Firebase usually keeps them logged in on the same device.
        if (emailChanged || formData.newPassword) {
           setMessage({ type: 'success', text: 'Credentials updated. You will be logged out to re-login with your new credentials.' });
           setTimeout(async () => {
             await logoutAdmin();
             router.push('/admin/login');
           }, 3000);
        }
      } else {
        setMessage({ type: 'success', text: 'No changes were made.' });
      }

    } catch (error) {
      console.error("Update error:", error);
      let errorMsg = 'Failed to update settings. Please try again.';
      
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = 'Incorrect current password. Re-authentication failed.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'The new email address is already in use by another account.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'The new email address is invalid.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'The new password is too weak. Please use a stronger password.';
      }
      
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.accountContainer}>
      <h1>Account Security</h1>
      <p>Update your login email and password.</p>

      <form className={styles.accountForm} onSubmit={handleUpdate}>
        {message.text && (
          <div className={`${styles.message} ${message.type === 'error' ? styles.errorMessage : styles.successMessage}`}>
            {message.text}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="currentPassword">Current Password (Required)</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password to verify identity"
            required
          />
          <span className={styles.infoText}>You must provide your current password to change account settings.</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.formGroup}>
          <label htmlFor="newEmail">Email Address</label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            placeholder="admin@example.com"
          />
        </div>

        <div className={styles.divider}></div>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword">New Password (Optional)</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            disabled={!formData.newPassword}
            required={!!formData.newPassword}
          />
        </div>

        <button 
          type="submit" 
          className={styles.saveBtn} 
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Credentials'}
        </button>

        <p className={styles.logoutWarning}>
          Note: Changing your email or password will log you out, and you will need to log back in with your new credentials.
        </p>
      </form>
    </div>
  );
}
