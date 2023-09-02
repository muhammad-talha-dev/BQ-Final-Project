import React, { useEffect, useState } from 'react'
import HomeCarousel from '../components/Carousel'
import CategoryCards from '../components/CategoryCards'
import ProductCards from '../components/ProductCards'

function Home() {
  return (
    <>
      <div>
        <HomeCarousel />
      </div>
      <div className='container'>
          <CategoryCards />
          <hr />
          <ProductCards />
          <hr />
      </div>
      <div className='bg-dark text-center text-white py-4'>
        Created by Muhammad Talha Shafique. TechTonic@All Rights Reserved.
      </div>
    </>
  )
}

export default Home