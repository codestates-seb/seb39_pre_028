import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { isLoginAtom } from "../Atom/atom";
import { useRecoilValue } from "recoil";

const Contaniner = styled("div")`
  display: flex;
  position: fixed;
  align-items: center;
  top: 0;
  left: -1px;
  width: 100%;
  z-index: 1;
  background-color: #f8f9f9;
  border-top: 4px solid #f48225;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const Logo = styled("li")`
  list-style: none;
  padding: 15px 10px;
  transition: all 0.2s;

  :hover {
    cursor: pointer;
    background-color: #e3e6e8;
  }

  .logo_icon {
    font-size: 30px;
    margin: 0 5px;
    color: #f38630;
  }

  .logo_text {
    font-size: 23px;
  }

  .first {
    font-weight: 300;
  }

  .second {
    font-weight: 700;
  }
`;

const List = styled("li")`
  list-style: none;
  color: #6c6e70;
  margin: 0 9px;
  padding: 9px 10px 12px 10px;
  font-size: 16px;
  border-radius: 50px;
  transition: all 0.2s;

  :hover {
    cursor: pointer;
    color: black;
    background-color: #e3e6e8;
  }
`;

function Header() {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  return (
    <Contaniner>
      <Logo onClick={() => navigate("/board")}>
        <FontAwesomeIcon className="logo_icon" icon={faStackOverflow} />
        <span className="logo_text first">stack </span>
        <span className="logo_text second">overflow</span>
      </Logo>

      <List onClick={() => navigate("/board")}>Board</List>

      <List onClick={() => navigate("/questions")}>Questions </List>

      {isLogin ? (
        <List onClick={() => navigate("regi/signout")}>SignOut</List>
      ) : (
        <List onClick={() => navigate("regi/signin")}>SignIn</List>
      )}
    </Contaniner>
  );
}

export default Header;
