const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

let urlencodedparser = bodyParser.urlencoded({extended:true})

const app = express();
let fs = require('fs');
app.use(express.json());

const session = require('express-session');

var fileStoreOptions = { 
  path: "./session",
  reapInterval: 10,
  logFn: function(){}
};

var FileStore = require('session-file-store')(session);
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    secret: 'ssshhhhh',
    saveUninitialized: true,resave: true}
    )
);


app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.render('home', {login:req.session.login, user:req.session.user})

  }
  else{
    res.render('home', {login: false})
  }

})


app.get('/contact', function(req,res){
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.render('contact', {login:req.session.login, user:req.session.user})

  }
  else{
    res.render('contact', {login: false})
  }
})  


app.get('/services', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.render('services',{ login:req.session.login, user:req.session.user})
  }
  else{
    res.render('services', {login:req.session.login})
  }
  
})

app.get('/detail', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  var id = null;
  if(req.query.id){
    id = req.query.id
    res.render('detail', {id, login:req.session.login})
  }
  else{
    res.render('detail', {login:req.session.login})
  }
  
})

app.get('/about', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.render('about', {login:req.session.login, user:req.session.user})

  }
  else{
    res.render('about', {login: false})
  }
})



app.get('/login', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.redirect('/espace')
  }
  else{
    res.render('login')

  }
})

app.post('/login', urlencodedparser,  (req,res)=>{
  var email = req.body.email
  var psw = req.body.psw
  var persons = JSON.parse(fs.readFileSync('./db/persons.json', 'utf8'));
  var exist = false;

  persons.forEach((person)=>{
    if(person.email == email && person.psw == psw){
      exist = true
      req.session.login = true
      req.session.user = person
    }
  })

  res.json({done:exist})
})


app.get('/signup', (req,res)=>{
  if(!req.session.login){
    req.session.login = false;
  }
  if(req.session.login){
    res.redirect('/espace')

  }
  else{
    res.render('signup')

  }
})
app.post('/signup', urlencodedparser, (req,res)=>{
  var nom = req.body.nom
  var prenom = req.body.prenom
  var email = req.body.email
  var tel = req.body.tel
  var prof = req.body.prof
  var psw = req.body.psw
  var obj = {id:"person_"+Date.now(),nom, prenom, email, tel, prof, psw}
  // vérifier si le personne existe
  var persons = JSON.parse(fs.readFileSync('./db/persons.json', 'utf8'));
  var exist = false;

  persons.forEach((person)=>{
    if(person.email == email){
      exist = true;
    }
  })

  if(!exist){
    persons.unshift(obj)
    let data1 = JSON.stringify(persons, null, 4);
    req.session.login = true
    req.session.user = obj
    // write file to disk
    fs.writeFileSync('./db/persons.json',data1, 'utf8');
    res.json({done:true})
  }
  else{
    res.json({done:false})
  }
})
app.get('/espace', (req,res)=>{
  if(req.session.login){
    res.render('espace', {user:req.session.user})
  }
  else{
    res.redirect('/')
  }
})

app.get('/espace/addgigs', (req,res)=>{
  if(req.session.login){
    res.render('addgigs', {user:req.session.user})
  }
  else{
    res.redirect('/')
  }
})




app.get('/logout', (req,res)=>{
  req.session.destroy()
  res.redirect('/')
})





app.use((req,res)=>{
    res.redirect('/')
  })
  
  
  const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });
  