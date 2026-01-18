const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/index');

function request(path, port) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port, path }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('health endpoint returns ok', async () => {
  const server = app.listen(0);
  const port = server.address().port;

  const res = await request('/health', port);
  assert.equal(res.status, 200);
  assert.match(res.body, /ok/);

  server.close();
});
