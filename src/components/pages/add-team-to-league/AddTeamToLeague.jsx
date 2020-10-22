import React, { useState } from "react"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { Alert, Container, Col, Row, Form, Button } from "react-bootstrap"
import { useForm, useFieldArray } from "react-hook-form"
import { useParams } from "react-router-dom"
import { LeaguesCollection, TeamsCollection } from "../../../firestoreCollections"
import { uploadFile } from "../../../firebaseStorage"
import { firestore } from "firebase"


export function AddTeamToLeague() {
    const { leagueId } = useParams()
    const [value, loading, error] = useDocumentDataOnce(LeaguesCollection.doc(leagueId))
    const leagueWasNotFound = !loading && value === undefined
    const { register, handleSubmit, control, errors } = useForm()
    const { fields, append } = useFieldArray({
        control,
        name: "players"
    })
    const [success, setSuccess] = useState(false)
    let [formStatusEdit, setFormEdit] = useState(false)
    let [formStatusCreate, setFormCreate] = useState(false)
    let [teams, setTeams] = useState([])
    let [teamSelected, setTeamSelected] = useState('')

    async function addTeam({ teamName, players = [] }, leagueId) {
        await TeamsCollection.add({
            leagueId: leagueId,
            teamName: teamName,
            players: await Promise.all(players.map(async p => {
                const timestamp = firestore.Timestamp.now().toMillis()
                const path = `/${leagueId}/${timestamp}${p.picture[0].name}`
                await uploadFile(p.picture[0], path)
                return { ...p, picture: path }
            })),
        })
        setSuccess(true)
    }

    async function getTeams() {
        let teamsList = []
        await TeamsCollection.where("leagueId", "==", leagueId)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    teamsList.push({ id: doc.id, ...doc.data() })
                })
            })
        if (teamsList.length > 0) setTeams(teamsList); setTeamSelected(teamsList[0].teamName);
    }

    async function updateTeamPlayers(vals) {
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
    }

    const changeFormStatusEdit = () => {
        getTeams()
        setFormEdit(true)
        setFormCreate(false)
        setSuccess(false)
    }

    const changeFormStatusCreate = () => {
        setFormEdit(false)
        setFormCreate(true)
        setSuccess(false)
    }

    const changeTeamSelected = (event) => {
        setTeamSelected(event.target.value)
    };

    return (
        <Container fluid md={3}>
            <Row>
                {leagueWasNotFound && <Alert variant="danger">La liga que estas buscando no existe</Alert>}

                {!leagueWasNotFound && <Col>
                    <h1 className="mb-3">Administra tus equipo de la liga  {value?.leagueName}</h1>

                    <Button variant="primary" onClick={changeFormStatusEdit}>Actualizar Equipo</Button>
                    <Button variant="primary" onClick={changeFormStatusCreate}>Crear Equipo</Button>

                </Col>}


                {formStatusCreate && <Col>
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
                                <Form.File
                                    ref={register({ required: true })}
                                    leagueId={`players[${index}].picture`}
                                    multiple={false}
                                    accept=".jpeg,.jpg,.png"
                                    name={`players[${index}].picture`}
                                    data-browse="Subir"
                                />
                            </Form.Group>
                        ))}
                        <Button variant="secondary" onClick={append}>Agregar jugador</Button>

                        <hr />
                        <Button variant="primary" type="submit">Crear Equipo</Button>
                    </Form>
                </Col>}

                {formStatusEdit && <Col>
                    <h1 className="mb-3">Actualiza equipo en la liga {value?.leagueName}</h1>

                    <Form style={{ width: 400 }} onSubmit={handleSubmit(vals => updateTeamPlayers(vals))}>
                        <hr />
                        <h3>Información de equipo {teamSelected}</h3>
                        <Form.Group>
                            <Form.Label>Nombre del equipo</Form.Label>
                            <select onChange={changeTeamSelected}>
                                {teams.map(function (team) {
                                    return <option value={team.teamName} key={team.teamName}>{team.teamName}</option>;
                                })}
                            </select>
                        </Form.Group>

                        <hr />
                        <h3>Jugadores</h3>
                        {teams.find(team => team.teamName === teamSelected)?.players
                            .map((player, index) => (
                                <Form.Group key={index}>
                                    <Form.Label>Nombre del Jugador #{index + 1}</Form.Label>
                                    <Form.Control placeholder="Ej. Ariel" defaultValue={player.name} name={`players[${index}].name`} ref={register({ required: true })} />
                                    <Form.Label>Numero del Jugador #{index + 1}</Form.Label>
                                    <Form.Control type="number" placeholder="Ej. 3" defaultValue={player.number} name={`players[${index}].number`} ref={register({ required: true })} />
                                    <Form.Label>Foto del Jugador #{index + 1}</Form.Label>
                                    <Form.Control className="mb-5" placeholder="Ej. poner url" defaultValue={player.photoUrl} name={`players[${index}].photoUrl`} ref={register({ required: true })} />
                                </Form.Group>
                            ))}
                        <Button variant="secondary" onClick={append}>Agregar jugador</Button>
                        <hr />
                        <Button variant="primary" type="submit">Guardar Equipo</Button>
                        <hr />
                        {success && <Alert variant="success">Equipo actualizado con éxito</Alert>}
                    </Form>
                </Col>}
            </Row>
        </Container>
    )
}