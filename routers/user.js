const { User } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      sucsess: false,
      message: "Something went wrong",
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const users = await User.findById(id).select("-passwordHash");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong",
    });
  }
});

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    street,
    apartment,
    city,
    zip,
    country,
  } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    let user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, salt),
      phone,
      street,
      apartment,
      city,
      zip,
      country,
    });
    user = await user.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    email,
    phone,
    isAdmin,
    street,
    apartment,
    city,
    zip,
    country,
  } = req.body;
  try {
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    let user = {
      name,
      email,
      phone,
      isAdmin,
      street,
      apartment,
      city,
      zip,
      country,
    };
    user = await User.findByIdAndUpdate(id, user,{new:true});
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Cannot found the user" });
  }
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Auth
router.post('/login', async (req,res)=>{
    const {email,password} = req.body
    const secret = process.env.SECRET
    try {
        if(!email){
            return res.status(400).json({message:"Email field is empty"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        if(user && bcrypt.compareSync(password, user.passwordHash)){
            const token = jwt.sign({
                userId:user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn: '1d'}
        )
            return res.status(200).json({message:"User authenticated", user:user.email, token})
        }else{
            return res.status(400).json({message:"Credentials wrong"})
        }
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
})

// Specials queries
router.get("/get/users", async (req, res) => {
  try {
    const users = await User.find().select("name email -_id");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
