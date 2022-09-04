import React from "react";
import styled from "styled-components";

const QuestionBox = styled("li")`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #b5b1b1;
  position: relative;
  height: 15vh;
`;

const QuestionLeft = styled("div")`
  margin: 10px;
  font-size: 14px;
  white-space: nowrap;

  div:first-child {
    color: #000000;
    margin-bottom: 8px;
  }

  div:last-child {
    color: #706c6c;
  }
`;

const QuestionRight = styled("div")`
  display: flex;
  margin: 10px 20px;
  margin-top: -35px;
  padding-bottom: 12px;

  .question_content {
    h3 {
      font-size: 22px;
      font-weight: 400;
      color: #0074cc;
      margin-bottom: 8px;
    }

    h3:hover {
      color: #0a95ff;
    }

    div {
      margin-bottom: 6px;
      font-weight: 350;
      color: #000000;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
`;

const QuestionFooter = styled("div")`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 15px;
  margin-right: 20px;

  div:first-child {
    margin-right: 15px;
    color: #0074cc;
  }

  div:last-child {
    color: #706c6c;
  }
`;

function QuestionItem({ question }) {
  return (
    <QuestionBox>
      <QuestionLeft>
        <div>8 votes</div>
        <div>
          {question.answerIds === null
            ? `0 answers`
            : `${question.answerIds.length} answers`}
        </div>
      </QuestionLeft>
      <QuestionRight>
        <div className="question_content">
          <h3>{question.questionTitle}</h3>
          <div>{question.questionContent}</div>
        </div>
      </QuestionRight>
      <QuestionFooter>
        <div>{question.userId}</div>
        <div>{question.createdAt}</div>
      </QuestionFooter>
    </QuestionBox>
  );
}

export default QuestionItem;
