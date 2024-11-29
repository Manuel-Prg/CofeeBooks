import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

// Configuración de Firebase (obtén estos valores desde tu consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBQm02Pm7cGb1U63diPdC9s9Z9hq6tQ6DQ",
  authDomain: "cofeebooks-224bb.firebaseapp.com",
  projectId: "cofeebooks-224bb",
  storageBucket: "cofeebooks-224bb.firebasestorage.app",
  messagingSenderId: "13027139989",
  appId: "1:13027139989:web:4f6eafc2a8e6b2bfbfd69c",
  measurementId: "G-KDP62TBVC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function updateMenuItems(user) {
  const registerMenuItem = document.getElementById('registerMenuItem');
  const profileMenuItem = document.getElementById('profileMenuItem');

  if (user) {
    registerMenuItem.style.display = 'none';
    profileMenuItem.style.display = 'block';
  } else {
    registerMenuItem.style.display = 'block';
    profileMenuItem.style.display = 'none';
  }
}

onAuthStateChanged(auth, (user) => {
  updateMenuItems(user);
});

export { updateMenuItems };