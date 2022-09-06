import axios from "axios";

// import { useSetRecoilState, useResetRecoilState, useRecoilState } from "recoil";
// import { isLoginAtom } from "../Atom/atom";
// import { useNavigate } from "react-router-dom";

const authAxios = axios.create({
  //그냥 인스턴스 만들어줌
  proxy: true,
  // baseURL: process.env.REACT_APP_API_URL,
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
    // if (response.data.accesstoken) {
    //   console.log(response);
    //   localStorage.setItem("accessToken", response.data.accesstoken);
    // }
    return response;
  },
  async (error) => {
    // const {
    //   response: { status },
    // } = error;

    // 401
    // access 토큰 검증에 실패했습니다.

    // 서버에서 만료되는 시점 읽어서 보내주면 무조건 로그아웃 되도록
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
