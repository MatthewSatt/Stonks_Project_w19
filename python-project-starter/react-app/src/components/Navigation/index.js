import React from 'react';
import { FaAngleDown, FaAngleUp, FaChartLine, FaGithub } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react"
// import Demo from './demo-user';

function Navbar({ isLoaded }){
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [navbarOpen2, setNavbarOpen2] = useState(false)

  // const closeMenu = () => {
  //   setNavbarOpen(false)
  // }

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }

  const handleToggle2 = () => {
    setNavbarOpen2(prev => !prev)
  }

  return (

    <nav className='navbar'>
      <div className='logo'>
        <FaChartLine />
      </div>
      <div className='all__links'>
        {/* <span>
          <NavLink onClick={handleToggle} className='products__tab' to={''}>Products {navbarOpen ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>...</ul>
        </span> */}

        <span>
          <NavLink onClick={handleToggle} className='learn__tab' to={''}>Learn {navbarOpen ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul id='learn__container' className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
            <div>
              <li className='stocks__info__container'><a href='https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp'>Stocks</a></li>
            </div>
            <div>
              <li className='latest__news__container'><a href='https://finance.yahoo.com/topic/stock-market-news/'>Latest News</a></li>
            </div>
          </ul>
        </span>
        <span>
          <NavLink onClick={handleToggle2} className='whoweare__tab' to={''}>Who we are {navbarOpen2 ? < FaAngleUp/> : < FaAngleDown/>}</NavLink>
          <ul id='whoweare__container' className={`menuNav ${navbarOpen2 ? "showMenu" : ""}`}>
            <div className='github__container'>
              <li><a href='https://github.com/DevDre783'><FaGithub/> Andres Soca</a></li>
            </div>
            <div className='github__container'>
              <li><a href='https://github.com/w-duffy'><FaGithub/> Will Duffy</a></li>
            </div>
            <div className='github__container'>
              <li><a href='https://github.com/ta-cos'><FaGithub/> Nathan Treadaway</a></li>
            </div>
            <div className='github__container'>
              <li><a href='https://github.com/MatthewSatt'><FaGithub/> Matthew Satterwhite</a></li>
            </div>
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
