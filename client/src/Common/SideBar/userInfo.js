import styled from "styled-components";
import { userStateAtom } from "../../Atom/atom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const BiggerBox = styled.section`
  border: solid 1px #dbdbdb;
  height: 130px;
  margin-left: 10px;
  margin-top: 12px;
  width: 85%;
  font-size: 13px;
  color: gray;
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f8ff;

  @media all and (min-width: 1100px) and (max-width: 1490px) {
    height: 100px;
  }
  @media all and (min-width: 900px) and (max-width: 1100px) {
    height: 90px;
  }
  @media all and (min-width: 768px) and (max-width: 900px) {
    display: none;
  }
  button {
    margin: 10px 5px 5px 3px;

    font-size: 15px;
    color: #ffff;
    background-color: #44b1ff;
    padding: 3px;
    width: 150px;
    border-style: none;
    border-radius: 3px;
    @media all and (min-width: 1100px) and (max-width: 1490px) {
      width: 120px;
    }
    @media all and (min-width: 900px) and (max-width: 1100px) {
      width: 110px;
    }

    :hover {
      color: #44b1ff;
      background-color: #ffff;
    }
  }
  div:first-child {
    margin-top: 10px;
    @media all and (min-width: 768px) and (max-width: 1490px) {
      display: none;
    }
  }
`;
const Id = styled.div`
  font-size: 20px;
  margin-top: 5px;
`;

function UserInfo() {
  const userAtom = useRecoilValue(userStateAtom);

  return (
    <BiggerBox>
      <div>WELCOME!</div>
      <Id>{userAtom.userid}</Id>
      <Link to={"/questions"}>
        <button>Let's solve your Code!</button>
      </Link>
    </BiggerBox>
  );
}

export default UserInfo;
