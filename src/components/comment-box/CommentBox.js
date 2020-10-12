import React from "react";
import './CommentBox.css'
import Card from 'react-bootstrap/Card';
import {useDocument} from "react-firebase-hooks/firestore";
import firebase from "firebase";

// TODO: post comment
function CommentBox() {

  const [value, loading, error] = useDocument(
    firebase.firestore().doc('comment-box/wbxPOHxKbrhFLF9WYosH'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return(
    <Card className="card comment-box">
      <h3 id="header">Comentarios</h3>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <>
          <form>
            <input placeholder="Nuevo Comentario"/>
            <button>Enviar</button>
          </form>
          <ul className="comment-list">
            {value.data().comments.map((comment, index) =>
              <li className="comment" key={index}>
                <span>{ comment.publishedAt.toDate().toDateString() }</span>: { comment.content }
              </li>
            )}
          </ul>
        </>
      )}
    </Card>
  );
}

export default CommentBox;