import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from 'sweetalert2';

function ProductCards() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/all-products')
            .then(json => setProducts(json.data.products))
            .catch(err => console.error(err.message));
    }, []);

    const addtocart = () => {
        Swal.fire({
            icon: 'error',
            title: 'Please, Login to Add to Cart'
        })
    }

    return (
        <div>
            <h1 className='text-center py-5'>PRODUCTS</h1>
            <div className='row d-flex gap-4 align-items-stretch justify-content-center mb-5'>

            {
                products?.map((val, key) => (
                    <div key={key} className='col-md-3'>
                            <Card className='h-100'>
                                <Link className='text-decoration-none' to={`/product/${val._id}`}>
                                    <Card.Img
                                        className='img-fluid card-img'
                                        variant='top'
                                        src={val.thumbnail}
                                        style={{ objectFit: 'contain', height: '200px' }}
                                    />
                                    <Card.Body>
                                        <Card.Title className='text-center text-dark'>
                                            {val.productName.toUpperCase()}
                                        </Card.Title>
                                    </Card.Body>
                                </Link>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Price: {val.price} USD</ListGroup.Item>
                                        <ListGroup.Item>category: {val.category.replace('-', ' ')}</ListGroup.Item>
                                    </ListGroup>
                                <Card.Body>
                                    <button className='btn btn-dark btn-block w-100' onClick={addtocart}>ADD TO CART</button>
                                </Card.Body>
                            </Card>
                    </div>
                ))
            }

            </div>
        </div>
    );
}

export default ProductCards;
