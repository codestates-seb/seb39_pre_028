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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 60px;

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
  margin-top: -15px;
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

const Unanswered = styled.span`
  background-color: aliceblue;
  padding: 3px 6px 6px 6px;
  border: solid 1px gray;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

  font-size: 10px;
`;

function Questions({ question }) {
  return (
    <QuestionBox>
      <QuestionLeft>
        <div>8 votes</div>
        <div>
          {question.answerIds === null ? (
            <Unanswered>ananswered</Unanswered>
          ) : (
            `${question.answerIds.length} answers`
          )}
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

export default Questions;
