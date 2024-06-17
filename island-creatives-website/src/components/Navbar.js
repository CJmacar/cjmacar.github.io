import React from 'react';

function Navbar() {
  return (
    <nav className="bg-slate-gray text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Island Creatives</h1>
        <div>
          <a href="/" className="px-4">Home</a>
          <a href="/services" className="px-4">Services</a>
          <a href="/about-us" className="px-4">About</a>
          <a href="/contact" className="px-4">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
