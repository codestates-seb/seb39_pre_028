import axios from "axios";
import authAxios from "../Common/interceptor";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";

function Board() {
  const [questions, setQuestions] = [];
  const setQuestionsAtom = useSetRecoilState(questionAtom);
  const setAnswerAtom = useSetRecoilState(answerAtom);
  const navigate = useNavigate();

  const getQuestion = async () => {
    return authAxios
      .get("/board")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const clickHandler = (question) => {
    return axios.get(`/question?q=${question.questionid}`).then((res) => {
      setQuestionsAtom(res.data.question);
      setAnswerAtom(res.data.answer);
      navigate("/questiondetail");
    });
  };

  return (
    <section>
      <div>게시판</div>
      <ul>
        {questions &&
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
