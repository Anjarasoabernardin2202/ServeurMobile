const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ patch: '../.env' })

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MDP,
    database: process.env.DATABASE
})

function Insertion(req, res) {
    let nom = req.body.nom
    let mdp = req.body.mdp

    if (nom.length < 4 && mdp.length < 4) {
        res.send({ message: "Fatal" })
    } else {
        if (nom.length > 4) {
            if (mdp.length > 4) {
                const sql = "UPDATE `utilisateur` SET `nom`= ?,`mdp`= ? "
                db.query(sql, [nom, mdp], function (err, resultat) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.send({ message: "ok" })
                    }
                })

            } else {
                res.send({ message: "Emdp" });
            }

        } else {
            res.send({ message: "Enom" });
        }
    }





}

function Selection(req, res) {
    const demande = "SELECT * FROM `utilisateur`"

    db.query(demande, function (err, res0) {
        if (err) {
            console.log(err)
        }

        res.send(res0)

    })





}

module.exports = { Insertion, Selection }
