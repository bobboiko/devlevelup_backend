var express = require('express')
var router = express.Router()
var db = require('../db')
var passport = require("passport")

let selectFrom = "SELECT question.* , "
selectFrom += "user.id as askerId , user.fName as askerFName, user.lName as askerLName, user.email as askerEmail, "
selectFrom += "staff.id as staffId, staff.fName as staffFName, staff.lName as staffLName, staff.email as staffEmail, staff.title as staffTitle, "
selectFrom += "knowledgearea.name as areaName "
selectFrom += "from question "
selectFrom += "join user on user.id = question.askedById "
selectFrom += "join staff on staff.id = question.answeredById "
selectFrom += "join knowledgearea on knowledgearea.id = question.areaId"

router.get('/', function (req, res, next) {
    res.send("questions is not a valid route")
});

router.get('/byAsker/:askerEmail', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const askerEmail = req.params.askerEmail
    const query = selectFrom + ` where user.email = '${askerEmail}'`
    console.log("query",query)
    db.get().query(query, (err, rows) => err ? res.send("Error: " + err) : res.send(db.processRows(rows)))
});

router.get('/byArea/:areaId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const areaId = req.params.areaId
    const query = selectFrom + ` where question.areaId = '${areaId}'`
    db.get().query(query, (err, rows) => err ? res.send("Error: " + err) : res.send(db.processRows(rows)))
});

module.exports = router