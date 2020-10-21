import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaAutoprefixer, FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import { useCurrentUser } from "../pages/auth/CurrentUser";
import './Navbar.css';

function Navbar() {
  const leagueId = useCurrentUser()?.leagueId
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#BABABA' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link className='navbar-logo' onClick={closeMobileMenu}>
              <FaAutoprefixer className='navbar-icon' />
              Admin
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/admin/news'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Noticias
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/admin/regulation'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Editar Reglamento
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/admin/media'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Multimedia
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/admin/create-calendar'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Roles
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                 
                  className='nav-links'
                  onClick={() => { 
                    closeMobileMenu()
                    auth.signOut()
                    window.location.replace(`/${leagueId}`)
                }}
                >
                    <Button
                      variant="outline-light"
                    >
                      Cerrar sesión
                    </Button>
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