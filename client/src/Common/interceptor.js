import axios from "axios";
// import { useSetRecoilState, useResetRecoilState, useRecoilState } from "recoil";
// import { isLoginAtom } from "../Atom/atom";
// import { useNavigate } from "react-router-dom";

const authAxios = axios.create({
  //그냥 인스턴스 만들어줌
  proxy: true,
});
// 요청 갈 때는 헤더에 access토큰 가지고 감
// 응답 올때는 401에러인지 확인
authAxios.interceptors.request.use(
  (config) => {
    try {
      config.headers.accesstoken = `${localStorage.getItem("accessToken")}`;
    } catch (err) {
      console.log(err);
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const {
    //   response: { status },
    // } = error;

    // 401
    // access 토큰 검증에 실패했습니다.

    if (error.response.status === 401) {
      if (error.message === "Request failed with status code 401") {
        // console.log("if 후 콘솔 error", error);

        // console.log("전", localStorage.getItem("recoil-persist"));
        localStorage.removeItem("recoil-persist");
        // console.log("후", localStorage.getItem("recoil-persist"));
        localStorage.removeItem("accessToken");

        alert("로그인 만료");
        // 페이지 새로고침 -> /authcheck로 이동
        window.location.replace("/authcheck");
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
