import React from "react";
import axios from "axios";
import Board from "./Board/Board";
import Question from "./Question/Question";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignIn/SignUp";
import SignOut from "./SignIn/SignOut";
import Header from "./Common/Header";
import AuthCheck from "./Common/AuthCheck";
import QuestionDetail from "./Board/QuestionDetail/QuestionDetail";
import { Routes, Route } from "react-router-dom";
import QuestionDetail from "./QuestionDetail/QuestionDetail";
import QuestionEdit from "./QuestionDetail/Edit/QuestionEdit";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/questiondetail" element={<QuestionDetail />} />
        <Route path="/questiondetail/questionedit" element={<QuestionEdit />} />
        <Route path="/authcheck" element={<AuthCheck />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/signup" element={<SignUp />} />
        <Route path="/signin/signout" element={<SignOut />} />
      </Routes>
    </div>
  );
}

export default App;
