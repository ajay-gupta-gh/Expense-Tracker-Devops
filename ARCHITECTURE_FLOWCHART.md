# Expense Tracker: Request Flow & DevOps Architecture

## 📊 Complete Request Flow Chart

```mermaid
graph TD
    subgraph CLIENT["🖥️ CLIENT SIDE"]
        USER["👤 User Browser"]
        REACT["⚛️ React App<br/>Dashboard/Expenses/Categories"]
    end

    subgraph NETWORK["🌐 NETWORK LAYER"]
        LB["Load Balancer<br/>Ingress Controller"]
        CACHE["Cache Layer<br/>Optional CDN"]
    end

    subgraph FRONTEND["🎨 FRONTEND PODS<br/>Kubernetes/Docker"]
        FE1["Frontend Pod 1<br/>Nginx + React"]
        FE2["Frontend Pod 2<br/>Nginx + React<br/>(Replicas: 2)"]
    end

    subgraph BACKEND["⚙️ BACKEND PODS<br/>Kubernetes/Docker"]
        BE1["Backend Pod 1<br/>Flask + Gunicorn<br/>Port: 5000"]
        BE2["Backend Pod 2<br/>Flask + Gunicorn<br/>(Replicas: 2)"]
    end

    subgraph ROUTES["📍 API ROUTES"]
        HEALTH["GET /api/v1/health"]
        EXPENSES["GET/POST/PUT/DELETE<br/>/api/v1/expenses"]
        CATEGORIES["GET/POST/PUT/DELETE<br/>/api/v1/categories"]
    end

    subgraph DATABASE["💾 DATABASE LAYER"]
        DB["PostgreSQL 16<br/>Service: postgres:5432<br/>PersistentVolume"]
        TABLES["Tables:<br/>• Categories<br/>• Expenses<br/>• Users"]
    end

    subgraph LOGGING["📝 LOGGING & MONITORING"]
        LOGS1["Structured JSON Logs<br/>Flask Logging"]
        LOGS2["Correlation ID Tracking<br/>Request Tracing"]
        LOGS3["Container Logs<br/>kubectl logs<br/>stdout/stderr"]
        MONITOR["🔍 Monitoring<br/>Prometheus/Loki<br/>Grafana Dashboards"]
    end

    subgraph STORAGE["🗄️ STORAGE LAYER"]
        VOLPG["PersistentVolume Claim<br/>postgres-storage<br/>1Gi Capacity"]
    end

    USER -->|1. HTTP Request| REACT
    REACT -->|2. API Call<br/>fetch/axios| LB
    LB -->|3. Route Request| CACHE
    CACHE -->|4. Forward| FE1
    CACHE -->|4. Forward| FE2
    
    FE1 -->|5. Parse Route<br/>Nginx Config| BE1
    FE2 -->|5. Parse Route| BE2
    
    BE1 -->|6. Process Request| HEALTH
    BE1 -->|6. Process Request| EXPENSES
    BE1 -->|6. Process Request| CATEGORIES
    
    BE2 -->|6. Process Request| HEALTH
    BE2 -->|6. Process Request| EXPENSES
    BE2 -->|6. Process Request| CATEGORIES
    
    HEALTH -->|7. Check Status| DB
    EXPENSES -->|7. Query/Update| DB
    CATEGORIES -->|7. Query/Update| DB
    
    DB -->|8. Execute SQL| TABLES
    TABLES -->|9. Return Data| DB
    
    DB -->|10. Response| BE1
    DB -->|10. Response| BE2
    
    BE1 -->|11. Format JSON| FE1
    BE2 -->|11. Format JSON| FE2
    
    FE1 -->|12. Send Response| USER
    FE2 -->|12. Send Response| USER
    USER -->|13. Update UI| REACT
    
    BE1 -.->|Emit Logs| LOGS1
    BE2 -.->|Emit Logs| LOGS1
    LOGS1 -->|Correlation ID| LOGS2
    LOGS2 -->|Container Logs| LOGS3
    LOGS3 -->|Aggregate| MONITOR
    
    DB -->|Store Data| VOLPG
    VOLPG -->|Persistent Storage| DB

    style CLIENT fill:#e1f5ff
    style NETWORK fill:#fff3e0
    style FRONTEND fill:#f3e5f5
    style BACKEND fill:#e8f5e9
    style DATABASE fill:#ffe0b2
    style LOGGING fill:#fce4ec
    style STORAGE fill:#c8e6c9
```

---

## 🔄 DevOps Infrastructure Workflow

