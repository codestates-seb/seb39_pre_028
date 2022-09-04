import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardQuestion,
  faSort,
  faTags,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const SignupTextContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 25rem;

  h1 {
    font-size: 24px;
    font-weight: 440;
  }

  div {
    margin: 9px 0;
  }

  span {
    font-size: 14px;
  }

  .text_logo {
    font-size: 22px;
    margin-right: 8px;
    color: #0a95ff;
  }

  .footer {
    font-size: 11px;
    color: #69737a;

    .blue {
      color: #0a95ff;
      margin-top: -2px;
    }
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    width: 23rem;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    display: none;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    display: none;
  }

  @media all and (max-width: 768px) {
    display: none;
  }
`;

function SignupText() {
  return (
    <SignupTextContainer>
      <h1>
        Join the Stack Overflow
        <br />
        community
      </h1>
      <div>
        <FontAwesomeIcon className="text_logo" icon={faClipboardQuestion} />
        <span>Get unstuck — ask a question</span>
      </div>
      <div>
        <FontAwesomeIcon className="text_logo" icon={faSort} />
        <span>Unlock new privileges like voting and commenting</span>
      </div>
      <div>
        <FontAwesomeIcon className="text_logo" icon={faTags} />
        <span>Save your favorite tags, filters and jobs</span>
      </div>
      <div>
        <FontAwesomeIcon className="text_logo" icon={faTrophy} />
        <span>Earn reputation and badges</span>
      </div>
      <div className="footer">
        Collaborate and share knowledge with a private group for FREE.
        <div className="footer blue">
          Get Stack Overflow for Teams free for up to 50 users.
        </div>
      </div>
    </SignupTextContainer>
  );
}

export default SignupText;
