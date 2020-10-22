import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AdminNavbar from './components/navbar/AdminNavbar';
import SignIn from "./components/pages/auth/SignIn";
import News from "./components/pages/news/News";
import Regulation from "./components/pages/regulation/Regulation";
import Media from "./components/pages/media/Media";
import About from "./components/pages/about/About";
import Sponsors from "./components/pages/sponsors/Sponsors";
import Footer from "./components/footer/Footer";
import Home from './components/pages/home/Home';
import { CreateLeaguePage } from './components/pages/create-league/CreateLeagePage';
import { AddTeamToLeague } from './components/pages/add-team-to-league/AddTeamToLeague';
import { AddRulesToLeague } from './components/pages/add-rules-to-league/AddRulesToLeague';
import { useCurrentUser } from './components/pages/auth/CurrentUser';
import { NewsEditor } from './components/pages/news/NewsEditor';
import { CreateCalendarPage } from './components/admin/CreateCalendarPage';
import { MediaEditor } from './components/pages/media/MediaEditor';

import { useLeagueData } from './useLeagueData';
import { Alert } from 'react-bootstrap';


const copyLeagueToClipboard = (leagueId) => () => {
  const el = document.createElement('input');
  el.value = `${window.location.host}/${leagueId}`
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el);
  alert("El link fue copiado al portapapeles")
}

// UsuarioTest: alpha@test.com Contraseña: 123456
function App() {
  const { leagueId, color, leagueName } = useLeagueData()
  const user = useCurrentUser()


  console.log(user)
  return (
    <>
      <Switch>
        {/* Admin */
          user?.isAdmin &&
          <>
            <AdminNavbar />
            <Alert variant="primary" onClick={copyLeagueToClipboard(user.leagueId)}>
              Haz click aqui para copiar el link de tu liga.
            </Alert>
            <Switch>
              <Route path='/admin/regulation' component={AddRulesToLeague} />
              <Route path='/admin/news' component={NewsEditor} />
              <Route path='/admin/media' component={MediaEditor} />
              <Route path='/admin/create-calendar' component={CreateCalendarPage} />
              <Redirect to='/admin/create-calendar' />
            </Switch>
          </>
        }
        <Route path="/admin" exact component={SignIn} />

        {!user && <Route path='/create-league' component={SignIn} />}
        {!user &&
          <>
            <Navbar title={leagueName} color={color} leagueId={leagueId} />
            <Switch>
              {/* Pantallas que ven los usuarios normales */}
              <Route path='/create-league' component={SignIn} />
              <Route path='/:leagueId' exact component={Home} />
              <Route path='/:leagueId/news' component={News} />
              <Route path='/:leagueId/regulation' exact component={Regulation} />
              <Route path='/:leagueId/media' exact component={Media} />
              <Route path='/:leagueId/about' exact component={About} />
              <Route path='/:leagueId/sponsors' exact component={Sponsors} />
              <Route path="/:leagueId/signup" exact component={SignIn} />
            </Switch>
            <Footer color={color} leagueId={leagueId} />
          </>
        }
        {
          /**
            * Aqui ya tienen sesion iniciada pero tecnicamente no son admins por que apenas 
            * van a crear su liga o por que van a inscribir a su equipo
            */
          user && 
          <Switch>
            <Route path='/create-league' exact component={CreateLeaguePage} />
            <Route path='/:leagueId/signup' exact component={AddTeamToLeague} />
            <Redirect to='/create-league'/>
          </Switch>
        }
      </Switch>
    </>
  )
}

export default App;
