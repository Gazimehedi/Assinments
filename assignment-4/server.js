const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const {readdirSync} = require('fs');


// middleware 
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use(cors());

readdirSync('./routes').map(r => app.use('/api/v1', require(`./routes/${r}`)));

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log('App run on port '+PORT);
    console.log('Please read documentation.pdf');
});