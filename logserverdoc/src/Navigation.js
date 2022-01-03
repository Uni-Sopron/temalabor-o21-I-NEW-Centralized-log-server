import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href="/">Centralized Log Server</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href='/'>Bevezetés</Nav.Link>
              <Nav.Link href='/problem'>Probléma</Nav.Link>
              <Nav.Link href='/tech'>Technológia</Nav.Link>
              <Nav.Link href='/usermanual'>Felhasználói bemutatás</Nav.Link>
              <Nav.Link href='/dev'>Fejlesztői bemutatás</Nav.Link>
              <Nav.Link href='/timeline'>Munkafolyamatok</Nav.Link>
              <Nav.Link href='/summary'>Összegzés</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    </>
  );
}

export default Navigation;