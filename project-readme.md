# 💰 Expense Tracker - Full-Stack DevOps Project

> A production-grade expense tracking application demonstrating end-to-end DevOps practices including containerization, Kubernetes orchestration, CI/CD pipelines, and structured logging.

![Project Status](https://github.com/your-username/expense-tracker/actions/workflows/ci-cd.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

## 📋 Table of Contents
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Documentation](#api-documentation)
- [Logging Guide](#logging-guide)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              KUBERNETES CLUSTER                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ expense-tracker Namespace │    │
│  │                                                                       │    │
│  │  ┌─────────────────────┐          ┌─────────────────────┐           │    │
│  │  │ frontend-pod-1     │          │  frontend-pod-2     │           │    │
│  │  │  (React + Nginx)   │◄────────►│  (React + Nginx)   │           │    │
│  │  └─────────┬───────────┘          └─────────┬───────────┘           │    │
│  │            │                                │                        │    │
│  │  ┌─────────▼───────────────────────────────▼───────────┐             │    │
│  │  │              frontend-service (NodePort)            │             │    │
│  │  │                    port: 80, nodePort: 30080       │             │    │
│  │  └─────────────────────┬───────────────────────────────┘             │    │
│  │                        │                                             │    │
│  │  ┌─────────────────────▼─────────────────────────────────┐          │    │
│  │  │ Ingress Controller │          │    │
│  │  │    /api/* → backend-service     /* → frontend-service │          │    │
│  │  └─────────────────────────────────────────────────────────┘          │    │
│  │ │                                        │    │
│  │  ┌───────────────────────────▼─────────────────────────────────┐     │    │
│  │  │ backend-service (ClusterIP)              │     │    │
│  │  │ port: 5000                           │     │    │
│  │  └──────────┬────────────────────────┬────────────────────────┘     │    │
│  │             │                        │                               │    │
│  │  ┌──────────▼──────────┐ ┌────────▼──────────┐ │    │
│  │  │ backend-pod-1      │   │  backend-pod-2    │                    │    │
│  │  │  (Flask + Gunicorn) │   │  (Flask + Gunicorn)│                   │    │
│  │  │  replicas: 2        │   │                   │                    │    │
│  │  └──────────┬──────────┘   └────────┬──────────┘                    │    │
│  │             │                        │                               │    │
│  │  ┌──────────▼────────────────────────▼──────────┐                    │    │
│  │  │              PostgreSQL 16                  │                    │    │
│  │  │   PersistentVolumeClaim (1Gi)                │                    │    │
│  │  │   postgres-service:5432                      │                    │    │
│  │  └─────────────────────────────────────────────┘                    │    │
│  │                                                                      │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Communication Flow

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              LOGGING FLOW                                  │
│                                                                 │
│   Browser Console ─────────────────────────────────────────────────────►   │
│   (JSON Logs)         │                                                   │
│                      ▼                                                   │
│              ┌─────────────────┐                                         │
│              │ Frontend Pod │  JSON logs → stdout │
│              │ (Nginx/React)   │                                         │
│              └────────┬────────┘                                         │
│                       │                                                   │
│              ┌────────▼────────┐                                         │
│              │ Backend Pod     │  JSON logs → stdout                     │
│              │ (Gunicorn) │  correlation_id in each log │
│              └────────┬────────┘                                         │
│                       │                                                   │
│              ┌────────▼────────┐                                         │
│              │ PostgreSQL Pod │                                         │
│              └─────────────────┘                                         │
│                                                                             │
│   Logs collected by:                                                       │
│   • Kubernetes → container logs (kubectl logs)                            │
│   • Fluentd/Fluent Bit → Elasticsearch/Loki │
│   • Kibana/Grafana → Visualized dashboards │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Full-Stack Web Application**
  - React18 frontend with Tailwind CSS
  - Flask REST API with SQLAlchemy
  - PostgreSQL for persistent storage

- **DevOps Best Practices**
  - Multi-stage Docker builds (lean production images)
  - Kubernetes deployment with separate frontend/backend pods
  - Zero-downtime rolling deployments
  - Resource limits and health probes

- **Observability**
  - JSON-structured logging with correlation IDs
  - Request tracing across services
  - Health/readiness/liveness probes

- **CI/CD Pipeline**
  - Automated linting and testing
  - Docker image building with caching
  - Registry push with versioning
  - Kubernetes deployment automation
  - Post-deployment smoke tests

---

## 📦 Prerequisites

### For Local Development
- Docker & Docker Compose
- Python 3.12+
- Node.js 20+
- PostgreSQL 16 (via Docker)

### For Kubernetes Deployment
- kubectl CLI
- Kubernetes cluster (Minikube/Kind/Docker Desktop/Cloud)
- Docker Hub account (for images)
- GitHub repository with Actions enabled

### For CI/CD (GitHub Actions)
- GitHub repository- Docker Hub credentials (secrets)
- Kubernetes kubeconfig (secret)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Local Development with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Seed the database with sample data
docker exec expense-backend python seed_data.py

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000/api/v1
# Health Check: http://localhost:5000/health
```

### 3. View Structured Logs
```bash
# Backend logs
docker logs -f expense-backend

# Frontend logs
docker logs -f expense-frontend
```

---

## 🛠️ Local Development

### Backend Development
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL=postgresql://expense_user:expense_pass@localhost:5432/expense_tracker
export FLASK_ENV=development
export LOG_LEVEL=DEBUG

# Run migrations
flask db upgrade# Seed sample data
python seed_data.py

# Run development server
python run.py
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Run development server (proxies API to backend)
npm run dev
# Open http://localhost:3000
```

### Running Tests
```bash
# Backend tests
cd backend
pytest tests/ -v

# Frontend tests
cd frontend
npm run test
```

---

## 🐳 Docker Deployment

### Build Images Manually
```bash
# Backend
docker build -t your-username/expense-tracker-backend:v1.0.0 ./backend

# Frontend
docker build -t your-username/expense-tracker-frontend:v1.0.0 ./frontend
```

### Push to Registry
```bash
docker login -u your-username
docker push your-username/expense-tracker-backend:v1.0.0
docker push your-username/expense-tracker-frontend:v1.0.0
```

---

## ☸️ Kubernetes Deployment

### Prerequisites```bash
# Install kubectl
brew install kubectl  # macOS
# or download from https://kubernetes.io/docs/tasks/tools/

# Set up cluster (example: Minikube)
minikube start --driver=docker

# Verify cluster
kubectl cluster-info
```

### Step-by-Step Deployment

**1. Update Image References**
Edit `kubernetes/backend-deployment.yaml` and `kubernetes/frontend-deployment.yaml`:
```yaml
image: your-dockerhub-username/expense-tracker-backend:v1.0.0
image: your-dockerhub-username/expense-tracker-frontend:v1.0.0
```

**2. Apply Manifests**
```bash
# Apply all resources
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secret.yaml
kubectl apply -f kubernetes/postgres-storage.yaml
kubectl apply -f kubernetes/backend-deployment.yaml
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/services.yaml
kubectl apply -f kubernetes/ingress.yaml

# Or use Kustomizekubectl apply -k kubernetes/
```

**3. Verify Deployment**
```bash
# Check pod status
kubectl get pods -n expense-tracker

# Check services
kubectl get services -n expense-tracker

# Check ingress
kubectl get ingress -n expense-tracker

# View logs
kubectl logs -n expense-tracker -l app=expense-tracker -c backend --tail=100
kubectl logs -n expense-tracker -l app=expense-tracker -c frontend --tail=100
```

**4. Access Application**
```bash
# Get ingress endpoint
minikube service expense-tracker-ingress -n expense-tracker

# Or use port-forward for local access
kubectl port-forward -n expense-tracker svc/frontend-service 8080:80
# Access at http://localhost:8080
```

**5. Rolling Update**
```bash
# Update image and rolling restart
kubectl set image deployment/expense-tracker-backend backend=your-username/expense-tracker-backend:v1.1.0 -n expense-tracker
kubectl set image deployment/expense-tracker-frontend frontend=your-username/expense-tracker-frontend:v1.1.0 -n expense-tracker

# Monitor rollout
kubectl rollout status deployment/expense-tracker-backend -n expense-trackerkubectl rollout status deployment/expense-tracker-frontend -n expense-tracker
```

**6. Cleanup**
```bash
kubectl delete -f kubernetes/
```

---

## 🔄 CI/CD Pipeline

### Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE FLOW                               │
│                                                                             │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐ │
│  │  LINT & │───►│  BUILD   │───►│   PUSH   │───►│  DEPLOY  │───►│ SMOKE  │ │
│  │   TEST   │    │  IMAGES  │    │  IMAGES  │    │  TO K8S  │    │  TEST  │ │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └────────┘ │
│       │              │               │               │               │      │
│       ▼              ▼               ▼               ▼               ▼      │
│  • Flake8         • Backend • Docker Hub • kubectl • Health│
│  • ESLint         • Frontend      • Tagged with • Rolling • API   │
│  • pytest         • Multi-stage     SHA or semver update        • Tests │
│  • vitest         • Build cache                    • Wait for                       │
│                                                     rollout │
│                                                                             │
│  TRIGGER: Push to main branch or merge PR to main                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Required GitHub Secrets

| Secret | Description | Example |
|--------|-------------|---------|
| `DOCKERHUB_USERNAME` | Docker Hub username | `myusername` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_xxx` |
| `KUBE_CONFIG` | Base64-encoded kubeconfig | `LS0tLS1...` |

### Setup Instructions

**1. Configure Docker Hub**
- Create account at https://hub.docker.com
- Generate access token at https://hub.docker.com/settings/security
- Add to GitHub: Settings → Secrets → Actions

**2. Configure Kubernetes**
```bash
# Get kubeconfig
cat ~/.kube/config | base64 > kubeconfig-base64.txt

# Add to GitHub (one line!)
cat ~/.kube/config | base64 -w0# Copy output and add as KUBE_CONFIG secret
```

**3. Enable GitHub Actions**
Push to GitHub and Actions will auto-trigger.

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production:  http://your-domain.com/api/v1
```

### Health Endpoints

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "expense-tracker-backend",
  "version": "1.0.0",
  "checks": {
    "database": "healthy"
  }
}
```

#### GET /health/live
Liveness probe.

**Response:** `{"alive": true, "uptime": "running"}`

#### GET /health/ready
Readiness probe.

**Response:** `{"ready": true}`

### Category Endpoints

#### GET /api/v1/categories
Get all categories.

**Response:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Food & Dining",
      "description": "Restaurant expenses",
      "icon": "restaurant",
      "color": "#ff5722",
      "expense_count": 15
    }
  ]
}
```

#### POST /api/v1/categories
Create category.

**Request:**
```json
{
  "name": "Entertainment",
  "description": "Movies and games",
  "color": "#e91e63"
}
```

### Expense Endpoints

#### GET /api/v1/expenses
Get expenses with pagination and filters.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `per_page` (int): Items per page (default: 10, max: 100)
- `category_id` (int): Filter by category
- `start_date` (string): Filter from date (YYYY-MM-DD)
- `end_date` (string): Filter to date (YYYY-MM-DD)
- `sort_by` (string): Sort field (date, amount, title)
- `order` (string): Sort order (asc, desc)

**Response:**
```json
{
  "expenses": [
    {
      "id": 1,
      "title": "Lunch",
      "amount": 25.50,
      "date": "2026-07-15",
      "category": {"id": 1, "name": "Food"},
      "payment_method": "card"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 25,
    "pages": 3,
    "has_next": true,
    "has_prev": false
  }
}
```

#### POST /api/v1/expenses
Create expense.

**Request:**
```json
{
  "title": "Grocery shopping",
  "amount": 85.50,
  "date": "2026-07-15",
  "category_id": 1,
  "payment_method": "card",
  "description": "Weekly groceries"
}
```

#### PUT /api/v1/expenses/:id
Update expense.

#### DELETE /api/v1/expenses/:id
Delete expense.

#### GET /api/v1/expenses/stats
Get expense statistics.

**Response:**
```json
{
  "stats": {
    "total_count": 150,
    "total_amount": 5420.75,
    "average_amount": 36.14
  }
}
```

---

## 📝 Logging Guide

### Log Format (JSON)

All logs are JSON-structured for container log aggregation:

```json
{
  "timestamp": "2026-07-18T17:30:45.123Z",
  "level": "INFO",
  "service": "expense-tracker-backend",
  "message": "Expense created",
  "correlation_id": "550e8400-e29b-41d4-a716-446655440000",
  "expense_id": 42,
  "amount": 25.50
}
```

### Minimum Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | ISO8601 | When the log was created |
| `level` | string | DEBUG, INFO, WARN, ERROR |
| `service` | string | Service name for identification |
| `message` | string | Human-readable message |
| `correlation_id` | UUID | Request tracing identifier |

### Correlation ID Flow

```
Browser Request │
      ▼
Frontend (generates correlation_id)
      │
      ├─► API call with X-Correlation-ID header
      │
      ▼
Backend (extracts/propagates correlation_id)
      │
      ├─► Database query logs include correlation_id
      │
      ▼
Response includes X-Correlation-ID header │
      ▼
Frontend receives correlation_id for tracing
```

### Log Level Usage

| Level | Usage |
|-------|-------|
| `DEBUG` | Detailed debugging info, function entry/exit |
| `INFO` | Important business events, API calls |
| `WARN` | Recoverable issues, validation failures |
| `ERROR` | Exceptions, failed operations |

### Viewing Logs

#### Docker```bash
docker logs expense-backend --tail=100 -f | jq .
docker logs expense-frontend --tail=100 -f | jq .
```

#### Kubernetes
```bash
# All backend logs
kubectl logs -l app=expense-tracker,component=backend -n expense-tracker -f

# Specific pod
kubectl logs expense-tracker-backend-7d8f5b6c9-abc123 -n expense-tracker -f

# Previous container logs (after restart)
kubectl logs expense-tracker-backend-7d8f5b6c9-abc123 -n expense-tracker -p
```

#### Filter by Correlation ID
```bash
kubectl logs expense-tracker-backend-7d8f5b6c9-abc123 -n expense-tracker | \
  jq 'select(.correlation_id == "550e8400-e29b-41d4-a716-446655440000")'
```

### Frontend Logging

The frontend logs to browser console in JSON format:

```
{timestamp: "2026-07-18T17:30:45.123Z", level: "INFO", service: "expense-tracker-frontend", message: "API Call", method: "GET", url: "/api/v1/expenses", status: 200, duration_ms: 145, correlation_id: "550e8400-e29b-41d4-a716-446655440000"}
```

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── main.py              # Entry point
│   │   ├── models/              # SQLAlchemy models
│   │   │   ├── expense.py
│   │   │   └── category.py
│   │   ├── routes/              # API endpoints
│   │   │   ├── health.py
│   │   │   ├── expenses.py
│   │   │   └── categories.py
│   │   └── utils/              # Utilities
│   │ └── logging.py       # Structured logging
│   ├── tests/ # Unit tests
│   ├── Dockerfile              # Multi-stage build
│   ├── requirements.txt
│   ├── config.py
│   └── seed_data.py
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── utils/              # Utilities
│   │   │   └── logger.js        # Structured logging
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile              # Multi-stage build
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── nginx.conf
├── kubernetes/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── services.yaml
│   ├── ingress.yaml
│   ├── postgres-storage.yaml
│   └── kustomization.yaml
├── docker-compose.yml           # Local development
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # CI/CD pipeline
└── README.md
```

---

## 💡 Design Decisions

### 1. Flask vs FastAPI for Backend
**Decision:** Flask was chosen for simpler structure and broader educational value.
**Rationale:** FastAPI is excellent but adds async complexity. Flask demonstrates fundamental patterns clearly without overwhelming complexity. The API remains clean with Flask-Marshmallow for validation.

### 2. PostgreSQL over MongoDB
**Decision:** PostgreSQL with SQLAlchemy ORM.
**Rationale:** Expense data has strong relational structure (categories → expenses). PostgreSQL provides ACID compliance, better for financial data, and SQLAlchemy offers type safety. JSON fields used where flexibility needed.

### 3. Multi-Stage Docker Builds
**Decision:** Separated build and production stages.
**Rationale:** Final images contain only runtime dependencies. Backend: Python venv isolates dependencies. Frontend: Node build artifacts served by lean Nginx image. Result: Backend ~150MB, Frontend ~30MB.

### 4. Kubernetes Over Helm**Decision:** Plain YAML manifests with optional Kustomize.
**Rationale:** Simpler to understand, fewer abstractions for learning. Kustomize provides useful overlays without Helm complexity. GitOps can use ArgoCD or Flux with either approach.

### 5. GitHub Actions Over Azure DevOps/Other
**Decision:** GitHub Actions for CI/CD.
**Rationale:** Native GitHub integration, generous free tier, vast marketplace. Azure DevOps equally valid but GitHub Actions requires less setup for open-source projects.

### 6. NodePort for Frontend Service
**Decision:** NodePort instead of LoadBalancer for local development.
**Rationale:** LoadBalancer requires cloud provider. NodePort works everywhere. Production can switch to LoadBalancer or use Ingress controller for external access.

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check postgres pod logs
kubectl logs -n expense-tracker -l app=postgres

# Verify secret is correct
kubectl get secret expense-tracker-secret -n expense-tracker -o yaml# (compare DATABASE_URL with actual connection string)
```

### Image Pull Failures
```bash
# Verify image exists
docker search your-username/expense-tracker-backend

# Pull manually
docker pull your-username/expense-tracker-backend:v1.0.0
```

### Pod CrashLoopBackOff
```bash
# Get pod events
kubectl describe pod <pod-name> -n expense-tracker

# Common causes:
# - Missing secret/configmap
# - Wrong environment variables
# - Resource limits exceeded
```

### Ingress Not Working
```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress resources
kubectl describe ingress expense-tracker-ingress -n expense-tracker

# Common causes:
# - Missing ingress controller
# - DNS not configured
# - TLS certificate issues
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Flask](https://flask.palletsprojects.com/) - Backend framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Kubernetes](https://kubernetes.io/) - Orchestration
- [Docker](https://www.docker.com/) - Containerization