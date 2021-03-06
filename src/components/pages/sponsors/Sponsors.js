import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getStoragePath } from "../../../firebaseStorage";
import { SponsorsCollection } from "../../../firestoreCollections";

function Sponsors() {
  const { leagueId } = useParams() 
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = SponsorsCollection.doc(leagueId)
      .onSnapshot(s => {
        return Promise.all(s.data().sponsors.map(async d => ({
          name: d.name,
          pictureUrl: await getStoragePath(d.picture || ''),
          address: d.address,
        })))
          .then(setData)
      })

    return unsubscribe
  }, [leagueId])

  return(
    <>
      <h1>Nuestros Patrocinadores</h1>
      {data.map(d => (
        <Card style={{ width: '18rem' }} className="m-4" key={d.name}>
        {d.pictureUrl && <Card.Img variant="top" src={d.pictureUrl} />}
        <Card.Body>
          <Card.Title>{d.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" >{d.address}</Card.Subtitle>
        </Card.Body>
      </Card>
      ))}
    </>
  )
}

export default Sponsors;