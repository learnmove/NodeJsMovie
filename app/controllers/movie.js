var Movie=require('../models/movie');
var _=require('underscore');

exports.new=function(req,res){
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
}
exports.update=function(req,res){
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
}
exports.deleteMovie=function(req,res){
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
    }
exports.getAdminMovie=function(req,res){
    res.render('pages/admin',{
        title:'admin',
    });
}

exports.list=function(req,res){
    Movie.fetch(function(err,movies){
        res.render('pages/list',{
        title:'list',movies:movies
        // {id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}
    });
});
}

exports.getUpdate=function(req,res){
    var id=req.query.id;
    Movie.findById(id,function(err,result){
        console.log(result);
        res.render('pages/admin-update',{
        title:'admin',moviedata:result
    });
    });

}
exports.getMovie=function(req,res){
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
        console.log(movie);
        res.render('pages/detail',{
        title:'detail',
        movie:movie
    });
    });
    
    }