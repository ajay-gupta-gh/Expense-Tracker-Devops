import os

class DefaultConfig:
    """Default configuration"""
    DEBUG = False
    TESTING = False
    
    # Database
    db_user = os.getenv("POSTGRES_USER")
    db_password = os.getenv("POSTGRES_PASSWORD")    
    db_name = os.getenv("POSTGRES_DB")
    db_host = os.getenv("POSTGRES_HOST", "localhost")
    db_port = os.getenv("POSTGRES_PORT", "5432")

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10,
        'pool_recycle': 3600,
        'pool_pre_ping': True
    }
    
    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    
    # API
    JSON_SORT_KEYS = False

class DevelopmentConfig(DefaultConfig):
    """Development configuration"""
    DEBUG = True
    LOG_LEVEL = 'DEBUG'

class ProductionConfig(DefaultConfig):
    """Production configuration"""
    DEBUG = False
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'WARNING')