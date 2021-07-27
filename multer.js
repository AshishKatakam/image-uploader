const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:'./uploads/',
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
});

function checkFileType(file,cb){
    const fileTypes=/jpg|jpeg|png|gif/;
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=fileTypes.test(file.mimetype);
    if(mimetype&&extname){
        return cb(null,true);
    }else{
        cb('Error:Images only');
    }
}

module.exports=upload;