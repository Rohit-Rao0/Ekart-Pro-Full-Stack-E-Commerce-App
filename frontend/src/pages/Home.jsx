import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>

      </div>
  )
}

export default home