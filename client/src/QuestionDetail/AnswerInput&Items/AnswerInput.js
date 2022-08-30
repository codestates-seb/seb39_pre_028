import { questionAtom, userStateAtom, isLoginAtom } from "../../Atom/atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import authAxios from "../../Common/interceptor";
import { useNavigate } from "react-router-dom";

function AnswerInput() {
  const [answerContent, setAnswerContent] = useState("");
  const questionInfo = useRecoilValue(questionAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const contentHandler = (e) => {
    setAnswerContent(e.target.value);
  };
  const answerInfo = {
    answerContent, //답변 보낼 때 이것만 보내면 될까??
  };
  const addAnswerHandler = (e) => {
    e.preventDefault();
    if (isLogin === false) return navigate("/authcheck");
    return authAxios.post(`/answers?q=${questionInfo.questionId}`, answerInfo);
  };

  return (
    <>
      <input
        placeholder="답변을 입력해주세요"
        value={answerContent}
        onChange={contentHandler}
      />
      <button onClick={addAnswerHandler}>답변 등록</button>
    </>
  );
}
export default AnswerInput;
