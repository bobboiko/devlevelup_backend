var db = require('../db')
var express = require('express')
var router = express.Router()

let selectFrom = "SELECT answer.*, claim.json as claimJson, `database`.name as dbName, "
selectFrom += "`database`.url as dbUrl, `database`.notes as dbNotes, "
selectFrom += "searchterm.term as searchTerm, `answer-searchterm`.preferred as searchTearmPreferred  "
selectFrom += "FROM answer "
selectFrom += "join `answer-claim` on answer.id = `answer-claim`.answerId "
selectFrom += "join claim on `answer-claim`.claimId = claim.id "
selectFrom += "join `answer-database` on `answer-database`.answerId = answer.id "
selectFrom += "join `database` on `database`.id = `answer-database`.databaseId "
selectFrom += "join `answer-searchterm` on `answer-searchterm`.answerId = answer.id "
selectFrom += "join searchterm on searchterm.id = `answer-searchterm`.searchtermId "

router.get('/byQuestionId/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    const query = selectFrom + ` where answer.questionId = ${questionId}`
    console.log(`answer query ${query}`)
    db.get().query(query, (err, rows) => {
        if (err) {
            res.send("Erorr" + err)
        } else {
            if (rows[0]) {
                const answer = fromDbToJson(rows)
                res.send(answer)
            } else {
                const answer = { found: false }
                res.send(answer)
            }
        }
    }
    )
})

router.get('/byAnswerId/:answerId', (req, res, next) => {
    const answerId = req.params.answerId
    const query = selectFrom + ` where answer.id = ${answerId}`
    db.get().query(query, (err, rows) => {
        if (err) {
            res.send("Erorr" + err)
        } else {
            if (rows[0]) {
                const answer = fromDbToJson(rows)
                res.send(answer)
            } else {
                const answer = { answer: { found: false } }
                res.send(answer)
            }
        }
    }
    )
})

function fromDbToJson(rows) {
    let statements = []
    let databases = []
    let searchTermsPreferred = []
    let searchTermsNonPreferred = []
    rows.forEach((row) => {
        console.log("claimJson", row.claimJson)
        !statements.includes(row.claimJson) && statements.push(JSON.parse(row.claimJson))
        !databases.includes(row.dbName) && databases.push(row.dbName)
        if (row.searchTearmPreferred) {
            !searchTermsPreferred.includes(row.searchTerm) && searchTermsPreferred.push(row.searchTerm)
        } else {
            !searchTermsNonPreferred.includes(row.searchTerm) && searchTermsNonPreferred.push(row.searchTerm)
        }
    })
    let answer = {
        found: true,
        quesitonId: rows[0].questionId,
        execAnswer: rows[0].execAnswer,
        statements: statements,
        databases: databases,
        searchTermsPreferred: searchTermsPreferred,
        searchTermsNonPreferred: searchTermsNonPreferred,
    }
    return answer
}

module.exports = router