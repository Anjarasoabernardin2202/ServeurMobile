
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ patch: '../.env' })

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MDP,
    database: process.env.DATABASE
})

function login(req, res) {
    const nom = req.body.nom;
    const mdp = req.body.mdp;


    if (nom.length != 0) {
        if (mdp.length != 0) {
            const sql = "SELECT * FROM `utilisateur` WHERE nom = ? AND mdp = ?"
            db.query(sql, [nom, mdp], (err, resultat) => {
                if (err) {
                    console.log(err)
                } else {
                    if (resultat.length > 0) {
                        res.send({ message: "ok" });

                    } else {
                        res.send({ message: "Votre compte n'a pas été trouve, Réesayer SVP" });
                    }
                }
            })
        } else {

            res.send({ message: "Veuillez remplir le mot de passe, Réesayer SVP" });
        }

    } else {
        res.send({ message: "Veuillez remplir l'indentication, Réesayer SVP" });

    }


}

module.exports = { login }