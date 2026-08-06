/**
 * Structured Logger for Frontend
 * Produces JSON-formatted logs for container/K8s log aggregation
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

export class StructuredLogger {
  constructor(serviceName = 'expense-tracker-frontend') {
    this.serviceName = serviceName;
    this.logLevel = this.getLogLevel();
  }

  getLogLevel() {
    const envLevel = import.meta.env.VITE_LOG_LEVEL || 'INFO';
    return LOG_LEVELS[envLevel] ?? LOG_LEVELS.INFO;
  }

  generateCorrelationId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const randomValue = Math.floor(Math.random() * 16);
      const value = char === 'x' ? randomValue : (randomValue & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  formatLog(level, message, data = {}) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      correlation_id: this.getCorrelationId(),
      ...data
    });
  }

  getCorrelationId() {
    return window.__correlationId || (window.__correlationId = this.generateCorrelationId());
  }

  setCorrelationId(id) {
    window.__correlationId = id;
  }

  debug(message, data = {}) {
    if (this.logLevel <= LOG_LEVELS.DEBUG) {
      console.debug(this.formatLog('DEBUG', message, data));
    }
  }

  info(message, data = {}) {
    if (this.logLevel <= LOG_LEVELS.INFO) {
      console.info(this.formatLog('INFO', message, data));
    }
  }

  warn(message, data = {}) {
    if (this.logLevel <= LOG_LEVELS.WARN) {
      console.warn(this.formatLog('WARN', message, data));
    }
  }

  error(message, data = {}) {
    if (this.logLevel <= LOG_LEVELS.ERROR) {
      console.error(this.formatLog('ERROR', message, data));
    }
  }

  // API call logging
  logApiCall(method, endpoint, status, duration, correlationId) {
    this.info('API Call', {
      type: 'api_call',
      method,
      endpoint,
      status,
      duration_ms: duration,
      correlation_id: correlationId
    });
  }

  // Navigation logging
  logNavigation(from, to) {
    this.info('Navigation', {
      type: 'navigation',
      from,
      to,
      user_agent: navigator.userAgent.substring(0, 100)
    });
  }

  // Error logging with stack trace
  logError(error, context = {}) {
    this.error('Application Error', {
      type: 'error',
      error_name: error.name,
      error_message: error.message,
      stack: error.stack?.substring(0, 500),
      ...context
    });
  }
}

export const logger = new StructuredLogger();

// Axios interceptor for logging API calls
export const setupApiLogger = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const correlationId = logger.getCorrelationId();
      config.headers['X-Correlation-ID'] = correlationId;
      const startTime = Date.now();
      config.metadata = { startTime, correlationId };
      
      logger.debug('API Request', {
        method: config.method?.toUpperCase(),
        url: config.url,
        correlation_id: correlationId
      });
      
      return config;
    },
    (error) => {
      logger.logError(error, { context: 'api_request_error' });
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      const duration = Date.now() - response.config.metadata.startTime;
      logger.logApiCall(
        response.config.method?.toUpperCase(),
        response.config.url,
        response.status,
        duration,
        response.config.metadata.correlationId
      );
      return response;
    },
    (error) => {
      const duration = error.config?.metadata?.startTime 
        ? Date.now() - error.config.metadata.startTime 
        : 0;
      
      logger.logApiCall(
        error.config?.method?.toUpperCase() || 'UNKNOWN',
        error.config?.url || 'unknown',
        error.response?.status || 0,
        duration,
        error.config?.metadata?.correlationId
      );
      
      logger.logError(error, { context: 'api_response_error' });
      return Promise.reject(error);
    }
  );
};