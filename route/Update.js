const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ patch: '../.env' })
const nodemailer = require("nodemailer");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MDP,
    database: process.env.DATABASE
})

function SendMail(email, Object, message) {
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "bernardinanjarasoa@gmail.com",
            pass: "FTFA1998",

        }
    })
    var mailOption = {
        from: "bernardinanjarasoa@gmail.com",
        to: email,
        subject: Object,
        text: message
    }

    transport.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email envoyer " + info.response)
        }
    })

}



function Accepte(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    let email = req.body.email
    let enfant = req.body.enfant
    let adulte = req.body.adulte
    let villa = req.body.villa
    let depart = req.body.depart
    let retour = req.body.retour
    // let nom = req.boy.nom
    let Object = "Confirmation de réservation  de  " + villa + " pour le voyage à Marrakech"
    let message = "Bonjour " + nom + "! Par présente je me présente de vous confirmer la reservation de  " + villa + " pour le nombre de " + enfant + " enfant et " + adulte + " adulte en pension pour la période allant du " + depart + " au " + retour + " . Veuiller recevoir. Madame. l'expression de mes Salution les plus distinguées .Find Your Consierge Marrakech"
    const demandeAccepte = "UPDATE `client` SET `action`= 'Accepté' WHERE `id` = ? AND nom = ?"

    db.query(demandeAccepte, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Attente'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)
                SendMail(email, Object, message)

            })
        }

    })

}


function Refuser(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    let villa = req.body.villa
    let depart = req.body.depart
    let retour = req.body.retour
    let email = req.body.email
    let Object = " Annulation de la réservation de " + villa + " pour le voyage à Marrakech"
    let message = "Bonjour " + nom + "! Nous avons bien réçu votre demande de réservation sur le " + villa + ", du " + depart + " au " + retour + " , Malheuresement nous ne pouvons vous donner la suite favorable ,  "
    // let nom = req.boy.nom
    const demandeAccepte = "UPDATE `client` SET `action`= 'Refuser' WHERE `id` = ? AND nom = ?"

    db.query(demandeAccepte, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Attente'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)
                SendMail(email, Object, message)

            })
        }

    })

}


function AnnulerDemande(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    let villa = req.body.villa
    // let nom = req.boy.nom
    const demandeAnuller = "UPDATE `client` SET `action`= 'Refuser' WHERE `id` = ? AND nom = ?"

    db.query(demandeAnuller, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Accepté'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)

            })
        }

    })

}


function RemettreEnAttente(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    // let nom = req.boy.nom
    const demandeAnuller = "UPDATE `client` SET `action`= 'Attente' WHERE `id` = ? AND nom = ?"

    db.query(demandeAnuller, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Refuser'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)
                // SendMail()

            })
        }

    })

}


function RemettreAccepte(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    // let nom = req.boy.nom
    const demandeAnuller = "UPDATE `client` SET `action`= 'Accepté' WHERE `id` = ? AND nom = ?"

    db.query(demandeAnuller, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Refuser'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)

            })
        }

    })

}

function SupprimerDefinitive(req, res) {
    let id = req.body.id
    let nom = req.body.nom
    // let nom = req.boy.nom
    const demandeAnuller = "DELETE FROM  `client` WHERE `id` = ? AND nom = ?"

    db.query(demandeAnuller, [id, nom], function (err, result) {
        if (err) {
            console.log(err)
        } else {
            const demande = "SELECT * FROM `client` WHERE action = 'Refuser'"

            db.query(demande, function (err, res0) {
                if (err) {
                    console.log(err)
                }

                res.send(res0)

            })
        }

    })

}















module.exports = { Accepte, Refuser, AnnulerDemande, RemettreEnAttente, RemettreAccepte, SupprimerDefinitive }