require('dotenv').config();

const express = require("express");
const app = express();
const axios = require('axios');
// const dotenv = require('dotenv');
const Twitter = require('./api/helpers/twitter');
const twitter = new Twitter();
// dotenv.config();

// console.log(process.env.TWITTER_API_TOKEN)

const port = process.env.PORT || 3000;

app.use(express.static('client'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.json());
app.get('/', (req, res) => {
    res.send("<h1> 👋 Hello World!! ✌😇🚀 </h1>")
})
app.get('/api/tweets', (req, res) => {
    const query = req.query.q;
    const resultType = req.query.result_type;
    const maxId = req.query.max_id;
    twitter.get(query, resultType, maxId).then((response) => {
        res.status(200).send(response.data);
    }).catch((error) => {
        res.status(400).send(error);
    });
})

app.listen(port, () => console.log("Listening on http://localhost:3000/"));