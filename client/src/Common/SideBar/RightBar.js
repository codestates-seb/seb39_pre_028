import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
const Container = styled.div`
  margin-top: 10px;
  height: auto;
  width: 200px;
  margin-right: 90px;
`;

const Inner = styled.div`
  position: fixed;
`;
const Board = styled.section`
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.19));
  margin-bottom: 20px;
  width: 90%;
  &.first {
    background-color: #fdf7e2;
    height: 470px;
  }
  &.whiteboard {
    background-color: #ffff;
  }
`;
const ItemHeader = styled.div`
  height: 32px;
  font-size: 14px;
  padding: 0px 0px 0px 6px;
  text-align: left;
  padding-top: 7%;
  font-weight: 500;
  color: #3a3a3a;
  border-bottom: solid 1px #eadcaf;
  background-color: #f2f2f2;
  &.first {
    background-color: #fbf3d5;
  }
`;

const Item = styled.div`
  font-size: 12px;
  margin: 10px 0px 0px 5px;

  &.last {
    margin-bottom: 20px;
  }
  &.whitelast {
    height: 32px;
  }
`;

// s

function RightBar() {
  return (
    <Container>
      <Inner>
        <Board className="first">
          <ItemHeader className="first">The Overflow Blog</ItemHeader>
          <Item>
            <FontAwesomeIcon icon={faPen} color="gray" />
            &nbsp;&nbsp;What companies lose when they track worker productivity
            (Ep. 478)
          </Item>
          <Item className="last">
            <FontAwesomeIcon icon={faPen} color="gray" />
            &nbsp;&nbsp; Functional programming is an ideal fit for developing
            blockchains
          </Item>
          <ItemHeader className="first">Featured on Meta</ItemHeader>
          <Item>
            <FontAwesomeIcon icon={faMessage} color="#44b1ff" />
            &nbsp;&nbsp;Announcing the Stack Overflow Student Ambassador Program
          </Item>

          <Item>
            <FontAwesomeIcon icon={faMessage} color="#44b1ff" />
            &nbsp;&nbsp;Google Analytics 4 (GA4) upgrade
          </Item>

          <Item>
            <FontAwesomeIcon icon={faStackOverflow} />
            &nbsp;&nbsp;Staging Ground Workflow: Question Lifecycle{" "}
          </Item>
          <Item className="last">
            <FontAwesomeIcon icon={faStackOverflow} />
            &nbsp;&nbsp;The [option] tag is being burninated{" "}
          </Item>
          <ItemHeader className="first">The Overflow Blog</ItemHeader>
          <Item className="last">
            {" "}
            17 &nbsp;&nbsp;Consolidating Python version-specific tags
          </Item>
        </Board>
        <Board className="whiteboard">
          <ItemHeader>Custom Filters</ItemHeader>
          <Item className="whitelast">Create a custom filter</Item>
        </Board>
      </Inner>
    </Container>
  );
}

export default RightBar;
