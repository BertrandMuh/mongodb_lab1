const mongoose = require('mongoose')

// create a schema
const fruitsSchema = new mongoose.Schema({
    name: String,
    color: String,
    age: Number,
    readyToEat: Boolean
})

let databaseCollection = 'myFruits'
const myFruits = mongoose.model(databaseCollection, fruitsSchema)


