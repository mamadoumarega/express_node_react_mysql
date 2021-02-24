const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


//User
const Users = require('./Routes/Users');

const app = express();

app.use(cors({ origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));


// Connect To DB
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    //password: '',
    database: 'app_react_node'
})

con.connect(function (err){
    if (err) throw err;
})

//this function allow users to visit this path
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/', express.static(path.join(__dirname, 'react')))

// api

app.use('/api/users', Users);

// Port
const port = process.env.PORT || 4000;

// run the server
app.listen(port, () => console.log(`app listen on port ${ port }`))
