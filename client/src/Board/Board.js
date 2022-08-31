import axios from "axios";
import authAxios from "../Common/interceptor";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";

function Board() {
  const [questions, setQuestions] = useState([]);
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const [answersAtom, setAnswersAtom] = useRecoilState(answerAtom);
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);

  const getQuestion = async () => {
    return authAxios
      .get("/board")
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.question);
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
    setIsClick(!isClick);
    return axios
      .get(`/questions?q=${question.questionId}`)
      .then((res) => {
        setQuestionsAtom(res.data.question);
        console.log(questionsAtom);
        setAnswersAtom(res.data.answer);
        console.log(answersAtom);
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
            <div key={idx} onClick={() => clickHandler(question)}>
              <Questions question={question} />
            </div>
          ))}
      </ul>
      <div>{`${isClick}`}</div>
    </section>
  );
}

export default Board;
