// Create web server
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const comments = require('./comments');

http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/api/comments' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(comments));
  } else if (pathname === '/api/comments' && req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const comment = JSON.parse(data);
      comments.push(comment);
      res.end(JSON.stringify(comment));
    });
  } else {
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }
}).listen(3000, () => {
  console.log('Server is running at http://localhost:3000/');
});