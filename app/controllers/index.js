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
        title:'目錄頁',
        category:category[0],
        movieChunk:movieChunk,
        totalPage:totalPage,
        currentPage:req.params.page
    });
        })
        ;
        
}
exports.search=function(req,res){
    var MovieName=req.query.keyword;
    Movie.find({title:{$regex:MovieName,$options:'i'}},function(err,movies){
        if(movies.length==0){
            result="找不到結果";
        }else{
            result="結果如下"
        }
        res.render('pages/search-page',
        {
            result:result,
            movies
        }
        );

    });
}