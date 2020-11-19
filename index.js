const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(routes)
app.use(session({
    secret: 'jaluRahutomo',
    resave: false,
    saveUninitialized: true,
}));
app.listen(port, () => console.log(`Jatomo App running on port ${port}`))