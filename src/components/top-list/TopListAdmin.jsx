import { firestore } from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { uploadFile, getStoragePath } from '../../firebaseStorage'
import { LeagueInfoCollection } from '../../firestoreCollections'
import { useCurrentUser } from '../pages/auth/CurrentUser'


export function TopListAdmin() {
  const { register, handleSubmit, control, errors, watch } = useForm()
  const [show, setShow] = useState(false)
  const user = useCurrentUser()
  const [data, setData] = useState([])

  useEffect(() => {
    if (!user?.leagueId) { 
        return 
    }

    const unsubscribe = LeagueInfoCollection.doc(user?.leagueId)
      .onSnapshot(s => {
        try {
        
          const { a, b, c, d } = s.data().highlights
          Promise.all([a, b, c, d].map(async d => ({
            url: await getStoragePath(d.picture),
            title: d.title,
            subtitle: d.subtitle
          })))
            .then(setData)
        } catch {
          
        }
      })

    return unsubscribe
  }, [user?.leagueId])

  async function updateTopList({  a, b, c, d }, leagueId) {
    await uploadFile(a.picture[0], `/${leagueId}/top-a`)
    await uploadFile(b.picture[0], `/${leagueId}/top-b`)
    await uploadFile(c.picture[0], `/${leagueId}/top-c`)
    await uploadFile(d.picture[0], `/${leagueId}/top-d`)
    await LeagueInfoCollection.doc(leagueId).set({
      highlights: {
        a: {...a, picture: `/${leagueId}/top-a` },
        b: {...b, picture: `/${leagueId}/top-b` },
        c: {...c, picture: `/${leagueId}/top-c` },
        d: {...d, picture: `/${leagueId}/top-d` },
      }
    }, {merge: true })

    setShow(false)
  }


  return (
    <Container fluid md={3}>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit(v => updateTopList(v, user?.leagueId))}>
          <Modal.Header closeButton>
            <Modal.Title>Publicar nueva foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Top 1</h4>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Mejor Equipo" name="a.title" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subitulo</Form.Label>
              <Form.Control placeholder="Ej. Equipo Alpha" name="a.subtitle" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Foto</Form.Label>
              <Form.File
                ref={register({ required: true })}
                id="a.picture"
                multiple={false}
                accept=".jpeg,.jpg,.png"
                name="a.picture"
                data-browse="Subir"
              />
            </Form.Group>
            <h4>Top 2</h4>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Mejor Equipo" name="b.title" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subitulo</Form.Label>
              <Form.Control placeholder="Ej. Equipo Alpha" name="b.subtitle" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Foto</Form.Label>
              <Form.File
                ref={register({ required: true })}
                id="b.picture"
                multiple={false}
                accept=".jpeg,.jpg,.png"
                name="b.picture"
                data-browse="Subir"
              />
            </Form.Group>
            <h4>Top 3</h4>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Mejor Equipo" name="c.title" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subitulo</Form.Label>
              <Form.Control placeholder="Ej. Equipo Alpha" name="c.subtitle" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Foto</Form.Label>
              <Form.File
                ref={register({ required: true })}
                id="c.picture"
                multiple={false}
                accept=".jpeg,.jpg,.png"
                name="c.picture"
                data-browse="Subir"
              />
            </Form.Group>
            <h4>Top 4</h4>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Mejor Equipo" name="d.title" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subitulo</Form.Label>
              <Form.Control placeholder="Ej. Equipo Alpha" name="d.subtitle" ref={register({ required: true })} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Foto</Form.Label>
              <Form.File
                ref={register({ required: true })}
                id="d.picture"
                multiple={false}
                accept=".jpeg,.jpg,.png"
                name="d.picture"
                data-browse="Subir"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Publicar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Row>
        <Col>
          <h1 className="mb-3">Top</h1>
          <hr></hr>
          <Button variant="success" onClick={() => setShow(true)}>Actualizar</Button>
          <hr></hr>
          <Table>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Titulo</th>
                <th scope="col">Subtiulo</th>
                <th scope="col">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post, index) =>
                <tr className="tablerow" key={post.date}>
                  <td>{post.title}</td>
                  <td>{post.subtitle}</td>
                  <td><img src={post.url} width={120}></img></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}