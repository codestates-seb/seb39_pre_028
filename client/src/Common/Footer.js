import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const FooterContainer = styled("footer")`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #232629;
  color: #ffffff;
  padding: 0rem 0 1rem 0;
  margin-bottom: -70px;
`;

const FooterNav = styled("div")`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 30%;
  right: 2%;
  margin-left: 40px;
  /* transform: translate(-50%, -50%); */
`;

const Name = styled("div")`
  margin: 0 40px;
  .git_icon {
    font-size: 22px;
    color: #ffffff;
    margin-left: -35px;
    margin-bottom: 7px;
  }
  div {
    font-size: 12px;
    margin-top: -30px;
    white-space: nowrap;
  }
`;

const CreatedAt = styled("div")`
  font-size: 13px;
  margin-top: 12px;
  margin-left: 30px;
  color: #b2aeae;
  .stack_icon {
    color: #f38630;
    font-size: 20px;
    margin-right: 3px;
  }
  .logo_text {
    color: #ffffff;
  }
  .first {
    font-weight: 400;
  }
  .second {
    font-weight: 700;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterNav>
        <Name>
          <a href="https://github.com/dawnheee">
            <FontAwesomeIcon className="git_icon" icon={faGithub} />
          </a>
          <div>Frontend 박서희</div>
        </Name>
        <Name>
          <a href="https://github.com/seungmileee">
            <FontAwesomeIcon className="git_icon" icon={faGithub} />
          </a>
          <div>Frontend 이승미</div>
        </Name>
        <Name>
          <a href="https://github.com/doyeon00">
            <FontAwesomeIcon className="git_icon" icon={faGithub} />
          </a>
          <div>Backend 김도연</div>
        </Name>
      </FooterNav>
      <CreatedAt>
        <FontAwesomeIcon className="stack_icon" icon={faStackOverflow} />
        <span className="logo_text first">stack </span>
        <span className="logo_text second">overflow</span>
        &nbsp;&nbsp; site develop / design by Codestates Team 28
      </CreatedAt>
    </FooterContainer>
  );
}

export default Footer;
