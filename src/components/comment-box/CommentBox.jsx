import React, { useEffect, useState } from "react";
import './CommentBox.css'
import Card from 'react-bootstrap/Card';
import { CommentsCollection } from '../../firestoreCollections';
import { useForm } from "react-hook-form";
import { useCollectionData } from "react-firebase-hooks/firestore";

function formIsValid(errors) {
  return Object.entries(errors).length === 0
}

function CommentBox({ objectRelationId: relationId }) {
  const { register, handleSubmit, errors } = useForm();
  const {
    values: collectionValues,
    loading: collectionLoading,
    errors: collectionErrors,
  } = useCollectionData(CommentsCollection,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  async function postComment({ comment }) {
    const id = updateMode ? document.id : await postCommentsBoxInstance().id;
    const newComments = [...commentsList, { content: comment, publishedAt: new Date() }];
    await CommentsCollection.doc(id).update({
      comments: newComments,
    })
  }
  async function postCommentsBoxInstance() {
    await CommentsCollection.add({
      comments: [],
      relationId,
    }).then((res) => {
      setSuccess(true)
      return res;
    }).catch(err => {
      console.error(err)
    })
  }
  async function getComments() {
    if (!relationId) {
      return
    }

    let commentsList = []
    let document = {}
    let _relationId = '';
    setLoading(true)
    await CommentsCollection.where("relationId", "==", relationId)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentsList = (doc.data() && doc.data().comments)
          _relationId = (doc.data() && doc.data().relationId)
          document = doc;
        })
      }).catch((err) => console.error(err))
    if (_relationId) setUpdateMode(true)
    setCommentsList(commentsList)
    setDocument(document)
    setLoading(false)
  }
  useEffect(() => getComments(), [])
  React.useEffect(() => {
    const unsubscribe =
      CommentsCollection.where('relationId', '==', relationId || '')
        .onSnapshot((snapshot) => {
          getComments()
        });
    return unsubscribe
  }, []);
  return (
    <Card className="card comment-box">
      <h3 id="header">Comentarios</h3>
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>} */}
      {loading && <span>Collection: Loading...</span>}
      {commentsList && (
        <>
          <form onSubmit={handleSubmit(vals => postComment(vals))}>
            <input name="comment" ref={register({ required: true })} placeholder="Nuevo Comentario" />
            <button disabled={!formIsValid(errors)} type='submit'>Enviar</button>
          </form>
          <ul className="comment-list">
            {commentsList?.map((comment, index) =>
              <li className="comment" key={index}>
                <span>{comment.publishedAt.toDate().toDateString()}</span>: {comment.content}
              </li>
            )}
          </ul>
        </>
      )}
    </Card>
  );
}

export default CommentBox;