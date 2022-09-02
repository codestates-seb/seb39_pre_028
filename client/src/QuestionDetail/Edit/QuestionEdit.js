import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../../Atom/atom";
import authAxios from "../../Common/interceptor";
import styled from "styled-components";

const InfoSection = styled("section")`
  padding-bottom: 10px;
  border-bottom: solid 1px gray;
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const QuestionContainer = styled("div")`
  /* border: 1px solid red; */
  margin: 40px;
  height: 700px;
`;

const EditText = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: aquamarine; */
  height: 500px;
  input {
    font-size: 20px;
    height: 35px;
  }
  textarea {
    font-size: 15px;
    height: 400px;
  }
`;

const Buttons = styled.div`
  height: 50px;
  button {
    font-size: 17px;
    color: white;
    padding: 10px;
    margin-right: 10px;
    border: none;
    border-radius: 3px;
    background-color: #44b1ff;
    :hover {
      background-color: #0074cc;
    }
  }
`;

function QuestionEdit() {
  const [questionInfo, setQuestionInfo] = useState({});
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const userInfo = useRecoilValue(userStateAtom); //현재 유저 정보
  const [editTitle, setEditTitle] = useState(questionsAtom.questionTitle); //원래 제목
  const [editContent, setEditContent] = useState(questionsAtom.questionContent); //원래 콘텐츠
  const navigate = useNavigate();

  const cancleEdit = () => {
    navigate(`/questions/${questionsAtom.questionId}`);
  };
  const setTitleHandler = (event) => setEditTitle(event.currentTarget.value);
  const setContentHandler = (event) =>
    setEditContent(event.currentTarget.value);

  const editQuestion = async (event) => {
    event.preventDefault();
    const ok = window.confirm("질문을 수정하시겠습니까?");
    console.log(ok);
    if (ok) {
      setQuestionInfo({
        //원래 questionAtom에 수정된 속성만 바뀌어야 한다
        ...{ questionsAtom },
        ...{
          questionTitle: editTitle,
          questionContent: editContent,
          lastModifiedAt: new Date(),
          memberid: userInfo.memberid,
        },
      });
      return authAxios
        .patch(`/questions?q=${questionsAtom.questionid}`, questionInfo)
        .then(() => {
          setQuestionsAtom(questionInfo);
          console.log(questionsAtom);
          navigate(`/questions/${questionsAtom.questionId}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <QuestionContainer>
      <InfoSection>Edit Your Question</InfoSection>
      <form>
        <EditText>
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={setTitleHandler}
            required
          />
          <textarea
            type="text"
            name="content"
            value={editContent}
            onChange={setContentHandler}
            required
          />
        </EditText>
        <Buttons>
          <button onClick={cancleEdit}>Cancle</button>
          <button type="submit" onClick={editQuestion}>
            Edit Your Question
          </button>
        </Buttons>
      </form>
    </QuestionContainer>
  );
}

export default QuestionEdit;
