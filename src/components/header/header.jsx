import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../../icons/name.svg';
import './header.scss';
import AuthAPI from "../../api/api";
import LoginButton from "../loginbutton/loginbutton";

const headerNav = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Portfolio",
    path: "/portfolio"
  },
  {
    label: "About",
    path: "/about"
  },
];

const Header = ({token, admin, newMail}) => {
  const location = useLocation();
  const headerRef = React.useRef(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const path = location.pathname;
    const index = headerNav.findIndex(nav => nav.path === path);
    setActive(index);

    try {
      document.querySelector("head>title").innerText = `${headerNav[index].label} | Damon Turcotte`;
    } catch {
      document.querySelector("head>title").innerText = `${path.split("/")[1][0].toUpperCase() + path.split("/")[1].slice(1).toLowerCase()} | Damon Turcotte`;
    }

    const menu = document.querySelector(".header-dropdown-menu");
    if (!menu.classList.contains("hide")) {
      menu.classList.add("hide");
    }

  }, [location]);

  const handleDropdown = () => {
    const element = document.querySelector(".header-dropdown-menu");
    element.classList.toggle("hide");
  }

  React.useEffect(() => {
    window.addEventListener("click", (e) => {
      const menu = document.querySelector(".header-dropdown-menu");

      if (!e.target.closest(".header-menu-btn") && !e.target.closest(".header-dropdown-menu") ) {
        if (!menu.classList.contains("hide")) {
          menu.classList.add("hide");
        }
      }
    })
  }, [])

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="container">
          <Link id="logo-home-link" to={"/"}>
            <Logo />
          </Link>
          <div className="header-menu">
            <ul className="header-links">
              {
                headerNav.map((nav, index) => (
                  <li key={index} className={index === active ? "active" : ""}>
                    <Link to={nav.path}>{nav.label}</Link>
                  </li>
                ))
              }
            </ul>
            <div className="header-menu-btn" onClick={() => handleDropdown()}>
              { newMail ?
              <div className="header-menu-btn-bullet new"></div>
              :
              <div className="header-menu-btn-bullet"></div>
              }
            </div>
          </div>
        </div>
      </header>
      <div className="header-spacer">
        <div />
      </div>
      <div className="header-dropdown">
        <div className="header-dropdown-container">
          <div className="header-dropdown-menu hide">
            { admin &&
              <Link to={"/inbox"} className="inbox-link">
                Inbox
              </Link>
            }
            <LoginButton token={token} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;