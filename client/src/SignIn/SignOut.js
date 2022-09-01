import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoginAtom, userStateAtom } from "../Atom/atom";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import authAxios from "../Common/interceptor";

function SignOut() {
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const resetState = useResetRecoilState(userStateAtom);
  const navigate = useNavigate();
  //   const userInfo = useRecoilValue(userStateAtom);

  const onSignOutHandler = () => {
    // 액세스 토큰만 보내기
    // 리프레시, 액세스 -> 로컬스토리지 데이터 지우기

    return authAxios
      .post("/regi/signout")
      .then((res) => {
        localStorage.removeItem("accessToken");
        setIsLoginState(false);
        resetState();
        navigate("/board");
        console.log(res.data);
        console.log("로그아웃 성공");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("로그아웃 실패");
      });
  };

  return (
    <div>
      <div>로그아웃 하시겠습니까?</div>
      <button type="submit" onClick={onSignOutHandler}>
        로그아웃
      </button>
    </div>
  );
}

export default SignOut;
