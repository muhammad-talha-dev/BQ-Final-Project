import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Swal from 'sweetalert2';

const ProductPage = () => {

    const { _id } = useParams()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        axios.get(`/api/product-by-id/${_id}`)
            .then(json => setProduct(json.data.products))
            .catch(err => console.log(err))
    }, [])

    const addtocart = () => {
        Swal.fire({
            icon: 'error',
            title: 'Please, Login to Add to Cart'
        })
    }

    if (!product._id) {
        return  <div className='d-flex align-items-center justify-content-center' style={{height: '90vh'}}><div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 py-5">

                    <div className="text-white text-[20px] w-full max-w-[1300px] mx-auto sticky top-[50px]">
                        <Carousel
                            infiniteLoop={true}
                            showIndicators={false}
                            showStatus={false}
                            thumbWidth={60}
                            className="productCarousel"
                        >
                            {product.thumbnail && (
                                    <img src={product.thumbnail} alt="" />
                                )}
                                {product.images &&
                                    product.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`Product ${index + 1}`} />
                                        </div>
                                    ))}
                        </Carousel>
                    </div>

                </div>
                <div className="col-md-6 py-5">
                    <h2>{product.productName}</h2>
                    <h4 className='text-danger'>Price: {product.price} USD</h4>
                    <small className="text-secondary">{product.description}</small>

                    <div className='d-flex justify-content-center align-items-center bg-light py-4 mt-5'>
                        <button className="btn btn-dark mx-3" disabled={quantity <= 1 ? true : false} onClick={() => setQuantity(quantity - 1)}>-</button>
                        {quantity}
                        <button className="btn btn-dark mx-3" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <div className='d-block mt-3'><button className="w-100 btn btn-dark" onClick={addtocart}>Add to Cart</button></div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage