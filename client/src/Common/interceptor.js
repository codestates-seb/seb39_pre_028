import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../Atom/atom";
import { useNavigate } from "react-router-dom";

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
    const {
      response: { status },
    } = error;
    if (status === 401) {
      if (error.message === "access 토큰이 만료되었습니다.") {
        console.log(error);
        const setIsLogin = useSetRecoilState(isLoginAtom);
        const navigate = useNavigate();

        setIsLogin(false);
        alert("로그인 만료");
        localStorage.removeItem("accessToken");
        navigate("/authcheck");
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
