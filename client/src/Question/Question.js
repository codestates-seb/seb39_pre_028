import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userStateAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";
import styled from "styled-components";

const Buttons = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  button {
    font-size: 17px;
    color: white;
    padding: 10px;
    margin-right: 5px;
    border: none;
    border-radius: 3px;
    background-color: #44b1ff;
    :hover {
      background-color: #0074cc;
    }
  }
`;
const QuestionContainer = styled("div")`
  margin: 40px;
  height: 700px;
`;

const TitleSection = styled("section")`
  padding-bottom: 10px;
  border-bottom: solid 1px gray;
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const ContentText = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 600px;
  input {
    font-size: 20px;
    height: 35px;
    width: 99.4%;
  }
  textarea {
    font-size: 15px;
    height: 500px;
    width: 99.4%;
    :overflow-y {
      overflow: scroll;
    }
  }
`;

function Question() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionInfo, setQuestionInfo] = useState({});
  const userInfo = useRecoilValue(userStateAtom);
  const navigate = useNavigate();
  const resetQuestionAtom = useResetRecoilState(questionAtom);

  // 일단 로그인 안한 상태일 경우 authcheck로
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/authcheck");
  //   }
  // });

  const setTitleHandler = (event) => setTitle(event.currentTarget.value);
  const setContentHandler = (event) => setContent(event.currentTarget.value);

  // userinfo atom 비워버림
  useEffect(() => {
    setQuestionInfo({
      questionTitle: title,
      questionContent: content,
      createdAt: new Date().toLocaleDateString(),
      memberId: userInfo.memberid,
    });
  }, [title, content]);

  const addQuestion = (event) => {
    event.preventDefault();

    return authAxios
      .post("/questions", questionInfo)
      .then((res) => {
        console.log(res);
        resetQuestionAtom();
      })
      .then((res) => {
        navigate("/board/home");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <QuestionContainer>
      <TitleSection>Ask a question</TitleSection>
      <form>
        <ContentText>
          <div>
            <input
              type="text"
              name="title"
              placeholder="질문 제목"
              value={title}
              onChange={setTitleHandler}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="content"
              placeholder="질문 내용"
              value={content}
              onChange={setContentHandler}
            />
          </div>
        </ContentText>
        <Buttons>
          <button type="submit" onClick={addQuestion}>
            Post Your Answer
          </button>
        </Buttons>
      </form>
    </QuestionContainer>
  );
}

export default Question;
