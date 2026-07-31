#!/bin/bash
set -e

echo "📊 Deploying Log Aggregation Stack (Loki + Grafana)"
echo "==================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if helm is installed
if ! command -v helm &> /dev/null; then
    echo -e "${RED}❌ Helm is not installed. Please install Helm first: https://helm.sh/docs/intro/install/${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Adding Grafana Helm repository...${NC}"
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
echo -e "${GREEN}✅ Repository added/updated${NC}"
echo ""

echo -e "${YELLOW}📁 Setting up namespaces...${NC}"
kubectl create namespace logging 2>/dev/null || true
echo -e "${GREEN}✅ Logging namespace ready${NC}"
echo ""

echo -e "${YELLOW}🚀 Deploying Loki Stack (Loki + Promtail + Grafana)...${NC}"
# Deploy loki-stack which includes Promtail configured to send logs to Loki, and Grafana
helm upgrade --install loki grafana/loki-stack \
  --namespace logging \
  --set grafana.enabled=true \
  --set prometheus.enabled=false \
  --set prometheus.alertmanager.persistentVolume.enabled=false \
  --set prometheus.server.persistentVolume.enabled=false

echo -e "${GREEN}✅ Loki Stack and Grafana deployed successfully${NC}"
echo ""

echo -e "${YELLOW}⏳ Waiting for Grafana to be ready...${NC}"
kubectl wait --namespace logging \
  --for=condition=ready pod \
  --selector=app=grafana \
  --timeout=120s || echo -e "${YELLOW}⚠️ Grafana is still starting up...${NC}"
echo -e "${GREEN}✅ Check complete${NC}"
echo ""

# Get Grafana admin password (might fail if secret not yet created, so we ignore error temporarily)
GRAFANA_PASSWORD=$(kubectl get secret --namespace logging loki-grafana -o jsonpath="{.data.admin-password}" 2>/dev/null | base64 --decode || echo "Run: kubectl get secret --namespace logging loki-grafana -o jsonpath='{.data.admin-password}' | base64 --decode")

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo "==================================================="
echo -e "You can access Grafana to view your logs."
echo ""
echo -e "${YELLOW}To access Grafana, run this command in a separate terminal:${NC}"
echo "  kubectl port-forward --namespace logging service/loki-grafana 3000:80"
echo ""
echo "Then, open your browser and navigate to: http://localhost:3000"
echo ""
echo -e "Credentials:"
echo "  Username: admin"
echo "  Password: ${GRAFANA_PASSWORD}"
echo ""
echo -e "${YELLOW}Instructions to view logs:${NC}"
echo "1. Log into Grafana."
echo "2. Go to 'Explore' (compass icon on the left menu)."
echo "3. Ensure 'Loki' is selected in the data source dropdown."
echo "4. In the 'Log browser', you can query logs by selecting labels like 'namespace' -> 'expense-tracker' or 'app' -> 'backend'."
