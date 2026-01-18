# DevOps Exam Node.js App

Minimal Node.js service with `/health` and Prometheus `/metrics` endpoints, plus Docker, Helm, Argo CD, Grafana, and GitHub Actions examples.

## Local run

```bash
npm install
npm start
curl http://localhost:3000/health
curl http://localhost:3000/metrics
```

## Docker

```bash
docker build -t devops-exam-app:local .
docker run -p 3000:3000 devops-exam-app:local
```

## Helm

Update the image in `helm/devops-exam/values.yaml`, then:

```bash
helm install devops-exam helm/devops-exam --namespace devops-exam --create-namespace
```

## Argo CD

Edit `deploy/argocd-application.yaml` with your repo URL, then:

```bash
kubectl apply -f deploy/argocd-application.yaml
```

## Grafana

The Helm chart includes a dashboard `ConfigMap` labeled `grafana_dashboard=1`.
Import it automatically if your Grafana watches dashboard ConfigMaps.

## Metrics

Prometheus should scrape `http://<service>:3000/metrics`.
A `ServiceMonitor` is included when `serviceMonitor.enabled=true`.
