const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const db = require('./database/models');

dotenv.config();
const port = process.env.PORT || '8081';
const server = http.createServer(app);

db.sequelize.authenticate()
  .then(() => server.listen(port, () => {
    console.log(`Server running in port ${port}`);
  }))
  .catch((error) => console.log('Cannot start sever', error));
