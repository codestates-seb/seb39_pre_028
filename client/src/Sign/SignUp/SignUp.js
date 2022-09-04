import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import SignupText from "./SignupText";
import NavSignin from "./NavSignin";

const SignUpContainer = styled("div")`
  position: absolute;
  display: flex;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    background-color: orange;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    background-color: yellow;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    background-color: green;
  }

  @media all and (max-width: 768px) {
    background-color: red;
  }
`;

const FormContainer = styled("div")`
  width: 20rem;
  font-size: 16px;
  font-weight: 550;

  form {
    display: flex;
    flex-direction: column;
    background-color: #f8f9f9;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 45px 30px;
    margin: 40px 0;
  }

  div {
    margin-bottom: 6px;
  }

  input {
    height: 35px;
    margin-bottom: 30px;
    border: 0.5px solid #d3d3d3;
    border-radius: 5px;
  }

  button {
    height: 35px;
    color: #ffffff;
    background-color: #0a95ff;
    border: 0;
    border-radius: 3px;
  }

  button:hover {
    background-color: #0074cc;
  }

  .form_footer {
    margin-top: 27px;
    font-size: 10px;
    color: #69737a;
    font-weight: 400;
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    width: 16rem;
  }
`;

function SignUp() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signInfo, setSignInfo] = useState({});
  const navigate = useNavigate();

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  };

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  useEffect(() => {
    setSignInfo({
      username: username,
      userid: id,
      password: password,
    });
  }, [username, id, password]);

  const signInHandler = (event) => {
    event.preventDefault();

    return axios // 회원가입 요청
      .post("/regi/signup", signInfo)
      .then((res) => {
        console.log(res.data);
        console.log("회원가입 성공");
        navigate("/regi/signin");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log("회원가입 실패");
      });
  };

  return (
    <SignUpContainer>
      <SignupText />
      <FormContainer>
        <form>
          <div>User name</div>
          <input
            name="username"
            type="text"
            value={username}
            onChange={onUsernameHandler}
          />
          <div>ID</div>
          <input name="id" type="text" value={id} onChange={onIdHandler} />

          <div>Password</div>
          <input
            name="password"
            type="text"
            value={password}
            onChange={onPasswordHandler}
          />
          <button type="submit" onClick={signInHandler}>
            Sign up
          </button>
          <div className="form_footer">
            By clicking "Sign up", you agree to our terms of <br />
            service, privacy policy and cookie policy
          </div>
        </form>
        <NavSignin />
      </FormContainer>
    </SignUpContainer>
  );
}

export default SignUp;
