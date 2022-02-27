const express  = require ('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
const ejs = require('ejs');
app.set('view engine', 'ejs');
const monGen = require(__dirname+'/monster.js');

app.use(express.static("public"));

app.get('/', function(req,res){
  res.render('index')
})

app.post('/', function(req,res){
  // console.log(req.body);

  mon = new Monster

  mon.input()

  console.log(mon)

  res.render('output')
})

app.listen('3000',function(){
  console.log("listening on port 3000")
})
