import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import NavSignup from "./NavSignup";

const SignInContainer = styled("div")`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  .logo_icon {
    text-align: center;
    font-size: 50px;
    color: #f38630;
  }
`;

const SigninForm = styled("form")`
  display: flex;
  flex-direction: column;
  background-color: #f8f9f9;
  padding: 45px 30px;
  margin: 40px 0;
  width: 20rem;
  font-size: 18px;
  font-weight: 550;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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
`;

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signInfo, setSignInfo] = useState({});
  const setUserInfo = useSetRecoilState(userStateAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const navigate = useNavigate();

  const handleIdChange = (event) => {
    setId(event.currentTarget.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  useEffect(() => {
    setSignInfo({
      userid: id,
      password: password,
    });
  }, [id, password]);

  const LoginHandler = (event) => {
    event.preventDefault();

    return axios
      .post("signin-process", signInfo)
      .then((res) => {
        console.log(res.headers.accesstoken);

        if (res.headers.accesstoken) {
          localStorage.setItem("accessToken", res.headers.accesstoken);
        }

        setIsLogin(true);
        setUserInfo(res.data.userInfo);
        navigate("/board");

        console.log("로그인 성공");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("로그인 실패");
      });
  };

  return (
    <SignInContainer>
      <FontAwesomeIcon className="logo_icon" icon={faStackOverflow} />
      <SigninForm>
        <div>ID</div>
        <input type="text" name="id" value={id} onChange={handleIdChange} />
        <div>Password</div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" onClick={LoginHandler}>
          Log in
        </button>
      </SigninForm>
      <NavSignup />
    </SignInContainer>
  );
}

export default SignIn;
