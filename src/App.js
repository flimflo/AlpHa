import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
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
import { Button } from 'react-bootstrap';
import { auth } from 'firebase';
import { useLeagueData } from './useLeagueData';

// UsuarioTest: alpha@test.com Contraseña: 123456
function App() {
  const user = useCurrentUser()
  const { leagueId, color, leagueName } = useLeagueData()
  
  return (
    <>
      {user?.isAdmin ?
        <h1>TODO: hacer navbar de admin <Button
        onClick={() => {
          auth().signOut();
          window.location.reload();
        }}
      >
        Cerrar sesión
      </Button></h1>:
        <Navbar title={leagueName} color={color} leagueId={leagueId} />
      }
      
      <Switch>
      {
          /* Admin */
          user?.isAdmin &&
          <>
            <Route path='/admin/addrules' exact component={AddRulesToLeague} />
            <Route path='/admin/news' exact component={NewsEditor} />
            <Route path='/admin/media' exact component={MediaEditor} />
            <Route path='/admin/create-calendar' exact component={CreateCalendarPage} />
            <Redirect to='/admin/create-calendar' />
          </>
        }
        <Route path="/sign-in" exact component={SignIn} />
        {/* Pantallas que ven los usuarios normales */}
        <Route path='/:leagueId' exact component={Home} />
        <Route path='/:leagueId/news' component={News} />
        <Route path='/:leagueId/regulation' exact component={Regulation} />
        <Route path='/:leagueId//media' exact component={Media} />
        <Route path='/:leagueId/about' exact component={About} />
        <Route path='/:leagueId/sponsors' exact component={Sponsors} />
        {
          /**
            * Aqui ya tienen sesion iniciada pero tecnicamente no son admins por que apenas 
            * van a crear su liga o por que van a inscribir a su equipo
            */
          user && <>  
            <Route path='/create-league' exact component={CreateLeaguePage} />
            <Route path='/:leagueId/signup' exact component={AddTeamToLeague} />
          </>
        }
      </Switch>
      {!user?.isAdmin && <Footer color={color} />}
    </>
  )
}

export default App;
