import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import {
  faInbox,
  faCircleQuestion,
  faTrophy,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
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

const IconContainer = styled("div")`
  display: flex;
  position: absolute;
  bottom: 10;
  right: 0;
  margin-right: 25px;

  .logo {
    color: #757575;
    font-size: 22px;
    margin: 12px;
  }
`;

const ButtonContainer = styled("div")`
  display: flex;
  position: absolute;
  bottom: 10;
  right: 0;
  margin-right: 25px;

  button:first-child {
    padding: 10px 12px;
    margin-left: 8px;
    background-color: #dceaf2;
    color: #0074cc;
    border: 1px solid #0a95ff;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

  button:first-child:hover {
    /* background-color: #aaddff; */
    background-color: transparent;
  }

  button:last-child {
    padding: 10px;
    margin-left: 12px;
    color: #ffffff;
    background-color: #0a95ff;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
  button:last-child:hover {
    background-color: #0074cc;
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
        <IconContainer>
          <FontAwesomeIcon className="signout logo" icon={faInbox} />
          <FontAwesomeIcon className="signout logo" icon={faCircleQuestion} />
          <FontAwesomeIcon className="signout logo" icon={faTrophy} />
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="signout logo"
            onClick={() => navigate("regi/signout")}
          />
        </IconContainer>
      ) : (
        <ButtonContainer>
          <button type="submit" onClick={() => navigate("regi/signin")}>
            Log in
          </button>
          <button type="submit" onClick={() => navigate("regi/signup")}>
            Sign up
          </button>
        </ButtonContainer>
      )}
    </Contaniner>
  );
}

export default Header;
