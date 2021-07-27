const express=require('express');
const app=express();
const path=require('path');
const routes=require('./route');
const multer=require('multer');
const mongoose=require('mongoose');
const methodOverride=require('method-override')
// require('events').defaultMaxListeners = 15;

mongoose.connect('mongodb://localhost:27017/uploader', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((e)=>{
    console.log('DB Connection Error');
    console.log(e.message);
});

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));

//serving static files
app.use(express.static(path.join(__dirname,'public')));


app.use(routes);


app.listen(3000,()=>{
    console.log('server running on port 3000');
})