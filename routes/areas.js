var express = require('express')
var router = express.Router()
var db = require('../db')

/* GET users listing. */
router.get('/', function (req, res, next) {
    const query = `select knowledgearea.*, question.id as questionId from knowledgearea join question on question.areaId=knowledgearea.id`
    db.get().query(query, (err, rows) => {
        let jsonOut = []
        if (err) {
            res.send(`Error in query ${query}: ${err}`)
        } else {
            const processedRows = db.processRows(rows)
            processedRows.forEach((row) => {
                const areaId = row.id
                const currAreaIndex = jsonOut.reduce((accumulator,item,index)=>{
                    return item.id === areaId ? accumulator = index:accumulator}
                    ,-1)
                console.log("row:",row)
                console.log("currIndex:", currAreaIndex)
                if (currAreaIndex === -1) {
                    jsonOut.push({ id: areaId, name: row.name, shortDesc: row.shortDesc, numQuestions: 1 })
                }
                else {
                    jsonOut[currAreaIndex].numQuestions += 1
                }
            })
            console.log("jsonOut---")
            res.send(jsonOut)
        }
    })
});

module.exports = router