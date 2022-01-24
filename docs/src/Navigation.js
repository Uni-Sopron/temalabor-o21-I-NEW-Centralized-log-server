import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href="/">Centralized Log Server</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to='/'>Bevezető</Nav.Link>
              <Nav.Link as={Link} to='/problem'>Probléma</Nav.Link>
              <Nav.Link as={Link} to='/tech'>Technológia</Nav.Link>
              <Nav.Link as={Link} to='/usermanual'>Felhasználói bemutatás</Nav.Link>
              <Nav.Link as={Link} to='/dev'>Installáció, konfigurációk bemutatása</Nav.Link>
              <Nav.Link as={Link} to='/timeline'>Munkafolyamatok</Nav.Link>
              <Nav.Link as={Link} to='/summary'>Összegzés</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    </>
  );
}

export default Navigation;