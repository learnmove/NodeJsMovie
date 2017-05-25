var multer=require('multer');
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/PosterPhotos');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
exports.upload=multer({storage:storage}).single('poster');