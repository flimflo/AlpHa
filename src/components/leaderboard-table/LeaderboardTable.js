import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import firebase from "firebase";
import { useParams } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { TeamsCollection } from "../../firestoreCollections"
import './LeaderboardTable.css';

function LeaderboardTable() {
  const { leagueId } = useParams()
  const [data, loading, error] = useCollectionData(
    TeamsCollection.where('leagueId', '==', leagueId))
  

  function sortTeams() {
    if(data != null) {
      data.sort(function(a,b){return b.won - a.won || b.tied - a.tied;});
    }
  }

  useEffect(() => { sortTeams() }, [data])

  return(
    <Card className="card">
      <h3>Tabla General</h3>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && (
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Pnts.</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>Dif.</th>
            <th>G+</th>
            <th>G-</th>
          </tr>
          </thead>
          <tbody>
          {data.map((team, index) =>
            <tr className="tablerow" key={index}>
              <td>{ index + 1 }</td>
              <td>{ team.teamName }</td>
              <td>{ team.won * 3 + team.tied }</td>
              <td>{ team.won }</td>
              <td>{ team.tied }</td>
              <td>{ team.lost }</td>
              <td>{ team.golesFavor - team.golesContra }</td>
              <td>{ team.golesFavor }</td>
              <td>{ team.golesContra }</td>
            </tr>
          )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default LeaderboardTable;