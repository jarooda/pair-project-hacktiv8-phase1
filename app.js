const express = require('express');
const route = require('./routes')
const session = require('express-session')
const UserController = require('./controllers/userController');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(session({
    secret: 'jaluRahutomo',
    resave: false,
    saveUninitialized: true,
}));


app.use(route)



app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})
