const router = require('./src/routers/admin.js');
const express = require('express');
const path=require('path');
const bodyParser=require('body-parser');
const connection = require('./src/config/dbconnect.js');
connection();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);
app.listen(7000, () => {
    console.log("Server is connected");
});