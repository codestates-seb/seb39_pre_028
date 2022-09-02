import authAxios from "../Common/interceptor";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";

function Board() {
  const [questions, setQuestions] = useState([]);
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const [answersAtom, setAnswersAtom] = useRecoilState(answerAtom);

  const getQuestion = () => {
    return authAxios
      .get("/board")
      .then((res) => {
        console.log(res.data);
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
    return axios
      .get(`/questions/${question.questionId}`)
      .then((res) => {
        setQuestionsAtom(res.data.question);
        console.log(questionsAtom);
        setAnswersAtom(res.data.answer);
        console.log(answersAtom);

        // navigate("/questiondetail");
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
              <Link to={`/questions/${question.questionId}`}>
                <Questions question={question} />
              </Link>
            </div>
          ))}
      </ul>
    </section>
  );
}

export default Board;
