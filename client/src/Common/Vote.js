import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;
const Number = styled.span`
  margin: 10px 0px;
`;

function Vote() {
  return (
    <Container>
      <FontAwesomeIcon
        icon={faPlay}
        size="2x"
        color="#BABFC4"
        hover="color:#ffff"
      />
      <Number>8</Number>
      <FontAwesomeIcon icon={faPlay} size="2x" color="#BABFC4" />
    </Container>
  );
}
export default Vote;
