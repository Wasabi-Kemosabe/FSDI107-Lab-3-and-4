var http = require('http');

var express = require('express');
var app = express();


// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Read req body as obj
var bparser = require('body-parser');
app.use(bparser.json());

// To server HTML, CSS, JS from this server
app.use(express.static(__dirname + '/Lab2'));

// To serve HTML
var ejs = require('ejs');
app.set('views', __dirname + '/Lab2'); // where are the HTML files?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);


// MONGO and Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
// Database connection
var db = mongoose.connection;
// Database object constructor
var ItemDB;


// Storage options
var items = [];
var nextId = 0;


// Web server functionality

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/admin', (req, res) => {
    res.render('admin.html');
})

app.get('/contact', (req, res) => {
    res.send('This is contact page');
});

app.get('/about', (req, res) => {
    res.render('about.html');
});

// Endpoint for REST functionality
// REST (representational state transfer)

app.get('/api/products', (req, res) => {
    // Read from mongoose and send it to client
    ItemDB.find({}, (error, data) => {
        if (error) {
            console.log('Error reading data', error);
            res.status(500);
            res.send(error);
        }
        res.json(data);
    });
});


app.get('/api/products/:user', (req, res) => {
    // Read from mongoose and send it to client
    ItemDB.find({
        user: req.params.user
    }, (error, data) => {
        if (error) {
            console.log('Error reading data', error);
            res.status(500);
            res.send(error);
        }
        res.json(data);
    });
});


app.post('/api/products', (req, res) => {
    console.log('Client wants to save item');
    console.log(req.body);

    // Get and assign an id
    var item = new ItemDB(req.body);

    // Save the object onto DB
    item.save((error, savedItem) => {
        if (error) {
            console.log('Error, item was not saved on Mongo', error);
            res.status(500);
            res.send(error);
        }
        console.log('Item saved correctly!');

        // Send back as a json
        res.status = 201;
        res.json(savedItem);
    });

});


app.get('/homework', (req, res) => {
    /**
     1. Give the sum of all the numbers in the array. Then give the multiplication of all the numbers in the array.
     2. Find the vowels in a given text
     */
    var numbers = [12, 23, 98, 23, 12, 89, 0, 43, 0, 12, 77, 89, 34, 0, 1, 23, 32, 0, 89];
    var sum = 0;
    var multiply = 1;

    var text = "This is just Another Exercise For You TO PRacTiCe codING soluti0Ns to probl3ms";
    var vowels = 'aeiou';
    var textAnswer = [];

    for (let i = 0; i < numbers.length; i++) {
        const element = numbers[i];
        sum += element;
        multiply *= element;
    }

    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        if (vowels.includes(letter.toLowerCase())) {
            textAnswer.push(letter);
        }
    }
    res.send('Total sum is ' + sum + ' and the total multiplication is ' + multiply + '<br>' + textAnswer);
});


