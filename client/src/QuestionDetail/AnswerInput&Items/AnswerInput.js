import { questionAtom, userStateAtom, isLoginAtom } from "../../Atom/atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import authAxios from "../../Common/interceptor";
import { useNavigate } from "react-router-dom";

function AnswerInput() {
  const [answerContent, setAnswerContent] = useState("");
  const questionInfo = useRecoilValue(questionAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const userInfo = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  const contentHandler = (e) => {
    if (isLogin === false) return navigate("/authcheck");
    setAnswerContent(e.target.value);
  };
  const answerInfo = {
    answerContent,
    memberid: `${userInfo.memberid}`,
  };
  const addAnswerHandler = (e) => {
    e.preventDefault();

    return authAxios.post(`/answers?q=${questionInfo.questionid}`, answerInfo);
  };

  return (
    <>
      <textarea
        placeholder="답변을 입력해주세요"
        value={answerContent}
        onChange={contentHandler}
      />
      <button onClick={addAnswerHandler}>답변 등록</button>
    </>
  );
}
export default AnswerInput;
