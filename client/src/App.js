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
  justify-content: center;
  margin-top: 20px;
`;

const InnerContainer = styled("div")`
  height: 100vh;
  border: 1px solid red;
  width: 97vw;
`;

function App() {
  return (
    <div>
      <Header />
      <OutContainer>
        <InnerContainer>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/questiondetail" element={<QuestionDetail />} />
            <Route
              path="/questiondetail/questionedit"
              element={<QuestionEdit />}
            />
            <Route path="/authcheck" element={<AuthCheck />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signin/signup" element={<SignUp />} />
            <Route path="/signin/signout" element={<SignOut />} />
          </Routes>
        </InnerContainer>
      </OutContainer>
    </div>
  );
}

export default App;
