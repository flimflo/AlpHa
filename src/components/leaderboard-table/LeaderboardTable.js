import React from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './LeaderboardTable.css';

function LeaderboardTable({teams}) {

  const tableRows = teams.map((team, index) =>
    <tr className="tablerow" key={index}>
      <td>{ index + 1 }</td>
      <td>{ team.teamName }</td>
      <td>{ team.goals }</td>
      <td>{ team.goalsAgainst }</td>
      <td>{ team.points }</td>
    </tr>
  );

  return(
    <Card className="card">
      <h3>Tabla General</h3>
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
          {tableRows}
        </tbody>
      </Table>
    </Card>
  );
}

export default LeaderboardTable;