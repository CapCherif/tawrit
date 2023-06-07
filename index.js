const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

let urlencodedparser = bodyParser.urlencoded({extended:true})

const app = express();
let fs = require('fs');
app.use(express.json());




app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    
  res.render('home')

})


app.get('/contact', function(req,res){
  res.render('contact')
})  


app.get('/services', (req,res)=>{
  
  var id = null;
  if(req.query.id){
    id = req.query.id
    res.render('services', {id:req.query.id})
  }
  else{
    res.render('services')
  }
  
})

app.get('/detail', (req,res)=>{
  
  var id = null;
  if(req.query.id){
    id = req.query.id
    res.render('detail', {id})
  }
  else{
    res.render('detail')
  }
  
})

app.get('/about', (req,res)=>{
  res.render('about')
})

















app.use((req,res)=>{
    res.redirect('/')
  })
  
  
  const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
  });
  