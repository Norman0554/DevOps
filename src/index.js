const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'devops-exam';

client.collectDefaultMetrics();
client.register.setDefaultLabels({ app: appName });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    end({ status_code: res.statusCode });
  });
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'DevOps exam app is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
