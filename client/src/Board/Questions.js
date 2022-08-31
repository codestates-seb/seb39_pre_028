import React from "react";

function Questions({ question }) {
  return (
    <li>
      <div>
        <h3>{question.questionTitle}</h3>
        <p>{question.createdAt}</p>
        <div>{`${question.answered}`}</div>
      </div>
    </li>
  );
}

export default Questions;
