var Movie=require('../models/movie');
var _=require('underscore');
var Comment=require('../models/comment');
var Category=require('../models/category');
exports.new=function(req,res){
    var movie=req.body;
    var _movie=new Movie(movie);
    var categoryId=movie.category;
    _movie.save(function(err,movie){
        Category.findById(categoryId,function(err,findcategory){
        findcategory.movies.push(movie._id);
        findcategory.save(function(err,category){
            if(err){
            console.log(err);1
        }else{
        res.redirect('/');
        }
    });
    });
    });
}
exports.update=function(req,res){
    var id=req.params.id;
    var categoryId=req.body.category;
       if(id){
        //    Movie.findById(id,function(err,movie){
            //  var _movie=_.extend(movie,reqlbody)
            // _movie.save(function(err,movie){

            // })
        // })
        Movie.findById(id,function(err,movie){
             Category.findById(movie.category,function(err,category){
                 category.movies=category.movies.filter(
                     function(returnObject){
                     console.log(returnObject+"//////"+movie._id);
                    return returnObject.toString()!==movie._id.toString();
                 });
                 category.save(function(err,category){
                    movie.category=categoryId;
                     movie.save(function(err,movie){
                        Category.findById(categoryId,function(err,category){
                           category.movies.push(movie._id) ;
                           category.save(function(err,category){
                            res.redirect('/');
                           });
                        });
                     });
                 });
                
             });
        });
        // Movie.findByIdAndUpdate(id,req.body,function(err,movie){
        //   Category.findById(categoryId,function(err,category){
        //       category.movies.push(id);
        //       category.save(function(err,savecategory){
        //          if(err){
        //         console.log(err)
        //         }else{
        //             // res.send('ok');
        //             res.redirect('/');
        //         }
   
        //       });
        //   });
            


        // });

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
    Category.find({},function(err,categories){
console.log(categories);
         res.render('pages/admin',{
        title:'admin',
        categories:categories
    });
    });
   
}

exports.list=function(req,res){
    Movie.fetch(function(err,movies){
                  
        res.render('pages/list',{
                   title:'list',
                   movies:movies,
        // {id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}
             }); 
       
});
}

exports.getUpdate=function(req,res){
    var id=req.query.id;
    Movie.findById(id,function(err,result){
        Category.fetch(function(err,categories){
        res.render('pages/admin-update',{
        title:'admin',
        moviedata:result,
        categories:categories

    });
        });
       
    });

}
exports.getMovie=function(req,res){
    var id=req.params.id;
    Movie.findById(id)
    .populate('category','name')
    .exec(function(err,movie){
        Comment.find({movie:id})
        .populate('from','username')
        .populate('reply.from reply.to','username')
        .exec(function(err,comments){
            console.log(movie);
                    res.render('pages/detail',{
                    title:'detail',
                    movie:movie,
                    comments:comments
                });
        })

        ;
      
    })
    ;
    
    }