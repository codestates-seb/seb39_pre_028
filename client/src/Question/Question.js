import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom, isLoginAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";

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
    // userId: userInfo.userId,
    // createdAt: new Date(),
    questionContent: content,
  };

  const addQuestion = () => {
    const res = authAxios.post("/questions", questionObj);
    console.log(res);
  };

  //   const state = useRecoilValue(userStateAtom);
  //   const login = useRecoilValue(isLoginAtom);
  //   console.log("state", state);
  //   console.log(login);

  return <div onClick={addQuestion}>질문 작성하기</div>;
}

export default Question;
