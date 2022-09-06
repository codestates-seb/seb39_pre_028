import { useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../../Atom/atom";
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
  height: 120px;
  width: 100%;
  padding: 0px 10px 10px 10px;
  word-break: break-all;

  :overflow-y {
    overflow-y: scroll;
  }
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

const Info = styled.section`
  button {
    margin-right: 7px;
    font-size: 12px;
    color: #ffff;
    background-color: #44b1ff;
    padding: 3px;
    width: 50px;
    border-style: none;
    border-radius: 3px;
    :hover {
      background-color: #0074cc;
    }
  }
`;

const EditorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  textarea {
    width: 990px;
    height: 200px;
    font-size: large;
    :overflow {
      overflow: scroll;
    }
  }
`;

const Buttons = styled.section`
  margin-top: 10px;
  button {
    margin-left: 7px;
    font-size: 13px;
    font-weight: 520;
    color: #ffff;
    background-color: #44b1ff;
    padding: 5px;
    width: 90px;
    border-style: none;
    border-radius: 3px;
    :hover {
      background-color: #0074cc;
    }
  }
`;
function AnswerItem({
  userId,
  memberId,
  answerId,
  content,
  created_at,
  modified_at,
}) {
  const userInfo = useRecoilValue(userStateAtom);
  const questionInfo = useRecoilValue(questionAtom);
  const [IsEditorOpen, setIsEditorOpen] = useState(false);
  const [editText, setEditText] = useState(content);

  const deleteHandler = async () => {
    const ok = window.confirm("답변을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const res = await authAxios.delete(
        `/answers/${questionInfo.questionId}/${answerId}`
      );
      console.log(res);
    }
  };

  const contentHandler = (e) => {
    setEditText(e.target.value);
  };

  const answerEditInfo = {
    content: editText,
    memberId,
    questionId: questionInfo.questionId,
  };

  const editAnswerHandler = () => {
    return authAxios
      .patch(`/answers/${questionInfo.questionId}/${answerId}`, answerEditInfo)
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
            <Info>
              <CreatorDate>
                <div>
                  <span>Answered by</span>
                  {userId}
                </div>
                <div>
                  <span>Answered</span>
                  {created_at}
                </div>
              </CreatorDate>
              {userInfo.memberid === memberId ? (
                <>
                  <button onClick={() => setIsEditorOpen(true)}>Edit</button>
                  <button onClick={deleteHandler}>Delete</button>
                </>
              ) : null}
            </Info>
          </ContentCreateInfo>
        ) : (
          <EditorContainer>
            <textarea value={editText} onChange={contentHandler} required />
            <Buttons>
              <button onClick={() => setIsEditorOpen(false)}>Cancle</button>
              <button onClick={editAnswerHandler}>Edit Answer</button>
            </Buttons>
          </EditorContainer>
        )}
      </div>
    </Container>
  );
}
export default AnswerItem;
