import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"garden"} heading={"Gardening Products"}/>
      <VerticalCardProduct category={"table"} heading={"Study Tables"}/>
      <VerticalCardProduct category={"light"} heading={" Lamps and Lightings"}/>
      
    </div>
  )
}

export default Home