import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
// import { NavLink, Link } from 'react-dom';
// import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import Demo from './demo-user';

function Navbar({ isLoaded }){
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

  return (
    <nav className='navbar'>
        <div className='logo'>
            
        </div>
        <div className='all__links'>
          <span>
            <a href="/" className='products__tab' to='/'>Products < FaAngleDown /></a>
          </span>
          <span>
            <a href="/" className='learn__tab' to='/'>Learn < FaAngleDown /></a>
          </span>
          <span>
            <a href="/" className='whoweare__tab' to='/'>Who we are < FaAngleDown /></a>
          </span>
        </div>
        <nav>
          <div className='right-nav'>
            <div className='profile-icon'>{isLoaded}</div>
          </div>
          <div className='moveme'>
            <ProfileButton/>
          </div>
        </nav>
    </nav>
  );
}

export default Navbar;
