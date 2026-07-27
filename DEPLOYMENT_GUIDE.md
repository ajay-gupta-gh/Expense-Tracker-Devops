# 🚀 EXPENSE TRACKER - COMPLETE DEPLOYMENT GUIDE

## 📍Deployment Options Overview

| Option | Environment | Complexity | Use Case |
|--------|------------|-----------|----------|
| **Local Dev** | Your Machine | ⭐ Low | Development & Testing |
| **Docker Compose** | Single Machine | ⭐⭐ Medium | Staging & Demo |
| **Kubernetes** | Cluster | ⭐⭐⭐ High | Production & Scaling |

---

## 🔧 OPTION 1: LOCAL DEVELOPMENT (Quick Start)

### Prerequisites
```bash --
✓ Python 3.12+
✓ Node.js 18+
✓ PostgreSQL 16 running locally (or Docker)
```

### Step 1: Start PostgreSQL (via Docker)
```bash
# Start PostgreSQL in the background
docker run --name expense-postgres \
  -e POSTGRES_USER=expense_user \
  -e POSTGRES_PASSWORD=expense_pass \
  -e POSTGRES_DB=expense_tracker \
  -p 5432:5432 \
  -d postgres:16-alpine

# Verify it's running
docker ps | grep postgres
```

### Step 2: Backend Setup
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql://expense_user:expense_pass@localhost:5432/expense_tracker"
export FLASK_ENV=development
export LOG_LEVEL=DEBUG

# Initialize database and seed data
python3 run.py

# In another terminal, seed the database
python3 app/seed_data.py
```

**Backend will be available at:** `http://localhost:5000`

### Step 3: Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will be available at:** `http://localhost:5173` (or shown in terminal)

### Step 4: Test the Application
```bash
# Health check
curl http://localhost:5000/api/v1/health/live

# Get expenses
curl http://localhost:5000/api/v1/expenses

# Get categories
curl http://localhost:5000/api/v1/categories
```

### 🛑 Stop Local Development
```bash
# Stop backend (Ctrl+C in terminal)
# Stop frontend (Ctrl+C in terminal)
# Stop PostgreSQL
docker stop expense-postgres
docker rm expense-postgres
```

---

## 🐳 OPTION 2: DOCKER COMPOSE DEPLOYMENT

Best for: **Staging, Testing, Single-machine deployment**

### Step 1: Ensure Docker & Docker Compose Are Installed
```bash
docker --version
docker-compose --version
```

### Step 2: Build & Start All Services
```bash
# Navigate to project root
cd /home/sigmoid/Desktop/Expense\ tracker

# Build and start services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### Step 3: Verify Deployment
```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Check specific service
docker-compose logs backend --tail 50
```

### Step 4: Access the Application
```
🌐 Frontend:  http://localhost (Port 80)
🔌 Backend:   http://localhost:5000/api/v1
📊 API Docs:  http://localhost:5000/api/v1
💚 Health:    http://localhost:5000/api/v1/health/live
```

### Step 5: Test Endpoints
```bash
# Get all expenses
curl http://localhost:5000/api/v1/expenses

# Create a new expense
curl -X POST http://localhost:5000/api/v1/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lunch",
    "amount": 15.50,
    "category_id": 1,
    "date": "2024-07-20"
  }'

# Get health status
curl http://localhost:5000/api/v1/health/live
```

### Step 6: Database Access (Optional)
```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U expense_user -d expense_tracker

# Common commands:
\dt              # List tables
SELECT * FROM categories;
SELECT * FROM expenses;
\q               # Exit
```

### 🛑 Stop Docker Compose
```bash
# Stop and remove containers (keep volumes)
docker-compose down

# Stop and remove everything (including data)
docker-compose down -v
```

### 📝 Docker Compose Services
```yaml
postgres    → Database (Port 5432)
backend     → Flask API (Port 5000)
frontend    → Nginx (Port 80)
```

---

## ☸️ OPTION 3: KIND DEPLOYMENT (LOCAL KUBERNETES)

Best for: **Local testing, development, and validating Kubernetes manifests before cloud deployment**

### Step 1: Install Prerequisites

#### Install kubectl
```bash
# Ubuntu/Debian
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Verify
kubectl version --client
```

#### Install kind
```bash
# Linux (amd64)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Verify
kind --version
```

#### Install Docker
Make sure Docker is installed and running on your machine.

### Step 2: Create a Kind Cluster
```bash
cat > kind-config.yaml <<'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: expense-tracker
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP
EOF

kind create cluster --config kind-config.yaml
kubectl cluster-info
kubectl get nodes
```

### Step 3: Install NGINX Ingress Controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=300s
```

