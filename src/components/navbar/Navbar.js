import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaAutoprefixer } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <FaAutoprefixer className='navbar-icon' />
              AlpHa
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/news'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Noticias
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/regulation'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Reglamento
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/media'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Multimedia
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/sponsors'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Patrocinadores
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;