import { firestore } from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { MediaCollection } from '../../../firestoreCollections'
import { uploadFile, getStoragePath } from '../../../firebaseStorage'
import { useCurrentUser } from '../auth/CurrentUser'


export function MediaEditor() {
  const { register, handleSubmit, control, errors, watch } = useForm()
  const [show, setShow] = useState(false)
  const user = useCurrentUser()
  const [data, setData] = useState([])
  const pictureFile = watch('picture')

  useEffect(() => {
    const unsubscribe = MediaCollection.where('leagueId', '==', user?.leagueId || '')
      .orderBy('date', 'desc')
      .onSnapshot(s => {
        Promise.all(s.docs.map(async d => ({
          id: d.id,
          url: await getStoragePath(d.data().path),
          date: new Date(d.data().date.toMillis()).toLocaleDateString(),
          title: d.data().title
        })))
          .then(setData)
      })

    return unsubscribe
  }, [user?.leagueId])


  async function createNewsPost({ title, picture }, leagueId) {
    const now = firestore.Timestamp.now()
    const path = `/${leagueId}/${now.toMillis()}${picture[0].name}`

    await uploadFile(picture[0], path)
    await MediaCollection.add({
      leagueId,
      title,
      path,
      date: now,
    })

    setShow(false)
  }

  function deletePost(postId) {
    MediaCollection.doc(postId).delete()
  }

  return (
    <Container fluid md={3}>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit(v => createNewsPost(v, user?.leagueId))}>
          <Modal.Header closeButton>
            <Modal.Title>Publicar nueva foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control placeholder="Ej. Foto del partido" name="title" ref={register({ required: true })} />
            </Form.Group>
            <Form.File
              ref={register({ required: true })}
              id="picture"
              multiple={false}
              accept=".jpeg,.jpg,.png"
              name="picture"
              data-browse="Subir"
              label={pictureFile?.length > 0 && pictureFile[0].name || "Fotografia"}
              custom
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Publicar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Row>
        <Col>
          <h1 className="mb-3">Galeria</h1>
          <hr></hr>
          <Button variant="success" onClick={() => setShow(true)}>Crear nueva Foto</Button>
          <hr></hr>
          <h3 className="mb-3">Fotografias publicadas</h3>
          <Table>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Titulo de foto</th>
                <th scope="col">Miniatura</th>
                <th scope="col">Fecha de publicación</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((post, index) =>
                <tr className="tablerow" key={post.date}>
                  <td>{post.title}</td>
                  <td><img src={post.url} width={120}></img></td>
                  <td>{post.date}</td>
                  <td><Button variant="danger" onClick={() => deletePost(post.id)}>Eliminar</Button></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}