import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const SignInContainer = styled("div")`
  border: 1px solid red;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  font-size: 25px;

  .logo_icon {
    text-align: center;
    font-size: 30px;
    color: #f38630;
  }
`;

const SigninForm = styled("form")`
  border: 1px solid green;
  background-color: #f1f2f3;
  padding: 25px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const NavSignup = styled("div")`
  border: 1px solid orange;
  text-align: center;

  span {
    color: #0a95ff;
  }

  span:hover {
    cursor: pointer;
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
        <input
          type="text"
          name="id"
          placeholder="id"
          value={id}
          onChange={handleIdChange}
        />
        <div>Password</div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" onClick={LoginHandler}>
          Log in
        </button>
      </SigninForm>
      <NavSignup>
        Dont't have an account?{" "}
        <span onClick={() => navigate("/regi/signup")}>Sign up</span>
      </NavSignup>
    </SignInContainer>
  );
}

export default SignIn;
