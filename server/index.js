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
            saveUninitialized: true,
            cookie: {
                maxAge: 60 * 60 * 1000 //1 hour
            }
        }
    )
)

//auth endpoints
app.post('/auth/register', ctrl.register)
app.post(`/auth/login`, ctrl.login)
app.post(`/auth/checklogin`, ctrl.checklogin)
app.post(`/auth/logout`, ctrl.logout)
//get posts
app.get(`/api/posts/`, ctrl.getAllPosts)
app.get('/api/filtposts/', ctrl.getFilteredPosts)
//get single post
app.get(`/api/post/:id`, ctrl.getPost)
//upload post
app.post(`/api/post`, ctrl.postPost)
//delete post
app.delete(`/api/post/:id`, ctrl.deletePost)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`going to war with iran in ${SERVER_PORT} minutes`))
})