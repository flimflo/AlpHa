import React from "react";
import firebase from "firebase";
import {
  Carousel,
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { carouselImages } from "./Data";
import './Home.css';
import { LoggedState } from "./LoggedState";
import EmptyState from "./EmptyState";
import { commentBoxData, leaderboardData, roleTableData, topListData } from "./Data";
import RoleTable from "../../role-table/RoleTable";
import TopList from "../../top-list/TopList";
import LeaderboardTable from "../../leaderboard-table/LeaderboardTable";
import CommentBox from "../../comment-box/CommentBox";

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
    <section>
      <Container>
        <Row className="section-row">
          {isLogged
            // dependiendo del user mostramos aquí la información (?).
            ? <LoggedState carouselItems={carouselItems} />
            : <EmptyState />}
        </Row>
      </Container>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <Carousel>
              {carouselItems}
            </Carousel>
          </Row>
        </Container>
      </div>
      <div className="section dark-bg">
        <Container>
          <Row className="section-row">
            <Col sm={6}>
              <LeaderboardTable {...leaderboardData} />
            </Col>
            <Col sm={6}>
              <CommentBox {...commentBoxData} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <RoleTable {...roleTableData} />
          </Row>
        </Container>
      </div>
      <div className="section dark-bg">
        <Container>
          <Row className="section-row">
            <TopList {...topListData} />
          </Row>
        </Container>
      </div>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <Button
              variant="outline-dark"
              onClick={() => {
                firebase.auth().signOut();
                window.location.reload();
              }}
            >
              Cerrar sesión
                </Button>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Home;
