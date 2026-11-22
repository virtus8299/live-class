import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import FeaturesSection from '../components/Home/FeaturesSection'
import CTASection from '../components/Home/CTASection'
import BenifitsSection from '../components/Home/BenifitsSection'

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
        <HeroSection/>
        <FeaturesSection/>
        <BenifitsSection/>
        <CTASection/>
    
    </div>
  )
}

export default Home
