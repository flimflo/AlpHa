import React from "react";
import firebase from "firebase";
import LeaderboardTable from "../../leaderboard-table/LeaderboardTable";
import CommentBox from "../../comment-box/CommentBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import './Home.css';
import RoleTable from "../../role-table/RoleTable";
import TopList from "../../top-list/TopList";
import {useDocument} from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

// TODO: Mover boton de cerrar sesion a otra parte
function Home() {
  const { leagueId } = useParams();
  const [value, loading, error] = useDocument(
    firebase.firestore().doc('carousel-images/fP15kW3KgUXE52hKDSYB'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (
    <section>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
              <Carousel>
                {value.data().images.map((img, index) =>
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt="..."
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            )}
          </Row>
        </Container>
      </div>
      <div className="section dark-bg">
        <Container>
          <Row className="section-row">
            <Col sm={6}>
              <LeaderboardTable/>
            </Col>
            <Col sm={6}>
              <CommentBox
                objectRelationId={leagueId}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section light-bg">
        <Container>
          <Row className="section-row">
            <RoleTable/>
          </Row>
        </Container>
      </div>
      <div className="section dark-bg">
        <Container>
          <Row className="section-row">
            <TopList/>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Home;
