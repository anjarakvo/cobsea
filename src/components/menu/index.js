import { Link } from "react-router-dom";
import classNames from "classnames";
import { Fade as Hamburger } from "hamburger-react";
import "./style.scss";
import { useState } from "react";
import FullMenu from "components/full-menu/full-menu";

const MenuBar = ({ landing }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <header className={classNames("nav-header", { "at-landing": landing })}>
        <div className="ui container">
          <Link to="/" className="logo-a">
            <img src="/unep.svg" className="unep" alt="UNEP" />
            <img src="/cobsea.svg" alt="COBSEA" />
          </Link>
          {/* <nav>
            <Link to='/knowledge-library'>Knowledge library</Link>
            &nbsp;|&nbsp;
            <Link to="/research">Research database</Link>
          </nav> */}
          {!landing && (
            <Hamburger size={40} toggled={isOpen} toggle={setOpen} />
          )}
        </div>
      </header>
      {!landing && <div className="spacer" />}
      {isOpen && (
        <div className="full-menu-overlay">
          <FullMenu />
        </div>
      )}
    </>
  );
};

export default MenuBar;
