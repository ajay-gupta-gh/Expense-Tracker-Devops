from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.utils.logging import setup_logging, log_manager

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='default'):
    app = Flask(__name__)

    # Load configuration
    if config_name == 'production':
        app.config.from_object('config.ProductionConfig')
    elif config_name == 'development':
        app.config.from_object('config.DevelopmentConfig')
    else:
        app.config.from_object('config.DefaultConfig')

    # Setup structured logging
    setup_logging(app)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register blueprints
    from app.routes.health import health_bp
    from app.routes.expenses import expenses_bp
    from app.routes.categories import categories_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(expenses_bp)
    app.register_blueprint(categories_bp)

    # Log application startup
    log_manager.log_info(
        "Application initialized",
        extra={
            "config": config_name,
            "version": "1.0.0"
        }
    )

    return app
