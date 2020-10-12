import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { MapContainer } from "./MapContainer";
import Presidente from '../../../images/presidente.jpg'
function About() {
  return (
    <div>
      <section className="container">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button} variant="link" eventKey="0"
              >
                Mision
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
              <Card.Body>
                <p className="text-center">
                  Crear torneos competitivos en los que se priorice el fomento de la practica deportiva desde los
                  adolescentes hasta los adultos mayores y que vean en este una oportunidad de mantener su salud.
                  </p>
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
                <p className="text-center">
                  Ser una empresa líder a nivel local en la creación de torneos de futbol 7, aplicando tecnologías de
                  innovación en la organización y administración de este deporte.
                  </p>
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
                <p className="text-center">
                  AlpHa Eventos Deportivos nace en la mente de un joven estudiante de Cultura Física y Deporte
                  tratando de resolver problemáticas sociales, como la drogadicción, la creación de pandillas y la
                  violencia en colonias marginadas del municipio de Lagos de Moreno, con este objetivo se asocia con
                  el Sr Néstor iniciador de la liga, una vez aprendida la manera de administrar el torneo, su creador
                  el Sr Néstor decide retirarse dejando a su hijo y a Jose Horacio Vega Mares, al terminar ese torneo,
                  el estudiante de CUFIDE comienza a emprender una copa de verano para que al concluir este evento,
                  iniciar con el primer torneo oficialmente administrado por AlpHa Eventos Deportivos en octubre del
                  2019.
                  </p>
                <div className="d-flex flex-row align-items-center">
                  <div className="contleft w-25 h-50 p-3 text-center mx-auto d-block" id="foto">
                    <img className="img-thumbnail img-fluid" src={Presidente} alt="Presidente" />
                    <h5>Presidente de Liga</h5>
                    <h6>José Horacio Vega Mares</h6>
                  </div>
                  <div style={{ position: 'relative', margin: 'auto' }} className="">
                    <MapContainer />
                    <h5>KIKAPU Soccer</h5>
                    <h6>Calle Canal #390</h6>
                    <h6>Col. Granadillas</h6>
                    <h6>Lagos de Moreno, Jal.</h6>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    </div >
  )
}

export default About;
