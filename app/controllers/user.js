var User=require('../models/user');
exports.signup=function(req,res){
    var userdata=req.body;
    
    User.find({username:userdata.username},function(err,user){
        console.log(user);
        if(user.length>=1){
            console.log(user);
            console.log('帳戶已存在');
        }else{
    var _user=new User(userdata);
    _user.save(function(err,result){
        if(err){
            console.log('帳戶可能已存在');
            console.log(err);
        }else{
            console.log('註冊成功');
            req.session.user=_user;
            res.redirect('/');
        }

    });
        }
    });
   
}
exports.logout=function(req,res){
    console.log(req.session.user);
   delete req.session.user;
//    delete app.locals.user;
   
   res.redirect('/');
}
exports.signin=function(req,res){
    var userdata=req.body;
    User.findOne({username:userdata.username},function(err,user){
        if(err){console.log('user err');}
        if(!user){
            console.log('不存在');
            return res.redirect('/')
        };
        user.comparePassword(userdata.password,function(err,isMatch){
            if(err){
                console.log('比較程序有錯');
            }
            if(isMatch){
                req.session.user=user;
                console.log('登錄成功');
                return res.redirect('/');
            }else{
                console.log('密碼錯錯');
                return redirect('/');
            }
        });
    });
    
}