import React from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import firebase from "firebase";
import { useDocument } from 'react-firebase-hooks/firestore';
import './LeaderboardTable.css';

function LeaderboardTable() {

  const [value, loading, error] = useDocument(
    firebase.firestore().doc('leaderboard/ZmlVX5S9FdAiaCDaxfKg'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return(
    <Card className="card">
      <h3>Tabla General</h3>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>G+</th>
            <th>G-</th>
            <th>Puntos</th>
          </tr>
          </thead>
          <tbody>
          {value.data().teams.map((team, index) =>
            <tr className="tablerow" key={index}>
              <td>{ index + 1 }</td>
              <td>{ team.teamName }</td>
              <td>{ team.goals }</td>
              <td>{ team.goalsAgainst }</td>
              <td>{ team.points }</td>
            </tr>
          )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default LeaderboardTable;