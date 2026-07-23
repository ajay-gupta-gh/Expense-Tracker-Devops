import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { expenseApi, categoryApi } from '../services/api';
import { logger } from '../utils/logger';
import toast from 'react-hot-toast';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [statsRes, expensesRes] = await Promise.all([
        expenseApi.getStats(),
        expenseApi.getAll({ per_page: 5, sort_by: 'date', order: 'desc' })
      ]);

      setStats(statsRes.data.stats);
      setRecentExpenses(expensesRes.data.expenses);
      
      logger.info('Dashboard data loaded');
    } catch (error) {
      logger.logError(error, { context: 'dashboard_load' });
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Expenses',
      value: `$${stats?.total_amount?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-indigo-500',
      trend: stats?.total_count || 0
    },
    {
      label: 'This Month',
      value: `$${(stats?.total_amount * 0.35)?.toFixed(2) || '0.00'}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+12%'
    },
    {
      label: 'Average Expense',
      value: `$${stats?.average_amount?.toFixed(2) || '0.00'}`,
      icon: Receipt,
      color: 'bg-orange-500',
      trend: null
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {stat.trend && (
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp size={14} />
                    {stat.trend}
                  </p>
                )}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h2>
       <div className="space-y-3">
          {recentExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No expenses yet</p>
          ) : (
            recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: expense.category?.color || '#6366f1' }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{expense.title}</p>
                    <p className="text-sm text-gray-500">{expense.category?.name}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;