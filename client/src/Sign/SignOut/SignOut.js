import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { isLoginAtom, userStateAtom } from "../../Atom/atom";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import authAxios from "../../Common/interceptor";
import SignoutDomains from "./SignoutDomains";

const SignOutContainer = styled("div")`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  .signout_text {
    font-weight: 400;
    font-size: 20px;
  }
`;

const SignoutBox = styled("div")`
  background-color: #f8f9f9;
  padding: 30px;
  margin: 50px 0;
  width: 20rem;
  font-size: 18px;
  font-weight: 550;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .footer {
    font-size: 12px;
    font-weight: 400;
    color: #69737a;
  }
`;

const ButtonContainer = styled("div")`
  border-top: 1px solid #98a3aa;
  margin: 18px 0;
  padding-bottom: 10px;

  button {
    padding: 12px;
    margin-top: 20px;
    margin-right: 5px;
    border: 0;
    border-radius: 3px;
    text-align: center;
    font-size: 15px;
  }

  button:first-child {
    color: #ffffff;
    background-color: #0a95ff;
  }

  button:first-child:hover {
    background-color: #0074cc;
  }

  button:last-child {
    background-color: transparent;
    color: #0074cc;
  }

  button:last-child:hover {
    background-color: #dceaf2;
  }
`;

function SignOut() {
  const setIsLoginState = useSetRecoilState(isLoginAtom);
  const resetState = useResetRecoilState(userStateAtom);
  const navigate = useNavigate();
  //   const userInfo = useRecoilValue(userStateAtom);

  const onSignOutHandler = () => {
    // 액세스 토큰만 보내기
    // 리프레시, 액세스 -> 로컬스토리지 데이터 지우기
    return authAxios
      .post("/regi/signout")
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("recoil-persist");
        setIsLoginState(false);
        resetState();
        navigate("/board/home");
        console.log(res.data);
        console.log("로그아웃 성공");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("recoil-persist");
        navigate("/board/home");
      });
  };

  return (
    <SignOutContainer>
      <div className="signout_text">
        Clicking "Log out" will log you out of the
        <br />
        following domains on this device:
      </div>
      <SignoutBox>
        <SignoutDomains />
        <ButtonContainer>
          <button type="submit" onClick={onSignOutHandler}>
            Log out
          </button>
          <button type="submit" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </ButtonContainer>
        <div className="footer">
          If you’re on a shared computer, remember to log out
          <br />
          of your Open ID provider (Facebook, Google,Stack
          <br />
          Exchange, etc.) as well.
        </div>
      </SignoutBox>
    </SignOutContainer>
  );
}

export default SignOut;
