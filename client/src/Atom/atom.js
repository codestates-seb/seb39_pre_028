import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStateAtom = atom({
  key: "userStateAtom",
  default: {
    memberid: "",
    userid: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom({
  key: "isLoginAtom",
  default: false,

  effects_UNSTABLE: [persistAtom],
});

export const questionAtom = atom({
  key: "questionAtom",
  default: {
    memberId: "",
    questionId: "1",
    userId: "",
    questionTitle: "제목",
    questionContent: "내용",
    createdAt: "",
    lastModifiedAt: "",
    isAnswered: false,
  },
});

export const answerAtom = atom({
  key: "answerAtom",
  default: {
    answer: [
      // {
      //   answerId: "", //답변 id
      //   questionId: "", // 질문 id
      //   memberId: "", //작성자 고유 id
      //   userId: "", //답변 작성자 사용하는 id
      //   answerContent: "",
      //   createdAt: "",
      //   lastModifiedAt: "",
      // },
    ],
  },
});
