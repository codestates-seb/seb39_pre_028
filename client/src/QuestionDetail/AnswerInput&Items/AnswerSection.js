import { useRecoilValue } from "recoil";
import { answerAtom } from "../../Atom/atom";
import AnswerItem from "./AnswerItem";
import styled from "styled-components";

const AnswerContainer = styled("section")`
  height: auto;
  padding-top: 30px;
  ul {
    padding: 0%;
  }
`;

const ItemContainer = styled.li`
  border-bottom: solid 1px rgb(224, 224, 224);
  margin-bottom: 30px;
  padding-bottom: 10px;
  list-style: none;
`;

function AnswerSecion() {
  const answerArr = useRecoilValue(answerAtom);

  return (
    <AnswerContainer>
      <ul>
        {answerArr.map((item) => (
          <ItemContainer key={item.answerId}>
            <AnswerItem //해당 객체 속성 쓸 거 다 여기서 줘야함.
              userId={item.userId}
              content={item.content}
              created_at={item.created_at}
              modified_at={item.modified_at}
              memberId={item.memberId}
              answerId={item.answerId}
            />
          </ItemContainer>
        ))}
      </ul>
    </AnswerContainer>
  );
}

export default AnswerSecion;
