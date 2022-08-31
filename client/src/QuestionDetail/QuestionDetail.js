import React from "react";
// import { useNavigate } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import { useRecoilValue } from "recoil";
import { questionAtom } from "../Atom/atom";
import AnswerSecion from "./AnswerInput&Items/AnswerSection";
import AnswerInput from "./AnswerInput&Items/AnswerInput";
import styled from "styled-components";

const QuestionContainer = styled("div")`
  border: 1px solid red;
  margin: 40px;
  height: auto;
`;

const NoAnswer = styled("div")`
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  div {
    font-size: 20px;
    color: gray;
  }
`;

function QuestionDetail() {
  //질문 데이터 Atom에서 받아와서 뿌려줘야함
  //답변 여부에 따라 답변 컴포넌트를 조건부로 보여줌
  const questionInfo = useRecoilValue(questionAtom);

  return (
    <QuestionContainer>
      <QuestionSection />
      <AnswerInput />
      <div>
        {questionInfo.answered ? (
          <AnswerSecion />
        ) : (
          <NoAnswer>
            <div>There is no answer yet</div>
          </NoAnswer>
        )}

      </div>
    </QuestionContainer>
  );
}

export default QuestionDetail;
