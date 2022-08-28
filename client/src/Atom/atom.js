import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStateAtom = atom({
  key: "userStateAtom",
  default: {
    id: "",
    password: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isLoginAtom = atom({
  key: "isLoginAtom",
  default: false,

  effects_UNSTABLE: [persistAtom],
});
