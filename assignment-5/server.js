const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const cors = require('cors');
require('dotenv').config();
const {readdirSync} = require('fs');
const errorHandler = require('./Middleware/errorHandler');


//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(cookieParser());

//routes
readdirSync('./Routes').map(r => app.use('/api/v1', require(`./Routes/${r}`)));
app.use(errorHandler);
//database connection
mongoose
    .connect(process.env.DATABASE,{autoIndex: true})
    .then(() => console.log('database connected'))
    .catch((err) => console.log('DB error => ', err.message));

const port = process.env.PORT;
app.listen(port, (req,res) => {
    console.log(`server run at ${port} port`);
});


