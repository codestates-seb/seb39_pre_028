import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div>
        <form>
          <div>
            <input
              type="text"
              name="id"
              placeholder="id"
              value={id}
              onChange={handleIdChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button type="submit" onClick={LoginHandler}>
              로그인
            </button>
          </div>
        </form>
      </div>

      <div>
        <button type="submit" onClick={() => navigate("/signin/signup")}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignIn;
