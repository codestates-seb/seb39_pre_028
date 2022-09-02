import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom, isLoginAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";

function Question() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionInfo, setQuestionInfo] = useState({});
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const userInfo = useRecoilValue(userStateAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  // 일단 로그인 안한 상태일 경우 authcheck로
  useEffect(() => {
    if (!isLogin) {
      navigate("/authcheck");
    }
  });

  const setTitleHandler = (event) => setTitle(event.currentTarget.value);

  const setContentHandler = (event) => setContent(event.currentTarget.value);

  useEffect(() => {
    setQuestionInfo({
      questionTitle: title,
      questionContent: content,
      createdAt: new Date().toLocaleDateString(),
      memberid: userInfo.memberid,
    });
  }, [title, content, userInfo.memberid]);

  const addQuestion = (event) => {
    event.preventDefault();

    return authAxios
      .post("/questions", questionInfo)
      .then(() => {
        setQuestionsAtom(questionInfo);
        console.log(questionsAtom);
        navigate("/questiondetail");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div>Ask a question</div>
      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="질문 제목"
            value={title}
            onChange={setTitleHandler}
          />
        </div>
        <div>
          <input
            type="text"
            name="content"
            placeholder="질문 내용"
            value={content}
            onChange={setContentHandler}
          />
        </div>
        <div>
          <button type="submit" onClick={addQuestion}>
            질문 등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default Question;
