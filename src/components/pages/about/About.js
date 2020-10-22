import React from "react";
import { Accordion, Button, Card, Container, Row, Col} from "react-bootstrap";
import { MapContainer } from "./MapContainer";
import { useParams } from "react-router-dom";
import { LeagueInfoCollection } from "../../../firestoreCollections"
import {useDocumentData} from "react-firebase-hooks/firestore"

function About() {
  const { leagueId } = useParams() 
  const [data, loading] = useDocumentData(LeagueInfoCollection.doc(leagueId))

  return (
    <div>
      <section className="container" style={{ padding: '100px 0' }}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button} variant="link" eventKey="0"
              >
                Misión
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
              <Card.Body>
                <p className="text-center">{`${data?.mission}`}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button} variant="link" eventKey="1"
              >
                Vision
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
              <Card.Body>
                <p className="text-center">{`${data?.vision}`}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button} variant="link" eventKey="2"
              >
                Historia
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
              <Card.Body>
                <Container fluid md={12}>
                  <Row>
                    <Col md={6}><p className="text-center">{`${data?.history}`}</p></Col>
                    <Col md={6}><p className="text-center">{`${data?.address}`}</p></Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    </div >
  )
}

export default About;
