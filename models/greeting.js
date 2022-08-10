var mongoose = require('mongoose')

var Schema = mongoose.Schema

var GreetingSchema = new Schema(
    {
        text: {type: String, required: true},
        start_date: {type: Date, required: false},
        end_date: {type: Date, required: false},
        clamp_to_morning: {type: Boolean, required: false},
        clamp_to_afternoon: {type: Boolean, required: false},
        clamp_to_evening: {type: Boolean, required: false},
        likelihood: {type: Number, required: true, default: 0}
    }
)

module.exports = mongoose.model('Greeting', GreetingSchema)