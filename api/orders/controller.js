const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const Orders = require('./schema');
const { connect } = require("mongoose");
require('dotenv').config()

const placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerId, customerContact, customerAddress, order } = req.body

    const config = {
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    }

    const transporter = nodemailer.createTransport(config);


    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    });


    try {
        await connect(process.env.MONGO_URI)
        const orders = await Orders.create({ customerName, customerEmail, customerId, customerContact, customerAddress, order })

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: customerEmail,
            subject: "Your Order",
            html: mailGenerator.generate({
                body: {
                    name: customerName,
                    intro: 'Thank you for shopping from us.',
                    table: {
                        data: [
                            {
                                customerName,
                                customerEmail,
                                customerAddress,
                                customerContact,
                                tracking_id: orders._id
                            }
                        ]
                    },
                    outro: `Your Order will be delivered at ${customerAddress}, please ensure to active your contact number ${customerContact}`
                }
            })
        })

        res.json({
            message: "Order Placed Successfully , Please Check your MailBox"
        })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }


}

const allOrders = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        const orders = await Orders.find()
        res.json({ orders })

    }

    catch (error) {
        res.json(500).json({ message: error.message })
    }

}

const orderByStatus = async (req, res) => {
    const { status } = req.params

    try {
        await connect(process.env.MONGO_URI)
        const orders = await Orders.find({ status: status })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}

const serOrderStatus = async (req, res) => {
    const { _id } = req.body;
    const { newStatus } = req.body; 

    try {
        await connect(process.env.MONGO_URI);
        const order = await Orders.findOne({ _id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = newStatus || order.status;
        await order.save(); // Make sure to await the save operation

        res.json({
            message: 'Order status updated',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const trackOrder = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGO_URI)
        const order = await Orders.findOne({ _id })
        res.json({order})
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteOrder = async (req, res) => {
    const { _id } = req.body

    try {
        await connect(process.env.MONGO_URI)
        await Orders.deleteOne({ _id })
        // const orders = await Orders.find()

        res.json({
            message: "Order Deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { placeOrder, allOrders, trackOrder, orderByStatus, serOrderStatus, deleteOrder }