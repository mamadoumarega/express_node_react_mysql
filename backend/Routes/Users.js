const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();




// Connect To DB
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    //password: '',
    database: 'app_react_node'
})

con.connect(function (err){
    if (err) throw err;
    console.log('connected !');
})
// end

// Select or create Users table

function SelectOrCreateTable(){

    con.query('SELECT * FROM users', function (err, result, fields){

        if(err)
        {
            const sql = 'CREATE TABLE users (id INT Auto_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), pic VARCHAR(255), email VARCHAR(255) Not Null UNIQUE, adress VARCHAR(255) )';

            con.query(sql, function (err, result){
               if(err) throw err;

            });
        }
    })
}

SelectOrCreateTable();

// end

// Create new user
router.post('/Register', async (req, res) => {
    const email = req.body.Data.email;
    const pass = req.body.Data.password;
    const name = req.body.Data.name;

    con.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result){

        if (err) {
            res.send({ err: 'err' })
        }
        if(result.length === 0) {

            let sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${pass}')`;
            con.query(sql, function (err, result){

                if (err) { throw err; }

                res.status(200).send({ result })
                console.log(result)
            })
        } else {
            return res.status(201).send({ message: 'this email is already taken before'})
        }
    })
})

// end

const JwtPrivateSecret = 'secret';

// login user

router.post('/Login', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    con.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${pass}' `, async function (err, result){
        if(result.length !== 0){
            jwt.sign({ UserEmail:email}, JwtPrivateSecret,
                (err, token) => {
                res.status(200).send({ token:token})
            })
        }
        if (result.length === 0){
            res.status(400).send({ message: 'error not found' })
        }
    })

})



module.exports = router;