```mermaid
graph TD
    subgraph DEVELOPMENT["👨‍💻 DEVELOPMENT"]
        DEV["Developer<br/>Writes Code"]
        COMMIT["Git Commit<br/>Push to Main"]
    end

    subgraph CICD["⚡ CI/CD PIPELINE"]
        TRIGGER["GitHub Actions<br/>Trigger"]
        TEST["Run Tests<br/>pytest<br/>npm test"]
        BUILD["Build Images<br/>Docker build"]
        PUSH["Push to Registry<br/>Docker Hub<br/>ECR"]
    end

    subgraph DOCKER["🐳 DOCKER LAYER"]
        BACKEND_IMG["Backend Image<br/>Flask + Gunicorn<br/>python:3.12-slim"]
        FRONTEND_IMG["Frontend Image<br/>Node + Vite<br/>nginx:alpine"]
        DB_IMG["Database Image<br/>postgres:16-alpine"]
    end

    subgraph ORCHESTRATION["☸️ KUBERNETES ORCHESTRATION"]
        NAMESPACE["Namespace:<br/>expense-tracker"]
        CONFIG["ConfigMap<br/>Database Config"]
        SECRET["Secret<br/>Passwords/API Keys"]
        DEPLOY_BE["Deployment:<br/>backend<br/>Replicas: 2"]
        DEPLOY_FE["Deployment:<br/>frontend<br/>Replicas: 2"]
        DEPLOY_DB["StatefulSet:<br/>postgres"]
        SVC_BE["Service:<br/>backend-service<br/>ClusterIP:5000"]
        SVC_FE["Service:<br/>frontend-service<br/>NodePort:30080"]
        SVC_DB["Service:<br/>postgres-service<br/>5432"]
        INGRESS["Ingress<br/>/api/* → backend<br/>/* → frontend"]
        PVC["PersistentVolumeClaim<br/>postgres-storage<br/>1Gi"]
        PV["PersistentVolume<br/>1Gi Storage"]
    end

    subgraph RUNTIME["🏃 RUNTIME ENVIRONMENT"]
        NODE["Kubernetes Node"]
        KUBELET["Kubelet<br/>Node Agent"]
        CONTAINER["Container Runtime<br/>Docker/containerd"]
    end

    subgraph MONITORING["📊 MONITORING & LOGGING"]
        LOGS_COLLECT["Log Collector<br/>Fluentd/Fluent Bit"]
        METRICS["Metrics<br/>Prometheus<br/>Node Exporter"]
        VISUALIZATION["Visualization<br/>Grafana<br/>Kibana"]
        ALERTS["Alerts<br/>AlertManager"]
    end

    subgraph LOCAL_DEV["💻 LOCAL DEVELOPMENT"]
        DOCKER_COMPOSE["docker-compose.yml<br/>Backend<br/>Frontend<br/>PostgreSQL"]
        LOCAL_DB["Local Database<br/>postgres:5432"]
    end

    DEV -->|1. Write Code| COMMIT
    COMMIT -->|2. Push| TRIGGER
    TRIGGER -->|3. Detect Change| TEST
    TEST -->|4. All Pass?| BUILD
    BUILD -->|5. Docker build| BACKEND_IMG
    BUILD -->|5. Docker build| FRONTEND_IMG
    BUILD -->|5. Docker build| DB_IMG
    
    BACKEND_IMG -->|6. docker push| PUSH
    FRONTEND_IMG -->|6. docker push| PUSH
    DB_IMG -->|6. docker push| PUSH
    
    PUSH -->|7. Registry| ORCHESTRATION
    
    ORCHESTRATION -->|Create| NAMESPACE
    NAMESPACE -->|Configure| CONFIG
    NAMESPACE -->|Secure| SECRET
    
    NAMESPACE -->|Deploy| DEPLOY_BE
    NAMESPACE -->|Deploy| DEPLOY_FE
    NAMESPACE -->|Deploy| DEPLOY_DB
    
    DEPLOY_BE -->|Create| SVC_BE
    DEPLOY_FE -->|Create| SVC_FE
    DEPLOY_DB -->|Create| SVC_DB
    
    SVC_BE -->|Route| INGRESS
    SVC_FE -->|Route| INGRESS
    
    DEPLOY_DB -->|Claim Storage| PVC
    PVC -->|Mounted on| PV
    
    DEPLOY_BE -->|Pull & Run| RUNTIME
    DEPLOY_FE -->|Pull & Run| RUNTIME
    DEPLOY_DB -->|Pull & Run| RUNTIME
    
    RUNTIME -->|Managed by| KUBELET
    KUBELET -->|Execute| CONTAINER
    
    CONTAINER -->|Emit Logs| LOGS_COLLECT
    CONTAINER -->|Emit Metrics| METRICS
    
    LOGS_COLLECT -->|Aggregate| VISUALIZATION
    METRICS -->|Aggregate| VISUALIZATION
    VISUALIZATION -->|Trigger| ALERTS
    
    DEV -->|Local Testing| DOCKER_COMPOSE
    DOCKER_COMPOSE -->|Connect| LOCAL_DB
    
    style DEVELOPMENT fill:#c8e6c9
    style CICD fill:#fff9c4
    style DOCKER fill:#b3e5fc
    style ORCHESTRATION fill:#ffccbc
    style RUNTIME fill:#f8bbd0
    style MONITORING fill:#e1bee7
    style LOCAL_DEV fill:#d1c4e9
```

