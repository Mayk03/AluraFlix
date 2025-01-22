import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #1a1a30;
  color: white;
  text-align: center;
  padding: 10px;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-top: 10px;
`;

const FooterText = styled.div`
  font-size: 1.5em;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>Desrrollado por Maycol Quinto &copy; 2025{" "}</FooterText>
      <Logo
        src='/img/aluraflix-logo.png'
        alt='Aluraflix Logo'
      />
    </FooterContainer>
  );
}

export default Footer;
