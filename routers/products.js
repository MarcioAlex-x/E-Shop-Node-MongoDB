const express = require("express");
const router = express.Router();
const { Product } = require("../models/products");
const { Category } = require("../models/categories");
const mongoose = require('mongoose')

router.get("/", async (req, res) => {
  let filter = {};
  try {
    if(req.query.categories){
      filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category');
    return res.json(productList).status(200);
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  if(!mongoose.isValidObjectId(id)) {
    res.status(404).json({message:'Invalid ID'})
  }
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  } = req.body;
  try {
    let product = new Product({
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category:category.id,
      countInStock,
      rating,
      numReviews,
      isFeatured,
      dateCreated,
    });
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "The product cannot be created",
      });
    }
    product = await product.save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId(id)) {
    res.status(404).json({message:'Invalid ID'})
  }
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated,
  } = req.body;

  try {
    const product = {
      id,
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
      dateCreated,
    };
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndUpdate(id, product, { new: true });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.isValidObjectId(id)) {
    res.status(404).json({message:'Invalid ID'})
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producr not found",
      });
    }
    return res
      .status(200)
      .json({ message: `Product ${product.name} was deleted` });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// Specials methods querys
router.get('/simple/products', async (req,res)=>{
  try {
    const simpleProducts = await Product.find().select('name image -_id')
    return res.status(200).json(simpleProducts)
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:"Something went wrong"
    })
  }
})

router.get('/count/products',async(req,res)=>{
  try {
    const countProducts = await Product.countDocuments()
    res.status(200).json(countProducts)
  } catch (err) {
    res.status(500).json({
      success:false,
      message:'Something went wrong'
    })
  }
})

router.get('/featured/products',async(req,res)=>{
  try {
    const featuredProducts = await Product.find({isFeatured: true})
    res.status(200).json(featuredProducts)
  } catch (err) {
    res.status(500).json({
      success:false,
      message:'Something went wrong'
    })
  }
})

router.get('/featured/products/:count',async(req,res)=>{
  const count = req.params.count ? req.params.count : 0
  try {
    const featuredProducts = await Product.find({isFeatured: true}).limit(parseInt(count))
    res.status(200).json(featuredProducts)
  } catch (err) {
    res.status(500).json({
      success:false,
      message:'Something went wrong'
    })
  }
})

module.exports = router;
