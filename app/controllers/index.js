var Movie=require('../models/movie');
exports.index=function(req,res){

    Movie.fetch(function(err,movies){
        res.render('pages/index',{
        title:'index',
        movies:movies
    });
    })
  
}