import { firestore } from 'firebase'
import React, { useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm, useFieldArray } from 'react-hook-form'
import { LeaguesCollection, SponsorsCollection, VenueCollection } from '../../../firestoreCollections'
import { auth } from 'firebase'

function formIsValid(errors) {
    console.log(errors)
    return Object.entries(errors).length === 0
}

async function createLeague({ leagueName, city, venues = [], sponsors = []}) {
    const currentUserId = auth().currentUser.uid
    if (!currentUserId) {
        throw new Error("Debe haber una sesion de admin abierta para crear una liga")
    }

    const newLeagueDoc = await LeaguesCollection.add({ 
        leagueName: leagueName,
        city: city,
        adminId: currentUserId 
    })

    await SponsorsCollection.doc(newLeagueDoc.id).set({ sponsors })
    await VenueCollection.doc(newLeagueDoc.id).set({ venues })
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
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control placeholder="Ej. Monterrey" name="city" ref={register({ required: true })} />
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