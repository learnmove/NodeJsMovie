var Movie=require('../models/movie');
var Category=require('../models/category');
exports.index=function(req,res){

    Movie.fetch(function(err,movies){
        Category.find({})
        .populate({
            path:'movies',
            select:'title poster',
            options:{limit:5,skip:0}
    })
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
exports.page=function(req,res){
    var page=req.params.page-1;
    var categoryId=req.params.category;
    var count=2;
    var index=page*count;

        Category.find({_id:categoryId})
        .populate({
            path:'movies',
            select:'title poster',
        
    })
        .exec(function(err,category){
            var movies=category[0].movies;
            var totalPage=Math.ceil(movies.length/count);
            var movieChunk=movies.slice(index,index+count);
            console.log(movieChunk);
            res.render('pages/category-result',
            {
        title:{gg:'shit'},
        category:category[0],
        movieChunk:movieChunk,
        totalPage:totalPage,
        currentPage:req.params.page
    });
        })
        ;
        
}