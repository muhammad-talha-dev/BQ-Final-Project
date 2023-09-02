const app = require('express')
const router = app.Router()
const Auth = require('../middleware/Auth')
const { getProducts, addProduct, ProductbyCategory, ProductbyId, deleteProduct, searchProducts } = require('./controller')

router.get('/all-products', getProducts)
router.get('/product-by-id/:_id', ProductbyId)
router.get('/product-by-category/:category', ProductbyCategory)
router.post('/add-products', Auth, addProduct)
router.delete('/delete-products', deleteProduct)
router.get('/search', searchProducts)

module.exports = router