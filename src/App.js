import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import SignIn from "./components/pages/auth/SignIn";
import News from "./components/pages/news/News";
import Regulation from "./components/pages/regulation/Regulation";
import Media from "./components/pages/media/Media";
import About from "./components/pages/about/About";
import Sponsors from "./components/pages/sponsors/Sponsors";
import Footer from "./components/footer/Footer";

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
        </Switch>
        <Footer/>
      </Router>
    );
  }
}

export default App;
