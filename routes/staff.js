var express = require('express')
var router = express.Router()
var db = require('../db')

router.get('/', (req,res,next)=>res.send("not a valid route"))

router.get('/:staffId', (req,res,next)=>{
    const staffId = req.params.staffId
    const query = `select * from staff where id=${staffId} `
    db.get().query(query, (err, rows)=>err? res.send("Error: " + err) : res.send(db.processRows(rows)[0]))
})

module.exports = router;
