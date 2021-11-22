const multer = require('multer');
const mysql = require('mysql')
const dotenv = require('dotenv');
const { BindingList } = require('twilio/lib/rest/conversations/v1/service/binding');
const client = require('twilio')('AC21de33b39fd03a78d421f6567a435bab','38501389e788eda04e1ce34c296ba8d4');
dotenv.config({patch:'../.env'})
let fichier  , nom , num_dossier, phone


function numBni(req,res){
   let  bni = req.body.bni
    test(bni)
    nom = req.body.nom
    num_dossier = req.body.num_dossier
    phone = req.body.phone
   SendMessage(nom,num_dossier)
}

function SendMessage(a,b){
    client.messages.create({
        body: "Bonjour "+" "+a+"! "+"On a réçu votre dossier pour la préinscription, le numéro de votre dossier est : "+" "+b,
        to: '+261'+phone,
        from: '+17816616099'
     }).then(message => console.log(message))
       // here you can implement your fallback code
       .catch(error => console.log(error))
}

const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.MDP,
    database : process.env.DATABASE
})
let compte;
function test (a){
    compte = a;
  }
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null, 'file')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
        fichier = Date.now() + '-' + file.originalname
        
       const sql = 'INSERT INTO `fichier`(`nom`,`id`,`bni`) VALUES (?,?,?)'
    
           if(compte.length > 1 ){
        db.query(sql,[fichier,Date.now(),compte],(error,response)=>{
            if(error){
                console.log(error)
            }
            else{
               console.log('Le fichier insere avec succes')
            
            }
        })}
    }   
});
const upload = multer({storage}).array('file');

 function Uploadfile(req, res)  {

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
}



module.exports = {Uploadfile,numBni}