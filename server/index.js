require('dotenv').config()
const express = require('express');
const sequelize = require('./config/db');
const morgan = require('morgan');
const winston = require('./config/logger')
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const router = require('./routes/index')


const app = express();

app.use(cors())
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try{
       await sequelize.authenticate()
       await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is working on port: ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()




