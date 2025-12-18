const http = require('http');
const options = { host: 'localhost', port: 3000, path: '/api/feedbacks', method: 'GET' };
const req = http.request(options, res => {
  console.log('STATUS', res.statusCode);
  res.setEncoding('utf8');
  let body='';
  res.on('data', chunk => body+=chunk);
  res.on('end', ()=> console.log('BODY', body));
});
req.on('error', e => console.error('ERR', e.message));
req.end();