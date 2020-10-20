import React, { useState, useEffect } from "react"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { Alert, Container, Col, Row, Form, Button} from "react-bootstrap"
import { useForm, useFieldArray } from "react-hook-form"  
import { useParams } from "react-router-dom"
import { LeaguesCollection, TeamsCollection, RulesCollection } from "../../../firestoreCollections"


export function AddRulesToLeague() {
    const {leagueId} = useParams()
    const [value, loading, error] = useDocumentDataOnce(LeaguesCollection.doc(leagueId))
    const leagueWasNotFound = !loading && value === undefined
    const { register, handleSubmit, control, errors } = useForm()
    const { fields, append } = useFieldArray({
        control,
        name: "players"
    })
    const [success, setSuccess] = useState(false)
    //let [formStatusEdit, setFormEdit] = useState(false)
    //let [formStatusCreate, setFormCreate] = useState(false)
    let [rules, setRules] = useState([])
    let [rulesDoc, setRulesDoc] = useState([])
    //let [teamSelected, setTeamSelected] = useState('')
    let [teamPlayers, setTeamPlayers] = useState([])
    
    async function addRules({rules = []}) {
        console.log("addrulessss")
        await RulesCollection.add({ 
            leagueId: leagueId,
            rules
        })
        setSuccess(true)
    }

    async function getRules() {
        let rulesList = []
        let docsList = []
        await RulesCollection.where("leagueId", "==", leagueId)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                 for (let i = 0; i < doc.data().rules.length; i++) {
                     rulesList.push(doc.data().rules[i].rule)
                 }
                docsList.push(doc)
            })
        })

        setRules(rulesList)
        setRulesDoc(docsList)
    }

    async function updateRules({rules = []}) {
        let doc = rulesDoc[0]
        if(doc != undefined) {
            await RulesCollection.doc(doc.id)
            .update({
                leagueId: leagueId,
                rules: rules
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            setSuccess(true)
        } else {
            addRules({rules})
        }
    }

    /*const changeFormStatusEdit = () => {
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
        setTeamPlayers(teams.find(team => team.teamName === event.target.value)?.players)  
    };*/

    useEffect(() => {
        getRules()
      }, []);

    return (
        <Container fluid md={3}>
        <Row>           
            {leagueWasNotFound && <Alert variant="danger">La liga que estas buscando no existe</Alert>}

            {!leagueWasNotFound && <Col>
                <h1 className="mb-3">Actualiza el reglamento de la liga  {value?.leagueName}</h1>
                
            </Col>}

            {true && <Col>
                <h1 className="mb-3">Reglamento de {value?.leagueName}:</h1>

                <Form style={{ width: 400 }} onSubmit={handleSubmit(vals => updateRules(vals))}>
                    <hr />
                    
                    <h3>Reglamento</h3>

                    {rules
                    .map((rule, index) => (
                        <Form.Group key={index}>
                            <Form.Label>Regla #{index + 1}</Form.Label>
                            <Form.Control placeholder="Ej. Respetar las decisiones arbitrales" defaultValue={rule} name={`rules[${index}].rule`} ref={register({ required: true })} />
                        </Form.Group>
                    ))}
                    
                    {fields.map((item, index) => (
                        <Form.Group key={index}>
                            <Form.Label>Regla #{rules.length + index + 1}</Form.Label>
                            <Form.Control placeholder="Ej. Respetar las decisiones arbitrales" name={`rules[${rules.length + index}].rule`} ref={register({ required: true })} />
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={append}>Agregar Regla</Button>

                    <hr />
                    <Button variant="primary" type="submit">Guardar Reglas</Button>
                    <hr />
                    {success && <Alert variant="success">Equipo actualizado con éxito</Alert>}
                </Form>
            </Col>}
        </Row>
    </Container>
    )
}