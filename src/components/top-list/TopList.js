import React from "react";
import CardDeck from 'react-bootstrap/CardDeck'
import Card from "react-bootstrap/Card";

function TopList({cards}) {

  const cardList = cards.map((card, index) =>
    <Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={card.image_url} />
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.text}</Card.Text>
      </Card.Body>
    </Card>
  );

  return(
    <CardDeck>
      {cardList}
    </CardDeck>
  );
}

export default TopList;