app.get('/homework2', (req, res) => {
    // 1. Print the name of all females
    // 2. Print the name of all males
    // 3. Print the friend name of the females
    var data = [{
            "id": "5d5847889d6013c57eceb33b",
            "name": "Mai David",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Alford Fisher"
                },
                {
                    "id": 1,
                    "name": "Irma Serrano"
                },
                {
                    "id": 2,
                    "name": "Cooley Guzman"
                }
            ]
        },
        {
            "id": "5d58478887dcb823af142aaa",
            "name": "Ruiz Lucas",
            "gender": "male",
            "friends": [{
                    "id": 0,
                    "name": "Deana Santos"
                },
                {
                    "id": 1,
                    "name": "Macdonald Fischer"
                },
                {
                    "id": 2,
                    "name": "Carly Mcintyre"
                }
            ]
        },
        {
            "id": "5d584788eb0202e69a992ff5",
            "name": "Beverly Hutchinson",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Debora Vargas"
                },
                {
                    "id": 1,
                    "name": "Snow Hays"
                },
                {
                    "id": 2,
                    "name": "Leon Obrien"
                }
            ]
        },
        {
            "id": "5d58478831d9cfdede67749b",
            "name": "Meagan Ferguson",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Mooney Dyer"
                },
                {
                    "id": 1,
                    "name": "Roxanne Ross"
                },
                {
                    "id": 2,
                    "name": "Banks Kramer"
                }
            ]
        },
        {
            "id": "5d584788331ae655cd5415cf",
            "name": "Shannon Shepard",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Vicki Joyner"
                },
                {
                    "id": 1,
                    "name": "Hanson Evans"
                },
                {
                    "id": 2,
                    "name": "Sylvia Salinas"
                }
            ]
        },
        {
            "id": "5d584788cd32d81c3e6c9988",
            "name": "Alba Acevedo",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Lindsay Tate"
                },
                {
                    "id": 1,
                    "name": "Hodges Hinton"
                },
                {
                    "id": 2,
                    "name": "Knox Dominguez"
                }
            ]
        },
        {
            "id": "5d58478848247a725136b0a9",
            "name": "Lee Bullock",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Gates Underwood"
                },
                {
                    "id": 1,
                    "name": "Olga Valenzuela"
                },
                {
                    "id": 2,
                    "name": "Jillian Griffin"
                }
            ]
        },
        {
            "id": "5d5847888054f64fa4f29b00",
            "name": "Reyna Bradshaw",
            "gender": "female",
            "friends": [{
                    "id": 0,
                    "name": "Rosalie Salazar"
                },
                {
                    "id": 1,
                    "name": "Rosella Reed"
                },
                {
                    "id": 2,
                    "name": "Herring Stevenson"
                }
            ]
        },
        {
            "id": "5d5847880905dfc8e17b38b8",
            "name": "Hunt Andrews",
            "gender": "male",
            "friends": [{
                    "id": 0,
                    "name": "Bauer Palmer"
                },
                {
                    "id": 1,
                    "name": "Lenore Wall"
                },
                {
                    "id": 2,
                    "name": "Schmidt Greer"
                }
            ]
        },
        {
            "id": "5d584788a6471c91d2defb0d",
            "name": "Craft Pena",
            "gender": "male",
            "friends": [{
                    "id": 0,
                    "name": "Paige Giles"
                },
                {
                    "id": 1,
                    "name": "Letha Chandler"
                },
                {
                    "id": 2,
                    "name": "Jordan Browning"
                }
            ]
        },
        {
            "id": "5d5847880e38b3dd61e690e1",
            "name": "Wiley England",
            "gender": "male",
            "friends": [{
                    "id": 0,
                    "name": "Marianne Baker"
                },
                {
                    "id": 1,
                    "name": "Kramer Rush"
                },
                {
                    "id": 2,
                    "name": "Frieda Winters"
                }
            ]
        },
        {
            "id": "5d584788920208c8e838fbbd",
            "name": "Gomez Crosby",
            "gender": "male",
            "friends": [{
                    "id": 0,
                    "name": "Jacqueline Faulkner"
                },
                {
                    "id": 1,
                    "name": "Marissa Barr"
                },
                {
                    "id": 2,
                    "name": "Veronica Ochoa"
                }
            ]
        }
    ];
    var answer1 = [];
    var answer2 = [];
    var answer3 = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.gender === 'female') {
            answer1.push(element.name);
            for (let x = 0; x < element.friends.length; x++) {
                const friends = element.friends[x];
                answer3.push(friends.name);
            }
        } else {
            answer2.push(element.name);
        }
    }
    res.send('Females include: ' + answer1 + '<br><br> Males include: ' + answer2 + '<br><br>' + answer3);
});


// Listen to DB connection events
db.on('error', function (error) {
    console.log('Error connection to Mongo server', error);
})
db.on('open', function () {
    console.log('Success, database is online!');

    /*
    The allowed SchemaTypes are:
    string, number, date, buffer, boolean, mixed, ObjectId, array
    */

    // Specify the basic structure that each object will have on the DB
    var itemSchema = mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        user: String
    });

    ItemDB = mongoose.model('itemsCh4', itemSchema);
})


app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});

/*
To stop the server press control + C
Use npm list -g --depth 0 to list all modules stored globally
*/