import React from 'react';
import { FaAngleDown, FaAngleUp, FaChartLine, FaGithub } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react"
// import Demo from './demo-user';

function Navbar({ isLoaded }){
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [navbarOpen2, setNavbarOpen2] = useState(false)
  const [navbarOpen3, setNavbarOpen3] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  const closeMenu = () => {
    setNavbarOpen(false)
  }

  const handleToggle2 = () => {
    setNavbarOpen2(prev => !prev)
  }

  const handleToggle3 = () => {
    setNavbarOpen3(prev => !prev)
  }

  return (

    <nav className='navbar'>
      <div className='logo'>
        <FaChartLine />
      </div>
      <div className='all__links'>
        <span>
          <NavLink onClick={handleToggle} className='products__tab' to={''}>Products {navbarOpen ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>...</ul>
        </span>
        <span>
          <NavLink onClick={handleToggle2} className='learn__tab' to={''}>Learn {navbarOpen2 ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul className={`menuNav ${navbarOpen2 ? "showMenu" : ""}`}>...</ul>
        </span>
        <span>
          <NavLink onClick={handleToggle3} className='whoweare__tab' to={''}>Who we are {navbarOpen3 ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul className={`menuNav ${navbarOpen3 ? "showMenu" : ""}`}>
            <li><a href='https://github.com/DevDre783'><FaGithub/> Andres Soca</a></li>
            <li><a href='https://github.com/w-duffy'><FaGithub/> Will Duffy</a></li>
            <li><a href='https://github.com/ta-cos'><FaGithub/> Nathan Treadaway</a></li>
            <li><a href='https://github.com/MatthewSatt'><FaGithub/> Matthew Satterwhite</a></li>
          </ul>
        </span>
      </div>
      <nav>
        <div className='right-nav'>
          <div className='profile-icon'>{isLoaded}</div>
        </div>
        <div className='profile__icon'>
          <ProfileButton/>
        </div>
      </nav>
    </nav>
  );
}

export default Navbar;
