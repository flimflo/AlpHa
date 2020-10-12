import React from "react";
import firebase from "firebase";
import {
  Button,
  Container,
  Row,
  Carousel,
} from 'react-bootstrap';
import { carouselImages } from "./Data";
import './Home.css';
import { LoggedState } from "./LoggedState";
import EmptyState from "./EmptyState";

// TODO: Mover boton de cerrar sesion a otra parte
function Home() {
  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogged(!!user);
      }
    })
  }, []);

  const carouselItems = carouselImages.images.map((img, index) =>
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={img}
        alt="..."
      />
    </Carousel.Item>
  );

  return (
    <>
      {isLogged 
        ? <LoggedState carouselItems={carouselItems} /> 
        : <EmptyState />}
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <Button onClick={() => {
              firebase.auth().signOut()
              window.location.reload()
            }}
            >
              Cerrar sesión</Button>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
