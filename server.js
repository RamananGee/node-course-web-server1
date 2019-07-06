const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log +'\n');
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintance.hbs');
    
// });
hbs.registerHelper('screamit',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pagetitle:'home page1',
        welcomemessage:'welcome to home page',
        currentyear:new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle:'ABOUT PAGE1',
        currentyear:new Date().getFullYear()
    });
});
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
