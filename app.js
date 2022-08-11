// import endOfDay from 'date-fns/endOfDay'
// import startOfDay from 'date-fns/startOfDay'

// const endOfDay = require('date-fns/endOfDay')
// const startOfDay = require('date-fns/startOfDay')
const datefns = require('date-fns')
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
    const time = new Date();
    var records_for_morning = 0;
    var records_for_afternoon = 0;
    var records_for_evening = 0;
    var todays_records_count = 0;

    var todays_records_count = Greeting.find({
        start_date: startTime,
        end_date: endTime,
    })
    .count()
    .then(count => {
        todays_records_count = count
    })

    var records_for_morning = Greeting.find({
        clamp_to_morning: true
    })
    .count()
    .then(count => {
        records_for_morning = count
    })

    var records_for_afternoon = Greeting.find({
        clamp_to_afternoon: true
    })
    .count()
    .then(count => {
        records_for_afternoon = count
    })

    var records_for_evening = Greeting.find({
        clamp_to_evening: true
    })
    .count()
    .then(count => {
        records_for_evening = count
    })

    Greeting.count().exec(function (err, count) {
        const rand = Math.floor(Math.random() * count)
        const startTime = datefns.startOfDay(time);
        const endTime = datefns.endOfDay(time)
        var morning = false
        var afternoon = false
        var evening = false


        if (datefns.isAfter(time, new Date().setHours(0,0,0,0))
            && datefns.isBefore(time, new Date().setHours(11, 59, 59, 999))) {
            morning = true
        }

        if (datefns.isAfter(time, new Date().setHours(12, 0, 0, 0))
            && datefns.isBefore(time, new Date().setHours(18, 59, 59, 999))) {
            afternoon = true
        }

        if (datefns.isAfter(time, new Date().setHours(19, 0, 0, 0))
            && datefns.isBefore(time, new Date().setHours(23, 59, 59, 999))) {
            evening = true
        }

        if (todays_records_count > 0) {
            Greeting.findOne({
                start_date: startTime,
                end_date: endTime,
            }).skip(rand).exec(
                function (err, result) {
                    res.send(result)
                }
            )
        } else if (morning && records_for_morning) {
            const randVal = Math.floor(Math.random() * records_for_morning);

            Greeting.findOne({
                clamp_to_morning: true
            }).skip(randVal).exec(
                function (err, result) {
                    res.send(result)
                } 
            )
        } else if (afternoon && records_for_afternoon) {
            Greeting.findOne({
                clamp_to_afternoon: true
            }).skip(rand).exec(
                function (err, result) {
                    res.send(result)
                } 
            )
        } else if (evening && records_for_evening) {
            Greeting.findOne({
                clamp_to_evening: true
            }).skip(rand).exec(
                function (err, result) {
                    res.send(result)
                } 
            )
        } else {
            Greeting.findOne({
                start_date: null,
                end_date: null
            }).skip(rand).exec(
                function (err, result) {
                    res.send(result)
                } 
            )
        }
    })

    // TODO add likelihood weighting (optional)
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