var express = require('express')
var login = require('./route/Login')
var insert = require('./route/Insertion_client')
var sum = require('./route/SUM')
var table = require('./route/Table')
var ChoixAdmin = require("./route/Update")
var Utilisateur = require("./route/Utilisateur")
exports.router = (function () {
    var apiRoute = express.Router();


    apiRoute.route('/login').post(login.login)
    apiRoute.route('/insertion').post(insert.Insertion)
    apiRoute.route('/').get(insert.HelloWord)
    apiRoute.route('/sum').post(sum.Somme)
    apiRoute.route("/tableAttente").post(table.TableAttente)
    apiRoute.route("/tableAccepte").post(table.TableAccepte)
    apiRoute.route("/tableRefuser").post(table.TableRefuser)
    apiRoute.route("/accepte").post(ChoixAdmin.Accepte)
    apiRoute.route("/refuser").post(ChoixAdmin.Refuser)
    apiRoute.route("/demandeAnuller").post(ChoixAdmin.AnnulerDemande)
    apiRoute.route("/remettreEnAttente").post(ChoixAdmin.RemettreEnAttente)
    apiRoute.route("/remettreAccepte").post(ChoixAdmin.RemettreAccepte)
    apiRoute.route("/delete").post(ChoixAdmin.SupprimerDefinitive)
    apiRoute.route("/InsertUtilisateur").post(Utilisateur.Insertion)
    apiRoute.route("/selectionUtilisateur").post(Utilisateur.Selection)
    return apiRoute;
})();