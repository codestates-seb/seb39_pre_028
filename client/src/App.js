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

axios.defaults.withCredentials = true;

const OutContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -8px;
  border: 1px solid black;
`;

const InnerContainer = styled("div")`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  height: 100vh;
  width: 97vw;
  border: 1px solid red;
`;

const MainContainer = styled("div")`
  border: 1px solid green;
  background-color: #ffff;
  width: 70vw;
`;

function App() {
  return (
    <div>
      {/* <Header /> */}
      <OutContainer>
        <InnerContainer>
          <MainContainer>
            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/board" element={<Board />} />
              <Route path="/questions" element={<Question />} />
              <Route path="/questiondetail" element={<QuestionDetail />} />
              {/* path="/questions/:questionId" */}
              <Route
                path="/questiondetail/edit"
                // path="/questions/edit/:questionId"
                element={<QuestionEdit />}
              />
              <Route path="/authcheck" element={<AuthCheck />} />
              <Route path="/regi/signin" element={<SignIn />} />
              <Route path="/regi/signup" element={<SignUp />} />
              <Route path="/regi/signout" element={<SignOut />} />
            </Routes>
          </MainContainer>
        </InnerContainer>
      </OutContainer>
    </div>
  );
}

export default App;
