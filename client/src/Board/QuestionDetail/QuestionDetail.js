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

// put할 때 전체 객체를 보낼지 아니면 작성된 인풋값만 보낼지 (백엔드랑 협의)

//get으로 질문 객체 받아오기
// then에서
// set질문()
// set답변()
//
//질문 컴포넌트 props {질문}
//답변 파일 컴포넌트 props {답변}
//답변 작성 컴포넌트 (로그인한 사람만 볼 수 있게 조건부로 )
