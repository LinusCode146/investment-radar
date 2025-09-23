// start.js / app.js
const next = require('next');
const { createServer } = require('http');

const port = process.env.PORT || 3000;
const dev = false;  // Force production
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        handle(req, res);
    }).listen(port, '0.0.0.0', () => {
        console.log(`Next.js production server listening on port ${port}`);
    });
});
