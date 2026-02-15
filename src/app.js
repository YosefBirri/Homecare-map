const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.options('*', cors());

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoute = require('./routes/index');
const productRoutes = require('./routes/product.routes');

app.use('/', indexRoute);
app.use('/api', productRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, 'docs')));

module.exports = app;
