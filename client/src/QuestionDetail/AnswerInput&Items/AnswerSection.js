import { useRecoilValue } from "recoil";
import { answerAtom } from "../../Atom/atom";
import AnswerItem from "./AnswerItem";

function AnswerSecion() {
  const answerArr = useRecoilValue(answerAtom);

  return (
    <ul>
      {answerArr.map((item) => (
        <li key={item.answerId}>
          <AnswerItem //해당 객체 속성 쓸 거 다 여기서 줘야함.
            creator={item.userId}
            content={item.content}
            date={item.created_at}
            creatorMemberid={item.memberId}
            answerid={item.answerId}
          />
        </li>
      ))}
    </ul>
  );
}

export default AnswerSecion;
