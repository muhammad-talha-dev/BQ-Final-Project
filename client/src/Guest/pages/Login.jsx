import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { GlobalContext } from '../../Context/context';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { state, dispatch } = useContext(GlobalContext)

    const loginUser = (e) => {
        e.preventDefault()

        const payload = { email, password }

        axios.post('/api/login', payload)
            .then((json) => {
                console.log(json.data)
                Cookies.set('token', json.data.token)
                dispatch({
                    type: "USER_LOGIN",
                    token: json.data.token
                })
            })
            .catch(err => console.log(err))
    }

  return (
    <>
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height: '90vh', width: '100%'}}>
            <div className='bg-dark p-5 rounded text-white'>
                <Form onSubmit={loginUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
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
            <p className='pt-3'>Don't have an account. <Link to={'/signup'}>Sign Up</Link></p>
        </div>
    </>
  );
}

export default Login;