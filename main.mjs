// Node.js Hello World — native HTTP server
// Uses the built-in node:http module (no frameworks)

import http from "node:http";

const PORT = 8000;

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const name = url.searchParams.get("name") ?? "World";

  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Node.js 💚 Hello</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      color: #1e293b;
    }
    main { text-align: center; }
    h1 { font-size: 4rem; font-weight: 800; }
    h1 span { background: linear-gradient(135deg, #16a34a, #4ade80); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { margin-top: 1rem; font-size: 1.25rem; color: #475569; }
    .badge {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      background: #1e293b;
      color: #f8fafc;
      font-size: 0.875rem;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <main>
    <h1>Hello, <span>${escapeHtml(name)}</span>!</h1>
    <p>This is a <strong>Node.js</strong> native HTTP server 💚</p>
    <div class="badge">Node ${process.version} · ${req.method} ${url.pathname}</div>
  </main>
</body>
</html>`;

  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`💚 Node.js server listening on http://localhost:${PORT}`);
});
