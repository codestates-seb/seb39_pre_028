import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";
import styled from "styled-components";
import Vote from "../Common/Vote";

const InfoSection = styled("section")`
  padding-bottom: 10px;
  border-bottom: solid 1px gray;
  color: #222323;
`;
const Title = styled("div")`
  font-size: 35px;
  margin-bottom: 5px;
  margin-top: 5px;
`;
const ExceptTitle = styled("div")`
  display: inline-flex;
  justify-content: space-between;
  div {
    margin-right: 20px;
    font-size: 13px;
  }
  button {
    margin-right: 7px;
    font-size: 12px;
    color: #ffff;
    background-color: #44b1ff;
    padding: 5px;
    width: 55px;
    border-style: none;
    border-radius: 3px;
    :hover {
      background-color: #0074cc;
    }
  }
  span {
    color: gray;
  }
`;
const Content = styled("div")`
  border-bottom: solid 0.5px rgb(224, 224, 224);
  height: 250px;
  width: 889px;
  padding: 0px 15px 15px 15px;
  word-break: break-all;
  font-size: 17px;
`;

const VoteContent = styled.section`
  display: flex;
  padding-top: 15px;
`;

function QuestionSection() {
  const userInfo = useRecoilValue(userStateAtom);
  const questionInfo = useRecoilValue(questionAtom);
  const navigate = useNavigate();
  console.log(questionInfo);

  const deleteHandler = async () => {
    const ok = window.confirm("질문을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const res = await authAxios.delete(
        `/questions/${questionInfo.questionId}`
      );
      console.log(res);
    }
    navigate("/board/home");
  };

  return (
    <>
      <InfoSection>
        <Title>{questionInfo.questionTitle}</Title>
        <ExceptTitle>
          <div>
            <span>Writer</span> {questionInfo.userId}
          </div>
          <div>
            <span>Asked</span> {questionInfo.createdAt}
          </div>
          <div>
            <span>Modified</span> {questionInfo.modifiedAt}
          </div>
          <section>
            {userInfo.memberid === questionInfo.memberId ? (
              <>
                <Link to={`/questions/edit/${questionInfo.questionId}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={deleteHandler}>Delete</button>
              </>
            ) : null}
          </section>
        </ExceptTitle>
      </InfoSection>
      <VoteContent>
        <Vote />
        <Content>{questionInfo.questionContent}</Content>
      </VoteContent>
    </>
  );
}

export default QuestionSection;
