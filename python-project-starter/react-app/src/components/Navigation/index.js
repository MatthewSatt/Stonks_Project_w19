import React from 'react';
import { FaAngleDown, FaAngleUp, FaChartLine } from 'react-icons/fa';
// import { NavLink, Link } from 'react-dom';
// import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react"
// import Demo from './demo-user';

function Navbar({ isLoaded }){
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [navbarOpen2, setNavbarOpen2] = useState(false)
  const [navbarOpen3, setNavbarOpen3] = useState(false)
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <>
//         <NavLink className="become__host" to={'/host'}>Portfolio</NavLink>
//         <ProfileButton user={sessionUser} />
//       </>
//     );
//   } else {
//     sessionLinks = (
//       <>
//         <NavLink className="login" to="/login">Log In</NavLink>
//         <NavLink className="signup" to="/signup">Sign Up</NavLink>
//         <Demo />
//       </>
//     );
//   }

const handleToggle = () => {
  setNavbarOpen(prev => !prev)
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
          <NavLink onClick={handleToggle} className='products__tab' to='/'>Products {navbarOpen ? < FaAngleDown/> : < FaAngleUp/>}</NavLink>
        </span>
        <span>
          <NavLink onClick={handleToggle2} className='learn__tab' to='/'>Learn {navbarOpen2 ? < FaAngleDown/> : < FaAngleUp/>}</NavLink>
        </span>
        <span>
          <NavLink onClick={handleToggle3} className='whoweare__tab' to='/'>Who we are {navbarOpen3 ? < FaAngleDown/> : < FaAngleUp/>}</NavLink>
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
