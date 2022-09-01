import { useRecoilValue } from "recoil";
import { userStateAtom, answerAtom, questionAtom } from "../../Atom/atom";
import authAxios from "../../Common/interceptor";
import { useState } from "react";

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
    //에디터가 없을 땐 답변 내용이 보이고,
    //에디터가 열렸을 땐 답변 textarea가 보임
    <div>
      {!IsEditorOpen ? (
        <>
          <div>답변 내용:{content}</div>
          <div>작성자:{creator}</div>
          <div>작성일시:{date}</div>
          {userInfo.memberid === creatorMemberid ? (
            <>
              <button onClick={setIsEditorOpen(true)}>Edit</button>
              <button onClick={deleteHandler}>Delete</button>
            </>
          ) : null}
        </>
      ) : (
        <>
          <textarea value={editText} onChange={contentHandler} required />
          <button onClick={setIsEditorOpen(false)}>취소</button>
          <button onClick={editAnswerHandler}>답변 수정</button>
        </>
      )}
    </div>
  );
}
export default AnswerItem;
