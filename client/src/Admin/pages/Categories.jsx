import React, { useEffect, useState } from 'react'
import CategoryModal from '../components/CategoryModal'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import UpdateCategoryModal from '../components/UpdateCategoryModal'

function Categories() {
    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('/api/all-categories')
        .then(json => 
            setCategory(json.data.categories)
            )
        .catch(err => err.message)
    }, category)

    const deleteCategory = (CategoryName) => {
        axios.delete('/api/delete-category', { data: { CategoryName }})
            .then((response) => {
                console.log('Category deleted:', response.data);
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });

         setCategory(category.filter(cat => cat.CategoryName !== CategoryName))
    }


  return (
    <>
        <div >
            <div className='d-flex align-items-center justify-content-between m-3 border border-black rounded px-3 py-1'>
                <h3>CATEGORIES</h3>
                <CategoryModal />
            </div>
            <div className='container'>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Category Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{val._id}</th>
                                    <td>{val.CategoryName}</td>
                                    <td><img src={val.CategoryImage} className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>
                                        <UpdateCategoryModal category={val} />
                                        <button className="btn btn-dark mx-1" onClick={() => deleteCategory(val.CategoryName)}><AiFillDelete /></button>
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

export default Categories
