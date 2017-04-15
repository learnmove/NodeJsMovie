var User=require('../models/user');
var Movie=require('../models/movie');
var _=require('underscore');
// index
module.exports=function(app){
app.get('/',function(req,res){

    Movie.fetch(function(err,movies){
        res.render('pages/index',{
        title:'index',
        movies:movies
    });
    })
  
});
app.get('/logout',function(req,res){
   delete req.session.user;
   delete app.locals.user;
   
   res.redirect('/');
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
// User
app.post('/user/signup',function(req,res){
    var userdata=req.body;
    
    User.find({username:userdata.username},function(err,user){
        console.log(user);
        if(user.length>=1){
            console.log(user);
            console.log('帳戶已存在');
        }else{
    var _user=new User(userdata);
    _user.save(function(err,result){
        if(err){
            console.log('帳戶可能已存在');
            console.log(err);
        }else{
            console.log('註冊成功');
            req.session.user=_user;
            res.redirect('/');
        }

    });
        }
    });
   
});
app.post('/user/signin',function(req,res){
    var userdata=req.body;
    User.findOne({username:userdata.username},function(err,user){
        if(err){console.log('user err');}
        if(!user){
            console.log('不存在');
            return res.redirect('/')
        };
        user.comparePassword(userdata.password,function(err,isMatch){
            if(err){
                console.log('比較程序有錯');
            }
            if(isMatch){
                req.session.user=user;
                console.log('登錄成功');
                return res.redirect('/');
            }else{
                console.log('密碼錯錯');
                return redirect('/');
            }
        });
    });
    
});
}
