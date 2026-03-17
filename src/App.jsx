import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import NewsLetter from "./components/NewsLetter";
// import Review from "./components/Reviews";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Services from "./components/Services";

// import { CartProvider } from "./components/CartContext ";

function App() {

  return (
    <div className="App">
     
 
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Services />
              <NewsLetter />
               <Projects />
              {/* <Review /> */}
              <Footer />
            </>
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        {/* <Route path="/Reviews" element={<Review />} /> */}
        


      </Routes>
   
    </div>
  );
}

export default App;
