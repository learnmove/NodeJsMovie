var express=require('express');
var port =process.env.PORT||3000;
var app = express();
var path =require('path');
var bodyPaser = require('body-parser');
var mongoose=require('mongoose');

var session=require('express-session');
var cookieParser=require('cookie-parser');
var methodOverride=require('method-override');
var logger=require('express-logger');
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('connected', function () {  
  console.log('Mongoose connect success');
}); 
app.locals.moment=require('moment');
app.set('views','./app/views');
app.set('view engine','jade');
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret:'i am person',
}));
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json());
app.use(express.static(__dirname))
app.use(express.static(__dirname+'/public'));
app.use('/video',express.static(path.join(__dirname,'video')));

app.listen(port);
require('./config/routes')(app);
if('development'===app.get('env')){
    app.set('showStackError',true);
    app.use(logger({path:'./log/log.txt'}));
    app.locals.pretty=true;
    mongoose.set('debug',true);

}
console.log('server start ',port);



                