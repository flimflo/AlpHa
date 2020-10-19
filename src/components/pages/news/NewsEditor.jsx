import { firestore } from 'firebase'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'
import { NewsCollection } from '../../../firestoreCollections'
import { useCurrentUser } from '../auth/CurrentUser'


export function NewsEditor() {
  const { register, handleSubmit, control, errors, watch } = useForm()
  const [show, setShow] = useState(false)
  const user = useCurrentUser()
  const [data, loading, error] = useCollectionData(
    NewsCollection.where('leagueId', '==', user?.leagueId || '').orderBy('date', 'desc'), { idField: "postId" })
  const showPhotoField = watch('showPhotoField', false)

  async function createNewsPost({ title, picture = null, content }, leagueId) {
    await NewsCollection.add({
      leagueId,
      title,
      picture,
      content,
      date: firestore.Timestamp.now()
    })

    setShow(false)
  }

  function deletePost(postId) {
    NewsCollection.doc(postId).delete()
  }

  return (
    <Container fluid md={3}>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit(v => createNewsPost(v, user?.leagueId))}>
          <Modal.Header closeButton>
            <Modal.Title>Publicar nuevo anuncio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Nuevo anuncio" name="title" ref={register({ required: true })} />
            </Form.Group>
            <Form.Check
              type="switch"
              id="showPhotoField"
              name="showPhotoField"
              ref={register}
              label="Incluir foto"
            />
            {showPhotoField &&
              <Form.Group>
                <Form.Label>Url de foto</Form.Label>
                <Form.Control placeholder="Ej. www.google.com/foto.jpg" name="picture" ref={register({ required: true })} />
              </Form.Group>
            }
            <Form.Group>
              <Form.Label>Contenido</Form.Label>
              <Form.Control as="textarea" placeholder="Ej. Partido el dia de mañana" name="content" ref={register({ required: true })} />
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
          <h1 className="mb-3">Anuncios</h1>
          <hr></hr>
          <Button variant="success" onClick={() => setShow(true)}>Crear nuevo anuncio</Button>
          <hr></hr>
          <h3 className="mb-3">Anuncios publicados</h3>
          {!loading && data &&
            <Table responsive>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Titulo del anuncio</th>
                  <th scope="col">Fecha de publicación</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((post, index) =>
                  <tr className="tablerow" key={index}>
                    <td>{post.title}</td>
                    <td>{(new Date(post.date.seconds * 1000)).toLocaleDateString()}</td>
                    <td><Button variant="danger" onClick={() => deletePost(post.postId)}>Eliminar</Button></td>
                  </tr>
                )}
              </tbody>
            </Table>}
        </Col>
      </Row>
    </Container>
  )
}