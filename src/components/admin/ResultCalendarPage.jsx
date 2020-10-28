import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table, Card } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useForm, useWatch } from 'react-hook-form'
import { RolesCollections, TeamsCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../pages/auth/CurrentUser';

export function ResultCalendarPage() {
  const user = useCurrentUser()
  const { register, handleSubmit, errors, watch} = useForm()
  const roles = watch("role")
  const [data, loading, error] = useCollectionData(
    RolesCollections.where('leagueId', '==', user?.leagueId), { idField: "matchId" })
  const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [rolesList, setRolesList] = useState([]);

  const role = data?.[0]?.roles

  async function updateResults(rolesList) {
    await RolesCollections.doc(data?.[0]?.matchId)
      .update({
        roles: rolesList
      })
      .then((res) => setSuccess(true))
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  async function appendResult(index, golA, golB) {
    if (golA != "" && golB != "") {
      let rolesList = role
      rolesList[index].golesA = golA
      rolesList[index].golesB = golB
      updateResults(rolesList)
      updateTeamStats(rolesList[index].equipoA, rolesList[index].equipoB, golA, golB)
    }
  }

  async function updateTeamStats(equipoA, equipoB, golA, golB) {
    await TeamsCollection.where('leagueId', '==', user?.leagueId)
    .where('teamName', '==', equipoA)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        TeamsCollection.doc(doc.id).update({
          golesFavor: doc.data().golesFavor + golA,
          golesContra: doc.data().golesContra + golA,
          won: golA > golB ? doc.data().won + 1 : doc.data().won,
          lost: golA < golB ? doc.data().lost + 1 : doc.data().lost,
          tied: golA == golB ? doc.data().tied + 1 : doc.data().tied
        })
      })
    })

    await TeamsCollection.where('leagueId', '==', user?.leagueId)
    .where('teamName', '==', equipoB)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        TeamsCollection.doc(doc.id).update({
          golesFavor: doc.data().golesFavor + golA,
          golesContra: doc.data().golesContra + golA,
          won: golA < golB ? doc.data().won + 1 : doc.data().won,
          lost: golA > golB ? doc.data().lost + 1 : doc.data().lost,
          tied: golA == golB ? doc.data().tied + 1 : doc.data().tied
        })
      })
    })
    
  }

  return (
    <Container fluid md={12}>
      <Row>
        <Col md={12}>
          <Form>
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
                        <td><Form.Control type="number" value={rol.golesA} placeholder="Goles A" name={`role[${index}].golA`} ref={register({ required: true })} /></td>
                        <td></td>
                        <td><Form.Control type="number" value={rol.golesB} placeholder="Goles B" name={`role[${index}].golB`} ref={register({ required: true })} /></td>
                        <td>{rol.equipoB}</td>
                        <td>{rol.cancha}</td>
                        <td>{String(rol.hora)}</td>
                        <td><Button disabled={rol.golesA !== undefined && rol.golesB !== undefined} 
                          variant="primary" onClick={() => appendResult(index, roles[index].golA, roles[index].golB)}>Guardar</Button></td>
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