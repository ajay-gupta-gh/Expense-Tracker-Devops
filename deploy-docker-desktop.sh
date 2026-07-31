#!/bin/bash
set -e

echo "🚀 Deploying Expense Tracker on Docker Desktop"
echo "============================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Ensure we are using Docker Desktop context
echo -e "${YELLOW}🔄 Switching to docker-desktop context...${NC}"
kubectl config use-context docker-desktop
echo -e "${GREEN}✅ Using docker-desktop context${NC}"
echo ""

# Step 1: Install ingress controller for Docker Desktop
echo -e "${YELLOW}🔧 Installing ingress controller for Docker Desktop...${NC}"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
echo -e "${GREEN}✅ Ingress controller installed${NC}"
echo ""

# Step 2: Wait for ingress controller
echo -e "${YELLOW}⏳ Waiting for ingress controller...${NC}"
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
echo -e "${GREEN}✅ Ingress controller ready${NC}"
echo ""

# Step 3: Update hosts file
echo -e "${YELLOW}📝 Updating hosts file...${NC}"
sudo sed -i '/expense-tracker.local/d' /etc/hosts
echo "127.0.0.1 expense-tracker.local" | sudo tee -a /etc/hosts
echo -e "${GREEN}✅ Hosts file updated${NC}"
echo ""

# Step 4: Deploy application
echo -e "${YELLOW}🚀 Deploying application...${NC}"
kubectl apply -k kubernetes/
echo ""

# Step 5: Wait for deployments
echo -e "${YELLOW}⏳ Waiting for database initialization and deployments...${NC}"
# It's fine if the job doesn't exist yet, so we ignore errors for the job
kubectl wait --for=condition=complete --timeout=120s job/db-init -n expense-tracker 2>/dev/null || echo -e "${YELLOW}⚠️ Database init job may still be running or hasn't started yet${NC}"

kubectl wait --for=condition=available --timeout=60s deployment/expense-tracker-backend -n expense-tracker
kubectl wait --for=condition=available --timeout=60s deployment/expense-tracker-frontend -n expense-tracker
kubectl wait --for=condition=available --timeout=60s deployment/postgres -n expense-tracker
echo -e "${GREEN}✅ All application deployments ready${NC}"
echo ""

# Step 6: Deploy Logging Stack
echo -e "${YELLOW}🚀 Deploying Logging Stack (Loki + Grafana)...${NC}"
if [ -f "./deploy-logging.sh" ]; then
    ./deploy-logging.sh
else
    echo -e "${RED}❌ deploy-logging.sh not found, skipping logging deployment.${NC}"
fi
echo ""

# Step 7: Show status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📊 Current status:"
echo "=================="
kubectl get pods -n expense-tracker
echo ""
kubectl get svc -n expense-tracker
echo ""
kubectl get ingress -n expense-tracker
echo ""

# Step 8: Show access URLs
echo -e "${GREEN}🔗 Access URLs:${NC}"
echo "  - Main App: http://expense-tracker.local"
echo "  - Or via localhost: http://localhost"
echo ""
echo -e "${YELLOW}📝 Test commands:${NC}"
echo "  curl http://expense-tracker.local/api/health"
echo ""
echo -e "${YELLOW}📊 View logs:${NC}"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-backend -f"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-frontend -f"
echo "  (For Grafana logs, follow the instructions printed during the logging stack deployment)"
