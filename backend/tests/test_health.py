import json

def test_health_check(client):
    """Test health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'healthy'
    assert data['service'] == 'expense-tracker-backend'

def test_liveness_check(client):
    """Test liveness probe"""
    response = client.get('/health/live')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['alive'] == True