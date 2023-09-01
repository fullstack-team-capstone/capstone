// main.js

require('dotenv').config()

const express = require('express');
const router = require('vite-express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.json());

app.use(express.static('public'))

const db = require('./db/client')
db.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

// Added lines for integrating admin.js
const adminRouter = require('./api/admin'); // Import the new admin router
app.use('/api/admin', adminRouter); // Use the admin router for paths that start with /api/admin

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

module.exports = router;
