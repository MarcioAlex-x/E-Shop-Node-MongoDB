const express = require("express");
const router = express.Router();
const { Category } = require("../models/categories");
const mongoose = require('mongoose')

router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();
    return res.status(200).json(categoryList);
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId('id')){
    res.status(404).json({message:'Ivalid ID'})
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, color, icon } = req.body;
  try {
    let category = new Category({
      name,
      color,
      icon,
    });
    category = await category.save();
    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId('id')){
    res.status(404).json({message:'Ivalid ID'})
  }
  const { name, icon, color } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, {
      name,
      icon,
      color,
    },{
      new:true
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId('id')){
    res.status(404).json({message:'Ivalid ID'})
  }
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category was deleted.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err,
      message: "Something went wrong",
      success: false,
    });
  }
});


module.exports = router;
