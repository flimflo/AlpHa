import React, {Component} from 'react';
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
import { CreateLeaguePage } from './components/pages/create-league/CreateLeagePage';
import { AddTeamToLeague } from './components/pages/add-team-to-league/AddTeamToLeague';

// UsuarioTest: alpha@test.com Contraseña: 123456
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/news' exact component={News} />
          <Route path='/regulation' exact component={Regulation} />
          <Route path='/media' exact component={Media} />
          <Route path='/about' exact component={About} />
          <Route path='/sponsors' exact component={Sponsors} />
          <Route path='/create-league' exact component={CreateLeaguePage} />
          <Route path='/league/:leagueId/signup' exact component={AddTeamToLeague} />
        </Switch>
        <Footer/>
      </Router>
    );
  }
}

export default App;