### Step 4: Build Docker Images for Kind
```bash
cd /home/sigmoid/Desktop/Expense\ tracker

# Build backend image
cd backend
docker build -t expense-tracker-backend:local .

# Build frontend image (default VITE_API_URL=/api/v1 relative URL; nginx proxies to backend-service)
cd ../frontend
docker build -t expense-tracker-frontend:local .

# Load images into the Kind cluster
kind load docker-image expense-tracker-backend:local --name expense-tracker
kind load docker-image expense-tracker-frontend:local --name expense-tracker
```

### Step 5: Deploy the Application
```bash
cd /home/sigmoid/Desktop/Expense\ tracker
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secret.yaml
kubectl apply -f kubernetes/postgres-storage.yaml
kubectl apply -f kubernetes/services.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/db-init-job.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/ingress.yaml
```

### Step 6: Verify Deployment
```bash
kubectl get pods -n expense-tracker
kubectl get svc -n expense-tracker
kubectl get ingress -n expense-tracker
```

### Step 7: Access the App
Because Kind exposes port 80/443 on your host, you can test the app locally with:

```bash
curl http://localhost/api/v1/health/live
curl http://localhost/api/v1/expenses
```

If you prefer to use the NodePort directly:

```bash
kubectl get svc -n expense-tracker frontend-service
```

### 🛑 Stop Kind Cluster
```bash
kind delete cluster --name expense-tracker
```

---

## 🧭 Notes for Kind

- The app uses the local images you built with `:local` tags.
- The ingress host is still set to `expense-tracker.local`; for local testing you may want to add it to your `/etc/hosts` file:

```bash
echo "127.0.0.1 expense-tracker.local" | sudo tee -a /etc/hosts
```

- For production, switch from the in-cluster Postgres setup to a managed database such as Azure Database for PostgreSQL or Amazon RDS.


### Step 3: Update Kubernetes Manifests

Edit the image references in your manifests:

**File:** `kubernetes/backend-deployment.yaml`
```yaml
# Change this line:
image: your-dockerhub-username/expense-tracker-backend:v1.0.0
```

**File:** `kubernetes/frontend-deployment.yaml`
```yaml
# Change this line:
image: your-dockerhub-username/expense-tracker-frontend:v1.0.0
```

### Step 4: Deploy to Kubernetes

```bash
cd kubernetes

# Method 1: Using Kustomize (Recommended)
kubectl apply -k .

# Method 2: Manual Apply (Sequential)
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f postgres-storage.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f db-init-job.yaml
kubectl apply -f services.yaml
kubectl apply -f ingress.yaml
```

### Step 5: Verify Deployment

```bash
# Check namespace
kubectl get namespace expense-tracker

# Check pods (wait for Running status)
kubectl get pods -n expense-tracker
kubectl get pods -n expense-tracker -w  # Watch pods

# Check services
kubectl get services -n expense-tracker
kubectl get svc -n expense-tracker

# Check ingress
kubectl get ingress -n expense-tracker

# Check persistent volumes
kubectl get pvc -n expense-tracker
kubectl get pv
```

### Step 6: Access the Application

#### For Minikube:
```bash
# Get Minikube IP
minikube ip

# Frontend
minikube service frontend-service -n expense-tracker

# Or manually:
curl http://$(minikube ip):30080

# Get backend service
kubectl port-forward -n expense-tracker svc/backend-service 5000:5000
# Access: http://localhost:5000/api/v1
```

#### For Cloud Clusters:
```bash
# Get Ingress IP/Domain
kubectl get ingress -n expense-tracker

# Frontend
curl http://<ingress-ip>

# Backend API
curl http://<ingress-ip>/api/v1/health/live
```

### Step 7: View Logs

```bash
# Backend logs
kubectl logs -n expense-tracker -l app=backend -f

# Frontend logs
kubectl logs -n expense-tracker -l app=frontend -f

# PostgreSQL logs
kubectl logs -n expense-tracker -l app=postgres -f

# Logs from specific pod
kubectl logs -n expense-tracker backend-deployment-xyz123 -f

# Get last 100 lines
kubectl logs -n expense-tracker backend-deployment-xyz123 --tail=100
```

### Step 8: Describe Resources (Debugging)

```bash
# Pod details
kubectl describe pod -n expense-tracker backend-deployment-xyz123

# Service details
kubectl describe service -n expense-tracker backend-service

# Check events
kubectl get events -n expense-tracker --sort-by='.lastTimestamp'
```

### 📊 Kubernetes Resource Overview

