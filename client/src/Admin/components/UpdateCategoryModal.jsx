import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs'
import {GlobalContext} from '../../Context/context'

function UpdateCategoryModal({ category }) {
  const {state, dispatch} = useContext(GlobalContext)
  const [show, setShow] = useState(false);

  const header ={
    headers : {
        authorization: state.token
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [CategoryName, setCategoryName] = useState(category.CategoryName)
  const [CategoryImage, setCategoryImage] = useState(category.CategoryImage)

    const updateCategory = (e) => {
        e.preventDefault()

        const storageRef = ref(storage, `images/category/${CategoryImage.name}`);

        uploadBytes(storageRef, CategoryImage).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              const payload = {
                _id: category._id,
                CategoryName,
                CategoryImage : url
              }
              console.log(payload)
              axios.put('/api/update-category', payload, header)
                        .then((json) => {
                            console.log(json.data)
                            setShow(false);
                        })
                        .catch(err => console.log(err.message))
            })
            .catch((error) => {
              console.log(error.message)
            });
          });
        }

        const handleImageChange = (e) => {
          if (e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
          } 
        }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <BsFillPencilFill />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form>
                <Form.Group className="mb-3" controlId="CategoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" value={CategoryName} placeholder="Category Name" onChange={(e) => setCategoryName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="CategoryImage" className="mb-3">
                    <Form.Label>Category Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={updateCategory} className='btn btn-block w-100 btn-dark'>
                    Submit
                </Button>
            </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateCategoryModal;