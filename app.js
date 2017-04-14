var express=require('express');
var port =process.env.PORT||3000;
var app = express();
var path =require('path');
var bodyPaser = require('body-parser');
var mongoose=require('mongoose');
var Movie=require('./models/movie');
var _=require('underscore');
var methodOverride=require('method-override');
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connect success');
}); 
app.locals.moment=require('moment');
app.set('views','./views');
app.set('view engine','jade');
app.use(methodOverride('_method'));

app.use(bodyPaser.urlencoded({extended:false}));
app.use(bodyPaser.json());
app.use(express.static(__dirname))
app.use(express.static(__dirname+'/public'));
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
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
        console.log(movie);
        res.render('pages/detail',{
        title:'detail',
        movie:movie
    });
    });
    
    });
app.get('/admin/movie',function(req,res){
    res.render('pages/admin',{
        title:'admin',
    });
});
app.get('/admin/movie/update',function(req,res){
    var id=req.query.id;
    Movie.findById(id,function(err,result){
        console.log(result);
        res.render('pages/admin-update',{
        title:'admin',moviedata:result
    });
    });

    });
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        res.render('pages/list',{
        title:'list',movies:movies
        // {id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}
    });
    });
   
});
app.get('/admin/movie',function(req,res){
    res.render('pages/admin',{
        title:'admin',
    });
});
app.delete('/admin/list',function(req,res){
    var id=req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }
        // {id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}
    });
app.put('/admin/movie/update/:id',function(req,res){
    var id=req.params.id;
       if(id){
        //    Movie.findById(id,function(err,movie){
            //  var _movie=_.extend(movie,reqlbody)
            // _movie.save(function(err,movie){

            // })
        // })
        Movie.findByIdAndUpdate(id,req.body,function(err,movie){
          
            if(err){
                console.log(err)
            }else{
                // res.send('ok');
                res.redirect('/');
            }



        });

    }else{
    res.send('id not exist');
        
    }
});

app.post('/admin/movie/new',function(req,res){
    var movie=req.body;
    var _movie=new Movie(movie);
    _movie.save(function(err,movie){
        if(err){
            console.log(err);
            res.send(err);
        }else{
        res.redirect('/');
        }
       
    });
});

                