const admin = require('firebase-admin');
const cloudinary = require('cloudinary').v2;

// Initialize Firebase Admin (Using local credentials or setting a placeholder if not set)
// Wait, we don't have the service account key easily accessible. 
// We can use the client SDK with the credentials from .env.local to do this in a browser, 
// OR we can just write a script that updates seed.js, and tell the user to click "Seed Database" in the admin panel!
