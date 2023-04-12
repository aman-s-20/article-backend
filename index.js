const express = require('express');
const app = express();
const connectDB = require('./db/connectiondb');
const port = process.env.PORT || '3000'
const auth = require('./routes/auth')
const article = require('./routes/article')
require("dotenv").config();
const cors = require('cors');
const bodyParser = require("body-parser");

const corsOptions = {
  origin:process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ],

  
  allowedHeaders: [
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ],
 
};

// app.use(cors());
app.use(cors(corsOpts));
app.use(cors(corsOptions))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',auth);
app.use('/api',article);

app.listen(port, () => {

    connectDB();
    console.log(`[OK] server started on port  ${port}`);
})
