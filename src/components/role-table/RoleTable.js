import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import './RoleTable.css';
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { RolesCollections } from "../../firestoreCollections";
import { useParams } from "react-router-dom";

function RoleTable() {
  const { leagueId } = useParams()
  const [data, loading, error] = useCollectionDataOnce(
    RolesCollections.where('leagueId', '==', leagueId || ''))
  return (
    <Card className="table-responsive">
      <h2>Próximos encuentros</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {data && (
        <Table responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Equipo A</th>
              <th scope="col">Equipo B</th>
              <th scope="col">Cancha</th>
              <th scope="col">Hora</th>
            </tr>
          </thead>
          <tbody>
            {data[0].roles && data[0].roles.map((rol, index) =>
              <tr className="tablerow" key={index}>
                <td>{rol.equipoA}</td>
                <td>{rol.equipoB}</td>
                <td>{rol.cancha}</td>
                <td>{rol.hora}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default RoleTable;