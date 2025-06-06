import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Default CRA styles
import App from './App';
import { CssBaseline } from '@mui/material'; // Optional: for MUI baseline styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline /> {/* Adds MUI's baseline CSS for consistency */}
    <App />
  </React.StrictMode>
);
