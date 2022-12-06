const multer = require('multer');
exports.UpdatekUser = (req,res) => {
    try {
        const userId = 502;
        if(!req.query.id){
            return res.status(400).json({
                status: "error",
                message: "Id is required"
            });
        }
        if(parseInt(req.query.id) !== userId){
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }
        return res.json({
            status: 'success',
            message: 'User updated successfully',
            user: {
                id: userId,
                username: req.body.username,
                email: req.body.email,
                age: req.body.age
            }
        });
    } catch (error) {
        res.status(500);
        res.json({
            status: "error",
            message: "Internal server error"
        });
    }
}
exports.UploadImage = (req,res) => {
    try {
        const storage = multer.diskStorage({
            destination:(req,file,callback)=>{
                callback(null,'./public/img')
            },
            filename:(req,file,callback)=>{
                callback(null, file.originalname);
            }
        });
        const fileFilter = (req,file,callback)=>{
            if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
                callback(null, true);
            }
            else{
                callback(null,false);
                return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        };
        const upload = multer({storage:storage,fileFilter:fileFilter}).single('image');
        upload(req,res,(error)=>{
            if(error){
                res.status(400).json({
                    status:"error",
                    message:error.message
                });
            }
            else{
                res.json({
                    status:"success", 
                    message:'file upload successfully'
                });
            }
        });
    } catch (error) {
        res.status(500);
        res.json({
            status: "error",
            message: "Internal server error"
        });
    }
}
exports.fileDownload = (req,res) => {
    try {
        res.download('documentation.pdf');
    } catch (error) {
        res.status(500);
        res.json({
            status: "error",
            message: "Internal server error"
        });
    }
}