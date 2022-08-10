const express = require('express')
const app = express();
const router = express.Router()
const database = require('./database')
const Greeting = require('./models/greeting')

const port = 8080

app.use(express.json());

app.get('/', (req, res) => {
    // TODO Send random greeting
    res.json({'greeting': 'Hello Olleh!'})
})

app.get('/healthcheck', (req, res) => {
    res.json({"heartbeat": true})
})

app.get('/greeting', (req, res) => {
    // TODO Get random salutation
})

app.get('/greeting/all', (req, res) => {
    // TODO Get all salutations
})

app.post('/greeting/create', (req, res) => {
    const data = req.body
    // TODO There has to be a way to do this with spread/rest
    salutation = {
        text: data.text,
        start_date: data.start_date,
        end_date: data.end_date,
        clamp_to_morning: data.clamp_to_morning,
        clamp_to_afternoon: data.clamp_to_afternoon,
        clamp_to_evening: data.clamp_to_evening,
        likelihood: data.likelihood,
    }

    const greeting = new Greeting(data)
    greeting.save(function (err) {
        console.log("Error in saving record", err)
        res.status(err.status || 500);
    })

    res.json(salutation)
})

app.put('/greeting/NUM', (req, res) => {
    // TODO Update Salutation
})

app.delete("/greeting/NUM", (req, res) => {
    // TODO Delete Salutation
})

app.listen(port, function () {
    console.log('App listening on port ' + port + '!')
})