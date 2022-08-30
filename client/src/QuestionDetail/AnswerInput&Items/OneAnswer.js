function OneAnswer({ 작성자, 내용, 답변일시 }) {
  // const [answerContent, setAnswerContent] = useState("");
  // const questionInfo = useRecoilValue(questionAtom);
  // const isLogin = useRecoilValue(isLoginAtom);
  // const navigate = useNavigate();

  return (
    <div>
      <div>답변 내용:{내용}</div>
      <div>작성자:{작성자}</div>
      <div>작성일시:{답변일시}</div>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
}
export default OneAnswer;
