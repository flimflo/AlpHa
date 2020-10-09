import React, { Component } from "react";
import firebase from "firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>Bienvenido!</h1>
        <button onClick={() => firebase.auth().signOut()}>Cerrar sesión</button>
      </div>
    );
  }
}

export default Home;
