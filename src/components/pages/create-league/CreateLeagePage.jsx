import React, { useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm, useFieldArray } from 'react-hook-form'
import { auth } from 'firebase'
import { LeagueInfoCollection, LeaguesCollection, SponsorsCollection, UserClaimsCollection, VenueCollection } from '../../../firestoreCollections'

function formIsValid(errors) {
  return Object.entries(errors).length === 0
}

async function createLeague({ leagueName, color, city, venues = [], sponsors = [], info }) {
  const currentUserId = auth().currentUser.uid
  if (!currentUserId) {
    throw new Error("Debe haber una sesion de admin abierta para crear una liga")
  }

  const newLeagueDoc = await LeaguesCollection.add({
    leagueName: leagueName,
    color: color,
    city: city,
    adminId: currentUserId
  })

  await SponsorsCollection.doc(newLeagueDoc.id).set({ sponsors })
  await VenueCollection.doc(newLeagueDoc.id).set({ venues })
  await UserClaimsCollection.doc(currentUserId).set({
    isAdmin: true,
    leagueId: newLeagueDoc.id,
  })
  await LeagueInfoCollection.doc(newLeagueDoc.id).set(info)

  window.location.replace('/admin')
}


export function CreateLeaguePage() {
  const { register, handleSubmit, control, errors } = useForm()
  const { fields: venueFields, append: appendVenue } = useFieldArray({
    control,
    name: "venues"
  })

  const { fields: sponsorFields, append: appendSponsor } = useFieldArray({
    control,
    name: "sponsors"
  })


  useEffect(() => { appendVenue() }, [])
  return (
    <Container fluid md={3}>
      <Row>
        <Col>
          <h1 className="mb-3">Crea tu liga</h1>
          <Form style={{ width: 400 }} onSubmit={handleSubmit(createLeague)}>
            <hr />
            <h3>Información General</h3>
            <Form.Group>
              <Form.Label>Nombre de la liga</Form.Label>
              <Form.Control placeholder="Ej. Liga premier" name="leagueName" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Color oficial de la liga</Form.Label>
              <Form.Control placeholder="Ej. #fcba03" name="color" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciudad</Form.Label>
              <Form.Control placeholder="Ej. Monterrey" name="city" ref={register({ required: true })} />
            </Form.Group>
            <hr />

            <h3>Redes y contacto</h3>
            <Form.Group>
              <Form.Label>Twitter</Form.Label>
              <Form.Control placeholder="Ej. www.example.com" name="info.twitter" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Facebook</Form.Label>
              <Form.Control placeholder="Ej. www.example.com" name="info.facebook" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instagram</Form.Label>
              <Form.Control placeholder="Ej. www.example.com" name="info.instagram" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Youtube</Form.Label>
              <Form.Control placeholder="Ej. www.example.com" name="info.youtube" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control placeholder="Ej. 01800-413-2222" name="info.phone" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control placeholder="Ej. Garza Sada 1010, Mty" name="info.address" ref={register({ required: true })} />
            </Form.Group>
            <hr />  

            <h3>Canchas</h3>
            {venueFields.map((item, index) => (
              <Form.Group key={index}>
                <Form.Label>Nombre de Cancha #{index + 1}</Form.Label>
                <Form.Control placeholder="Ej. Cancha Norte" name={`venues[${index}].name`} ref={register({ required: true })} />
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={appendVenue}>Agregar cancha</Button>

            <hr />
            <h3>Patrocinadores</h3>
            {sponsorFields.map((item, index) => (
              <Form.Group key={index}>
                <Form.Label>Nombre del patrocinador #{index + 1}</Form.Label>
                <Form.Control placeholder="Ej. Cancha Norte" name={`sponsors[${index}].name`} ref={register({ required: true })} />
                <Form.Label>Dirección del patrocinador #{index + 1}</Form.Label>
                <Form.Control placeholder="Ej. Av. Eugenio Garza Sada 2501 Sur, Tecnológico, 64849 Monterrey, N.L." name={`sponsors[${index}].address`} ref={register({ required: true })} />
                <Form.Label>Imagen del patrocinador #{index + 1}</Form.Label>
                <Form.Control placeholder="Ej. www.example.com/foto.png" name={`sponsors[${index}].photo`} ref={register({ required: true })} />
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={appendSponsor}>Agregar patrocinador</Button>

            <hr />
            <Button variant="primary" disabled={!formIsValid(errors)} type="submit">Crear Liga</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}