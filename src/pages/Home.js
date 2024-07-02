import React from 'react'
import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import Banner from '../components/BannerProduct'

const Home = () => {
  return (
    <div className='bg-[#F3F1EF] '>
      {/* <CategoryList/> */}
      <Banner/>
      {/* <HorizontalCardProduct/> */}
     
      <VerticalCardProduct category={"ceiling"} heading={"Ceiling"}/>
      <VerticalCardProduct category={"floor"} heading={"Floor"}/>
      <VerticalCardProduct category={"wall"} heading={"Wall"}/>
      <VerticalCardProduct category={"bathroom"} heading={"Bathroom"}/>
      
    </div>
  )
}

export default Home