import React from 'react';
import { FaAngleDown, FaAngleUp, FaChartLine, FaGithub } from 'react-icons/fa';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from "react"
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useSelector } from 'react-redux';




function Navbar({ isLoaded }) {
const user = useSelector(state => state.session.user)
// const ref = useRef()
const [navbarOpen, setNavbarOpen] = useState(false)
const [navbarOpen2, setNavbarOpen2] = useState(false)
// const [isMenuOpen, setIsMenuOpen] = useState(false)

// useEffect(() => {
//   const checkIfClickedOutside = e => {
//     // If the menu is open and the clicked target is not within the menu,
//     // then close the menu
//     if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
//       setNavbarOpen(false)
//       setNavbarOpen2(false)
//       setIsMenuOpen(false)
//     }
//   }
//   document.addEventListener("mousedown", checkIfClickedOutside)
//   return () => {
//     // Cleanup the event listener
//     document.removeEventListener("mousedown", checkIfClickedOutside)
//   }
// }, [isMenuOpen])

// const handleClick = () => {
//   setNavbarOpen(false)
//   setNavbarOpen2(false)
// }

const handleToggle = () => {
  setNavbarOpen2(false)
  setNavbarOpen(prev => !prev)
}

const handleToggle2 = () => {
  setNavbarOpen(false)
  setNavbarOpen2(prev => !prev)
}


return (
  <nav className='navbar'>
    {/* <div className='off__click' onClick={handleClick}></div> */}
    <div className='logo__container'>
      <NavLink to={'/home'}><FaChartLine className='logo'/></NavLink>
    </div>
    {!user ? null : <div className=''>
      <div className='user__balance'>
        <p>Balance: </p>
        <p className='my__cash'> ${user.cash.toFixed(2)}</p>
      </div>
    </div>}
    {/* <div className="wrapper" ref={ref} onClick={() => setIsMenuOpen(oldState => !oldState)}> */}
      <div className='all__links'>
        <span>
          <a onClick={handleToggle} className='learn__tab'>Learn {navbarOpen ? < FaAngleUp/> : < FaAngleDown/>}</a>
          {/* {isMenuOpen && ( */}
            <ul id='learn__container' className={`menuNav ${navbarOpen ? "showMenu1" : ""}`}>
            <div className='stocks__info__container'>
              <li><a target="_blank" href='https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp'>Stocks</a></li>
            </div>
            <div className='latest__news__container'>
              <li><a target="_blank" href='https://finance.yahoo.com/topic/stock-market-news/'>Latest News</a></li>
            </div>
          </ul>
          {/* )} */}
        </span>
        <span>
          <a onClick={handleToggle2} className='whoweare__tab'>Who we are {navbarOpen2 ? < FaAngleUp/> : < FaAngleDown/>}</a>
          {/* {isMenuOpen && ( */}
            <ul id='whoweare__container' className={`menuNav ${navbarOpen2 ? "showMenu2" : ""}`}>
            <div className='github__container'>
              <li><a target="_blank" href='https://github.com/w-duffy'><FaGithub/> Will Duffy</a></li>
            </div>
            <div className='github__container'>
              <li><a target="_blank" href='https://github.com/DevDre783'><FaGithub/> Andres Soca</a></li>
            </div>
            <div className='github__container'>
              <li><a target="_blank" href='https://github.com/ta-cos'><FaGithub/> Nathan Treadaway</a></li>
            </div>
            <div className='github__container'>
              <li><a target="_blank" href='https://github.com/MatthewSatt'><FaGithub/> Matthew Satterwhite</a></li>
            </div>
          </ul>
          {/* )} */}
        </span>
      </div>
      {/* </div> */}
        {!user ? null : <SearchBar />}
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
