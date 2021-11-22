const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ patch: '../.env' })


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MDP,
    database: process.env.DATABASE
})

let demndeAttente = null;
let demandeAccepte = null;
let demandeRefuser = null;
let demandeTotal = null;


function Somme(req, res) {
    const SumAttente = "SELECT SUM(nombre) AS Attente , SUM(adulte) AS Adult , SUM(enfant) AS Enfant FROM `client` WHERE action = 'Attente'"
    const SumAccepte = "SELECT SUM(nombre) AS Accepte FROM `client` WHERE action = 'Accepté'"
    const SumRefuser = "SELECT SUM(nombre) AS Refuser FROM `client` WHERE action = 'Refuser'"
    const Sum = "SELECT SUM(nombre) AS Total , SUM(adulte) AS Adult , SUM(enfant) AS Enfant FROM `client`"
    db.query(Sum, function (err, res0) {
        if (err) {
            console.log(err)
        }
        demandeTotal = res0

    })
    db.query(SumAttente, function (err, res1) {
        if (err) {
            console.log(err)
        }
        demndeAttente = res1

    })

    db.query(SumAccepte, function (err, res2) {
        if (err) {
            console.log(err)
        }
        demandeAccepte = res2

    })

    db.query(SumRefuser, function (err, res3) {
        if (err) {
            console.log(err)
        }
        demandeRefuser = res3

    })

    res.send({
        SumAttente: demndeAttente,
        SumAccepte: demandeAccepte,
        SumRefuser: demandeRefuser,
        SumTotal: demandeTotal,
    })

}














module.exports = { Somme }