import React from "react";
import { useNavigate } from "react-router-dom";

function AuthCheck() {
  const navigate = useNavigate();
  return (
    <div>
      <div>권한이 없습니다</div>
      <button onClick={() => navigate("/signin")}>로그인 버튼</button>
      <button onClick={() => navigate(-2)}>뒤로가기</button>
    </div>
  );
}

export default AuthCheck;
