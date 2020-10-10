import React, { Component } from "react";
import firebase from "firebase";

class Home extends Component {
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
