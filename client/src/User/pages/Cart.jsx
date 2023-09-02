import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext/context'
import { GlobalContext } from '../../Context/context'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import Swal from 'sweetalert2'

function Cart() {
    const { cart_state, cart_dispatch } = useContext(CartContext)
    const { state, dispatch } = useContext(GlobalContext)
    const currentUser = decodeToken(state.token)

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (const item of cart_state.cart) {
        totalPrice += item.price * item.quantity;
      }
      return totalPrice;
    };

    const removeFromCart = ( item ) => {
      cart_dispatch({
        type: "REMOVE_FROM_CART",
        payload: item
    })
    }

    const placeOrder = () => {

      if (cart_state.cart.length == 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Empty Cart',
          text: 'Your cart is empty. Please add some items.'
      })
      } else {
          const payload = {
              customerName: currentUser.username,
              customerId: currentUser.id,
              customerEmail: currentUser.email,
              customerAddress: currentUser.address,
              customerContact: currentUser.contact,
              order: cart_state.cart
          }

          axios.post('/api/place-order', payload)
              .then((json) => console.log(json.data))
              .catch(err => console.log(err.message))

          Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'Your order has been placed successfully'
        })
        }
    }

  return (
    <>
      <div className="container">
        <h1 className='text-center my-4'>CART</h1>
        {cart_state.cart.length == 0 ? (<p className='text-center'>Your cart is empty.</p>) : (<p></p>)}
        <div>
          {
              cart_state?.cart.map((val, key) => 
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

                    <button className="btn btn-danger btn-sm ms-auto align-self-center" onClick={() => removeFromCart(val)}>
                      Remove
                    </button>
                </div>)
          }
        </div>
          <div className='text-center'>
            {cart_state.cart.length > 0 ? (
              <>
                <h2>TOTAL: {calculateTotalPrice()} USD</h2>
                <div>
                <button className='btn btn-dark mb-5 mt-3 btn-block w-100' onClick={placeOrder}>Place Order</button>
                </div>
              </>
            ) : (<p></p>)}
          </div>
          
      </div>
    </>
  )
}

export default Cart