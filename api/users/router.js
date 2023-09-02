const app = require('express')
const router = app.Router()

const { SignUp, Login, allUsers, getUserbyEmail } = require('./controller')

router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', getUserbyEmail)

module.exports = router