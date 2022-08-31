import React from "react";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";

function AuthCheck() {
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();
  return (
    <div>
      <div>권한이 없습니다</div>
      {isLogin ? null : (
        <button onClick={() => navigate("/signin")}>로그인 버튼</button>
      )}
      <button onClick={() => navigate(-2)}>뒤로가기</button>
    </div>
  );
}

export default AuthCheck;
