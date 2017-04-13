var express=require('express');
var port =process.env.PORT||3000;
var app = express();
app.set('views','./views');
app.set('view engine','jade');
app.listen(port);
console.log('server start ',port);
// index
app.get('/',function(req,res){
    res.render('index',{
        title:'hello'
    });
});
app.get('/movie/:id',function(req,res){
    res.render('detail',{
        title:'detail'
    });
});