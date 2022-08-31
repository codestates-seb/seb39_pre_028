import React from "react";
// import { useNavigate } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import { useRecoilValue } from "recoil";
import { questionAtom } from "../Atom/atom";
import AnswerSecion from "./AnswerInput&Items/AnswerSection";
import AnswerInput from "./AnswerInput&Items/AnswerInput";
function QuestionDetail() {
  //질문 데이터 Atom에서 받아와서 뿌려줘야함
  //답변 여부에 따라 답변 컴포넌트를 조건부로 보여줌
  const questionInfo = useRecoilValue(questionAtom);

  return (
    <div>
      <QuestionSection />
      <AnswerInput />
      <div>
        {questionInfo.answered ? <AnswerSecion /> : <div>답변이 없습니다</div>}
      </div>
    </div>
  );
}

export default QuestionDetail;
