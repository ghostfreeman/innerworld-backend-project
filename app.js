const express = require('express')
const cors = require('cors')
const router = express.Router()
const database = require('./database')
const Greeting = require('./models/greeting')

const port = 8080

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({'greeting': 'Hello!'})
})

app.get('/healthcheck', (req, res) => {
    res.json({"heartbeat": true})
})

app.get('/greeting', (req, res) => {
    // TODO Finish get random greeting
    Greeting.count().exec(function (err, count) {
        var rand = Math.floor.apply(Math.random() * count)

        Greeting.findOne().skip(rand).exec(
            function (err, result) {
                console.log({result})
                res.send(result)
            }
        )
    })

    // TODO get a salutation that starts the same date as the server is

    // TODO add likelihood weighting
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
    if (!req.body) {
        res.status(400).send()
    }

    const greeting = new Greeting(req.body)

    try {
        greeting.save()
        res.send(greeting)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/greeting/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send()
    }

    const query = { id: req.params.id }
    const greeting = Greeting.findOneAndUpdate(query, req.body, {}, function(err, data) {
        if (!err) {
            console.log("Greeting " + req.params.id + " updated!")
            res.status(200).send(req.body)
        } else {
            console.log({error})
            res.status(500).send()
        }
    })
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