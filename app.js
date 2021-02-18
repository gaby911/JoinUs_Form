let express = require('express');
let app = express();
let mysql =require('mysql');
let bodyParser  = require("body-parser");

let connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net', // put localhost if you run it local
    user:'bf24dc5369289b',// user root if you run it local
    password: '6167af64',
    database: 'heroku_2da2a6665fc9b28' // database join_us if you use the local db
});

app.set("view engine", "ejs");//this help us wo go automaticaly to views and recognize home.ejs
app.use(bodyParser.urlencoded({extended: true}));// this is for the body parser that takes the text that we insert (email)
app.use(express.static(__dirname + "/public")); // to connect our CSS file to the home.ejs

app.get("/", function(req, res){
    //find count of users in DB
    let q = "select count(*) as count from users";
    connection.query(q,function(err,results){
        if (err) throw err;
        let count =results[0].count;
        //respond with that count
    // res.send("We have " +  count + " users in our DB");
    res.render('home', {data/*the name that will be sent in home.ejs */ :count/*the name of tha variable that we want to send*/ });
    });  
});

app.post("/register",function(req,res){
    let person = {
        email: req.body.email // this is where we save the email that we enter with the help of bobyparser
    }
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
            if (err) throw err;
            
            res.redirect("/");
            // setTimeout(()=>{
            //     return res.redirect("/");
            // },3000);
            // res.render("thanks");
          });
})
// app.get("/joke", function(req, res){
//     let joke = "What do you call a dog that does magic tricks? A labracadabrador.";
//     res.send(joke);
//    });

//    app.get("/random_num", function(req, res){
//     let num = Math.floor((Math.random() * 10) + 1);
//     res.send("Your lucky number is " + num);
//    });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});