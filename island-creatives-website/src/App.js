import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

import Footer from './components/Footer';
import './index.css'; // Make sure Tailwind CSS is imported

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }

export default App;