---

## 📋 Request Lifecycle Details

### 1️⃣ **User Initiates Request**
```
Browser → API Call (fetch/axios)
GET /api/v1/expenses
Headers: {Authorization, Content-Type, Correlation-ID}
```

### 2️⃣ **Frontend Pod Processing**
```
Nginx → 
  Route Analysis (/api/* → backend-service)
  → Pass to Backend Service
```

### 3️⃣ **Load Balancing & Routing**
```
Kubernetes Service (backend-service) →
  Load Balance between Pod 1 & Pod 2 →
  Route to available Backend Pod
```

### 4️⃣ **Backend Processing**
```
Flask Application:
  1. Receive HTTP Request
  2. Extract Correlation ID (Logging)
  3. Route to appropriate handler
  4. Validate inputs
  5. Query Database
```

### 5️⃣ **Database Operation**
```
Query Plan:
  1. Parse SQL Query
  2. Check Cache
  3. Fetch from Disk (PersistentVolume)
  4. Return Result Set
  5. Close Connection
```

### 6️⃣ **Response Generation**
```
Backend:
  1. Process Data
  2. Serialize to JSON
  3. Add Correlation ID to headers
  4. Send HTTP Response
  5. Emit Structured Log
```

### 7️⃣ **Frontend Rendering**
```
React:
  1. Receive Response
  2. Parse JSON
  3. Update State
  4. Re-render Components
  5. Display to User
```

### 8️⃣ **Logging & Monitoring**
```
All Layers:
  1. Flask Logger → JSON Format → stdout
  2. Correlation ID tracking across request
  3. Container Logs collected by Kubernetes
  4. Fluentd aggregates logs
  5. Kibana/Grafana visualizes
  6. Alerts trigger on anomalies
```

---

## 🏗️ Docker & Kubernetes Integration

### **Local Development (docker-compose)**
```yaml
Frontend Service   → Docker Network → Backend Service
Backend Service    → Docker Network → PostgreSQL
All on: 127.0.0.1 (Single Machine)
```

### **Production (Kubernetes)**
```yaml
Frontend Pod 1  ─┐
                ├─→ Ingress → Internet
Frontend Pod 2  ─┘
                
Backend Pod 1   ─┐
                ├─→ Service (ClusterIP) → Internal Network
Backend Pod 2   ─┘
                
PostgreSQL Pod  → PersistentVolume → Disk Storage
```

---

## 🔐 Security & Best Practices Flow

```
User Request
    ↓
HTTPS/TLS Layer (Ingress)
    ↓
Authentication (Bearer Token)
    ↓
Authorization (Role-based)
    ↓
Input Validation
    ↓
Rate Limiting
    ↓
Process Request
    ↓
Database Query (Parameterized)
    ↓
Response + Security Headers
    ↓
User Browser (CORS Validated)
```

---

## 📊 Key Infrastructure Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Local development orchestration |
| `backend/Dockerfile` | Backend container image |
| `frontend/Dockerfile` | Frontend container image |
| `kubernetes/namespace.yaml` | Kubernetes namespace isolation |
| `kubernetes/backend-deployment.yaml` | Backend pod replicas |
| `kubernetes/frontend-deployment.yaml` | Frontend pod replicas |
| `kubernetes/postgres-storage.yaml` | Persistent data storage |
| `kubernetes/ingress.yaml` | External traffic routing |
| `kubernetes/services.yaml` | Internal service discovery |
| `kubernetes/secret.yaml` | Sensitive credentials |
| `kubernetes/configmap.yaml` | Configuration data |

---

## 🚀 Scaling & High Availability

```
Production Setup:
├── Kubernetes Cluster (3 Nodes)
├── Frontend Pods: 2-5 replicas
├── Backend Pods: 2-5 replicas (HPA)
├── PostgreSQL: 1 primary + N replicas
├── Load Balancer: Distributes traffic
├── Auto-scaling: CPU/Memory based
└── Health Checks: Liveness & Readiness probes
```

This architecture ensures:
- ✅ High Availability (Pod replicas)
- ✅ Load Distribution (Service LoadBalancing)
- ✅ Data Persistence (PersistentVolumes)
- ✅ Self-healing (Kubernetes restarts failed pods)
- ✅ Easy Scaling (Horizontal Pod Autoscaler)
- ✅ Structured Logging (Correlation across services)
- ✅ Security (Network policies, secrets management)
