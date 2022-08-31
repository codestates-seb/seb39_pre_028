import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStateAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";

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
      <div>제목:{questionInfo.questionTitle}</div>
      <span>내용:{questionInfo.questionContent}</span>
      <div>작성자:{questionInfo.userId}</div>
      <span>작성일시:{questionInfo.createdAt}</span>
      <section>
        {userInfo.memberid === questionInfo.memberId ? (
          <>
            <button onClick={editHandler}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </>
        ) : null}
      </section>
    </>
  );
}

export default QuestionSection;
