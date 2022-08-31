import axios from "axios";
import authAxios from "../Common/interceptor";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";

function Board() {
  // const [questions, setQuestions] = [];
  const [questions, setQuestions] = useState([]);
  const setQuestionsAtom = useSetRecoilState(questionAtom);
  const setAnswerAtom = useSetRecoilState(answerAtom);
  const navigate = useNavigate();

  const getQuestion = async () => {
    return authAxios
      .get("/board")
      .then((res) => {
        // console.log(res.data);
        console.log(res.data.question);
        setQuestions(res.data.question);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const clickHandler = (question) => {
    console.log("성공");
    return axios
      .get(`/question?q=${question.questionid}`)
      .then((res) => {
        console.log("성공");
        setQuestionsAtom(res.data.question);
        setAnswerAtom(res.data.answer);
        navigate("/questiondetail");
      })
      .catch((err) => {
        console.log("실패");
        console.log(err.message);
      });
  };

  return (
    <section>
      <div>게시판</div>
      <ul>
        {Array.isArray(questions) &&
          questions.map((question, idx) => (
            <Questions
              key={idx}
              question={question}
              onClick={() => clickHandler(question)}
            />
          ))}
      </ul>
    </section>
  );
}

export default Board;
