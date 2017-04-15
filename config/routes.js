var User=require('../app/controllers/user');
var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var RoleControl=require('../app/middlewares/user');

// index
module.exports=function(app){
app.use(function(req,res,next){
var user=req.session.user
app.locals.user=user;
    next()
 
});


app.get('/',Index.index);

app.use('/admin',RoleControl.member,RoleControl.admin);//middleware group
app.get('/movie/:id',Movie.getMovie);
app.get('/admin/movie/update',Movie.getUpdate);
app.get('/admin/list',Movie.list);
app.get('/admin/movie',Movie.getAdminMovie);
app.delete('/admin/list',Movie.deleteMovie);
app.put('/admin/movie/update/:id',Movie.update);
app.post('/admin/movie/new',Movie.new);
// User
app.post('/user/signup',User.signup);
app.get('/logout',User.logout);
app.post('/user/signin',User.signin);
}
