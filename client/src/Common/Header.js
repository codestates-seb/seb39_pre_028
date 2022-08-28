import React from "react";
import { Link } from "react-router-dom";
import { isLoginAtom } from "../Atom/atom";
import { useRecoilValue } from "recoil";

function Header() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    <div>
      <ul>
        <Link to="/">
          <li>Board</li>
        </Link>

        <Link to="/questions">
          {" "}
          <li>Questions </li>
        </Link>

        {isLogin ? (
          <li>
            <Link to="/signin/signout">SignOut</Link>
          </li>
        ) : (
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
