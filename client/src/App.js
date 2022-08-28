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

axios.defaults.withCredentials = true;

function App() {
  //   const getData = async () => {
  //     const response = await fetch("/");
  //     const json = await response.json();
  //     console.log(json);
  //   };

  //   const getJson = async () => {
  //     const response = await fetch("/test");
  //     const json = await response.json();
  //     console.log("api", json);
  //   };
  //   useEffect(() => {
  //     getData();
  //     getJson();
  //   }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/authcheck" element={<AuthCheck />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/signup" element={<SignUp />} />
        <Route path="/signin/signout" element={<SignOut />} />
      </Routes>
    </div>
  );
}

export default App;