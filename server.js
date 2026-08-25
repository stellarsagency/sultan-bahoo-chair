const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'index.html'), (e, c) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(c, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  ╔══════════════════════════════════════════════╗`);
    console.log(`  ║   Sultan Bahoo Chair - Live Server Started   ║`);
    console.log(`  ╠══════════════════════════════════════════════╣`);
    console.log(`  ║   Local:   http://localhost:${PORT}             ║`);
    console.log(`  ║   Network: http://127.0.0.1:${PORT}            ║`);
    console.log(`  ╚══════════════════════════════════════════════╝\n`);
    console.log('  Pages:');
    console.log('    → http://localhost:8080/index.html');
    console.log('    → http://localhost:8080/director.html');
    console.log('    → http://localhost:8080/aims.html');
    console.log('    → http://localhost:8080/advisory.html');
    console.log('    → http://localhost:8080/news.html');
    console.log('    → http://localhost:8080/gallery.html');
    console.log('    → http://localhost:8080/contact.html');
    console.log('\n  Press Ctrl+C to stop.\n');
});
