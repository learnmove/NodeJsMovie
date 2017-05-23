var Movie=require('../models/movie');
var Category=require('../models/category');
exports.index=function(req,res){

    Movie.fetch(function(err,movies){
        Category.find({})
        .populate('movies')
        .exec(function(err,categories){
            res.render('pages/index',{
        title:'index',
        movies:movies,
        categories:categories
    });
        })
        ;
        
    });
  
}