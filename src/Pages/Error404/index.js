import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 7rem;
    margin: 0;
    color: #ff6b6b;
  }

  p {
    font-size: 1.7rem;
    margin: 10px 0 20px;
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-size: 1.2rem;
    border: 1px solid #007bff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }
`;

function Error404() {
  return (
    <ErrorContainer>
      <h1>404</h1>
      <p>Lo sentimos, ha ocurrido un error con la pagina.</p>
      <a href='/'>Volver al inicio</a>
    </ErrorContainer>
  );
}

export default Error404;
