const express = require('express')
const app = express();
const router = express.Router()
const database = require('./database')

const port = 8080

app.get('/', (req, res) => {
    res.json({'greeting': 'Hello!'})
})

app.get('/healthcheck', (req, res) => {
    res.json({"heartbeat": true})
})

app.get('/greeting', (req, res) => {
    // TODO Get random salutation
})

app.get('/greeting/all', (req, res) => {
    // TODO Get ALL salutations
})

app.post('/greeting/create', (req, res) => {
    // TODO Create Salutation
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