import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { LeagueInfoCollection } from "../../firestoreCollections";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaAutoprefixer
} from 'react-icons/fa';

// TODO: Cambiar links
function Footer({ color = '#1c2237', leagueId = '/empty'}) {
  const [data, loading] = useDocumentData(LeagueInfoCollection.doc(leagueId))

  return (
    <div className='footer-container' style={{ backgroundColor: color }}>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h3>Alpha</h3>
            <Link to='/create-league'>Crea tu liga</Link>
            <Link to={`/${leagueId}/signup`}>Inscribe a tu equipo</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Secciones</h3>
            <Link to={`/${leagueId}/news`}>Noticias</Link>
            <Link to={`/${leagueId}/media`}>Multimedia</Link>
            <Link to={`/${leagueId}/regulation`}>Reglamento</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Patrocinadores</h3>
            <Link to={`/${leagueId}/media`}>Multimedia</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h3>Redes</h3>
            <a target="_blank" href={`http://${data?.instagram}`}>Instagram</a>
            <a target="_blank" href={`http://${data?.facebook}`}>Facebook</a>
            <a target="_blank" href={`http://${data?.youtube}`}>Youtube</a>
            <a target="_blank" href={`http://${data?.twitter}`}>Twitter</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <FaAutoprefixer className='navbar-icon' />
              AlpHa
            </Link>
          </div>
          <small className='website-rights'>AlpHa © 2020</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={
                '/'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
