import React, { useState } from 'react'
import axios from 'axios'

function TrackingPage() {
    const [trackingId, setTrackingId] = useState()
    const [orderData, setOrderData] = useState()

    const searchId = (e) => {
        e.preventDefault()

        // console.log(trackingId)
        axios.get(`/api/track-order/${trackingId}`)
            .then(json => setOrderData(json.data.order))
            .catch(err => console.log(err.message))

        console.log(orderData?.order)
    }

  return (
    <div className='container'>
        <div>
            <h1 className='text-center mb-5 mt-4'>TRACK YOUR ORDER</h1>
        </div>
        <div className='d-flex justify-content-center mb-5'>
            <input type="search" className='rounded' name="searchid" onChange={(e) => setTrackingId(e.target.value)} style={{width: '400px'}} id="" />
            <input type="submit" className='ms-2 btn btn-dark' value="Search" onClick={searchId} />
        </div>
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <th scope="row"></th> */}
                        <td>{orderData?.customerName}</td>
                        <td>{orderData?.customerEmail}</td>
                        <td>{orderData?.customerContact}</td>
                        <td>{orderData?.customerAddress}</td>
                        <td>{orderData?.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='my-5'>
            {
            orderData?.order.map((val, key) => 
                <div key={key} className="product border border-2 border-dark py-2 px-4 rounded m-3 d-md-flex ">
                    <div>
                        <img src={val.thumbnail} alt="" style={{ height: '10vh', objectFit: 'contain' }} />
                    </div>
                    <div className='align-self-center ps-1'>
                        <span>{val.productName}</span>
                        <p>{val.category}</p>
                    </div>
                    <div className="px-md-5 pt-2">

                        <p><strong>Quantity:</strong> {val.quantity}</p>

                    </div>
                    <p className="pt-2"><strong>Price:</strong> {val.price * val.quantity} USD</p>
                </div>)
            }
        </div>
    </div>
  )
}

export default TrackingPage