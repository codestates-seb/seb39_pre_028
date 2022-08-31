import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../../Atom/atom";
import authAxios from "../../Common/interceptor";

function QuestionEdit() {
  const [questionInfo, setQuestionInfo] = useState({});
  const [questionsAtom, setQuestionsAtom] = useRecoilState(questionAtom);
  const userInfo = useRecoilValue(userStateAtom); //현재 유저 정보
  const [editTitle, setEditTitle] = useState(questionsAtom.questionTitle); //원래 제목
  const [editContent, setEditContent] = useState(questionsAtom.questionContent); //원래 콘텐츠
  const navigate = useNavigate();

  const cancleEdit = () => {
    navigate("/questionDetail");
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
          navigate("/questionDetail");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div>
      <div>질문 수정하기</div>
      <form>
        <div>
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={setTitleHandler}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="content"
            value={editContent}
            onChange={setContentHandler}
          />
        </div>
        <div>
          <button onClick={cancleEdit}>수정 취소</button>
          <button type="submit" onClick={editQuestion}>
            수정 하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionEdit;
