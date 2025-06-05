import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  padding: 20px;
`;

const LoginBox = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h2`
  color: #18dcff;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background-color: #2c2c2c;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #18dcff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  margin-top: 1rem;
  background-color: #00c86f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #00a95f;
  }
`;

const Error = styled.p`
  color: #ff4d4f;
  margin-top: 1rem;
  text-align: center;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/"); // Redirige a la página principal
    } else {
      setError("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleLogin}>
          <Input
            type='text'
            placeholder='Usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>Entrar</Button>
        </form>
        {error && <Error>{error}</Error>}
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;