'use strict';

const pkg = require('./package')
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let apiDocJsonPath = path.join(__dirname, './json/api_data.json');

var app = express();
init(app);

async function init(app) {
    app.use(bodyParser.json({ limit: "2mb" }));
    app.use(bodyParser.urlencoded({ limit: '2mb', extended: true, keepExtensions: true }));

    let validator = (await require('./index')(apiDocJsonPath)).express;

    app.route('/user/need/save/:phone').post(validator('/user/need/save', 'POST'), (req, res) => { res.json({ code: 0 }) });
    app.route('/user/:id').get(validator('/user/:id', 'GET'), (req, res) => { res.json({ code: 0 }) });
    app.route('/user').post(validator('/user', 'POST'), (req, res) => { res.json({ code: 0 }) });
    app.route('/user/:id').put(validator('/user/:id', 'PUT'), (req, res) => { res.json({ code: 0 }) });
}

app.listen(8888, function () {
    console.log(`${pkg.name} listening on port 8888`);
})