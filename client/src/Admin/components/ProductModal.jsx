import { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {GlobalContext} from '../../Context/context'

function ProductModal() {
    const [show, setShow] = useState(false);
    const {state, dispatch} = useContext(GlobalContext)

    const header ={
        headers : {
            authorization: state.token
        }
      }

    const [category, setCategory] = useState('')
    const [productName, setProductName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])

    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        axios.get('/api/all-categories')
            .then(json => setCategoryVal(json.data.categories))
            .catch(err => console.log(err.message))

        setShow(true)
    }

    const urls = [];

    const multipleImagesUpload = () => {
        return images?.map((val) => {
            const MultipleImagesRef = ref(storage, `/images/products/${productName}/${val.name}`);
            
            return uploadBytes(MultipleImagesRef, val)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref)
                        .then((url) => {
                            urls.push(url);
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                });
        });
    };

    const AddProduct = async (e) => {
        e.preventDefault();
    
        try {
            const uploadImages = multipleImagesUpload();
            await Promise.all(uploadImages);
    
            const thumbnailStorageRef = ref(storage, `images/products/${productName}/${thumbnail.name}`);
            const thumbnailSnapshot = await uploadBytes(thumbnailStorageRef, thumbnail);
            const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
    
            const payload = {
                productName,
                thumbnail: thumbnailUrl,
                description,
                price,
                category,
                images: urls
            };
    
            const response = await axios.post('/api/add-products', payload, header);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
        setShow(false)
    };
    

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="ProductName" className="form-label">
                                    Product Name
                                </label>
                                <input
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="ProductName"
                                />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    id="price"
                                />
                                </div>
                            </div>
                        </div>
                        

                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">
                                Thumbnail
                            </label>
                            <input className="form-control" onChange={(e) => setThumbnail(e.target.files[0])} type="file" id="thumbnail" />
                        </div>

                        <div className='mb-3'>
                            <p className='m-0'>Choose Images</p>
                            <small>Double click to delete image</small>
                            <div className='mt-2 d-flex gap-2 align-items-center'>
                                {
                                    images.map((val, key) =>
                                        <div key={key} className='bg-light border rounded col-md-1' onDoubleClick={() => setImages(images.filter((img) => img != val))}>
                                            <img src={URL.createObjectURL(val)} className='img-fluid' style={{height: '7vh', cursor: 'pointer', objectFit: 'contain'}} alt="" />
                                        </div>
                                    )
                                }
                                <label htmlFor="formFile" style={{height: '7vh', cursor: 'pointer'}} className='col-md-1 d-flex border border-dark border-3 rounded fs-2 align-items-center justify-content-center'>
                                    +
                                </label>
                            </div>
                            <input type="file" className='form-control d-none' id='formFile' onChange={(e) => setImages([...images, e.target.files[0]])} />
                        </div>

                        <Form.Group className="mb-3" >

                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Please Select a Category" onChange={(e) => setCategory(e.target.value)}>
                                <option>Please Select a Category</option>
                                {
                                    CategoryVal.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>





                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductModal;