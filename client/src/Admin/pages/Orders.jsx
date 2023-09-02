import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Orders() {
    const { status } = useParams()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get(`/api/orders/${status}`)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err.message))
    }, [status || update])

    const handleStatusChange = (_id, newStatus) => {
        const payload = {
            _id: _id,
            newStatus: newStatus
        }
        
        axios.put('/api/set-order-status', payload)
            .then((res) => {
                console.log("status changed")
                setOrders(prevOrders => prevOrders.filter(order => order._id !== _id))
            })
            .catch(err => console.log(err.message))
    }

    const deleteOrder = ( _id ) => {

        const payload = { _id: _id}
        
        axios.delete('/api/delete-order', { data: payload })
            .then((res) => {
                console.log(res.message)
                setOrders(prevOrders => prevOrders.filter(order => order._id !== _id))
            })
            .catch(err => console.log(err.message))
    }

    return (
    <div>
        <h2 className='text-center my-5'>{status.toUpperCase()} ORDERS</h2>
        {orders?.length == 0 ? (<p className='text-center'>No orders to show.</p>) : (<p></p>)}
        
        {orders.map((val, key) => {
            return(
                <div key={key} className="product border border-2 border-dark py-2 px-4 rounded m-3 d-md-flex ">
                    <div className='row w-100'>
                        <div className='col-4'>
                            <h5>Customer Details:</h5>
                            <p className='p-0 m-0'><b>Name: </b>{val.customerName}</p>
                            <p className='p-0 m-0'><b>Email: </b>{val.customerEmail}</p>
                            <p className='p-0 m-0'><b>Contact: </b>{val.customerContact}</p>
                            <p className='p-0 m-0'><b>Address: </b>{val.customerAddress}</p>
                        </div>
                        <div className='col-6 gap-3'>
                        <h5>Order Details:</h5>
                        <p className='m-0 p-0'><b>ID: </b>{val._id}</p>
                            {val.order.map((val, key) => {
                                return(
                                    <div key={key}>
                                        <ul>
                                            <li>
                                                {val.productName} - (<b>Quantity:</b> {val.quantity}, <b>Price:</b> {val.price * val.quantity} USD)
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='col-2'>
                            <h5 className='m-0'>Set Status:</h5>
                            <p className='m-0 p-0'><b>Current Status:</b> {val.status}</p>
                            
                            {
                                status == "pending" ? (
                                    <div className='d-flex flex-column gap-1'>
                                        <button className='btn btn-success' onClick={() => handleStatusChange(val._id, "approved")}>Approve</button>
                                        <button className='btn btn-danger' onClick={() => handleStatusChange(val._id, "canceled")}>Cancel</button>
                                    </div>
                                ) : status == "approved" ?  (
                                    <div className='d-flex flex-column gap-1'>
                                        <button className='btn btn-success' onClick={() => handleStatusChange(val._id, "delivered")}>Delivered</button>
                                    </div>
                                ) : (
                                    <div className='d-flex flex-column gap-1'>
                                        <button className='btn btn-danger' onClick={() => deleteOrder(val._id)}>Delete</button>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            )
        })} 
    </div>
  )
}

export default Orders