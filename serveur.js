const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
var apiRouter = require('./apiRouter').router
const app = express()
const dotenv = require('dotenv')

dotenv.config({ patch: './.env' })
const Port = process.env.PORT || 8098;
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MDP,
    database: process.env.DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('Base Mysql marche avec succes');

    }
})


///// Pour les api de notre serveurs 

app.use('/', apiRouter)

//**************************** */


app.listen(Port, () => {
    console.log('serveur en ecoute sur les Port : ' + Port)
}
)

