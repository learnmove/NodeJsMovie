var express=require('express');
var port =process.env.PORT||3000;
var app = express();
app.set('views','./views');
app.set('view engine','jade');
app.use(express.static(__dirname))
app.use('/bower_components',express.static(__dirname+'/bower_components'));

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
    res.render('detail',{
        movie:'detail'
    });
    });
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'admin'
    });
    });
app.get('/admin/list',function(req,res){
    res.render('list',{
        title:'list'
    });

});