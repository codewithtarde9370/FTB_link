import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar-container'>
      <div className='nav-toggle' onClick={toggleNavbar}>
        ☰
      </div>
      <p className='title'>Quicks</p>
      <div className={`nav-item-container ${isOpen ? 'open' : ''}`}>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/linkcard" className='nav-item'>My Links</Link>
      </div>
      <div className='icon-container'>
        <button className='btn' onClick={() => {
            localStorage.clear();
            toast.success("LoggedOut Successfully!!")
            setTimeout(()=>{
            window.location.href = '/login'
            },3000)
        }}>LogOut</button>
      </div>
      <Toaster/>
    </div>
  );
}

export default Navbar;