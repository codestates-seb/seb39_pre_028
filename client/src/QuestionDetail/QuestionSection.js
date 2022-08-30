//   const editHandler = () => {
//     return axios("권한 확인 API", "유저 데이터")
//       .get.then((res) => console.log(res.data))
//       .catch((err) => {});
//   };

// {/* <button onClick={editHandler}>질문 수정</button> */}
// <button onClick={deleteHandler}>질문 삭제</button>

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userStateAtom, questionAtom } from "../Atom/atom";
import authAxios from "../Common/interceptor";

function QuestionSection() {
  const isLogin = useRecoilValue(isLoginAtom);
  const userInfo = useRecoilValue(userStateAtom);
  const questionInfo = useRecoilValue(questionAtom);
  const navigate = useNavigate();

  const editHandler = () => {
    //로그인 && 작성자=> 수정 페이지로 보냄
    //!로그인 => <AuthCheck>
    //로그인 && !작성자 => <AuthCheck> + 로그인 버튼 노출 X
    if (isLogin && userInfo.memberId === questionInfo.memberId) {
      navigate("/questiondetail/questionedit");
    } else if (!isLogin) {
      navigate("/authcheck");
    } else if (isLogin && userInfo.memberId !== questionInfo.memberId) {
      navigate("/authcheck"); // 로그인 버튼 노출 X
    }
  };
  const deleteHandler = async () => {
    const res = await authAxios.delete(
      `/questions?q=${questionInfo.questionId}`
    );
    console.log(res);
  };

  return (
    <>
      <div>제목:{questionInfo.questionTitle}</div>
      <span>내용:{questionInfo.questionContent}</span>
      <div>작성자:{questionInfo.userId}</div>
      <span>작성일시:{questionInfo.createdAt}</span>
      <section>
        <button onClick={editHandler}>수정</button>
        <button onClick={deleteHandler}>삭제</button>
      </section>
    </>
  );
}

export default QuestionSection;
