import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker for offline readiness
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Oneworld PWA Service Worker active:', registration.scope);
      })
      .catch((err) => {
        console.warn('Oneworld SW registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
