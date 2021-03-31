const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

// IMPORT ROUTES
const postsRoute = require('./routes/posts');

// MIDDLEWARE
app.use(bodyParser.json());
app.use('/posts', postsRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send("GET root response");
});

// DATABASE
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true, useUnifiedTopology: true }, (connectionRes) => {
    console.log(connectionRes);
});

app.listen(3000);