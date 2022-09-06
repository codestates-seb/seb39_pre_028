import React from "react";
import styled from "styled-components";
import {
  faCommentDots,
  faChalkboard,
  faServer,
  faGear,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStackExchange,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DomainsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .icon {
    font-size: 18px;
  }

  .ask {
    color: #e8672c;
    margin-left: -1px;
  }

  .math {
    color: #475056;
    font-size: 16px;
    margin-left: -2px;
  }

  .server {
    color: #543f3f;
    font-size: 16px;
  }

  .apps {
    color: #75838e;
    font-size: 17px;
    margin-left: -1px;
  }

  .exchange {
    color: #0a95ff;
  }

  .overflow {
    color: #f38630;
    font-size: 20px;
    margin-left: 1px;
  }

  .user {
    color: #60aee5;
    font-size: 16px;
    margin-left: -4px;
  }

  span {
    margin-left: 10px;
  }

  div {
    font-size: 16px;
    margin: 2px 0;
    font-weight: 400;
    color: #0074cc;
  }

  div:hover {
    color: #0a95ff;
    cursor: pointer;
  }
`;

function SignoutDomains() {
  return (
    <DomainsContainer>
      <div>
        <FontAwesomeIcon className="icon ask" icon={faCommentDots} />
        <span>askubuntu.com</span>
      </div>

      <div>
        <FontAwesomeIcon className="icon math" icon={faChalkboard} />
        <span>mathoverflow.net</span>
      </div>
      <div>
        <FontAwesomeIcon className="icon server" icon={faServer} />
        <span>serverfault.com</span>
      </div>
      <div>
        <FontAwesomeIcon className="icon apps" icon={faGear} />
        <span>stackapps.com</span>
      </div>
      <div>
        <FontAwesomeIcon className="icon exchange" icon={faStackExchange} />
        <span>stackexchange.com</span>
      </div>
      <div>
        <FontAwesomeIcon className="icon overflow" icon={faStackOverflow} />
        <span>stackoverflow.com</span>
      </div>
      <div>
        <FontAwesomeIcon className="icon user" icon={faChalkboardUser} />
        <span>superuser.com</span>
      </div>
    </DomainsContainer>
  );
}

export default SignoutDomains;
