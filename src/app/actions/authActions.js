"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    // Authenticate using Firebase REST API
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    const data = await response.json();

    if (data.idToken) {
      cookies().set('admin_session', 'true', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      });
      return { success: true };
    } else {
      return { error: data.error?.message || 'Invalid email or password' };
    }
  } catch (error) {
    return { error: `System Error: ${error.message}` };
  }
}

export async function logoutAdmin() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}
