import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function QuestionDetail() {
  //   const editHandler = () => {
  //     return axios("권한 확인 API", "유저 데이터")
  //       .get.then((res) => console.log(res.data))
  //       .catch((err) => {});
  //   };

  const deleteHandler = () => {
    return axios().get;
  };

  return (
    <div>
      <div>질문 제목</div>
      <div>질문 본문</div>
      {/* <button onClick={editHandler}>질문 수정</button> */}
      <button onClick={deleteHandler}>질문 삭제</button>
    </div>
  );
}

export default QuestionDetail;

/* 
수정, 삭제
 답변 수정, 삭제
 답변의 답변 수정, 삭제
-> 권한 확인 */
