import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";

import cooGetherLogo from "../images/logo.png";

export const Header = () => {
  return (
    <header className="w-full fixed py-4 flex">
      <div className="max-w-screen-xl flex justify-between w-full">
        <Link to="/">
          <img src={cooGetherLogo} alt="Logo" className="w-28" />
        </Link>
        <div className="flex items-center">
          <button className="mr-5 text-2xl   font-bold">Logout</button>
          <Link to="#">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};
