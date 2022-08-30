import { useRecoilValue } from "recoil";
import { answerAtom } from "../../Atom/atom";
import OneAnswer from "./OneAnswer";

function AnswerSecion() {
  const answerArr = useRecoilValue(answerAtom);
  // 답변 리스트
  // answerItem 만들어서 매핑해야할 듯
  return (
    <ul>
      {answerArr.answer.map((item) => (
        <li key={item.answerId}>
          <OneAnswer
            작성자={item.userId}
            내용={item.answerContent}
            답변일시={item.createdAt}
          />
        </li>
      ))}
    </ul>
  );
}

export default AnswerSecion;
