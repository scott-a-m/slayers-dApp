import React, { useState, useEffect } from "react";
import "./HomeNavbar.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand to="/" className="logo">
          Slayers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="slayers-nav-link">
              Home
            </Nav.Link>
            <Nav.Link href="#characters-info" className="slayers-nav-link">
              Characters
            </Nav.Link>
            <Nav.Link href="#gameplay-info" className="slayers-nav-link">
              Gameplay
            </Nav.Link>
            <Nav.Link href="#blockchain" className="slayers-nav-link">
              Blockchain
            </Nav.Link>
            <Nav.Link href="#contact" className="slayers-nav-link">
              Contact
            </Nav.Link>
          </Nav>

          <Nav>
            <Link to="/play" className="slayers-nav-link" target="_blank">
              <button
                type="button"
                className="btn btn-warning small-slay-button"
              >
                START SLAYING
              </button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
