import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

function CategoryPage() {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`/api/product-by-category/${categoryName}`)
            .then(json => setProducts(json.data.products))
            .catch(err => console.error(err.message));
    }, []);

    return (
        <div>
            <h1 className='text-center py-5'>{categoryName}</h1>
            <div className='row d-flex gap-4 align-items-stretch justify-content-center mb-5'>
                {products?.map((val, key) => (
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
                                    <button className='btn btn-dark btn-block w-100'>ADD TO CART</button>
                                </Card.Body>
                            </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage