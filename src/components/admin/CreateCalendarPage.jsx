import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { auth } from 'firebase'
import { RolesCollections } from '../../firestoreCollections';
import { useCurrentUser } from '../pages/auth/CurrentUser';
// import { CalendarsCollection } from '../../../firestoreCollections'

function formIsValid(errors) {
  console.log(errors)
  return Object.entries(errors).length === 0
}



export function CreateCalendarPage() {
  const user = useCurrentUser()
  const { register, handleSubmit, errors } = useForm()
  const [, setLoading] = useState(false);
  const [success] = useState(false)
  const [rolesList, setRolesList] = useState([]);
  async function getRoles() {
    let rolesList = []
    setLoading(true)
    await RolesCollections.where("leagueId", "==", user?.leagueId)
      .get().then((querySnapshot) => {
        rolesList = (querySnapshot.data() && querySnapshot.data().roles)
      }).catch((err) => console.error(err))
    setLoading(false)
    setRolesList(rolesList)
  }

  useEffect(() => { getRoles() }, [])
  useEffect(() => { console.log('roles', rolesList) }, [rolesList])

  function addRow(vals) {
    const parsedDate = new Date(vals.fecha)
    parsedDate.setHours(parseInt(vals.hora.slice(0, 2)), parseInt(vals.hora.slice(3, 5)))
    console.log(parsedDate.toLocaleTimeString())
    rolesList.push({ ...vals, hora: parsedDate });
  }
  function uploadCalendar() {
    console.log('uploading...')
  }
  return (
    <Container fluid md={12}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(vals => addRow(vals))}>
            <Card className="table-responsive">
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
                        <td>{rol.hora.toLocaleTimeString()}</td>
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
              <Form.Control defaultValue={Date()} type="date" name="fecha" ref={register({ required: true })} />
              <Form.Label>Hora</Form.Label>
              <Form.Control defaultValue="12:00" type="time" name="hora" ref={register({ required: true })} />
            </Form.Group>
            <Button variant="secondary" type="submit" disabled={!formIsValid(errors)}>Agregar Rol</Button>
            <hr />
            <Button variant="primary" onClick={uploadCalendar}>Guardar</Button>
            <hr />
            {success && <Alert variant="success">Equipo actualizado con éxito</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}