import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table, Card } from 'react-bootstrap'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'
import { RolesCollections } from '../../firestoreCollections';
import { useCurrentUser } from '../pages/auth/CurrentUser';
// import { CalendarsCollection } from '../../../firestoreCollections'

function formIsValid(errors) {
  return Object.entries(errors).length === 0
}

export function ResultCalendarPage() {
  const user = useCurrentUser()
  const { register, handleSubmit, errors } = useForm()
  const [data, loading, error] = useCollectionData(
    RolesCollections.where('leagueId', '==', user?.leagueId), { idField: "matchId" })
  //const [document, setDocument] = useState({});
  //const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  let role = data?.[0]?.roles

  async function updateResults(rolesList) {
    await RolesCollections.doc(data?.[0]?.id)
      .update({
        roles: rolesList
      })
      .then((res) => setSuccess(true))
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }


  async function uploadCalendar() {
    await RolesCollections.add({
      roles: rolesList,
      leagueId: user.leagueId,
    }).then((res) => {
      setSuccess(true);
    }).catch((err) => {
      console.error(err)
    })
  }

  /*async function updateTeamPlayers(vals) {
    const team = teams.find(team => team.teamName === teamSelected)
    if (team?.id) {
        await TeamsCollection.doc(team.id)
            .update({
                players: vals.players
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        setSuccess(true)
    }
  }*/

  /*
  <Form.Group>
              <Form.Label>Equipo A</Form.Label>
              <Form.Control placeholder="Ej. Valax" name="equipoA" ref={register({ required: true })} />
              <Form.Label>Equipo B</Form.Label>
              <Form.Control placeholder="Ej. Valax" name="equipoB" ref={register({ required: true })} />
              <Form.Label>Cancha</Form.Label>
              <Form.Control placeholder="La canchita de chavita" name="cancha" ref={register({ required: true })} />
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" ref={register({ required: true })} />
              <Form.Label>Hora</Form.Label>
              <Form.Control defaultValue="12:00" type="time" name="hora" ref={register({ required: true })} />
            </Form.Group>
            <Button variant="secondary" type="submit" disabled={!formIsValid(errors)}>Agregar Rol</Button>
            <hr />
            {updateMode ?
              <Button variant="primary" onClick={updateCalendar}>Actualizar</Button>
              :
              <Button variant="primary" onClick={uploadCalendar}>Guardar</Button>}
            <hr />
            {success && <Alert variant="success">Equipo actualizado con éxito</Alert>}
  */

 async function addRow(vals) {
  console.log("Ya se armo")
}
  
  return (
    <Container fluid md={12}>
      <Row>
        <Col md={12}>
          <Form /*onSubmit={handleSubmit(vals => updateResults(vals))}*/>
            <Card className="table-responsive">
              {loading && <span>Collection: Loading...</span>}
              {rolesList && (
                <Table responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Equipo A</th>
                      <th scope="col">Goles A</th>
                      <th scope="col">--</th>
                      <th scope="col">Goles B</th>
                      <th scope="col">Equipo B</th>
                      <th scope="col">Cancha</th>
                      <th scope="col">Hora</th>
                      <th scope="col">Guardar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {role?.map((rol, index) => (
                      <tr className="tablerow" key={index}>
                        <td>{rol.equipoA}</td>
                        <td><Form.Control type="number" placeholder="Goles A" name="golA" ref={register({ required: true })} /></td>
                        <td></td>
                        <td><Form.Control type="number" placeholder="Goles B" name="golB" ref={register({ required: true })} /></td>
                        <td>{rol.equipoB}</td>
                        <td>{rol.cancha}</td>
                        <td>{String(rol.hora)}</td>
                        <td><Button variant="primary" onClick={updateResults(index)}>Guardar</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}