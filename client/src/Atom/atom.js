import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// export const userStateAtom = atom({
//   key: "userStateAtom",
//   default: {
//     memberId: "",
//     userid: "",
//   },
//   effects_UNSTABLE: [persistAtom],
// });

export const userStateAtom = atom({
  key: "userStateAtom",
  default: {},
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
    answered: false,
  },
});

export const answerAtom = atom({
  key: "answerAtom",
  default: {
    answer: [],
  },
});

export const filteredArrAtom = atom({
  key: "filteredArrAtom",
  default: {
    arr: [],
  },
});

export const searchTextAtom = atom({
  key: "searchTextAtom",
  default: {
    word: {},
  },
});
