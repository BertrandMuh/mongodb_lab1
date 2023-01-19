

const express = require('express');
const mongoose = require('mongoose');

// allows us to use information from .env in this file
require('dotenv').config()

// import MyFruit object from fruit.js
const MyFruit = require('./models/fruit');
const MyVeggie = require('./models/veggie');

// create app by calling express function
const app = express();


// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL (?limit=2&color=green) 
// extended allows nested objects in URL
app.use(express.urlencoded({ extended: true }));

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static('public'));

let database = 'FoodDatabase'
// string we get from MongoDB - we hide our username and password in our .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetup.ag3i9yt.mongodb.net/${database}?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// function will activate once to let us know we are connected
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


app.post('/food/create_fruit', async (req, res) => {
    // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
    const { nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat } = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await MyFruit.create({
        name,
        color,
        age,
        readyToEat
    });


    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);

})

app.post('/food/create_veggie', async (req, res) => {
    // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
    const { nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat } = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await MyVeggie.create({
        name,
        color,
        age,
        readyToEat
    });

    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);
})

app.get('/food/fruits', async (req, res) => {
    let response = await MyFruit.find({});
    res.json(response)
});

app.get('/food/fruits/:fruitName', async (req, res) => {
    let request = req.params.fruitName;
    let response = await MyFruit.find({ name: request }).exec();

    res.json(response)
})

app.get('/food/veggies', async (req, res) => {
    let response = await MyVeggie.find({});
    res.json(response)
});

app.get('/food/veggies/:veggieName', async (req, res) => {
    let request = req.params.veggieName;
    let response = await MyVeggie.find({ name: request }).exec();

    res.json(response)
})

// app.get('/get_data', (req, res) => {
//     // Get data from MonogoDB,
//     // res.json(data)
//     // res.setHeader('Content-Type', 'application/json');

//     console.log("request received at /get_data");
//     console.log(process.env.MONGOPASSWORD);
//     res.json({data: "Response from server"})
// })
app.delete("/delete_nameless_data", async (req, res) => {
    let response = await MyFruit.deleteMany({ name: "" });



    res.send({ data: `deleted ${response.deletedCount} items.` })
})

app.get('/get_food_data', async (req, res) => {
    // get data from database
    let fruit = await MyFruit.find({});
    let veggie = await MyVeggie.find({});
    let response = { fruit, veggie }

    // send it back to front end
    res.json(response)
})

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});
