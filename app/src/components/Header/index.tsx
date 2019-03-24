import React from "react";
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>React&Apollo</Navbar.Heading>
      <Navbar.Divider />
      <Link to='/'>
        <Button className="bp3-minimal" icon="home" text="Home" />
      </Link>
      <Link to='/users'>
        <Button className="bp3-minimal" icon="user" text="Users" />
      </Link>
    </Navbar.Group>
  </Navbar>
);

export default Header
