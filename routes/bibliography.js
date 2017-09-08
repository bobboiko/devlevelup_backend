var express = require('express')
var router = express.Router()
var fs = require('fs')
var parseXml = require('xml2js').parseString;
var db = require('../db')
var passport = require("passport")
var utilities = require('../utilities/utilities') 

let selectFrom = "SELECT question.* , "
selectFrom += "user.id as askerId , user.fName as askerFName, user.lName as askerLName, user.email as askerEmail, "
selectFrom += "staff.id as staffId, staff.fName as staffFName, staff.lName as staffLName, staff.email as staffEmail, staff.title as staffTitle, "
selectFrom += "knowledgearea.name as areaName "
selectFrom += "from question "
selectFrom += "join user on user.id = question.askedById "
selectFrom += "join staff on staff.id = question.answeredById "
selectFrom += "join knowledgearea on knowledgearea.id = question.areaId"

router.get('/load', function (req, res, next) {
    fs.readFile('files/bibliography.xml', 'utf8', function (err, xmlText) {
        if (err) {
            res.send('file load error' + err)
        } else {
            xmlText = utilities.cleanUpXml(xmlText)
            parseXml(xmlText, function (err, cites) {
                if (err) {
                    res.send('file xml parse error' + err)

                } else {
                    // res.send(cites)
                    const dbArray = cites.xml.records[0].record.map((cite) => {
                        const dbObj = {}
                        dbObj.recNumber = cite["rec-number"][0]
                        dbObj.refType = cite["ref-type"][0]["$"].name
                        if (cite.contributors[0]) {
                            const authors = dbObj.authors = cite.contributors[0].authors[0].author.reduce((accumulator, author) => {
                                return accumulator.concat(author.style[0]["_"])
                            }, [])
                            dbObj.authors = authors

                        } else {
                            dbObj.authors = ["none"]
                        }
                        dbObj.primaryTitle = cite.titles[0].title[0].style[0]["_"]
                        if (cite.titles[0]["secondary-title"]) {
                            dbObj.secondaryTitle = cite.titles[0]["secondary-title"][0].style[0]["_"]
                        } else {
                            dbObj.secondaryTitle = "none"
                        }
                        if (cite.periodical) {
                            dbObj.periodicalFullTitle = cite.periodical[0]["full-title"][0].style[0]["_"]
                        } else {
                            dbObj.periodicalFullTitle = "No Periodical title specified"
                        }
                        if (cite.dates) {
                            if (cite.dates[0]["pub-dates"]) {
                                dbObj.pubDate = cite.dates[0]["pub-dates"][0].date[0].style[0]["_"]
                            } else {
                                dbObj.pubDate = "1000/01/01"
                            }
                            if (cite.dates[0].year) {
                                dbObj.pubYear = cite.dates[0].year[0].style[0]["_"]
                            } else {
                                dbObj.pubYear = "0"
                            }
                        }
                        if (cite.pages) {
                            dbObj.pages = cite.pages[0].style[0]["_"]
                        } else {
                            dbObj.pages = "none"
                        }
                        if (cite.volume) {
                            dbObj.volume = cite.volume[0].style[0]["_"]
                        } else {
                            dbObj.volume = "none"
                        }
                        if (cite.edition) {
                            dbObj.edition = cite.edition[0].style[0]["_"]
                        } else {
                            dbObj.edition = "none"
                        }
                        if (cite.keywords) {
                            const keywords = cite.keywords[0].keyword.map((keyword) => {
                                return keyword.style[0]["_"]
                            })
                            dbObj.keywords = keywords
                        }
                        else {
                            dbObj.keywords = "none"
                        }
                        if (cite.isbn) {
                            dbObj.isbn = cite.isbn[0].style[0]["_"]
                        } else {
                            dbObj.isbn = "none"
                        }
                        if (cite["accession-num"]) {
                            dbObj["accession-num"] = cite["accession-num"][0].style[0]["_"]
                        } else {
                            dbObj.accessionNum = "none"
                        }
                        if (cite.abstract) {
                            dbObj.abstract = cite.abstract[0].style[0]["_"]
                        } else {
                            dbObj.abstract = "none"
                        }
                        if (cite.notes) {
                            dbObj.notes = cite.notes[0].style[0]["_"]
                        } else {
                            dbObj.notes = "none"
                        }
                        if (cite.urls) {
                            if (cite.urls[0]["related-urls"]) {
                                const urls = cite.urls[0]["related-urls"][0].url.reduce((accumulator, url) => {
                                    return accumulator.concat({ relatedUrl: url.style[0]["_"] })
                                }, [])
                                dbObj.urls = urls
                            }
                            if (cite.urls[0]["pdf-urls"]) {
                                const urls = cite.urls[0]["pdf-urls"][0].url.reduce((accumulator, url) => {
                                    return accumulator.concat({ pdfUrl: url })
                                }, [])

                                if (dbObj.urls) {
                                    dbObj.urls = dbObj.urls.concat(urls)
                                } else {
                                    dbObj.urls = urls
                                }  
                            }
                        }
                        if (cite.custom2) {
                            dbObj.custom2 = cite.custom2[0].style[0]["_"]
                        } else {
                            dbObj.custom2 = "none"
                        }
                        if (cite["electronic-resource-num"]) {
                            dbObj.electronicResourceNum = cite["electronic-resource-num"][0].style[0]["_"]
                        } else {
                            dbObj.electronicResourceNum = "none"
                        }
                       // console.log("dbObj: ", dbObj)
                        return dbObj
                    })
                    //update DB
                    dbArray.forEach((cite) => {
                        const recNumber = cite.recNumber
                        const isbn = cite.isbn
                        const query = `select * from bibliography where recNumber = '${recNumber}' and isbn = '${isbn}' `
                        //console.log(query,"**")
                        db.get().query(query,(err, rows) => {
                            if (err) {
                               console.log("error: " + err)
                               // res.send("error: " + err)
                            } else {
                                const results = db.processRows(rows)
                                const numResults = results.length
                                switch (numResults) {
                                    case 0:
                                        //create
                                        console.log("create rcNum: " + recNumber + " isbn: " + isbn)
                                        break
                                    case 1:
                                        //update record
                                        console.log("update: rcNum: " + recNumber + " isbn: " + isbn)
                                        break
                                    default:
                                        console.log("Found " + numResults + "for rcNum: " + recNumber + "isbn: " + isbn)
                                }
                                if (numResults > 1) {
                                    res.send("crashed with ")
                                }
                            }
                        })
                    });
                    res.send(dbArray)
                }
            })
        }
    })
})

router.get('/xxx/:askerEmail', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const askerEmail = req.params.askerEmail
    const query = selectFrom + ` where user.email = '${askerEmail}'`
    console.log("query", query)
    db.get().query(query, (err, rows) => err ? res.send("Error: " + err) : res.send(db.processRows(rows)))
});

router.get('/xxx/:areaId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    const areaId = req.params.areaId
    const query = selectFrom + ` where question.areaId = '${areaId}'`
    db.get().query(query, (err, rows) => err ? res.send("Error: " + err) : res.send(db.processRows(rows)))
});




module.exports = router