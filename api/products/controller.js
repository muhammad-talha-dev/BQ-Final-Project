const { connect } = require("mongoose")
require('dotenv').config()
const Products = require('./schema')

const getProducts = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const products = await Products.find()
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const addProduct = async (req, res) => {
    const { productName, thumbnail, description, price, category, images } = req.body

    if (!productName || !thumbnail || !description || !price || !category || !images) {
        res.status(400).json({ message: 'Invalid Payload' })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await Products.exists({ productName })
            if (checkExisting) {
                res.status(403).json({ message: "Product Already Exists" })
            }
            else {
                await Products.create({ productName, thumbnail, description, price, category, images })
                const products = await Products.find()
                res.status(201).json({
                    message: "Product Created Successfully",
                    products
                })
            }

        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}

const ProductbyCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        res.status(403).json({ message: "Please Give Category Name" })
    }
    else {
        await connect(process.env.MONGO_URI)
        const products = await Products.find({ category })
        res.json({ products })
    }
}

const ProductbyId = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Product id" })
    }
    else {
        await connect(process.env.MONGO_URI)
        const products = await Products.findOne({ _id })
        res.json({ products })
    }
}

const deleteProduct = async (req, res) => {
    const { productName } = req.body;

    if (!productName) {
        res.status(400).json({
            message: "Please give CategoryName"
        })  
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            await Products.deleteOne({ productName: productName })
            const allProducts = await Products.find()

            res.json({
                message: "Product Deleted Successfully",
                allProducts
            })

        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}

const searchProducts = async (req, res) => {
    try {
      const { q } = req.query; // Get the search query from query parameters
  
      await connect(process.env.MONGO_URI);
      const searchedProducts = await Products.find({
        productName: { $regex: new RegExp(q, 'i') } // Case-insensitive search
      });
  
      res.json({ products: searchedProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


module.exports = { getProducts, addProduct, ProductbyCategory, ProductbyId, deleteProduct, searchProducts }