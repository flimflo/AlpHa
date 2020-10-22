import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table, Card } from 'react-bootstrap'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form'
import { RolesCollections } from '../../firestoreCollections';
import { useCurrentUser } from '../pages/auth/CurrentUser';
// import { CalendarsCollection } from '../../../firestoreCollections'
// hola
function formIsValid(errors) {
  return Object.entries(errors).length === 0
}



export function CreateCalendarPage() {
  const user = useCurrentUser()
  const { register, handleSubmit, errors } = useForm()
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  
  async function getRoles() {
    if (!user?.leagueId) { 
      return 
    }

    let rolesList = []
    let document = {}
    setLoading(true)
    await RolesCollections.where("leagueId", "==", user.leagueId)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          rolesList = (doc.data() && doc.data().roles)
          document = doc;
        })
      }).catch((err) => console.error(err))
    if (rolesList.length > 0) setUpdateMode(true)
    setRolesList(rolesList)
    setDocument(document)
    setLoading(false)
  }

  useEffect(() => { getRoles() }, [user?.leagueId])

  function addRow(vals) {
    const parsedDate = new Date(vals.fecha)
    parsedDate.setHours(parseInt(vals.hora.slice(0, 2)), parseInt(vals.hora.slice(3, 5)))
    rolesList.push({ ...vals, hora: String(parsedDate.toLocaleTimeString()) });
  }
  async function updateCalendar() {
    if (document.id) {
      await RolesCollections.doc(document.id)
        .update({
          roles: rolesList
        })
        .then((res) => setSuccess(true))
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
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
  return (
    <Container fluid md={12}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(vals => addRow(vals))}>
            <Card className="table-responsive">
              {loading && <span>Collection: Loading...</span>}
              {rolesList && (
                <Table responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Equipo A</th>
                      <th scope="col">Equipo B</th>
                      <th scope="col">Cancha</th>
                      <th scope="col">Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolesList?.map((rol, index) => (
                      <tr className="tablerow" key={index}>
                        <td>{rol.equipoA}</td>
                        <td>{rol.equipoB}</td>
                        <td>{rol.cancha}</td>
                        <td>{String(rol.hora)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
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
          </Form>
        </Col>
      </Row>
    </Container>
  )
}