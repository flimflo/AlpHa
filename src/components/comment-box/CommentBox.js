import React from "react";
import './CommentBox.css'
import Card from 'react-bootstrap/Card';

function CommentBox({comments}) {
  const listItems = comments.map((comment, index) =>
    <li className="comment" key={index}>
      <span>{ comment.publishedAt }</span>: { comment.content }
    </li>
  );

  return(
    <Card className="card">
      <h3 id="header">Comentarios</h3>
      <form>
        <input placeholder="Nuevo Comentario"/>
          <button>Enviar</button>
      </form>
      <ul className="comment-list">
        {listItems}
      </ul>
    </Card>
  );
}

export default CommentBox;