import styled from "styled-components";
import { userStateAtom } from "../../Atom/atom";
import { useRecoilValue } from "recoil";

const BiggerBox = styled.section`
  border: solid 1px #dbdbdb;
  height: 120px;
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
    height: 140px;
  }
  @media all and (min-width: 900px) and (max-width: 1100px) {
    height: 145px;
    font-size: 11.8px;
  }
  @media all and (min-width: 768px) and (max-width: 900px) {
    height: 145px;
    font-size: 11.8px;
  }
`;
const Id = styled.span``;

function UserInfo() {
  const userAtom = useRecoilValue(userStateAtom);

  return (
    <BiggerBox>
      <Id>{userAtom.userid}</Id>
      <div>Let's solve your issue!</div>
    </BiggerBox>
  );
}

export default UserInfo;
