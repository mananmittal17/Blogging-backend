
const express = require('express')
const formValidation = require('../valiadtion')
const getRoute = express.Router()
const dbConnect = require('../monogDb')


getRoute.get("/getAllBlogs" , async (req,res)=>{

  let blogTable = await dbConnect("blogTable")
  let allBlogData = await blogTable.find({}).toArray();
  let responseData = {responseCode : 200 , message : "All blog data fetch successfull" , result : allBlogData}
  res.status(200).send(responseData)
})


module.exports = getRoute;