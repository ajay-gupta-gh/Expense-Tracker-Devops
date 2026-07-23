import React from 'react';

function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Environment</span>
            <span className="font-medium">{import.meta.env.MODE}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">API URL</span>
            <span className="font-medium text-sm">{import.meta.env.VITE_API_URL || '/api/v1'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Log Configuration</h2>
        <p className="text-sm text-gray-500 mb-4">
          Console logging is enabled. Logs are formatted as JSON for container log aggregation.
        </p>
        <button          onClick={() => console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'INFO',
            service: 'expense-tracker-frontend',
            message: 'Test log entry from settings page'
          }))}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Generate Test Log
        </button>
      </div>
    </div>
  );
}

export default Settings;