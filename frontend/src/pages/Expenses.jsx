import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { expenseApi, categoryApi } from '../services/api';
import { logger } from '../utils/logger';
import toast from 'react-hot-toast';
import ExpenseModal from '../components/ExpenseModal';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({ search: '', category_id: '', per_page: 10 });

  useEffect(() => {
    loadExpenses();
    loadCategories();
  }, [filters]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseApi.getAll(filters);
      setExpenses(response.data.expenses);
      setPagination(response.data.pagination);
      logger.info('Expenses loaded', { count: response.data.expenses.length });
    } catch (error) {
      logger.logError(error, { context: 'expenses_load' });
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data.categories);
    } catch (error) {
      logger.logError(error, { context: 'categories_load' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await expenseApi.delete(id);
      toast.success('Expense deleted');
      logger.info('Expense deleted', { expense_id: id });
      loadExpenses();
    } catch (error) {
      logger.logError(error, { context: 'expense_delete' });
      toast.error('Failed to delete expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingExpense(null);
 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search expenses..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
 />
            </div>
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={filters.category_id}
            onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No expenses found</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{expense.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.title}</td>
                  <td className="px-6 py-4">
                    <span                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: expense.category?.color }}
                    >
                      {expense.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{expense.payment_method}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* this is to test frontend cicd */}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {(pagination.page - 1) * pagination.per_page + 1} to {Math.min(pagination.page * pagination.per_page, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                disabled={!pagination.has_prev}
                onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={!pagination.has_next}
                onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <ExpenseModal
          expense={editingExpense}
          categories={categories}
          onClose={handleModalClose}
          onSuccess={() => {
            handleModalClose();
            loadExpenses();
          }}
        />
      )}
    </div>
  );
}

export default Expenses;