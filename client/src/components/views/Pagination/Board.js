import React from "react";
import { Link } from "react-router-dom";

const Board = ({ BoardList }) => {
  return (
    <tbody>
      {BoardList.map((item, index) => {
        <tr key={index}>
          <th style={{ border: "1px solid black" }}>
            <Link to={`/board/${item.id}`}>{item.createDate}</Link>
          </th>
          <th style={{ border: "1px solid black" }}>
            <Link to={`/board/${item.id}`}>{item.title}</Link>
          </th>
        </tr>;
      })}
    </tbody>
  );
};

export default Board;