```
Namespace: expense-tracker
├── Deployments
│   ├── backend-deployment (2 replicas)
│   └── frontend-deployment (2 replicas)
├── Services
│   ├── backend-service (ClusterIP)
│   ├── frontend-service (NodePort)
│   └── postgres-service (ClusterIP)
├── StatefulSet
│   └── postgres
├── Job
│   └── db-init (database initialization)
├── Ingress
│   └── expense-ingress
├── ConfigMap
│   └── db-config
├── Secret
│   └── db-secret
├── PersistentVolume
│   └── postgres-pv
└── PersistentVolumeClaim
    └── postgres-pvc
```

### 🛑 Stop Kubernetes Deployment

```bash
# Delete all resources in namespace
kubectl delete namespace expense-tracker

# Or delete specific resources
kubectl delete deployment -n expense-tracker --all
kubectl delete service -n expense-tracker --all
kubectl delete pvc -n expense-tracker --all

# Stop Minikube (if using)
minikube stop
minikube delete
```

---

## 🔄 Scaling Kubernetes Deployment

### Manually Scale Replicas
```bash
# Scale backend to 5 replicas
kubectl scale deployment backend-deployment -n expense-tracker --replicas=5

# Scale frontend to 3 replicas
kubectl scale deployment frontend-deployment -n expense-tracker --replicas=3

# Check scaled pods
kubectl get pods -n expense-tracker
```

### Auto-scaling (Optional)
```bash
# Create HorizontalPodAutoscaler
kubectl autoscale deployment backend-deployment \
  -n expense-tracker \
  --min=2 \
  --max=10 \
  --cpu-percent=80

# Check autoscaling status
kubectl get hpa -n expense-tracker
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Clone repository
- [ ] Environment variables configured
- [ ] Database migration files ready
- [ ] Docker images built and tested
- [ ] Images pushed to registry (for K8s)

### Deployment
- [ ] Services started successfully
- [ ] Health checks passing
- [ ] Database initialized
- [ ] Sample data seeded
- [ ] Logs accessible

### Post-Deployment
- [ ] Frontend accessible
- [ ] Backend API responding
- [ ] Database connections working
- [ ] Monitoring/logging configured
- [ ] Backups in place (for production)

---

## 🐛 Troubleshooting

### Docker Compose Issues
```bash
# Rebuild without cache
docker-compose up --build --no-cache

# Remove everything and start fresh
docker-compose down -v
docker-compose up --build

# Check service logs
docker-compose logs service-name

# Execute command in container
docker-compose exec backend bash
```

### Kubernetes Issues
```bash
# Pod won't start
kubectl describe pod pod-name -n expense-tracker

# Check events for errors
kubectl get events -n expense-tracker

# View previous logs (if crashed)
kubectl logs pod-name -n expense-tracker --previous

# Get shell access to pod
kubectl exec -it pod-name -n expense-tracker -- /bin/bash

# Check resource usage
kubectl top pods -n expense-tracker
kubectl top nodes
```

### Database Connection Issues
```bash
# Test PostgreSQL connection
kubectl run -it --rm debug --image=postgres:16-alpine \
  --restart=Never -- psql -h postgres-service.expense-tracker \
  -U expense_user -d expense_tracker

# Check database service
kubectl get service -n expense-tracker postgres-service
kubectl describe service postgres-service -n expense-tracker
```

---

## 🔐 Security Best Practices

✅ **Implemented in K8s:**
- Non-root user in containers
- Resource limits set
- Health checks configured
- Network policies ready

✅ **Additional Measures:**
```bash
# 1. Use image pull secrets for private registries
kubectl create secret docker-registry regcred \
  --docker-server=docker.io \
  --docker-username=your-username \
  --docker-password=your-password \
  -n expense-tracker

# 2. Enable RBAC
kubectl create role expense-role -n expense-tracker --verb=get --resource=pods

# 3. Restrict network traffic
kubectl apply -f - <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: expense-network-policy
  namespace: expense-tracker
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector: {}
EOF
```

---

## 📞 Quick Reference Commands

### Docker Compose
```bash
docker-compose up -d              # Start services
docker-compose down               # Stop services
docker-compose ps                 # List services
docker-compose logs -f            # View logs
docker-compose exec service bash  # Shell access
```

### Kubernetes
```bash
kubectl apply -f file.yaml        # Apply manifest
kubectl delete -f file.yaml       # Delete resource
kubectl get pods -n namespace     # List pods
kubectl logs pod-name -n ns       # View logs
kubectl exec pod -n ns -- cmd     # Execute command
kubectl port-forward svc/name 8080:5000  # Port forward
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Choose your deployment option above and start deploying! 🎉**
