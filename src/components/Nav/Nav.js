import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = (props) => {
  return (
    <div className={styles.nav}>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/animal">
        <div>Animals</div>
      </Link>
      <Link to="/Placement">
        <div>Placement</div>
      </Link>
      <Link to="/register">
        <div>Register</div>
      </Link>
      <Link to="/Contact">
        <div>Contact Us</div>
      </Link>
    </div>
  );
};

export default Nav;
