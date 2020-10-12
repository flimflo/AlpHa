import React from "react";
import firebase from 'firebase';
import LeaderboardTable from "../../leaderboard-table/LeaderboardTable";
import CommentBox from "../../comment-box/CommentBox";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button
} from 'react-bootstrap';
import { commentBoxData, leaderboardData, roleTableData, topListData } from "./Data";
import RoleTable from "../../role-table/RoleTable";
import TopList from "../../top-list/TopList";

export const LoggedState = ({ carouselItems }) => (
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
          <Button variant="outline-dark" onClick={() => firebase.auth().signOut()}>Cerrar sesión</Button>
        </Row>
      </Container>
    </div>
  </>
);
