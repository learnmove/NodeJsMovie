var express=require('express');
var port =process.env.PORT||3000;
var app = express();
var path =require('path');
var bodyPaser = require('body-parser');
app.set('views','./views');
app.set('view engine','jade');
app.use(bodyPaser.urlencoded({extended:false}));
app.use(bodyPaser.json());
app.use(express.static(__dirname))
app.use('/bower_components',express.static(__dirname+'/bower_components'));
app.use('/video',express.static(path.join(__dirname,'video')))
app.listen(port);
console.log('server start ',port);
// index
app.get('/',function(req,res){
    res.render('pages/index',{
        title:'hello',
        movies:[{id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg'}]
    });
});

app.get('/movie/:id',function(req,res){
    res.render('pages/detail',{
        movie:'detail'
    });
    });
app.get('/admin/movie',function(req,res){
    res.render('pages/admin',{
        title:'admin'
    });
    });
app.get('/admin/list',function(req,res){
    res.render('pages/list',{
        title:'list',movies:[{id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}]
    });
});
app.post('/admin/movie/new',function(req,res){
    console.log(req.body);
    });