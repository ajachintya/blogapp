const { errors } = require('formidable');
//for reading files from form 
const formidable = require('formidable');
//for giving each image a unique name
const { v4: uuidv4 } = require('uuid');
// for alidation
const {body , validationResult} =require('express-validator');
// fs file modules to read and write data 
const fs = require('fs')
//requiring post model
const postModel = require('../model/postModel');

// create post controller
module.exports.createPost = async(req,res)=>{
    // to read data from form
    const form = formidable({multiples:true})

    //fetching data from form files has the form input values and files has uploaded images
    form.parse(req,async (error,fields,files)=>{
        // destructuring fields
        const {title,id,name,body} = fields;
        const errors=[]
        if(title===''){
            errors.push({msg:'Title is required'});
        }
        if(body===''){
            errors.push({msg:'Body is required'});
        }
        // if(description===''){
        //     errors.push({msg:'Description is required'});
        // }
        // if(slug===''){
        //     errors.push({msg:'Slug is required'});
        // }

        //cheching if user has selected an image or not
        if(Object.keys(files).length === 0){
            errors.push({msg:"Image is required"});
        }
        else{
            //getting uploaded file type 
            const {type} = files.image
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg:`${extension} is not a valid extension`});
            }
            else{
                //giving uploaded image a unique name
                files.image.name = uuidv4() + '.' + extension;
            }
        }

        // const checkSlug = await postModel.findOne({slug});
        // if(checkSlug){
        //     errors.push({msg:"Please enter unique slug"});
        // }
        if(errors.length !== 0){
            return res.status(400).json({errors,files})
        }
        else{
            // getting path where image is to be saved
            const newPath = __dirname + `../../../frontend/public/images/${files.image.name}`;
            //using fs to save image at loaction
                fs.copyFile(files.image.path,newPath,async(err)=>{
                    if(!err){
                        
                        try{    
                            //saving data to the database
                            const result = await postModel.create({
                                title,
                                body,
                                image:files.image.name,
                                userId:id,
                                userName:name
                            });
                            return res.status(200).json({msg:"your post has been created",result});
                        }catch(err){
                            console.log(err);
                            return res.status(500).json({errors:err});
                        }
                
                    }
                })
        }
    })
}

module.exports.fetchPosts = async(req,res)=>{
    // fetching id from url params
    const id = req.params.id;
    
    try{
        const result = await postModel.find({userId:id}).sort({updatedAt:-1});
        return res.status(200).json({data:result})
    }catch(err){
        return res.status(500).json({errors:err});
    }

}


module.exports.fetchPost = async(req,res)=>{
    const id = req.params.id;
    // console.log(id)
    try{
        const post = await postModel.findOne({_id:id});
        // console.log(post)
        return res.status(200).json({post})
    }catch(err){
        console.log(err);
        return res.status(500).json({errors:err});
    }
}

//post edit validations
module.exports.updateValidations = [
    body('title').notEmpty().trim().withMessage("Title is required"),
    body('body').notEmpty().trim().withMessage("Body is required"), 
]


module.exports.updatePost= async(req,res)=>{
    //getting erros from express validator
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
   }

    try{
        // console.log(req.body._id);
        const data = await postModel.findByIdAndUpdate(req.body._id,req.body);
        // console.log(data);
        return res.status(200).json({msg:"Your post has been updated"})
    }catch(err){
        console.log(err);
        return res.status(500).json({errors:err});
    }
}

module.exports.updateImage = async(req,res)=>{
    const form = formidable({multiples:true})
    form.parse(req,async (error,fields,files)=>{
        const {id,image} = fields;
        // console.log(id);
        const errors=[]

         if(Object.keys(files).length === 0){
            errors.push({msg:"Image is required"});
        }
        else{
            const {type} = files.image
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg:`${extension} is not a valid extension`});
            }
            else{
                files.image.name = uuidv4() + '.' + extension;
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors,files})
        }
        else{
            // console.log(files.image.name);
            const newPath = __dirname + `../../../frontend/public/images/${files.image.name}`;
            fs.copyFile(files.image.path,newPath,async(err)=>{
                if(!err){
                    try{    
                        const result = await postModel.findByIdAndUpdate(id,{
                            image:files.image.name,
                        })
                        // console.log(result)
                        return res.status(200).json({msg:"Image Updated Successfully"})
                    }catch(err){
                        // console.log(err);
                        return res.status(500).json({errors:err});
                    }
                }
            })
        }
    })  
}


module.exports.deletePost=async(req,res)=>{
    const id = req.params.id;
    // console.log(id)
    try{
        const result = await postModel.findByIdAndDelete(id);
        return res.status(200).json({msg:"Post deleted Successfully"})
    }catch(err){
        return res.status(500).json({errors:err});
    }
}

module.exports.getAllPost = async(req,res)=>{
    try{
        // const count = await postModel.find({}).countDocuments();
        const data = await postModel.find().sort({updatedAt:-1});
        return res.status(200).json({data:data})

    }catch(err){
        console.log(err);
        return res.status(500).json({errors:err});
    }
}