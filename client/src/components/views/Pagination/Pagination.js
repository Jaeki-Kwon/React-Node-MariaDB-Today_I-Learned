import React from "react";
import "./Pagination.css";

function Pagination({ postPerPage, totalBoards, paginate }) {
  const pageNumbers = [];
//   console.log("pageNumbers : ", pageNumbers);

  for (let i = 0; i < Math.ceil(totalBoards / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="btn">
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num}>
            <a onClick={() => paginate(num + 1)} href="#/0">
              {num + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
