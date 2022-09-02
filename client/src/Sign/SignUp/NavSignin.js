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

function NavSignin() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      Already have an account?{" "}
      <span onClick={() => navigate("/regi/signin")}>Log in</span>
    </NavContainer>
  );
}

export default NavSignin;
