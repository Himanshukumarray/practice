import React from 'react';
import Navbar from './component/Navbar';
import Banner from './component/Banner';
import About from './component/About';
import Services from './component/Services';
import Contact from './component/Contact';
import Footer from './component/Footer';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Setting from './component/Setting'; // Ensure Setting is a component

const App = () => {
  // Create the router object
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Banner />
          <About />
          <Services />
          <Contact />
          <Footer />
        </>
      ),
    },
    {
      path: "/setting/new",
      element: <Setting />, // Specify what to render for the "/setting" route
    },
    {
      path: "/about",
      element:<About/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
