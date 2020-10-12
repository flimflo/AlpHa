import React from "react";
import CardDeck from 'react-bootstrap/CardDeck'
import Card from "react-bootstrap/Card";
import {useDocument} from "react-firebase-hooks/firestore";
import firebase from "firebase";

function TopList() {

  const [value, loading, error] = useDocument(
    firebase.firestore().doc('top-list/HE7BWbzOPpkKCpJKo9oX'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return(
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <CardDeck>
          {value.data().cards.map((card, index) =>
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={card.image_url} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </CardDeck>
      )}
    </>
  );
}

export default TopList;