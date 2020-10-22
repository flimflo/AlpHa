import React, { useEffect, useState } from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from "react-bootstrap/Card";
import {useDocumentData} from "react-firebase-hooks/firestore";
import { LeagueInfoCollection } from "../../firestoreCollections";
import { useParams } from "react-router-dom";
import { getStoragePath } from "../../firebaseStorage";

function TopList() {
  const {leagueId} = useParams()
  const [data, setData] = useState([])
  
  useEffect(() => {
    const unsubscribe = LeagueInfoCollection.doc(leagueId)
      .onSnapshot(s => {
        try {
          const { a, b, c, d } = {} = s.data().highlights
          Promise.all([a, b, c, d].map(async d => ({
            url: await getStoragePath(d.picture),
            title: d.title,
            subtitle: d.subtitle
          })))
            .then(setData)
        } catch (_) {
        }
        
      })

    return unsubscribe
  }, [leagueId])

  return(
    <>
      <CardDeck>
        {data.map((d, index) => 
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={d.url} />
            <Card.Body>
              <Card.Title>{d.title}</Card.Title>
              <Card.Text>{d.subtitle}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardDeck>
    </>
  );
}

export default TopList;