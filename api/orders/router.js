const app = require('express')
const router = app.Router()
const { placeOrder, allOrders, trackOrder, orderByStatus, serOrderStatus, deleteOrder } = require('./controller')

router.post('/place-order', placeOrder)
router.get('/get-all-orders', allOrders)
router.get('/orders/:status', orderByStatus)
router.get('/track-order/:_id', trackOrder)
router.put('/set-order-status', serOrderStatus)
router.delete('/delete-order', deleteOrder)

module.exports = router