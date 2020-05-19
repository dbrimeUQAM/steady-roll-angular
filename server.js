const express = require("express");
const bodyParser = require("body-parser");

// Routers Express
const orders = require('./routes/orders');
const users = require('./routes/users');

const app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Application en execution au port ${port}`);
});

// Initialiser les routes
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/', (req, res) => {
  res.status(404).send('Route non trouvée.');
});
