# Monitoring Guide for Expense Tracker

This project now includes a lightweight observability stack using Loki and Grafana for logs collection and visualization.

## What was set up

- Loki: stores and indexes application and container logs
- Promtail: collects logs from Docker containers and forwards them to Loki
- Grafana: provides a web UI to query and visualize logs

This setup helps you monitor the Expense Tracker application without needing a large enterprise monitoring platform.

---

## What Loki does

Loki is a log aggregation system.

It collects log streams from services such as:
- backend Flask app
- frontend Nginx container
- PostgreSQL container
- Grafana and Loki services themselves

Loki does not store full application metrics like CPU or memory usage. Its main job is to centralize logs so you can search and analyze them easily.

### Example
You can search for:
- all logs from the backend service
- error logs from failed requests
- logs related to a specific request correlation ID

---

## What Grafana does

Grafana is the visualization layer.

It gives you a browser-based dashboard where you can:
- browse logs from Loki
- filter by service, level, or time range
- inspect application issues visually
- create dashboards for troubleshooting

Grafana is useful when you want to quickly understand what happened in the system without reading raw container logs.

---

## How it helps this project

This monitoring setup is helpful for the Expense Tracker because it gives you better visibility into:
- backend API errors
- failed requests
- application startup issues
- frontend serving problems
- database connectivity issues
- unexpected behavior across containers

It is especially useful during development, testing, and deployment validation.

---

## What it collects

The current setup collects:
- container logs from Docker
- backend application logs
- nginx/frontend access logs
- service logs from Grafana and Loki

It can also be extended later to collect:
- application metrics
- system resource usage
- alert rules
- traces

---

## How it was set up

The monitoring stack was added in these places:
- Docker Compose configuration in [docker-compose.yml](docker-compose.yml)
- Loki config in [monitoring/loki-config.yaml](monitoring/loki-config.yaml)
- Promtail config in [monitoring/promtail-config.yaml](monitoring/promtail-config.yaml)
- Grafana datasource config in [monitoring/grafana/provisioning/datasources/loki-datasource.yaml](monitoring/grafana/provisioning/datasources/loki-datasource.yaml)
- Kubernetes manifests in [kubernetes/monitoring/loki.yaml](kubernetes/monitoring/loki.yaml) and [kubernetes/monitoring/grafana.yaml](kubernetes/monitoring/grafana.yaml)

---

## How to run locally

From the project root, start the stack:

```bash
docker compose up -d
```

This will start:
- backend
- frontend
- postgres
- loki
- promtail
- grafana

---

## How to access

### Grafana
Open:

```text
http://localhost:3000
```

Default login:
- username: admin
- password: admin

### Loki
Loki is mainly used as a backend service for log storage and querying.

It is not a normal website, so opening:

```text
http://localhost:3100
```

will show a 404 page. You should use Grafana to browse logs.

Useful Loki endpoints are:

```text
http://localhost:3100/ready
http://localhost:3100/metrics
```

---

## Monitoring workflow for this project

For this Expense Tracker project, the monitoring workflow is:

1. The backend Flask app generates structured logs for requests, errors, and startup events.
2. The frontend Nginx container generates access and serving logs.
3. PostgreSQL emits startup and connection-related logs.
4. Promtail collects logs from these containers and forwards them to Loki.
5. Loki stores and indexes the logs so they can be searched efficiently.
6. Grafana connects to Loki and lets you explore logs from the browser.
7. You use Grafana to trace issues such as failed API calls, frontend page errors, database connection failures, or slow request handling.

### End-to-end flow in this project

- User action in the Expense Tracker UI triggers a request.
- The frontend serves the page and logs the request flow.
- The backend processes the request and writes application logs.
- Database activity is logged by PostgreSQL.
- Promtail ships all relevant logs to Loki.
- Grafana displays those logs for analysis and troubleshooting.

### Example troubleshooting flow

1. Start the application stack.
2. Open Grafana at http://localhost:3000.
3. Go to Explore.
4. Select the Loki datasource.
5. Search logs for a service such as backend or frontend.
6. Filter by time range.
7. Investigate errors or request failures.

### Example query
You can search for logs like:

```text
{job="docker"}
```

Or filter by service labels if you add more structured labels later.

---

## Example use cases

### 1. Backend issue
If the API returns an error, you can search backend logs to inspect the exception and stack trace.

### 2. Frontend issue
If the UI is not loading correctly, you can review nginx/frontend logs for failed requests or config issues.

### 3. Database issue
If the app cannot connect to PostgreSQL, you can inspect the database container logs to confirm startup or connectivity problems.

---

## Why this is valuable

This monitoring approach gives you:
- centralized logs
- easier debugging
- faster incident investigation
- better visibility into the full stack
- a foundation for future alerts and dashboards

---

## Next steps

You can extend this setup later with:
- alerting rules in Grafana
- dashboard panels for service health
- metrics collection with Prometheus
- trace collection with Tempo
