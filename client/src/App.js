import React from "react";
import axios from "axios";
import Board from "./Board/Board";
import Question from "./Question/Question";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUp";
import SignOut from "./SignIn/SignOut";
import Header from "./Common/Header";
import AuthCheck from "./Common/AuthCheck";
import { Routes, Route } from "react-router-dom";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import QuestionEdit from "./QuestionDetail/Edit/QuestionEdit";
import styled from "styled-components";
import LeftBar from "./Common/SideBar/LeftBar";
import RightBar from "./Common/SideBar/RightBar";

axios.defaults.withCredentials = true;

const OutContainer = styled("div")`
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
`;

const InnerContainer = styled("div")`
  display: flex;
  position: absolute;
  top: 70px;
  justify-content: center;
  height: 100vh;
  width: 97vw;
  /* border: 1px solid red; */
`;

const MainContainer = styled("div")`
  /* border: 1px solid green; */
  margin-top: 10px;

  background-color: #ffff;
  width: 70vw;
`;

function App() {
  return (
    <div>
      <OutContainer>
        <Header />

        <InnerContainer>
          <LeftBar />

          <MainContainer>
            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/board" element={<Board />} />
              <Route path="/questions" element={<Question />} />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetail />}
              />
              {/* path="/questions/:questionId" */}
              <Route
                path="/questions/edit/:questionId"
                // path="/questions/edit/:questionId"
                element={<QuestionEdit />}
              />
              <Route path="/authcheck" element={<AuthCheck />} />
              <Route path="/regi/signin" element={<SignIn />} />
              <Route path="/regi/signup" element={<SignUp />} />
              <Route path="/regi/signout" element={<SignOut />} />
            </Routes>
          </MainContainer>
          <RightBar />
        </InnerContainer>
      </OutContainer>
    </div>
  );
}

export default App;
