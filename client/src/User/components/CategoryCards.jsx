import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CategoryCards() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/all-categories')
            .then(json => setCategory(json.data.categories))
            .catch(err => console.error(err.message));
    }, []);

    return (
        <div>
            <h1 className='text-center py-5'>CATEGORIES</h1>
            <div className='row d-flex gap-4 align-items-center justify-content-center mb-5'>
                {category?.map((val, key) => (
                    <div key={key} className='col-md-4'>
                        <Link className='text-decoration-none' to={`/category/${val.CategoryName}`}>
                            <Card className='h-100'>
                                <Card.Img
                                    className='img-fluid card-img'
                                    variant='top'
                                    src={val.CategoryImage}
                                    style={{ objectFit: 'contain', height: '200px' }}
                                />
                                <Card.Body>
                                    <Card.Title className='text-center'>
                                        {val.CategoryName.toUpperCase().replace('-', ' ')}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryCards;
