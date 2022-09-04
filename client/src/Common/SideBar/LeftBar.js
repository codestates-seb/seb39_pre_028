import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: auto;
  width: 255px;
  display: flex;
  flex-direction: row-reverse;

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    width: 200px;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    width: 170px;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    width: 140px;
  }
`;

const Inner = styled.div`
  height: auto;
  background-color: #ffff;
  width: 200px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  span {
    font-size: 10px;
    width: 100%;
    padding: 0px 0px 10px 20px;
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    width: 150px;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    width: 140px;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    width: 130px;
  }

  @media all and (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.div`
  height: 40px;
  width: 100%;
  font-size: 17px;
  padding-left: 20px;
  color: gray;

  &.home {
    color: #f48225;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
    padding-left: 10px;
  }
  &.last {
    margin-bottom: 25px;
  }
  :hover {
    background-color: #f8f9f9;
    font-size: 20px;
    color: #f48225;
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    font-size: 15px;
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    font-size: 14px;
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    font-size: 13px;
  }
`;
const SmallerBox = styled.section`
  font-size: 10px;
  width: 100%;
  height: 20px;
  padding-bottom: 5px;
`;

const BiggerBox = styled.section`
  border: solid 1px #dbdbdb;
  height: 300px;
  margin-left: 10px;
  width: 85%;
  font-size: 13px;
  color: gray;
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    text-align: center;
    padding: 5px 0px 0px 5px;
    font-size: 12px;
    margin: 5px;
    border-radius: 4px;
    color: #808080;
    width: 140px;
    &.Orange {
      background-color: #f48225;
      color: white;
      border: solid 1px #dbdbdb;
      height: 25px;
      box-shadow: #808080;
    }
  }

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    height: 330px;
    .Orange {
      padding: 2px 0;
      width: 90%;
    }

    span:last-child {
      margin-top: -2px;
    }
  }

  @media all and (min-width: 900px) and (max-width: 1100px) {
    height: 320px;
    font-size: 11.8px;
    .Orange {
      padding: 2px 0;
      width: 90%;
    }

    span:last-child {
      margin-top: -2px;
    }
  }

  @media all and (min-width: 768px) and (max-width: 900px) {
    height: 320px;
    font-size: 11.8px;

    span {
      font-size: 10px;
    }

    .Orange {
      padding: 2px 0;
      width: 90%;
    }

    span:last-child {
      margin-top: -2px;
    }
  }
`;
function LeftBar() {
  const navigate = useNavigate();
  return (
    <Container>
      <Inner>
        <Item className="home" onClick={() => navigate("/board/search")}>
          Search
        </Item>
        <span>FILTER</span>
        <Item>Tags</Item>
        <Item>Answered</Item>
        <Item className="last">Hot</Item>
        <SmallerBox>
          <span>COLLECTIVES</span>
        </SmallerBox>
        <Item className="last">Explore Collectives</Item>
        <span>TEAMS</span>
        <BiggerBox>
          <p>
            <b>Stack Overflow for Teams</b> - Start collaborating and sharing
            organizational knowledge.
          </p>
          <img src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e" />
          <span className="Orange">Create a free Team</span>
          <span>Why Teams?</span>
        </BiggerBox>
      </Inner>
    </Container>
  );
}

export default LeftBar;
