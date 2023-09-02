import React, { useEffect, useState } from 'react'
import ProductModal from '../components/ProductModal'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/all-products')
    .then(json => setProducts(json.data.products))
    .catch(err => console.log(err))
  }, [products])

  const deleteProduct = (productName) => {
    axios.delete('/api/delete-products', { data: { productName } })
        .then((response) => {
            console.log('Category deleted:', response.data);
        })
        .catch((error) => {
            console.error('Error deleting product:', error);
        });

     setProducts(products.filter(product => product.productName !== productName))
}

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-3 border border-black rounded px-3 py-1'>
        <h3>PRODUCTS</h3>
        <ProductModal />
      </div>
      <div className='container'>
        <div>
          <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Images</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((val, key) =>
                        <tr key={key}>
                            <th scope="row">{val._id}</th>
                            <td>{val.productName}</td>
                            <td>{val.category}</td>
                            <td><img src={val.thumbnail} className='img-fluid w-100' style={{ height: '50px', objectFit: 'contain' }} alt="" srcSet="" /></td>
                            <td className='d-flex'>
                              {
                                val.images.map((val, key) =>
                                    <div key={key} className='bg-light border rounded col-md-1 d-flex w-50'>
                                        <img src={val} className='img-fluid' style={{height: '50px', objectFit: 'contain'}} alt="" />
                                    </div>
                                )
                              }
                            </td> 
                            <td>
                                <button className="btn btn-dark mx-1" onClick={() => deleteProduct(val.productName)}><AiFillDelete /></button>
                            </td>
                        </tr>)
                }
            </tbody>
          </table>  
        </div>        
      </div>
    </>
  )
}

export default Products
