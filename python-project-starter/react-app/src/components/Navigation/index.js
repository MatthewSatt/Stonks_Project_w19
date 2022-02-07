import React, { useEffect, useRef } from 'react';
import { FaAngleDown, FaAngleUp, FaChartLine, FaGithub } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react"


function Navbar({ isLoaded }){
  // const ref = useRef()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [navbarOpen2, setNavbarOpen2] = useState(false)
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  // useEffect(() => {
  //   const checkIfClickedOutside = e => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
  //       setIsMenuOpen(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", checkIfClickedOutside)

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [isMenuOpen])

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
      {/* <div className="wrapper" ref={ref} onClick={() => setIsMenuOpen(oldState => !oldState)}> */}
        <div className='all__links'>
          <span>
            <a onClick={handleToggle} className='learn__tab'>Learn {navbarOpen ? < FaAngleUp/> : < FaAngleDown/>}</a>
            {/* {isMenuOpen && ( */}
            <ul id='learn__container' className={`menuNav ${navbarOpen ? "showMenu1" : ""}`}>
              <div className='stocks__info__container'>
                <li><a href='https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp'>Stocks</a></li>
              </div>
              <div className='latest__news__container'>
                <li><a href='https://finance.yahoo.com/topic/stock-market-news/'>Latest News</a></li>
              </div>
            </ul>
            {/* )} */}
          </span>
          <span>
            <a onClick={handleToggle2} className='whoweare__tab'>Who we are {navbarOpen2 ? < FaAngleUp/> : < FaAngleDown/>}</a>
            {/* {isMenuOpen && ( */}
            <ul id='whoweare__container' className={`menuNav ${navbarOpen2 ? "showMenu2" : ""}`}>
              <div className='github__container'>
                <li><a href='https://github.com/w-duffy'><FaGithub/> Will Duffy</a></li>
              </div>
              <div className='github__container'>
                <li><a href='https://github.com/DevDre783'><FaGithub/> Andres Soca</a></li>
              </div>
              <div className='github__container'>
                <li><a href='https://github.com/ta-cos'><FaGithub/> Nathan Treadaway</a></li>
              </div>
              <div className='github__container'>
                <li><a href='https://github.com/MatthewSatt'><FaGithub/> Matthew Satterwhite</a></li>
              </div>
            </ul>
            {/* )} */}
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
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
