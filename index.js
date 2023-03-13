const express= require("express");
const pug = require('pug');
const session = require('express-session');
const Database=require("./ContactDB");


const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');

const db = new Database();
db.initialize();

app.use((req, res, next) => {
    console.log("Adding database to request")
    req.db = db;
    next(); 
 })

 app.use(session({
    secret: 'project2',
    resave: false,
    saveUninitialized:true,
    cookie:{secure:false}
 }));

 app.use((req,res,next)=>{
    if(req.session.user)
    {
        res.locals.user={
            id:req.session.user.ID,
            uname:req.session.user.uname,
        }
    }
    next();
 })

 app.use('/',require('./routes/accounts'));
 app.use('/',require('./routes/contacts'));
 app.use('/:id', require('./routes/editContacts'));




 app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
})