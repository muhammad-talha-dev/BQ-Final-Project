
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const navigate = useNavigate()

    const SigninUser = (e) => {
        e.preventDefault()

        const payload = { email, password, username, contact, address }

        axios.post('/api/signup', payload)
            .then((json) => {
                // console.log(json.data)
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

  return (
    <>
        <div className='d-flex align-items-center justify-content-center' style={{height: '90vh', width: '100%'}}>
            <div className='bg-dark p-5 rounded text-white'>
                <Form onSubmit={SigninUser} style={{width: '400px'}}>

                <Form.Group className='mb-3' controlId="formBasicText">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="contactno">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" value={contact} required onChange={(e) => setContact(e.target.value)} placeholder="Contact no" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="address">
                    <Form.Label>Complete Address</Form.Label>
                    <Form.Control type="address" value={address} required onChange={(e) => setAddress(e.target.value)} placeholder="A-1, ABC  Street, Karachi" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>              

                <Button variant="primary" className='btn btn-block w-100' type="submit">
                    Submit
                </Button>
                </Form>
            </div>
        </div>
    </>
  );
}

export default Signup;