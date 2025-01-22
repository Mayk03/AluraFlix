import React from "react";
import { Link, NavLink} from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1a1a30;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

const Nav = styled.nav`
  a {
    color: #ffffff;
    margin: 0 10px;
    text-decoration: none;
    font-weight: 700;
    padding: 8px 12px;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      color: #18dcff;
      border-color: #ffffff;
    }

    &.active {
      color: #18dcff;
      border-color: #ffffff;
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to='/'>
        <Logo
          src='/img/aluraflix-logo.png'
          alt='Aluraflix Logo'
        />
      </Link>

      <Nav>
        <NavLink
          exact
          to='/'
          activeClassName='active'
        >
          Inicio
        </NavLink>
        <NavLink
          to='/favoritos'
          activeClassName='active'
        >
          Favoritos
        </NavLink>
        <NavLink
          to='/new-video'
          activeClassName='active'
        >
          Agregar Video
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
