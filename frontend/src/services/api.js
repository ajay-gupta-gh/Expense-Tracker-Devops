import axios from 'axios';
import { setupApiLogger, logger } from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Setup logging interceptor
setupApiLogger(api);

// Response interceptor for correlation ID propagation
api.interceptors.response.use(
  (response) => {
    const correlationId = response.headers['x-correlation-id'];
    if (correlationId) {
      logger.setCorrelationId(correlationId);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Expense API
export const expenseApi = {
  getAll: (params = {}) => api.get('/expenses', { params }),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  getStats: (params = {}) => api.get('/expenses/stats', { params })
};

// Category API
export const categoryApi = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};

// Health API
export const healthApi = {
  check: () => api.get('/health'),
  readiness: () => api.get('/health/ready'),
  liveness: () => api.get('/health/live')
};

export default api;