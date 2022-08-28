import axios from "axios";

function interceptor() {
  // refresh 토큰 보내서 access 토큰 받아오는 코드
  // 리프레시와 액세스 토큰 모두 로컬스토리지에 저장

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (status === 401) {
        if (error.response.data.message === "TokenExpiredError") {
          //백엔드와 메시지 맞는지 확인
          const originalRequest = config;
          const refreshToken = await localStorage.getItem("refreshToken");
          // token refresh 요청
          const { response } = await axios.post(
            ` refresh token api 아니면 기존의 api`,
            {
              headers: { refreshtoken: refreshToken }, // 헤더에 refresh token 담기
            }
          );
          // 새로운 토큰 저장
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.headers;
          await localStorage.setItem("accessToken", newAccessToken);
          await localStorage.setItem("refreshToken", newRefreshToken);

          axios.defaults.headers.common.accesstoken = `Bearer ${newAccessToken}`;
          originalRequest.headers.accesstoken = `Bearer ${newAccessToken}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
}

export default interceptor;
