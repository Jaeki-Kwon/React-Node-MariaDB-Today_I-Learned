import React from "react";
import RightMenu from "./Sections/RightMenu";
import "./Sections/Navbar.css";

function NavBar() {
  return (
    <nav
      className="menu"
      style={{
        position: "fixed",
        zIndex: 5,
        width: "100%",
      }}
    >
      <div className="menu__logo">
        <a href="/">Today I Learned</a>
      </div>
      <div className="menu__container">
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
