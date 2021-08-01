import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { isLoggedInVar } from "../apollo";
import cooGetherLogo from "../images/logo.png";
import { LOCALSTORATE_AUTH_TOKEN } from "../constants";

export const Header = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem(LOCALSTORATE_AUTH_TOKEN);
    isLoggedInVar(false);
    history.push("/");
  };
  return (
    <header className="w-full fixed py-4 flex bg-white">
      <div className="mx-auto max-w-screen-xl flex justify-between w-full">
        <Link to="/">
          <img src={cooGetherLogo} alt="Logo" className="w-28" />
        </Link>
        <div className="flex items-center">
          <button className="mr-5 text-2xl font-bold" onClick={logout}>
            Logout
          </button>
          <Link to="#">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};
