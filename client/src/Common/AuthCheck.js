import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const AuthContainer = styled("div")`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
`;

const AuthForm = styled("form")`
  display: flex;
  flex-direction: column;
  background-color: #f8f9f9;
  padding: 70px 30px;
  margin: 40px 0;
  width: 20rem;
  font-size: 18px;
  font-weight: 550;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  div {
    margin-bottom: 6px;
  }
  button:hover {
    background-color: #0074cc;
  }
`;

const MessageButton = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  color: hsl(0, 0%, 30%);
`;
const Buttons = styled.section`
  display: flex;
  flex-direction: inherit;
  width: 90%;
  margin-top: 20px;
  button {
    height: 30px;
    margin-top: 5px;
    color: #ffffff;
    background-color: #0a95ff;
    border: 0;
    border-radius: 3px;
  }
`;
function AuthCheck() {
  const navigate = useNavigate();
  return (
    <AuthContainer>
      <AuthForm>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="5x"
          color="#c2c4c4"
        />

        <MessageButton>
          <div>Unauthorized</div>
          <Buttons>
            <button onClick={() => navigate("/regi/signin")}>Log In</button>
            {/* <button onClick={() => navigate(-2)}>Previous Page</button> */}
            <button onClick={() => navigate("/board/home")}>Board</button>
          </Buttons>
        </MessageButton>
      </AuthForm>
    </AuthContainer>
  );
}

export default AuthCheck;
