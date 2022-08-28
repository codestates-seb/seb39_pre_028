import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import interceptor from "../Common/interceptor";

function Question() {
  const isLogin = useRecoilValue(isLoginAtom);
  const userInfo = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/authcheck");
    }
  });

  let content = "내용";

  let questionObj = {
    작성자: userInfo.nickname,
    "작성 일시": new Date(),
    내용: content,
  };

  const addQuestion = async () => {
    const res = await interceptor.post("/question", questionObj);
    console.log(res);
  };

  //   const state = useRecoilValue(userStateAtom);
  //   const login = useRecoilValue(isLoginAtom);
  //   console.log("state", state);
  //   console.log(login);

  return <div onClick={addQuestion}>질문 작성하기</div>;
}

export default Question;
