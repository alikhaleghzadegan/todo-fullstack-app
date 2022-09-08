import * as React from 'react';
import ReactDOM from 'react-dom/client';
import * as Router from 'react-router-dom';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
