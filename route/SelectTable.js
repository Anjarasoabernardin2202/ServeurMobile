const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({patch:'../.env'})


const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.MDP,
    database : process.env.DATABASE
})

function Selection(req,res){
const sql =  "SELECT * FROM `etudiant` WHERE `rmq` = 'Attente'"
db.query(sql,function(err,result){
  if(err){
      console.log(err)
  }
  res.send(result)

})
}

function Total_dossier(req,res){
  const sql =  "SELECT SUM(etat) AS Total FROM `etudiant`"
db.query(sql,function(err,result){
  if(err){
      console.log(err)
  }
  res.send(result)

})

}
function Total_dossier_Attente(req,res){
  
  let sql1 =  "SELECT SUM(etat) AS Total FROM `etudiant` WHERE `rmq` = 'Attente'"
  
db.query(sql1,function(err,result){
  if(err){
    console.log(err)
}
res.send(result)

})

}
function Total_dossier_Valide(req,res){
  
  
  let sql2 =  "SELECT SUM(etat) AS Total FROM `etudiant` WHERE `rmq` = 'Validé'"

db.query(sql2,function(err,result){
  if(err){
    console.log(err)
}
res.send(result)

})

}
function Total_dossier_Refuse(req,res){
  
  let sql3 =  "SELECT SUM(etat) AS Total FROM `etudiant` WHERE `rmq` = 'Réfusé'"
db.query(sql3,function(err,result){
  if(err){
    console.log(err)
}
res.send(result)

})

}

function Liste_attente(req,res){
  const sql =  "SELECT * FROM `etudiant` WHERE rmq = ?"
  db.query(sql,['Attente'],function(err,result){
    if(err){
        console.log(err)
    }
    res.send(result)
  
  })
  }
  function Liste_valide(req,res){
    const sql =  "SELECT * FROM `etudiant` WHERE rmq = ?"
    db.query(sql,['Validé'],function(err,result){
      if(err){
          console.log(err)
      }
      res.send(result)
    
    })
    }

    function Liste_Refuse(req,res){
      const sql =  "SELECT * FROM `etudiant` WHERE rmq = ?"
      db.query(sql,['Réfusé'],function(err,result){
        if(err){
            console.log(err)
        }
        res.send(result)
      
      })
      }
  


module.exports = {Selection,Total_dossier,Liste_attente,Liste_valide,Liste_Refuse , Total_dossier_Attente , Total_dossier_Valide, Total_dossier_Refuse}