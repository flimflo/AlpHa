import React, {Component} from 'react';
import './App.css';
import SignInScreen from "./auth/SignInScreen";

class App extends Component {
  render() {
    return (
        <div className="App">
          <SignInScreen/>
        </div>
    );
  }
}

export default App;
