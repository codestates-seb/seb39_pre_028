import {
  questionAtom,
  userStateAtom,
  isLoginAtom,
  answerAtom,
} from "../../Atom/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import authAxios from "../../Common/interceptor";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WriteAnswer = styled("section")`
  div {
    font-size: 20px;
    margin: 15px 0px;
  }
  button {
    font-size: 17px;
    color: white;
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 3px;
    background-color: #44b1ff;
    :hover {
      background-color: #0074cc;
    }
  }
`;
const TextareaSection = styled("section")`
  margin-bottom: 5px;
  textarea {
    width: 99%;
    height: 130px;
    font-size: 15px;
  }
`;
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
    content: answerContent,
    memberId: userInfo.memberid,
    questionId: questionInfo.questionId,
  };
  const addAnswerHandler = (e) => {
    e.preventDefault();
    console.log(userInfo);
    return authAxios
      .post(`/answers/${questionInfo.questionId}`, answerInfo)
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <WriteAnswer>
      <div>Your Answer</div>
      <TextareaSection>
        <textarea
          placeholder="답변을 입력해주세요"
          value={answerContent}
          onChange={contentHandler}
        />
        Know someone who can answer? Share a link to this question via email,
        Twitter, or Facebook.
      </TextareaSection>
      <button onClick={addAnswerHandler}>Post Your Answer</button>
    </WriteAnswer>
  );
}
export default AnswerInput;
