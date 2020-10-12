import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import './RoleTable.css';
import {useDocument} from "react-firebase-hooks/firestore";
import firebase from "firebase";

function RoleTable() {

  const [value, loading, error] = useDocument(
    firebase.firestore().doc('role-table/sckS1z8gBIlPu75ypFT9'),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return(
    <Card className="table-responsive">
      <h2>Próximos encuentros</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
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
          {value.data().roles.map((rol, index) =>
            <tr className="tablerow" key={index}>
              <td>{ rol.equipoA }</td>
              <td>{ rol.equipoB }</td>
              <td>{ rol.cancha }</td>
              <td>{ rol.hora.toDate().toLocaleTimeString() }</td>
            </tr>
          )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default RoleTable;