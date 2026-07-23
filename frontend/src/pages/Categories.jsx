import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { categoryApi } from '../services/api';
import { logger } from '../utils/logger';
import toast from 'react-hot-toast';
import CategoryModal from '../components/CategoryModal';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getAll();
      setCategories(response.data.categories);
      logger.info('Categories loaded', { count: response.data.categories.length });
    } catch (error) {
      logger.logError(error, { context: 'categories_load' });
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure? Categories with expenses cannot be deleted.')) return;
    
    try {
      await categoryApi.delete(id);
      toast.success('Category deleted');
      logger.info('Category deleted', { category_id: id });
      loadCategories();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete category');
      logger.logError(error, { context: 'category_delete' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon === 'restaurant' && '🍽️'}
                    {category.icon === 'directions_car' && '🚗'}
                    {category.icon === 'shopping_cart' && '🛒'}
                    {category.icon === 'movie' && '🎬'}
                    {category.icon === 'receipt' && '📄'}
                    {category.icon === 'local_hospital' && '🏥'}
                    {category.icon === 'school' && '📚'}
                    {!['restaurant', 'directions_car', 'shopping_cart', 'movie', 'receipt', 'local_hospital', 'school'].includes(category.icon) && '📁'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.expense_count} expenses</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => { setEditingCategory(category); setModalOpen(true); }}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {category.description && (
                <p className="mt-3 text-sm text-gray-500">{category.description}</p>
              )}
             <div 
                className="mt-4 h-2 rounded-full"
                style={{ backgroundColor: category.color, opacity: 0.3 }}
              />
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => { setModalOpen(false); setEditingCategory(null); }}
          onSuccess={() => { setModalOpen(false); setEditingCategory(null); loadCategories(); }}
        />
      )}
    </div>
  );
}

export default Categories;