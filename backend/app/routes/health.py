from flask import Blueprint, jsonify, current_app
from app import db
from app.utils.logging import log_manager

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
@health_bp.route('/api/v1/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for Kubernetes probes
    Returns: JSON with status and component health
    """
    health_status = {
        'status': 'healthy',
        'service': 'expense-tracker-backend',
        'version': '1.0.0',
        'checks': {}
    }
    
    # Database connectivity check
    try:
        db.session.execute(db.text('SELECT 1'))
        health_status['checks']['database'] = 'healthy'
    except Exception as e:
        health_status['checks']['database'] = 'unhealthy'
        health_status['status'] = 'degraded'
        log_manager.log_error("Database health check failed", error=e)
    
    # Return appropriate status code
    status_code = 200 if health_status['status'] == 'healthy' else 503
    
    log_manager.log_info("Health check performed", extra={
        'status': health_status['status'],
        'checks': health_status['checks']
    })
    
    return jsonify(health_status), status_code

@health_bp.route('/health/ready', methods=['GET'])
@health_bp.route('/api/v1/health/ready', methods=['GET'])
def readiness_check():
    """
    Readiness probe for Kubernetes
    Checks if service can accept traffic
    """
    try:
        db.session.execute(db.text('SELECT 1'))
        return jsonify({'ready': True}), 200
    except Exception as e:
        log_manager.log_error("Readiness check failed", error=e)
        return jsonify({'ready': False, 'error': str(e)}), 503

@health_bp.route('/health/live', methods=['GET'])
@health_bp.route('/api/v1/health/live', methods=['GET'])
def liveness_check():
    """
    Liveness probe for Kubernetes
    Checks if service is running
    """
    return jsonify({'alive': True, 'uptime': 'running'}), 200