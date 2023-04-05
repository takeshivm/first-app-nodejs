const express = require('express');
const router = express.Router();
const xml2js = require('xml2js');
const fs = require('fs');

router.get('/parser', (req, res, next) => {
    const xml = "<user><username>Takeshi</username><age>27</age><ppofesssion>Software developer</ppofesssion></user>";
    xml2js.parseString(xml, (error, result) => {
        res.status(200).json(result);
    })
})

router.get('/from-file', (req, res, next) => {
    const parser = new xml2js.Parser();
    fs.readFile('./books.xml', (err, data) => {
        parser.parseString(data, (error, result) => {
            let books = [];
            result.bookstore.book.map((book) => {
                books.push(book);
            })

            res.status(200).json(books[0].title[0].$.lang)
        })
    })
})

router.get('/xml', (req, res, next) => {
    const user = {
        username: 'Takeshi',
        email: 'takeshi@gmail.com',
        age: 27
    }
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(user);
    res.header('Content-type', 'text/xml').send(xml);
})

module.exports = router;