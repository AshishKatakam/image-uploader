const route=require('express').Router();
const upload=require('./multer');
const Item=require('./model');
const fs=require('fs');
const mongoose=require('mongoose');

route.get('/',async(req,res)=>{
    const images=await Item.find();
    res.render('index',{images});   
});

route.get('/webcam',(req,res)=>{
    res.render('webcam');
});

route.get('/image/:id/edit',async(req,res)=>{
    try{
        const item=await Item.findById(req.params.id);
        res.render('edit',{item});
    }catch(e){
        console.log(e.message);
        console.log('unable to load edit page');
    }
});

route.patch('/image/:id',async(req,res)=>{
    try{
        await Item.updateOne({ _id:req.params.id }, { username: req.body.name });
        res.redirect('/');
    }catch(e){
        console.log(e.message);
        console.log('Unable to update info');
    }
});

route.post('/upload',upload.array('images',12),(req,res,next)=>{
    const files=req.files;
    if(!files){
        const error=new Error('Please choose files');
        error.httpStatusCode=400;
        return next(error);
    }
    //base64 encoding
    let arr=files.map((file)=>{
        let img=fs.readFileSync(file.path); 
        encodedImage=img.toString('base64');
        return encodedImage;
    })

let result=arr.map((element,index)=>{
        const obj={
            username:'ashish',
            filename:files[index].originalname,
            base64:element,
            mimeType:files[index].mimetype,
        }

        let uploadImg=new Item(obj);
        return uploadImg.save()
        .then(()=>{
            return{msg:`${files[index].originalname} uploaded successfully`}
        })
        .catch((e)=>{
            return Promise.reject({error:e.message||`unable to upload ${files[index].originalname}`})
        })
    });
    Promise.all(result)
    .then(msg=>{
        res.redirect('/');
    })
    .catch(e=>{
        res.json(e);
    })
});

route.delete('/image/:id',async(req,res)=>{
    try{
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }catch(e){
        console.log(e.message);
        console.log('unable to delete the product');
    }
    
});

module.exports=route;