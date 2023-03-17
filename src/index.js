import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthContext from './contexts/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
            {/* // ! This allows nested routes as we move inside our app. */}
          </Routes>
      </BrowserRouter>
    </AuthContext>
  </React.StrictMode>
);