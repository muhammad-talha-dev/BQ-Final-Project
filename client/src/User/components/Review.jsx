import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-stars'
import Swal from 'sweetalert2';

function Review({ id }) {
    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewPara, setReviewPara] = useState('')
    const [rating, setRating] = useState()
    const productId = {id}

    const ratingChanged = (newRating) => {
        setRating(newRating)
      }

    const submitReview = (e) => {
        e.preventDefault()

        const payload = {reviewTitle, reviewPara, rating}
        console.log(payload, productId)

        Swal.fire({
            icon: 'success',
            title: 'Thanks for sumbitting your review!'
        })
    }

  return (
    <div className='my-5'>
        <h2 className='text-center mb-5'>REVIEW PRODUCT</h2>

        <Form onSubmit={submitReview}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Review Title" onChange={(e) => setReviewTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Review</Form.Label>
                <Form.Control placeholder='Write a Complete Review About the Product' as="textarea" rows={3} onChange={(e) => setReviewPara(e.target.value)} />
            </Form.Group>

            <div className='d-flex align-items-center mb-2'>
                <p className='my-3'>Rating:</p>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                className='ps-2' />
            </div>
            
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default Review