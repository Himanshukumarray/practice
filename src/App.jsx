import React from 'react'
import Navbar from './component/Navbar';
import Banner from './component/Banner';
import About from './component/About';
import Services from './component/Services';
import Contact from './component/Contact';
import Footer from './component/Footer';

const App = () => {
  return ( 
    <>
      <Navbar />
      <Banner/>
      <About/>
      <Services/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
