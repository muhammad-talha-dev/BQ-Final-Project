// import React, { useState } from 'react'
// import ProductCards from '../components/ProductCards'
import SearchComponent from '../components/SearchComponent';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from 'sweetalert2';

function Products() {

  const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/all-products')
            .then(json => setProducts(json.data.products))
            .catch(err => console.error(err.message));
    }, []);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (searchTerm) => {
    axios.get(`/api/search?q=${searchTerm}`)
      .then(json => setFilteredProducts(json.data.products))
      .catch(err => console.error(err.message));
  };

  return (
    <div className='overflow-hidden'>

      <h1 className='text-center pt-5 pb-3'>PRODUCTS</h1>
      <SearchComponent onSearch={handleSearch} />
      <div className='row d-flex gap-3 mx-1 align-items-stretch justify-content-center mb-5'>
      {
          filteredProducts.length > 0 ? (
              filteredProducts?.map((val, key) => (
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
          ) : (
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
                              <button className='btn btn-dark btn-block w-100'>ADD TO CART</button>
                          </Card.Body>
                      </Card>
              </div>
          ))
      )}

      </div>
    </div>
  );

}

export default Products