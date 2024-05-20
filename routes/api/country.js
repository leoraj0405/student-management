var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root1234@',
    database: 'mydb'
})

con.connect(function (err) {
    if (err) throw err;
    console.log('mysql connected successfully')
})

router.get('/', (req, res) => {
    const response = {
        data :[]
    }
    try {
        con.query(`select * from country`, (err, result) => {
            res.send(result)
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/', (req, res) => {
    const {
        countryName,
        countryCode2,
        countryCode3,
        phoneCode
    } = req.body;
    try {
        sqlQuery = 'insert into country (countryName,countryCode2,countryCode3,phoneCode) values(?,?,?,?)'
        con.query(sqlQuery, [countryName, countryCode2, countryCode3, phoneCode], (err, result) => {
            console.log(err)
            res.send("insert successfully")
        })
    }
    catch (error) {
        console.error(error)
    }
})

router.put('/:sno', (req, res) => {
    const id = req.params.sno;
    try {
        const {
            countryName,
            countryCode2,
            countryCode3,
            phoneCode
        } = req.body;

        con.query('UPDATE country SET countryName = ?, countryCode2 = ?,countryCode3 = ?,phoneCode = ? WHERE sno = ?', [countryName, countryCode2, countryCode3, phoneCode, id], (err, result) => {
            con.query('select *  from country where sno = ?', [id], (err, resultData) => {
                res.send(resultData)
            })
        })
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:deleteCountry', (req, res) => {
    const id = req.params.deleteCountry;
    console.log(id)
    try {
        con.query('DELETE FROM country WHERE sno = ?', [id], (err, result) => {
            res.send('row deleted')
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        con.query(`select * from country where sno = ${id}`, (err, result) => {
            res.send(result[0])
        })
    } catch (error) {
        console.error(error)
    }
})
module.exports = router;