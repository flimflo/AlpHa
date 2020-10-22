import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getStoragePath } from "../../../firebaseStorage";
import { MediaCollection } from "../../../firestoreCollections";
import './Media.css';

function Media() {
  const { leagueId } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = MediaCollection.where('leagueId', '==', leagueId || '')
      .orderBy('date', 'desc')
      .onSnapshot(s => {
        Promise.all(s.docs.map(async d => ({
          ...d.data(),
          pictureUrl: d.data().path && await getStoragePath(d.data().path),
          date: new Date(d.data().date.toMillis()).toLocaleDateString(),
        })))
          .then(setData)
      })

    return unsubscribe
  }, [leagueId])

  return (
    <>
      <div className="section">
      <h1>Multimedia</h1>
        <div className="section-content media-table">
          {data.map(d => (
            <Card style={{ width: '18rem' }} className="m-4">
              {d.pictureUrl && <Card.Img variant="top" src={d.pictureUrl} />}
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" >{d.date}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default Media;
