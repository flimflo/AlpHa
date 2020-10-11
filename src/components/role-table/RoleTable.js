import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import './RoleTable.css';

function RoleTable({roles}) {

  const tableRows = roles.map((rol, index) =>
    <tr className="tablerow" key={index}>
      <td>{ rol.equipoA }</td>
      <td>{ rol.equipoB }</td>
      <td>{ rol.cancha }</td>
      <td>{ rol.hora }</td>
    </tr>
  );

  return(
    <Card className="table-responsive">
      <h2>Próximos encuentros</h2>
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
          {tableRows}
        </tbody>
      </Table>
    </Card>
  );
}

export default RoleTable;