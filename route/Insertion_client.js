const mysql = require('mysql')
const dotenv = require('dotenv')
const nodemailer = require("nodemailer");
dotenv.config({ patch: '../.env' })

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    text: message,
  }

  transport.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email envoyer " + info.response)
    }
  })

}



const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.MDP,
  database: process.env.DATABASE
})

function Insertion(req, res) {
  let nom = req.body.nom
  let phone = req.body.phone
  let email = req.body.email
  let date_depart = req.body.date_d
  let date_retour = req.body.date_r
  let adulte = req.body.adulte
  let enfant = req.body.enfant
  let demande = req.body.d
  if (nom.length > 4) {
    if (phone.length >= 10) {
      if (email.length > 7) {

        if (!EMAIL_REGEX.test(email)) {
          res.send({ message: "Email2" });
        }
        else {
          if (parseInt(adulte) <= 99) {
            if (parseInt(enfant) <= 99) {
              if (date_depart.length != 10) {
                res.send({ message: "Edepart" });
              } else {
                if (date_retour.length != 10) {
                  res.send({ message: "Eretour" });
                } else {



                  const sql = "INSERT INTO `client`(`nom`, `phone`, `email`, `depart` , `retour`, `adulte` ,`enfant` , `action`, `demande`, `nombre`) VALUES (?,?,?,?,?,?,?,?,?,?)"
                  db.query(sql, [nom, phone, email, date_depart, date_retour, adulte, enfant, "Attente", demande, "1"], function (err, result) {
                    if (err) {
                      console.log(err)
                    }
                    else {
                      res.send({ message: "ok" });
                      SendMail(email, "Accuse de reception", "Bonjour " + nom + "! " + "Nous accusons la  réception de votre démande sur le Villa " + demande + " à Marrakech .")
                    }


                  })



                }
              }

            } else {
              res.send({ message: "Eenfant" });

            }
          } else {
            res.send({ message: "Eadulte" });
          }
        }

      } else {
        res.send({ message: "Email1" });

      }

    } else {
      res.send({ message: "Ephone" });
    }

  } else {
    res.send({ message: "Enom" });
  }



}

function HelloWord(req, res) {
  res.send("Bonjour depuis le serveur de Beranrdin")
}

module.exports = { Insertion, HelloWord }


