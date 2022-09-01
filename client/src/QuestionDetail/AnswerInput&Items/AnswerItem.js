import { useRecoilValue } from "recoil";
import { userStateAtom, answerAtom, questionAtom } from "../../Atom/atom";
import authAxios from "../../Common/interceptor";
import { useState } from "react";
import styled from "styled-components";
import Vote from "../../Common/Vote";

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: #ffff;
`;
const Content = styled.div`
  display: inline-flex;
  height: 170px;
  width: 100%;
  padding: 0px 10px 10px 10px;
`;

const ContentCreateInfo = styled.section`
  display: flex;
  flex-direction: column;
`;
const CreatorDate = styled.div`
  display: inline-flex;
  justify-content: space-between;
  div {
    margin-right: 20px;
    font-size: 13px;
  }
  span {
    color: gray;
    margin-right: 7px;
  }
`;

function AnswerItem({ creator, content, date, creatorMemberid, answerid }) {
  // const answerInfo = useRecoilValue(answerAtom); //배열인 상태라서 사용하지 못함. props로 받아온 속성 직접 사용
  const userInfo = useRecoilValue(userStateAtom);
  const questionInfo = useRecoilValue(questionAtom);
  const [IsEditorOpen, setIsEditorOpen] = useState(false);
  const [editText, setEditText] = useState(content);

  const questionID = questionInfo.questionId;
  const answerID = answerid;

  const deleteHandler = async () => {
    const ok = window.confirm("답변을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const res = await authAxios.delete(
        `/answers?q=${questionID}&q=${answerID}`
      );
      console.log(res);
    }
  };

  const contentHandler = (e) => {
    setEditText(e.target.value);
  };
  const editAnswerHandler = () => {
    return authAxios
      .patch(`/answers?q=${questionID}&q=${answerID}`, editText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Vote />
      <div>
        {!IsEditorOpen ? (
          <ContentCreateInfo>
            <Content>{content}</Content>
            <CreatorDate>
              <div>
                <span>Answered by</span>
                {creator}
              </div>
              <div>
                <span>Answered</span>
                {date}
              </div>
            </CreatorDate>
            {userInfo.memberid === creatorMemberid ? (
              <>
                <button onClick={() => setIsEditorOpen(true)}>Edit</button>{" "}
                <button onClick={deleteHandler}>Delete</button>
              </>
            ) : null}
          </ContentCreateInfo>
        ) : (
          <>
            <textarea value={editText} onChange={contentHandler} required />
            <button onClick={() => setIsEditorOpen(false)}>취소</button>
            <button onClick={editAnswerHandler}>답변 수정</button>
          </>
        )}
      </div>
    </Container>
  );
}
export default AnswerItem;
