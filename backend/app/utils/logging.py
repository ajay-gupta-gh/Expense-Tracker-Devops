import logging
import json
import uuid
import sys
from pythonjsonlogger import jsonlogger
from flask import request, g, has_app_context
# Add correlation ID to response headers
from flask import make_response
from functools import wraps


class CustomJsonFormatter(jsonlogger.JsonFormatter):
    """Custom JSON formatter with correlation ID support"""

    def add_fields(self, log_record, record, message_dict):
        super().add_fields(log_record, record, message_dict)

        # Add timestamp in ISO format
        log_record['timestamp'] = self.formatTime(record)
        log_record['level'] = record.levelname
        log_record['service'] = 'expense-tracker-backend'

        # Add correlation ID if available
        if has_app_context() and hasattr(g, 'correlation_id') and g.correlation_id:
            log_record['correlation_id'] = g.correlation_id

        # Add logger name
        log_record['logger'] = record.name

        # Add source location
        log_record['source'] = {
            'file': record.filename,
            'line': record.lineno,
            'function': record.funcName
        }


class LogManager:
    """Centralized logging manager for structured logging"""

    def __init__(self):
        self.service_name = 'expense-tracker-backend'

    def _get_logger(self, name='app'):
        return logging.getLogger(name)

    def log_info(self, message, extra=None):
        logger = self._get_logger()
        log_data = {}

        if extra:
            log_data.update(extra)

        if has_app_context() and hasattr(g, 'correlation_id') and g.correlation_id:
            log_data['correlation_id'] = g.correlation_id

        logger.info(message, extra=log_data)

    def log_error(self, message, error=None, extra=None):
        logger = self._get_logger()
        log_data = {}

        if error:
            log_data['error'] = str(error)
            log_data['error_type'] = type(error).__name__   # <-- Fixed indentation

        if extra:
            log_data.update(extra)

        if has_app_context() and hasattr(g, 'correlation_id') and g.correlation_id:
            log_data['correlation_id'] = g.correlation_id

        logger.error(message, extra=log_data)

    def log_warning(self, message, extra=None):
        logger = self._get_logger()
        log_data = {}

        if extra:
            log_data.update(extra)

        if has_app_context() and hasattr(g, 'correlation_id') and g.correlation_id:
            log_data['correlation_id'] = g.correlation_id

        logger.warning(message, extra=log_data)

    def log_debug(self, message, extra=None):
        logger = self._get_logger()
        log_data = {}

        if extra:
            log_data.update(extra)

        if has_app_context() and hasattr(g, 'correlation_id') and g.correlation_id:
            log_data['correlation_id'] = g.correlation_id

        logger.debug(message, extra=log_data)


def setup_logging(app):
    """Setup JSON structured logging for Flask app"""

    # Create JSON formatter
    formatter = CustomJsonFormatter(
        '%(timestamp)s %(level)s %(name)s %(message)s'
    )

    # Configure root logger
    log_level = app.config.get('LOG_LEVEL', 'INFO')
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)

    # Configure application logger
    app_logger = logging.getLogger('app')
    app_logger.setLevel(getattr(logging, log_level))
    app_logger.handlers = [handler]

    # Configure Flask logger
    app.logger.handlers = [handler]
    app.logger.setLevel(getattr(logging, log_level))

    # Suppress noisy loggers
    logging.getLogger('werkzeug').setLevel(logging.WARNING)
    logging.getLogger('sqlalchemy.engine').setLevel(
        logging.WARNING if log_level == 'INFO' else logging.INFO
    )


def generate_correlation_id():
    """Generate a unique correlation ID"""
    return str(uuid.uuid4())


def correlation_id_middleware(app):
    """Middleware to inject correlation ID into every request"""

    @app.before_request
    def before_request():
        # Check for correlation ID in header or generate new one
        g.correlation_id = (
            request.headers.get('X-Correlation-ID')
            or generate_correlation_id()
        )

        

        response = make_response()
        response.headers['X-Correlation-ID'] = g.correlation_id

        # NOTE: The actual response returned to the client is handled in
        # after_request(). This temporary response is kept to preserve
        # the original code.
        app.logger.info(
            "Incoming request",
            extra={
                'method': request.method,
                'path': request.path,
                'correlation_id': g.correlation_id,
                'remote_addr': request.remote_addr,
                'user_agent': (
                    request.user_agent.string[:100]
                    if request.user_agent else None
                )
            }
        )

    @app.after_request
    def after_request(response):
        # Add correlation ID to all responses
        if hasattr(g, 'correlation_id'):
            response.headers['X-Correlation-ID'] = g.correlation_id

        return response


def log_execution_time(logger):
    """Decorator to log function execution time"""

    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):
            import time

            start_time = time.time()
            result = func(*args, **kwargs)

            execution_time = (time.time() - start_time) * 1000

            logger.log_debug(
                f"Function {func.__name__} executed",
                extra={
                    'execution_time_ms': round(execution_time, 2),
                    'function': func.__name__
                }
            )

            return result

        return wrapper

    return decorator


# Global log manager instance
log_manager = LogManager()
