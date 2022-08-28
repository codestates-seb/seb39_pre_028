import React from "react";
import { Link } from "react-router-dom";

function AuthCheck() {
  return (
    <div>
      <div>권한이 없습니다</div>
      <Link to="/signin">
        <button>로그인 버튼</button>
      </Link>
      <button>뒤로가기</button>
    </div>
  );
}

export default AuthCheck;
