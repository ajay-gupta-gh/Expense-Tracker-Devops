#!/bin/bash
set -e

echo "🚀 Deploying Expense Tracker on Kind"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if kind-config.yaml exists
if [ ! -f "kind-config.yaml" ]; then
    echo -e "${RED}❌ kind-config.yaml not found!${NC}"
    exit 1
fi

# Step 1: Delete existing cluster
echo -e "${YELLOW}📁 Removing existing Kind cluster...${NC}"
kind delete cluster 2>/dev/null || true
echo -e "${GREEN}✅ Done${NC}"
echo ""

# Step 2: Create cluster with new config
echo -e "${YELLOW}📁 Creating Kind cluster...${NC}"
kind create cluster --config kind-config.yaml
echo -e "${GREEN}✅ Cluster created${NC}"
echo ""

# Step 3: Install ingress controller
echo -e "${YELLOW}🔧 Installing ingress controller...${NC}"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
echo -e "${GREEN}✅ Ingress controller installed${NC}"
echo ""

# Step 4: Wait for ingress controller
echo -e "${YELLOW}⏳ Waiting for ingress controller...${NC}"
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
echo -e "${GREEN}✅ Ingress controller ready${NC}"
echo ""

# Step 5: Patch the service to use NodePort
echo -e "${YELLOW}🔧 Patching ingress controller to NodePort...${NC}"
kubectl patch svc -n ingress-nginx ingress-nginx-controller \
  -p '{"spec":{"type":"NodePort"}}'
echo -e "${GREEN}✅ Service patched${NC}"
echo ""

# Step 6: Update hosts file
echo -e "${YELLOW}📝 Updating hosts file...${NC}"
sudo sed -i '/expense-tracker.local/d' /etc/hosts
echo "127.0.0.1 expense-tracker.local" | sudo tee -a /etc/hosts
echo -e "${GREEN}✅ Hosts file updated${NC}"
echo ""

# Step 7: Setup Nginx reverse proxy
echo -e "${YELLOW}🔧 Setting up Nginx reverse proxy...${NC}"
sudo tee /etc/nginx/sites-available/expense-tracker > /dev/null << 'EOF'
server {
    listen 80;
    server_name expense-tracker.local;
    
    access_log /var/log/nginx/expense-tracker-access.log;
    error_log /var/log/nginx/expense-tracker-error.log;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Correlation-ID $http_x_correlation_id;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/expense-tracker /etc/nginx/sites-enabled/ 2>/dev/null || true

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx
echo -e "${GREEN}✅ Nginx configured${NC}"
echo ""

# Step 8: Deploy application
echo -e "${YELLOW}🚀 Deploying application...${NC}"
kubectl apply -k kubernetes/
echo ""

# Step 9: Wait for database initialization
echo -e "${YELLOW}⏳ Waiting for database initialization...${NC}"
kubectl wait --for=condition=complete --timeout=120s job/db-init -n expense-tracker 2>/dev/null || echo -e "${YELLOW}⚠️ Database init job may still be running${NC}"
echo ""

# Step 10: Wait for deployments
echo -e "${YELLOW}⏳ Waiting for deployments...${NC}"
kubectl wait --for=condition=available --timeout=60s deployment/expense-tracker-backend -n expense-tracker
kubectl wait --for=condition=available --timeout=60s deployment/expense-tracker-frontend -n expense-tracker
kubectl wait --for=condition=available --timeout=60s deployment/postgres -n expense-tracker
echo -e "${GREEN}✅ All deployments ready${NC}"
echo ""

# Step 11: Show status
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

# Step 12: Show access URLs
echo -e "${GREEN}🔗 Access URLs:${NC}"
echo "  - Via Nginx (port 80): http://expense-tracker.local"
echo "  - Direct to Kind (port 8080): http://localhost:8080"
echo ""
echo -e "${YELLOW}📝 Test commands:${NC}"
echo "  curl http://expense-tracker.local/api/health"
echo "  curl http://localhost:8080/api/health"
echo ""
echo -e "${YELLOW}📊 View logs:${NC}"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-backend -f"
echo "  kubectl logs -n expense-tracker deployment/expense-tracker-frontend -f"