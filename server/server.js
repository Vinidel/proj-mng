const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();
const port = process.env.PORT || '8081';
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
