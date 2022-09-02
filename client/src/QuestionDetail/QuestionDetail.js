import React from "react";
// import { useNavigate } from "react-router-dom";\
// import { useParams } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import { useRecoilValue } from "recoil";
import { questionAtom } from "../Atom/atom";
import AnswerSecion from "./AnswerInput&Items/AnswerSection";
import AnswerInput from "./AnswerInput&Items/AnswerInput";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const QuestionContainer = styled("div")`
  /* border: 1px solid red; */
  margin: 10px 35px 10px 35px;
  height: auto;
`;

const NoAnswer = styled("div")`
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  div {
    font-size: 20px;
    color: gray;
    margin-top: 15px;
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
            <FontAwesomeIcon
              icon={faCircleExclamation}
              size="3x"
              color="gray"
            ></FontAwesomeIcon>
            <div>There is no answer yet</div>
          </NoAnswer>
        )}
      </div>
    </QuestionContainer>
  );
}

export default QuestionDetail;
