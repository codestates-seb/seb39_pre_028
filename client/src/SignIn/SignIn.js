import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";

const SignInOuterContainer = styled("div")`
  display: flex;
`;

const SignInInnerContainer = styled("div")`
  border: 1px solid pink;
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

  const LoginHandler = (event) => {
    event.preventDefault();
    setSignInfo({
      userid: id,
      password: password,
    });
    return axios
      .post("/regi/signin", signInfo)
      .then((res) => {
        console.log(res.headers.accesstoken);

        if (res.headers.accesstoken) {
          localStorage.setItem("accessToken", res.headers.accesstoken);
        }

        setIsLogin(true);
        setUserInfo(res.data.userInfo);
        navigate("/");

        console.log("로그인 성공");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("로그인 실패");
      });
  };

  return (
    <SignInOuterContainer>
      <FontAwesomeIcon className="logo_icon" icon={faStackOverflow} />
      <SignInInnerContainer>
        <form className="signin_form">
          <div className="input_id">
            <div>ID</div>
            <input
              type="text"
              name="id"
              placeholder="id"
              value={id}
              onChange={handleIdChange}
            />
          </div>
          <div className="input_password">
            <div>Password</div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="signin_button">
            <button type="submit" onClick={LoginHandler}>
              로그인
            </button>
          </div>
        </form>
        <div>
          <div className="signup_link">
            <span>Don't have an accout? </span>
            <span onClick={() => navigate("/signin/signup")}>Sign up</span>
          </div>
        </div>
      </SignInInnerContainer>
    </SignInOuterContainer>
  );
}

export default SignIn;
