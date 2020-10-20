import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import { useCurrentUser } from './components/pages/auth/CurrentUser';
import { NewsEditor } from './components/pages/news/NewsEditor';
import { CreateCalendarPage } from './components/admin/CreateCalendarPage';

// UsuarioTest: alpha@test.com Contraseña: 123456
function App() {
  const user = useCurrentUser()

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/league/:leagueId/news' component={News} />
        <Route path='/regulation' exact component={Regulation} />
        <Route path='/media' exact component={Media} />
        <Route path='/about' exact component={About} />
        <Route path='/sponsors' exact component={Sponsors} />
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/league/:leagueId/signup' exact component={AddTeamToLeague} />

        {/* Admin */}
        {
          user?.isAdmin &&
          <>
            <Route path='/admin/news' component={NewsEditor} />
            <Route path='/create-league' exact component={CreateLeaguePage} />
            <Route path='/create-calendar' exact component={CreateCalendarPage} />
          </>
        }
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
