const express = require('express')
const app = express();
const router = express.Router()
const database = require('./database')
const Greeting = require('./models/greeting')

const port = 8080

app.use(express.json());

app.get('/', (req, res) => {
    res.json({'greeting': 'Hello Olleh!'})
})

app.get('/healthcheck', (req, res) => {
    res.json({"heartbeat": true})
})

app.get('/greeting', (req, res) => {
    // TODO Get random salutation

    // TODO get a salutation that starts the same date as the server is
})

app.get('/greeting/all', async (req, res) => {
    const greetings = await Greeting.find({});

    try {
        res.send(greetings)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/greeting/create', async (req, res) => {
    const greeting = new Greeting(req.body)

    try {
        await greeting.save()
        res.send(greeting)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/greeting/:id', (req, res) => {
    // TODO Update Salutation
})

app.delete("/greeting/:id", (req, res) => {
    if (!req.params.id) {
        res.status(400).send()
    }

    const greeting = Greeting.deleteOne({id: req.params.id}, function(err, data) {
        if (!err) {
            console.log("Greeting " + req.params.id + " deleted")
            res.status(200).send()
        } else {
            console.log({error})
            res.status(500).send()
        }
    })
})

app.listen(port, function () {
    console.log('App listening on port ' + port + '!')
})