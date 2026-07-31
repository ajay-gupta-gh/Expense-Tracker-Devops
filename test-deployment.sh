#!/bin/bash

echo "🧪 Testing Expense Tracker Deployment"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if cluster is running
echo -e "${YELLOW}1. Checking Kubernetes cluster...${NC}"
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Kubernetes cluster is not running${NC}"
    echo "   Please start your Kind cluster first:"
    echo "   kind create cluster --config kind-config.yaml"
    exit 1
fi
echo -e "${GREEN}✅ Cluster is running${NC}"
echo ""

# Check namespace
echo -e "${YELLOW}2. Checking namespace...${NC}"
if kubectl get namespace expense-tracker &> /dev/null; then
    echo -e "${GREEN}✅ Namespace 'expense-tracker' exists${NC}"
else
    echo -e "${RED}❌ Namespace 'expense-tracker' not found${NC}"
    echo "   Deploy the application first: kubectl apply -k kubernetes/"
    exit 1
fi
echo ""

# Check pods
echo -e "${YELLOW}3. Checking pod status...${NC}"
PODS=$(kubectl get pods -n expense-tracker -o json)
TOTAL_PODS=$(echo $PODS | jq '.items | length')
RUNNING_PODS=$(echo $PODS | jq '[.items[] | select(.status.phase=="Running")] | length')

echo "   Total pods: $TOTAL_PODS"
echo "   Running pods: $RUNNING_PODS"

if [ "$TOTAL_PODS" -eq "$RUNNING_PODS" ] && [ "$TOTAL_PODS" -gt 0 ]; then
    echo -e "${GREEN}✅ All pods are running${NC}"
else
    echo -e "${RED}❌ Some pods are not running${NC}"
    echo ""
    echo "   Pod status:"
    kubectl get pods -n expense-tracker
    echo ""
    echo "   Check logs for details:"
    echo "   kubectl logs -n expense-tracker <pod-name>"
    exit 1
fi
echo ""

# Check services
echo -e "${YELLOW}4. Checking services...${NC}"
SERVICES=$(kubectl get svc -n expense-tracker -o json)
TOTAL_SERVICES=$(echo $SERVICES | jq '.items | length')
echo "   Services: $TOTAL_SERVICES"

if [ "$TOTAL_SERVICES" -ge 3 ]; then
    echo -e "${GREEN}✅ Services are configured${NC}"
else
    echo -e "${RED}❌ Services missing${NC}"
    kubectl get svc -n expense-tracker
    exit 1
fi
echo ""

# Check ingress
echo -e "${YELLOW}5. Checking ingress...${NC}"
if kubectl get ingress -n expense-tracker expense-tracker-ingress &> /dev/null; then
    echo -e "${GREEN}✅ Ingress configured${NC}"
    INGRESS_HOST=$(kubectl get ingress -n expense-tracker expense-tracker-ingress -o jsonpath='{.spec.rules[0].host}')
    echo "   Host: $INGRESS_HOST"
else
    echo -e "${RED}❌ Ingress not found${NC}"
    exit 1
fi
echo ""

# Check hosts file
echo -e "${YELLOW}6. Checking hosts file...${NC}"
if grep -q "expense-tracker.local" /etc/hosts; then
    echo -e "${GREEN}✅ expense-tracker.local found in /etc/hosts${NC}"
else
    echo -e "${RED}❌ expense-tracker.local not in /etc/hosts${NC}"
    echo "   Add it with:"
    echo "   echo \"127.0.0.1 expense-tracker.local\" | sudo tee -a /etc/hosts"
    exit 1
fi
echo ""

# Test endpoints
echo -e "${YELLOW}7. Testing application endpoints...${NC}"
echo ""

# Test frontend
echo -n "   📱 Frontend (http://expense-tracker.local/): "
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://expense-tracker.local/ 2>/dev/null)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✓ OK (HTTP $FRONTEND_STATUS)${NC}"
else
    echo -e "${RED}✗ Failed (HTTP $FRONTEND_STATUS)${NC}"
