import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";
import styled from "styled-components";

const InfoSection = styled("section")`
  padding-bottom: 10px;
  border-bottom: solid 1px gray;
`;
const Title = styled("div")`
  font-size: 47px;
  margin-bottom: 5px;
  margin-top: 5px;
`;
const ExceptTitle = styled("div")`
  display: inline-flex;
  justify-content: space-between;
  div {
    margin-right: 10px;
    font-size: 17px;
  }
  button {
    margin-right: 10px;
    font-size: 17px;
  }
`;
const Content = styled("div")`
  border: solid 1px green;
  height: auto;
  padding: 15px 15px;
  word-break: break-all;
  font-size: 20px;
`;

function QuestionSection() {
  const userInfo = useRecoilValue(userStateAtom);
  const questionInfo = useRecoilValue(questionAtom);
  const navigate = useNavigate();

  const editHandler = () => {
    navigate("/questiondetail/questionedit");
  };

  const deleteHandler = async () => {
    const ok = window.confirm("질문을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const res = await authAxios.delete(
        `/questions?q=${questionInfo.questionId}`
      );
      console.log(res);
    }
  };

  return (
    <>
      <InfoSection>
        <Title>제목{questionInfo.questionTitle}</Title>
        <ExceptTitle>
          <div>Writer {questionInfo.userId}</div>
          <div>Asked {questionInfo.createdAt}</div>
          <div>Modified {questionInfo.modifiedAt}</div>
          <section>
            {userInfo.memberid === questionInfo.memberId ? (
              <>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
              </>
            ) : null}
          </section>
        </ExceptTitle>
      </InfoSection>
      <Content>내용{questionInfo.questionContent}</Content>
    </>
  );
}

export default QuestionSection;
