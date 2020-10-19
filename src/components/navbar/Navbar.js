import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaAutoprefixer } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from 'react-bootstrap';
import './Navbar.css';
import {useCurrentUser} from "../pages/auth/CurrentUser";
import { auth } from '../../firebase';

function Navbar() {
  const currentUser = useCurrentUser()

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
              {currentUser &&
              <li className='nav-item'>
                <Link
                  to={`/league/${currentUser.leagueId}/signup`}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Mi Equipo
                </Link>
              </li>
              }
              <li className='nav-item'>
                {!currentUser ?
                <Link
                  to='/sign-in'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  <Button
                    variant="outline-light"

                  >
                    Iniciar sesión
                  </Button>
                </Link>
                :
                  <div className='nav-links'>
                    <Button
                      variant="outline-light"
                      onClick={() => {
                        auth.signOut();
                        window.location.reload();
                      }}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                }
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;