const app = require('express')
const router = app.Router()
const Auth = require('../middleware/Auth')
const { addCategory, allCategories, CategorybyName, CategorybyId, DeleteCategory, updateCategory } = require('./controller')

router.post('/add-category', Auth, addCategory)
router.get('/all-categories', allCategories)
router.get('/categorybyname', CategorybyName)
router.get('/categorybyid/:_id', CategorybyId)
router.delete('/delete-category', DeleteCategory)
router.put('/update-category', Auth, updateCategory)

module.exports = router