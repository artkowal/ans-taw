const express = require('express');
const config = require('./config').config;

const questions = require('./questions').questions;
const info = require('./info').info;
const unkown = require('./unkown').unkown;

const app = express();

app.get('/api/questions/:id', (request, response) => {

    const id = parseInt(request.params.id);

    if (id > 0 && id <= questions.length) {
        response.send(questions[id -1]);
    } else {
        response.status(404).send(unkown)
    }
});

app.get('/api/questions', (request, response) => {
    response.send(questions);
 });

app.get('/api/info', (request, response) => {
    response.send(info);
});

app.listen(config.port, function () {
 console.info(`Server is running at port ${config.port}`);
});