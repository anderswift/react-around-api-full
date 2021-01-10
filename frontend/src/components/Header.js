import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AccountContext } from '../contexts/AccountContext';
import logo from '../images/logo.svg';



function Header({handleLogout}) {

  const accountContext = useContext(AccountContext);
  const [showMenu, setShowMenu]= useState(false);


  const toggleMenu = (e) => {
    setShowMenu(!showMenu);
    e.target.blur();
  }



  return (
    <header className="header">
      
      <img className="header__logo" src={logo} alt="Around The U.S." />
      
      <ul className={`header__account-menu ${accountContext.loggedIn ? 'header__account-menu_logged-in ' : ''}${showMenu ? 'header__account-menu_active ' : ''}list`}>
        {accountContext.loggedIn ?
          <>
            <li><div className="header__account-item header__account-item_logged-in">{accountContext.accountData.email}</div></li>
            <li><button className="header__account-item header__account-item_logged-in header__account-logout button" onClick={handleLogout}>Log out</button></li>
          </>
          :
          <>
            <li>
              <NavLink activeStyle={{ display: 'none' }} to="/signup" className="header__account-item link">Sign up</NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ display: 'none' }} to="/signin" className="header__account-item link">Log in</NavLink>
            </li>
          </>
        }
      </ul>
      {accountContext.loggedIn === true && 
        <button className={`header__menu-toggle ${showMenu ? 'header__menu-toggle_selected ' : ''}button`} onClick={toggleMenu} aria-label="Show Menu"></button>
      }
 
    </header>   
  );
  
}

export default Header;
