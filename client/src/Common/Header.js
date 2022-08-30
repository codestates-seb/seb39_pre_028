import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { isLoginAtom } from "../Atom/atom";
import { useRecoilValue } from "recoil";

const Contaniner = styled("div")`
  display: flex;
  border-bottom: 1px solid black;
`;

const List = styled("li")`
  list-style: none;
  padding: 10px 20px;
  :hover {
    cursor: pointer;
  }
`;

function Header() {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  return (
    <div>
      <Contaniner>
        <List onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faStackOverflow} />
          stack overflow
        </List>

        <List onClick={() => navigate("/")}>Board</List>

        <List onClick={() => navigate("/questions")}>Questions </List>

        {isLogin ? (
          <List onClick={() => navigate("/signin/signout")}>SignOut</List>
        ) : (
          <List onClick={() => navigate("/signin")}>SignIn</List>
        )}
      </Contaniner>
    </div>
  );
}

export default Header;
