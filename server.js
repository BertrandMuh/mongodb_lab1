
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MyFruit = require('./models/fruits');

const app = express();

app.use(express.static('public'));

// Before the ? in the connectionString, put the name of database you want to connect
let database = 'fruits'
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetup.ag3i9yt.mongodb.net/${database}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// before I can ask and send data into the collection, I need to create a model



app.get('/get_data', (req, res) => {
    // Get data from MonogoDB,
    // res.json(data)
    res.setHeader('Content-Type', 'application/json');

    console.log("request received at /get_data");
    console.log(process.env.MONGOPASSWORD);
    res.json({ data: "Response from server" })
})


app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});
