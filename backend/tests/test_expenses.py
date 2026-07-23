import json
from datetime import date

def test_create_category(client):
    """Test category creation"""
    response = client.post(
        '/api/v1/categories',
        data=json.dumps({
            'name': 'Food',
            'description': 'Food and dining expenses',
            'color': '#ff5722'
        }),
        content_type='application/json'
    )
    assert response.status_code == 201    
    data = json.loads(response.data)
    assert data['category']['name'] == 'Food'

def test_create_expense(client):
    """Test expense creation"""
    # First create category
    client.post(
        '/api/v1/categories',
        data=json.dumps({'name': 'Transport', 'color': '#2196f3'}),
        content_type='application/json'
    )
    
    response = client.post(
        '/api/v1/expenses',
        data=json.dumps({
            'title': 'Bus fare',
            'amount': 25.50,
            'date': '2026-07-15',
            'category_id': 1
        }),
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['expense']['title'] == 'Bus fare'
    assert data['expense']['amount'] == 25.50

def test_get_expenses(client):
    """Test getting expenses list"""
    response = client.get('/api/v1/expenses')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'expenses' in data
    assert 'pagination' in data