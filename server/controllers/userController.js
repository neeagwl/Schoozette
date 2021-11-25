const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const generateToken= require('../utils/generateToken');



// CREATE A NEW USER
const registerUser = asyncHandler(async (req, res) => {

    const { name,email, password } = req.body
  
    const existUser = await User.findOne({ email })
  
    if (existUser){
        res.status(400);
        throw new Error('User already exist!')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
      
        res.status(201).json({
                 _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
        })

    }else{
        res.status(400);
        throw new Error('Invalid User Data')
    }

  }) 

// AUTHENTICATE USER
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        createdClases: user.createdClasses
      })
      
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

//GET A USER BY ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password') ;
  if(user){
    res.json(user);
  }else{
    res.status(404);
    res.json("User not found!")
  }
})

module.exports={
    authUser,
    registerUser,
    getUserById
}