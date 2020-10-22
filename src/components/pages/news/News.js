import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getStoragePath } from "../../../firebaseStorage";
import { NewsCollection } from "../../../firestoreCollections";
import CommentBox from "../../comment-box/CommentBox";

function News() {
  const { leagueId } = useParams() 
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = NewsCollection.where('leagueId', '==', leagueId || '')
      .orderBy('date', 'desc')
      .onSnapshot(s => {
        Promise.all(s.docs.map(async d => ({        
          ...d.data(),
          pictureUrl: d.data().picture && await getStoragePath(d.data().picture),
          date: new Date(d.data().date.toMillis()).toLocaleDateString(),
          id: d.id,
        })))
          .then(setData)
      })

    return unsubscribe
  }, [leagueId])

  return (
    <>
      <h1>Multimedia</h1>
      {data.map(d => (
        <Card key={d.date} style={{ width: '90%', maxWidth: "700px" }} className="m-4">
        {d.pictureUrl && <Card.Img variant="top" src={d.pictureUrl} />}
        <Card.Body>
          <Card.Title>{d.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" >{d.date}</Card.Subtitle>
          <Card.Text className="mb-2 text-muted" >{d.content}</Card.Text>
          <CommentBox objectRelationId={d.id} />
        </Card.Body>
      </Card>
      ))}
    </>
  )
}

export default News;
