import React from "react";
import styled from "styled-components";

const PagiNav = styled("nav")`
  list-style: none;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const PagiButton = styled("button")`
  border: none;
  background-color: transparent;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 50px;

  :hover {
    color: #0a95ff;
  }
`;

function Pagenation({ pageInfo, SetPage }) {
  const pageNumber = [];
  for (let i = 1; i <= pageInfo.totalPages; i++) {
    pageNumber.push(i);
  }

  return (
    <PagiNav>
      {Array.isArray(pageNumber) &&
        pageNumber.map((num) => (
          <li key={num} onClick={() => SetPage(num)}>
            <PagiButton>{num}</PagiButton>
          </li>
        ))}
    </PagiNav>
  );
}

export default Pagenation;
