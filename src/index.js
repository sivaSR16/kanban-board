import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element safely
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // Optional: StrictMode helps catch potential issues during development
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Optional: Debug log
  console.log('✅ App rendered successfully');
} else {
  console.error('❌ Root element not found. Make sure your index.html has <div id="root"></div>');
}
