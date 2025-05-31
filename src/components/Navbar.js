import React, { useContext } from "react";
import { Navbar, Nav, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../locales";

function NavigationBar() {
  const favoritesCount = useSelector((state) => state.favorites.length);
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <Navbar bg="dark" variant="dark" expand="lg" dir={language === "ar" ? "rtl" : "ltr"}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          {language === "ar" ? "تطبيق الأفلام" : "MovieApp"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={language === "ar" ? "ms-auto" : "me-auto"}>
            <Nav.Link as={Link} to="/movies">{t.navbar.movies}</Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              {t.navbar.favorites} <span className="badge bg-secondary">{favoritesCount}</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/login">{t.navbar.login}</Nav.Link>
            <Nav.Link as={Link} to="/register">{t.navbar.register}</Nav.Link>
            <Nav.Link as={Link} to="/todo">{t.navbar.todo}</Nav.Link>

            <Dropdown as={ButtonGroup} className={language === "ar" ? "me-3" : "ms-3"}>
              <Dropdown.Toggle variant="outline-light" id="dropdown-language">
                {language.toUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu align={language === "ar" ? "start" : "end"}>
                <Dropdown.Item
                  active={language === "en"}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  active={language === "ar"}
                  onClick={() => changeLanguage("ar")}
                >
                  العربية
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
