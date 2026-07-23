"""Database seeding script for development"""
from app import create_app, db
from app.models.category import Category
from app.models.expense import Expense
from datetime import date, timedelta

def seed_database():
    app = create_app('development')
    
    with app.app_context():
        # Clear existing data
        Expense.query.delete()
        Category.query.delete()
        db.session.commit()
        
        # Create categories
        categories = [
            Category(name='Food & Dining', description='Restaurant and grocery expenses', icon='restaurant', color='#ff5722'),
            Category(name='Transportation', description='Fuel, public transit, rideshare', icon='directions_car', color='#2196f3'),
            Category(name='Shopping', description='Clothing, electronics, general shopping', icon='shopping_cart', color='#9c27b0'),
            Category(name='Entertainment', description='Movies, games, subscriptions', icon='movie', color='#e91e63'),
            Category(name='Bills & Utilities', description='Electricity, water, internet, phone', icon='receipt', color='#ff9800'),
            Category(name='Healthcare', description='Medical, pharmacy, insurance', icon='local_hospital', color='#4caf50'),
            Category(name='Education', description='Books, courses, tuition', icon='school', color='#3f51b5'),
            Category(name='Other', description='Miscellaneous expenses', icon='more_horiz', color='#607d8b')
        ]
        
        for cat in categories:
            db.session.add(cat)
        db.session.commit()
        
        # Create sample expenses
        today = date.today()
        expenses = [
            Expense(title='Grocery shopping', amount=85.50, date=today, category_id=1, payment_method='card'),
            Expense(title='Gas station', amount=45.00, date=today - timedelta(days=1), category_id=2, payment_method='card'),
            Expense(title='New headphones', amount=149.99, date=today - timedelta(days=2), category_id=3, payment_method='card'),
            Expense(title='Netflix subscription', amount=15.99, date=today - timedelta(days=3), category_id=4, payment_method='digital_wallet'),
            Expense(title='Electric bill', amount=120.00, date=today - timedelta(days=5), category_id=5, payment_method='bank_transfer'),
            Expense(title='Doctor visit', amount=75.00, date=today - timedelta(days=7), category_id=6, payment_method='card'),
            Expense(title='Python course', amount=49.99, date=today - timedelta(days=10), category_id=7, payment_method='digital_wallet'),
 Expense(title='Lunch with colleagues', amount=32.50, date=today - timedelta(days=1), category_id=1, payment_method='card'),
            Expense(title='Uber ride', amount=18.75, date=today - timedelta(days=2), category_id=2, payment_method='digital_wallet'),
 Expense(title='Amazon purchase', amount=65.00, date=today - timedelta(days=4), category_id=3, payment_method='card')
        ]
        
        for exp in expenses:
            db.session.add(exp)
        db.session.commit()
        
        print(f"✅ Database seeded with {len(categories)} categories and {len(expenses)} expenses")

if __name__ == '__main__':
    seed_database()