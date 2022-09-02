import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled("div")`
  text-align: center;
  font-size: 15px;
  font-weight: 300;

  span {
    color: #0a95ff;
    font-weight: 400;
  }

  span:hover {
    cursor: pointer;
    color: #0074cc;
  }
`;

function NavSignup() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      Dont't have an account?{" "}
      <span onClick={() => navigate("/regi/signup")}>Sign up</span>
    </NavContainer>
  );
}

export default NavSignup;
