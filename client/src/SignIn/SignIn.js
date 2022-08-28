import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import { Link } from "react-router-dom";

function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signInfo, setSignInfo] = useState({});
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  const handleIdChange = (event) => {
    setId(event.currentTarget.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const LoginHandler = (event) => {
    event.preventDefault();
    setSignInfo({
      id: id,
      password: password,
    });
    return axios
      .post("/login", signInfo)
      .then((res) => {
        const { accessToken } = res.headers.accesstoken;
        const { refreshToken } = res.headers.refreshtoken;

        if (res.headers.accesstoken && res.headers.refreshtoken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }

        axios.defaults.headers.common["accesstoken"] = `Bearer ${accessToken}`;
        axios.defaults.headers.common["accesstoken"] = "";

        setIsLogin(!isLogin);
        setUserInfo(res.data.userInfo);

        console.log("로그인 성공");
        console.log(userInfo);
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
        <Link to="/signin/signup">
          <span>회원 가입</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
