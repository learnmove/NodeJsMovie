var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
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
UserSchema.methods.comparePassword=function(password,cb){
    bcrypt.compare(password,this.password,function(err,ismatch){
        if(err)return cb(err);
        cb(null,ismatch);
    })
}
UserSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err)
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next()
        })
    });
});
module.exports=UserSchema;