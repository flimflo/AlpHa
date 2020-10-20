import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { NewsCollection } from "../../../firestoreCollections";

function News() {
  const { leagueId } = useParams()
  const [data, loading, error] = useCollectionData(NewsCollection.where('leagueId', '==', leagueId).orderBy('date', 'desc'))

  return(
    <>
      {!loading && data && JSON.stringify(data)}
    </>
  )
}

export default News;
