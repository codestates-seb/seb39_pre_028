import authAxios from "../Common/interceptor";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { questionAtom, answerAtom } from "../Atom/atom";
import Questions from "./Questions";
import Pagination from "./Pagination";

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

  //현재 페이지는 1로 기본 설정
  const [page, SetPage] = useState(1);
  //한 페이지에 10개의 데이터 보여주기
  const SIZE = 10;
  // pageInfo 받아올 객체
  const [pageInfo, SetPageInfo] = useState({});

  //   PageInfo : {
  //     int page
  //      int size
  //   long totalElements
  //  int totalPages}}

  const navigate = useNavigate();

  useEffect(() => {
    getQuestion();
    console.log(page);
  }, [page]);

  const getQuestion = () => {
    return authAxios
      .get(`/board?page=${page}&size=${SIZE}`)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.question);
        SetPageInfo(res.data.pageInfo);
        // console.log(pageInfo);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const pageNumber = [];
  // for (let i = 1; i <= pageInfo.totalPages; i++) {
  //   pageNumber.push(i);
  // }

  const clickHandler = (question) => {
    return authAxios
      .get(`/questions/${question.questionId}`)
      .then((res) => {
        console.log(res);
        setQuestionsAtom(res.data.question);
        console.log(questionsAtom);
        setAnswersAtom(res.data.answerResponseDto);
        console.log(answersAtom);
      })
      .catch((err) => {
        console.log(err);
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
      <div className="question_length">{pageInfo.totalElements} questions</div>
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
      <Pagination pageInfo={pageInfo} SetPage={SetPage} />
    </BoardContainer>
  );
}

export default Board;
