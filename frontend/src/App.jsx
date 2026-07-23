import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { logger } from './utils/logger';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import './index.css';

function NavigationLogger({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    logger.logNavigation(location.pathname, location.pathname);
  }, [location]);
  
  return children;
}

function App() {
  useEffect(() => {
    logger.info('Application mounted', {
      version: '1.0.0',
      environment: import.meta.env.MODE    });
  }, []);

  return (
    <BrowserRouter>
      <NavigationLogger>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff'
            }
          }}
        />
      </NavigationLogger>
    </BrowserRouter>
  );
}

export default App;