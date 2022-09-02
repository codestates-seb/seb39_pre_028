import authAxios from "../Common/interceptor";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";

const BoardContainer = styled("section")`
  margin: 8px 30px;
  height: auto;

  .question_length {
    font-size: 18px;
    font-weight: 350;
  }
`;

const BoardHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-weight: 400;
    font-size: 30px;
  }

  button {
    height: 48px;
    font-size: 17px;
    margin-top: 5px;
    padding: 0 13px;
    color: #ffffff;
    background-color: #0a95ff;
    border: 0;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

  button:hover {
    background-color: #0074cc;
  }
`;

const BoardBox = styled("ul")`
  margin: 30px 0;
  list-style: none;
  padding-left: 0px;
  border-top: 1px solid #b5b1b1;

  a {
    text-decoration: none;
  }
`;

function Board() {
  const [questions, setQuestions] = useState([]);
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const [answersAtom, setAnswersAtom] = useRecoilState(answerAtom);
  const navigate = useNavigate();

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
    <BoardContainer>
      <BoardHeader>
        <h1>All Questions</h1>
        <button type="submit" onClick={() => navigate("/questions")}>
          Ask Question
        </button>
      </BoardHeader>
      <div className="question_length">{questions.length} questions</div>
      <BoardBox>
        {Array.isArray(questions) &&
          questions.map((question, idx) => (
            <div key={idx} onClick={() => clickHandler(question)}>
              <Link to={`/questions/${question.questionId}`}>
                <Questions question={question} />
              </Link>
            </div>
          ))}
      </BoardBox>
    </BoardContainer>
  );
}

export default Board;
