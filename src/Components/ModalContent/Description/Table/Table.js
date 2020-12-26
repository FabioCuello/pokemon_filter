import React from "react";

export const Table = (props) => (
  <div className="row">
    <table>
      <tbody>
        <tr>
          <td>Height</td>
          <td>{props.height} m </td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{props.weight} Kg</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{props.category}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{props.gender}</td>
        </tr>
        <tr>
          <td>Habitat</td>
          <td>{props.habitat}</td>
        </tr>
        <tr>
          <td>Color</td>
          <td>{props.color}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
