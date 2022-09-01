import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="loginregister">
      <form>
        <div>
          <input
            name="username"
            type="text"
            placeholder="유저네임"
            value={username}
            onChange={onUsernameHandler}
          />
        </div>
        <div>
          <input
            name="id"
            type="text"
            placeholder="아이디"
            value={id}
            onChange={onIdHandler}
          />
        </div>

        <div>
          <input
            name="password"
            type="text"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>

        <div>
          <button type="submit" onClick={signInHandler}>
            계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
