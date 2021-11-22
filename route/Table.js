const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ patch: '../.env' })


const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.MDP,
  database: process.env.DATABASE
})





function TableAttente(req, res) {
  const demande = "SELECT * FROM `client` WHERE action = 'Attente'"

  db.query(demande, function (err, res0) {
    if (err) {
      console.log(err)
    }

    res.send(res0)

  })





}



function TableAccepte(req, res) {
  const demandeA = "SELECT * FROM `client` WHERE action = 'Accepté'"

  db.query(demandeA, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)

  })



}

function TableRefuser(req, res) {
  const demandeR = "SELECT * FROM `client` WHERE action = 'Refuser'"

  db.query(demandeR, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.send(result)

  })





}













module.exports = { TableAttente, TableRefuser, TableAccepte }