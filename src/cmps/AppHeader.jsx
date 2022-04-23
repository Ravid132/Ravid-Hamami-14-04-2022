import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';
import UserModal from './UserModal';

export const AppHeader = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <div className='app-header'>
      <h1 className='logo'>Weather Task</h1>
      <nav className='nav-container'>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink exact to='/' className='nav-links'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/favorites' className='nav-links'>
              Favorites
            </NavLink>
          </li>
        </ul>
        <div className='nav-icon' onClick={handleClick}>
          {click && <FaTimes />}
          {!click && <FaBars />}
        </div>
      </nav>

      <UserModal />
    </div>
  );
};
