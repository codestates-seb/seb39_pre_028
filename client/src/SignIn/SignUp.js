import React, { useEffect, useState } from "react";
import axios from "axios";

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signInfo, setSignInfo] = useState({});
  //   const [isClick, setIsClick] = useState(false);

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSignInfo({
      id: id,
      password: password,
    });
    return axios // 회원가입 요청
      .post("/signup", signInfo)
      .then((res) => {
        console.log(res.data);
        console.log("회원가입 성공");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log("회원가입 실패");
      });
  };

  //   useEffect(() => {
  //     onSubmit();
  //   }, [isClick, signInfo]);

  return (
    <div className="loginregister">
      <form>
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
          <button type="submit" onClick={onSubmit}>
            계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
