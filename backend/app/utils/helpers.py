from datetime import datetime
import json

def serialize_datetime(obj):
    """JSON serializer for datetime objects"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

def format_currency(amount):
    """Format amount as currency"""
    return f"${amount:.2f}"

def parse_date(date_string):
    """Parse date string to datetime"""
    from datetime import datetime
    formats = ['%Y-%m-%d', '%Y/%m/%d', '%d-%m-%Y', '%d/%m/%Y']
    for fmt in formats:
        try:
            return datetime.strptime(date_string, fmt)
        except ValueError:
            continue 
        
    raise ValueError(f"Unable to parse date: {date_string}")