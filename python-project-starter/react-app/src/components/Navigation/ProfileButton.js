// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Link, useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
import "./Navigation.css"

function ProfileButton({ user }) {
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const logout = (e) => {
  //   e.preventDefault();

  //   dispatch(sessionActions.logout());

  //   history.push('/');
  // };

  return (
    <>
      <button className="profile-menu" onClick={openMenu}>
        <i className="fas fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="username__container">
            <li className="Dd-username">User: "add db info"</li>
          </div>
          <div className="email__container">
            <li className="Dd-email">Email: "add db info"</li>
          </div>
          <div className="my__profile__container">
            <Link to={""} className="my__profile"><FaSmile/> Profile</Link>
          </div>
          <button className="logout-btn">logout</button>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
