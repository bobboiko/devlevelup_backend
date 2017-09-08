var express = require('express')
var router = express.Router()
var db = require('../db')
var password = require('password-hash-and-salt')
var jwt = require('jsonwebtoken');
var passport = require("passport");

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('users is not a valid route');
});


router.get('/makePwds', (req, res, next) => {
  const query = "select * from user"
  db.get().query(query, function (err, rows) {
    if (err) {
      res.send("Error:" + err)
    } else {
      const users = db.processRows(rows)
      console.log("users", users)
      users.forEach((user) => {
        const fName = user.fName
        const id = user.id
        const pwd = fName + '123'
        console.log(`pwd: ${pwd}`)

        // Creating hash and salt
        password(pwd).hash(function (error, hash) {
          if (error)
            console.log(`error: ${error}`)

          // Store hash (incl. algorithm, iterations, and salt)

          db.get().query('UPDATE user SET ? WHERE ?', [{ hash: hash }, { id: id }])

          // console.log(`h: ${h}`)
        })

      })
      res.send("done")
    }
  })
})



router.post("/login", function (req, res) {
  var userEmail = req.body.email
  var userPassword = req.body.password
  const query = `SELECT * FROM user where email='${userEmail}'`
  console.log("query", query)
  db.get().query(query, function (err, rows) {
    if (err) {
      res.send("Error:" + err)
    } else {
      const user = db.processRows(rows)[0]
      if (!user) {
        res.status(401).json({ message: `Your email or password was not found.` })
      } else {
        console.log(`user: ${user}`)
        const hash = user.hash
        console.log(`userPassword:${userPassword}`)
        password(userPassword).verifyAgainst(hash, function (error, verified) {
          if (error) {
            res.status(401).json({ message: `Something went wrong with your password ${error}` })
          } else {
            if (!verified) {
              console.log("got here")
              res.send({ message: `Your email or password was not found` })
              //  res.status(401).json()
            } else {
              //Passport setup
              var jwtOptions = {}
              jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
              jwtOptions.secretOrKey = 'tasmanianDevil';

              var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
                console.log('payload received', jwt_payload);
                // usually this would be a database call:
               // var user = users[_.findIndex(users, { id: jwt_payload.id })];
                if (user) {
                  next(null, user);
                } else {
                  next(null, false);
                }
              });

              passport.use(strategy);

              var payload = { id: user.id };
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ message: "ok", token: token, user: { id: user.id, fName: user.fName, lName: user.lName, email: userEmail, } });
            }
          }
        })
      }
      //res.send()
    }
  })
});

router.get('/byEmail/:userEmail', (req, res, next) => {
  const userEmail = req.params.userEmail
  const query = `SELECT * FROM user where email='${userEmail}'`
  console.log("query", query)
  db.get().query(query, function (err, rows) {
    if (err) {
      res.send("Error:" + err)
    } else {
      res.send(db.processRows(rows)[0])
    }
  })
})

router.get('/byId/:userId', (req, res, next) => {
  const userId = req.params.userId
  const query = `select * from user where id=${userId}`
  db.get().query(query, (err, rows) => err ? res.send("Error: " + err) : res.send(db.processRows(rows)[0]))
})


router.get('/list', (req, res, next) => {
  const query = "select id, fName, lName, email from user"
  db.get().query(query, (err, rows) => err ? res.send("Error:" + err) : res.send(db.processRows(rows)))
})

module.exports = router
