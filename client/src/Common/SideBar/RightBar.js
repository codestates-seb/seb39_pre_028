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
  padding: 15px 0px 0px 6px;
  text-align: left;
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
  margin: 10px 0px 3px 5px;

  &.last {
    margin-bottom: 15px;
  }
  &.whitelast {
    height: 32px;
  }
`;

const ItemBody = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

function RightBar() {
  return (
    <Container>
      <Inner>
        <Board className="first">
          <ItemHeader className="first">The Overflow Blog</ItemHeader>
          <ItemBody>
            <FontAwesomeIcon icon={faPen} color="gray" />
            <Item>
              What companies lose when they track worker productivity (Ep. 478)
            </Item>
          </ItemBody>
          <ItemBody>
            <FontAwesomeIcon icon={faPen} color="gray" />
            <Item className="last">
              Functional programming is an ideal fit for developing blockchains
            </Item>
          </ItemBody>
          <ItemHeader className="first">Featured on Meta</ItemHeader>
          <ItemBody>
            <FontAwesomeIcon icon={faMessage} color="#44b1ff" />
            <Item>
              Announcing the Stack Overflow Student Ambassador Program
            </Item>
          </ItemBody>
          <ItemBody>
            <FontAwesomeIcon icon={faMessage} color="#44b1ff" />
            <Item>Google Analytics 4 (GA4) upgrade</Item>
          </ItemBody>
          <ItemBody>
            <FontAwesomeIcon icon={faStackOverflow} />
            <Item>Staging Ground Workflow: Question Lifecycle </Item>
          </ItemBody>
          <ItemBody>
            <FontAwesomeIcon icon={faStackOverflow} />
            <Item className="last">The [option] tag is being burninated </Item>
          </ItemBody>
          <ItemHeader className="first">The Overflow Blog</ItemHeader>
          <Item className="last">
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