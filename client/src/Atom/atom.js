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
    memberid: "",
    questionid: "",
    userid: "",
    questionTitle: "",
    questionContent: "",
    createdAt: "",
    lastModifiedAt: "",
    isAnswered: false,
  },
});

export const answerAtom = atom({
  key: "answerAtom",
  default: {

    answer: [{
      answerid: "",
      questionid: "",
      memberid: "",
      userid: "",
      answerContent: "",
      createdAt: "",
      lastModifiedAt: "",
    },
    ],
  },
});
