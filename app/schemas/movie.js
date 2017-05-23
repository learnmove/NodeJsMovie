var mongoose =require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
var MovieSchema=new mongoose.Schema({
    title:String,
    director:String,
    nation:String,
    lang:String,
    year:Date,
    category:{
        type:ObjectId,
        ref:'Category'
    },
    summary:String,
    poster:{type:String,default:''},
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
            updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
});
MovieSchema.statics={
    fetch:function(cb){
        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb);
    },
    // findById:function(id,cb){
    //     return this
    //     .findOne({_id:id})
    //     .exec(cb);
    // }
    
}
module.exports=MovieSchema;
