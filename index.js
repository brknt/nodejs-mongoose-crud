const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// routes
const bookRoutes = require('./src/routes/book');



dotenv.config();

const PORT = process.env.PORT || 3001;


mongoose.set('strictQuery',false);
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Successfully connected to the database");
    app.listen(PORT,() =>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err)=>{
    console.log("Could not connect to the database. Error...", err);
});



const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));



// simple route
app.get("/",(req,res) =>{
    res.json({message:"welcome to crud application."});
});

app.use('/api/book',bookRoutes.routes);



