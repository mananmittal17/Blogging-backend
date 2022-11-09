const express = require('express')
const formValidation = require('../valiadtion')
const router = express.Router()
const dbConnect = require('../monogDb')

router.post("/signup", async (req, res) => {

    let userData = req.body;
    let responseData = {};
    if (userData.email && userData.name && userData.password) {
        if (formValidation.validateEmail(userData.email) && formValidation.validatePassword(userData.password) && formValidation.validateName(userData.name)) {
            
          let signupDataDb = await dbConnect("peopleTable");
          let userDataInDb = await signupDataDb.find({email : userData.email}).toArray()
          console.log(userDataInDb)
          if(userDataInDb.length == 0){
          signupResponse = await signupDataDb.insertOne(userData)  
          responseData = {responseCode : 200 , message : "User registered successfully" , result : {personId :userData._id}} 
          res.status(200).send(responseData)
          }else{
            responseData = {responseCode : 201, message : "User already exists" , result : null}
            res.status(201).send(responseData)
          }
        } else if (!formValidation.validateEmail(userData.email)) {
            responseData = {responseCode : 404, message :"Please enter a valid email" , result : null}
            res.status(404).send(responseData)
        } else if (!formValidation.validatePassword(userData.password)) {
            responseData = {responseCode : 404, message :"Please enter a valid password" , result : null}
            res.status(404).send(responseData)
        }else if (!formValidation.validateName(userData.name)) {
            responseData = {responseCode : 404, message :"Please enter a valid name", result : null}
            res.status(404).send(responseData)
        } else {
            responseData = {responseCode : 404, message :"Please check your credentials", result : null}
            res.status(404).send(responseData)
        }
    } else {
        responseData = {responseCode : 400, message :"All the fields atre required", result : null}
        res.status(400).send(responseData)
    }
})

router.post("/addBlog" , async (req,res)=>{
  let blogData = req.body
  let responseData = {}
  if(blogData.title && blogData.description && blogData.email && blogData.creationDate ){

    let userTable = await dbConnect("peopleTable")
    let userData = await userTable.find({email : blogData.email}).toArray()
 
    if(userData.length == 1 ){
        blogData.name = userData[0].name 
        let blogTable = await dbConnect("blogTable");
         blogTableResponse = await blogTable.insertOne(blogData)
         responseData = {responseCode : 200 , message : "Blog added successfully" , result : blogData} 
         res.status(200).send(responseData)
    }else if(userData.length > 1){
        responseData = {responseCode : 404, message :"Something went wrong", result : null}
        res.status(400).send(responseData)
    }else{
        responseData = {responseCode : 404, message :"User does not exist", result : null}
        res.status(400).send(responseData)
    }
    
         
  }else{
    responseData = {responseCode : 400, message :"All the fields atre required", result : null}
    res.status(400).send(responseData)
  }
})

router.post("/login", async (req, res) => {
    let responseData = {}
       let email = req.body.email;
       let password = req.body.password;
       console.log(req)
       if (email && password) {
   
           if (formValidation.validateEmail(email) && formValidation.validatePassword(password)) {
               let loginDbData = await dbConnect("peopleTable");
               let userDataInDb = await loginDbData.find({ email: email }).toArray()
               if (userDataInDb.length > 0) {
                   if (userDataInDb[0].email == email && userDataInDb[0].password == password) {
                       responseData ={respondseCode:200,message:"login Successfull",result : userDataInDb}
                       res.status(200).send(responseData)
                   } else {
                       responseData ={respondseCode:400,message:"Password does not match",result : null}
                       res.status(400).send(responseData)
                   }
               }
               else {
                   responseData ={respondseCode:404,message:"User does not exist",result : null}
                   res.status(404).send(responseData)
               }
           } else {
               responseData ={respondseCode:404,message:"Please enter valid email and password",result : null}
               res.status(400).send(responseData)
           }
       }
       else {
           responseData ={respondseCode:400,message:"All the fields atre required",result : null}
           res.status(400).send(responseData)
       }
   })
module.exports = router;