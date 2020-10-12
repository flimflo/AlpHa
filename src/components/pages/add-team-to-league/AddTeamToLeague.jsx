import React, { useState } from "react"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { Alert, Container, Col, Row, Form, Button} from "react-bootstrap"
import { useForm, useFieldArray } from "react-hook-form"  
import { useParams } from "react-router-dom"
import { LeaguesCollection, TeamsCollection } from "../../../firestoreCollections"


export function AddTeamToLeague() {
    const {leagueId} = useParams()
    const [value, loading, error] = useDocumentDataOnce(LeaguesCollection.doc(leagueId))
    const leagueWasNotFound = !loading && value === undefined
    const { register, handleSubmit, control, errors } = useForm()
    const { fields, append } = useFieldArray({
        control,
        name: "players"
    })
    const [success, setSuccess] = useState(false)
    
    async function addTeam({teamName, players = []}, leagueId) {
        await TeamsCollection.add({ 
            leagueId: leagueId,
            teamName: teamName,
            players,
        })

        setSuccess(true)
      }

    return (
        <Container fluid md={3}>
        <Row>
            {leagueWasNotFound && <Alert variant="danger">La liga que estas buscando no existe</Alert>}
            {!leagueWasNotFound && <Col>
            {success && <Alert variant="success">Equipo inscrito con éxito</Alert>}
                <h1 className="mb-3">Inscribe tu equipo a la liga {value?.leagueName}</h1>
                <Form style={{ width: 400 }} onSubmit={handleSubmit(vals => addTeam(vals, leagueId))}>
                    <hr />
                    <h3>Información de equipo</h3>
                    <Form.Group>
                        <Form.Label>Nombre del equipo</Form.Label>
                        <Form.Control placeholder="Ej. Valax" name="teamName" ref={register({ required: true })} />
                    </Form.Group> 

                    <hr />
                    <h3>Jugadores</h3>
                    {fields.map((item, index) => (
                        <Form.Group key={index}>
                            <Form.Label>Nombre del Jugador #{index + 1}</Form.Label>
                            <Form.Control placeholder="Ej. Ariel" name={`players[${index}].name`} ref={register({ required: true })} />
                            <Form.Label>Numero del Jugador #{index + 1}</Form.Label>
                            <Form.Control type="number" placeholder="Ej. 3" name={`players[${index}].number`} ref={register({ required: true })} />
                            <Form.Label>Foto del Jugador #{index + 1}</Form.Label>
                            <Form.Control className="mb-5"  placeholder="Ej. poner url" name={`players[${index}].photoUrl`} ref={register({ required: true })} />
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={append}>Agregar jugador</Button>

                    <hr />
                    <Button variant="primary" type="submit">Crear Equipo</Button>
                </Form>
            </Col>}
        </Row>
    </Container>
    )
}