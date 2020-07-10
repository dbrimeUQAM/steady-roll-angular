const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routers Express
const articles = require('./routes/articles');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const hospitals = require('./routes/hospitals');
const invoices = require('./routes/invoices');
const orders = require('./routes/orders');
const users = require('./routes/users');

const app = express()
  .use(cors())
  .use(bodyParser.json());

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Application en execution au port ${port}`);
});

// Initialiser les routes
app.use('/api/articles', articles);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/hospitals', hospitals);
app.use('/api/invoices', invoices);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/', (req, res) => {
  res.status(404).send('Route non trouvée.');
});
