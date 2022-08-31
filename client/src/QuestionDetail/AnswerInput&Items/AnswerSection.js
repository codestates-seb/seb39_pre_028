import { useRecoilValue } from "recoil";
import { answerAtom } from "../../Atom/atom";
import AnswerItem from "./AnswerItem";
import styled from "styled-components";

const AnswerContainer = styled("section")`
  height: auto;
  padding: 10px;
`;
function AnswerSecion() {
  const answerArr = useRecoilValue(answerAtom);
  return (
    <AnswerContainer>
      <ul>
        {answerArr.answer.map((item) => (
          <li key={item.answerid}>
            <AnswerItem //해당 객체 속성 쓸 거 다 여기서 줘야함.
              creator={item.userid}
              content={item.answerContent}
              date={item.createdAt}
              creatorMemberid={item.memberid}
              answerid={item.answerid}
            />
          </li>
        ))}
      </ul>
    </AnswerContainer>
  );
}

export default AnswerSecion;
