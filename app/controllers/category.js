var CategoryModel=require('../models/category');
exports.new=function(req,res){
    res.render('pages/new-category');
}
exports.save=function(req,res){
    category=req.body.category;
    var Category=new CategoryModel(category);
    Category.save(function(err,cat){
    res.redirect('/admin/categories/list');
    });
}
exports.list=function(req,res){
      CategoryModel.fetch(function(err,catlist){
             res.render('pages/category-list',
             {
                title:'list',
                cat:catlist
        // {id:1,title:'星際異攻隊2',poster:'http://www.ambassador.com.tw/assets/img/movies/GuardiansoftheGalaxy201.jpg',director:'魏德聖',lang:'國語',year:'2008-01-30',summary:'神秘環太平洋巨獸襲擊地球，如果能遠端操控牠，你會怎麼做'}
    });
    });
  
}