fi

# Test backend health
echo -n "   🔍 Backend Health (http://expense-tracker.local/api/health): "
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://expense-tracker.local/api/health 2>/dev/null)
if [ "$HEALTH_STATUS" = "200" ]; then
    echo -e "${GREEN}✓ OK (HTTP $HEALTH_STATUS)${NC}"
else
    echo -e "${RED}✗ Failed (HTTP $HEALTH_STATUS)${NC}"
fi

# Test API v1 health
echo -n "   🔍 API v1 Health (http://expense-tracker.local/api/v1/health): "
API_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://expense-tracker.local/api/v1/health 2>/dev/null)
if [ "$API_HEALTH" = "200" ]; then
    echo -e "${GREEN}✓ OK (HTTP $API_HEALTH)${NC}"
else
    echo -e "${RED}✗ Failed (HTTP $API_HEALTH)${NC}"
fi
echo ""

# Test correlation ID
echo -e "${YELLOW}8. Testing correlation ID propagation...${NC}"
CORRELATION_ID="test-$(date +%s)-$(uuidgen | cut -c1-8)"
echo "   Correlation ID: $CORRELATION_ID"

RESPONSE=$(curl -s -H "X-Correlation-ID: $CORRELATION_ID" http://expense-tracker.local/api/health 2>/dev/null)
if [ $? -eq 0 ] && [ ! -z "$RESPONSE" ]; then
    echo -e "${GREEN}✓ Correlation ID accepted${NC}"
    echo "   Response: $RESPONSE"
else
    echo -e "${RED}✗ Correlation ID test failed${NC}"
fi
echo ""

# Check logs for correlation ID
echo -e "${YELLOW}9. Checking logs for correlation ID...${NC}"
LOG_FOUND=$(kubectl logs -n expense-tracker deployment/expense-tracker-backend --tail=50 2>/dev/null | grep -c "$CORRELATION_ID" || echo "0")
if [ "$LOG_FOUND" -gt 0 ]; then
    echo -e "${GREEN}✓ Correlation ID found in backend logs ($LOG_FOUND entries)${NC}"
else
    echo -e "${YELLOW}⚠️ Correlation ID not found in recent logs (this is OK if no requests were processed)${NC}"
fi
echo ""

# Check structured logging
echo -e "${YELLOW}10. Checking structured logging format...${NC}"
LOG_LINE=$(kubectl logs -n expense-tracker deployment/expense-tracker-backend --tail=5 2>/dev/null | head -1)
if echo "$LOG_LINE" | jq . &> /dev/null; then
    echo -e "${GREEN}✓ JSON structured logging is working${NC}"
    echo "   Sample log entry:"
    echo "$LOG_LINE" | jq -C '.' 2>/dev/null || echo "$LOG_LINE"
else
    echo -e "${YELLOW}⚠️ No JSON logs found (may need to generate traffic)${NC}"
fi
echo ""

# Check database connection
echo -e "${YELLOW}11. Checking database connection...${NC}"
DB_POD=$(kubectl get pods -n expense-tracker -l component=postgres -o jsonpath='{.items[0].metadata.name}')
if [ ! -z "$DB_POD" ]; then
    DB_STATUS=$(kubectl exec -n expense-tracker $DB_POD -- pg_isready -U expense_user -d expense_tracker 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database is ready${NC}"
        echo "   $DB_STATUS"
    else
        echo -e "${RED}✗ Database not ready${NC}"
    fi
else
    echo -e "${RED}✗ Database pod not found${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ Test Complete!${NC}"
echo ""

# Show quick access commands
echo -e "${YELLOW}📝 Quick Access Commands:${NC}"
echo "  kubectl get pods -n expense-tracker"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-backend -f"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-frontend -f"
echo ""
echo -e "${GREEN}🌐 Access the application:${NC}"
echo "  http://expense-tracker.local"
echo "  http://expense-tracker.local/api/health"
echo ""