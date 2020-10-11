import React from "react";
import firebase from "firebase";
import LeaderboardTable from "../../leaderboard-table/LeaderboardTable";
import CommentBox from "../../comment-box/CommentBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import {carouselImages, commentBoxData, leaderboardData, roleTableData, topListData} from "./Data";
import './Home.css';
import RoleTable from "../../role-table/RoleTable";
import TopList from "../../top-list/TopList";

// TODO: Mover boton de cerrar sesion a otra parte
function Home() {

  const carouselItems = carouselImages.images.map((img, index) =>
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={img}
        alt="..."
      />
    </Carousel.Item>
  );

  return(
    <>
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
              <LeaderboardTable {...leaderboardData}/>
            </Col>
            <Col sm={6}>
              <CommentBox {...commentBoxData}/>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <RoleTable {...roleTableData}/>
          </Row>
        </Container>
      </div>
      <div className="section dark-bg">
        <Container>
          <Row className="section-row">
            <TopList {...topListData}/>
          </Row>
        </Container>
      </div>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <button onClick={() => firebase.auth().signOut()}>Cerrar sesión</button>
          </Row>
        </Container>
      </div>
    </>
    );
}

export default Home;
