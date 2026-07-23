from app import create_app, db
from app.utils.logging import correlation_id_middleware

app = create_app('development')

# Apply correlation ID middleware
correlation_id_middleware(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)