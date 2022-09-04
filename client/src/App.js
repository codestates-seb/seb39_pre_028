import React from "react";
import axios from "axios";
import Board from "./Board/Board";
import Question from "./Question/Question";
import SignIn from "./Sign/SignIn/SignIn";
import SignUp from "./Sign/SignUp/SignUp";
import SignOut from "./Sign/SignOut/SignOut";
import Header from "./Common/Header";
import AuthCheck from "./Common/AuthCheck";
import { Routes, Route } from "react-router-dom";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import QuestionEdit from "./QuestionDetail/Edit/QuestionEdit";
import styled from "styled-components";
import LeftBar from "./Common/SideBar/LeftBar";
import RightBar from "./Common/SideBar/RightBar";
import Footer from "./Common/Footer";
import Search from "./Search/Search";

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
  height: auto;
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
              <Route path="/board/home" element={<Board />} />
              <Route path="/questions" element={<Question />} />
              <Route path="/questions/:id" element={<QuestionDetail />} />
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
              <Route path="/board/search" element={<Search />} />
            </Routes>
          </MainContainer>
          <RightBar />
        </InnerContainer>
        <Footer />
      </OutContainer>
    </div>
  );
}

export default App;
