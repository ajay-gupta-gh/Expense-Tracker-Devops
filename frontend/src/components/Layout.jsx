import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, Tag, Settings, Menu, X } from 'lucide-react';
import { healthApi } from '../services/api';
import { logger } from '../utils/logger';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState('checking');
  const location = useLocation();

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkBackendHealth = async () => {
    try {
      await healthApi.check();
      setHealthStatus('healthy');
      logger.debug('Backend health check passed');
    } catch (error) {
      setHealthStatus('unhealthy');
      logger.warn('Backend health check failed');
    }
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/expenses', icon: Receipt, label: 'Expenses' },
    { path: '/categories', icon: Tag, label: 'Categories' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-indigo-700 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-indigo-600">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Expense Tracker
            </h1>
           <p className="text-xs text-indigo-300 mt-1">v1.0.0</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${location.pathname === path 
                    ? 'bg-indigo-800 text-white' 
                    : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'}
                `}
              >
<Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Health Status */}
          <div className="p-4 border-t border-indigo-600">
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${
                healthStatus === 'healthy' ? 'bg-green-400' : 
 healthStatus === 'unhealthy' ? 'bg-red-400' : 'bg-yellow-400'
              }`} />
              <span className="text-indigo-200">
                Backend: {healthStatus}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;