const express = require('express')
require('dotenv').config()
const ctrl = require('./controller')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()


app.use(express.json())
app.use(
    session(
        {
            secret:SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        }
    )
)

//auth endpoints
app.post('/auth/register', ctrl.register)
app.post(`/auth/login`, ctrl.login)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`going to war with iran in ${SERVER_PORT} minutes`))
})