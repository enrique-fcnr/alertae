import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');



  const handleSubmit = async (e) => {

    // Previne comportamento padrão de formulário ao recarregar a página
    e.preventDefault();


    setLoading(true); // Mostra o ícone de carregamento

    const data = {
      username: username,
      password: password
    };


  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="login-container">

          <div className="divisor"></div>
          <div className="form-container">
            <h2 className="title-form">Log in</h2>
            <p className='login-subtitle'>
              Se você ainda não tem uma conta: <Link to="/signup">Registre-se</Link>
            </p>
            <form className="needs-validation" id="loginForm" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username"></label>
                <input
                  id="username"
                  name="username"
                  placeholder="Nome de usuário"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">Preencha o dado do usuário.</div>
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  id="password"
                  name="password"
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="valid-feedback"></div>
                <div className="invalid-feedback">Preencha a senha.</div>
              </div>
              <div className="login-esqueci text-end mb-4">
                <p className="mt-0 mb-2 text-muted">Esqueci:</p>
                <span className='mt-0 mb-2 login-links'>
                  <Link to="/forgot/username" className="text-muted login-esqueci-link">Usuário</Link> /
                  <Link to="/forgot/password" className="text-muted login-esqueci-link">Senha</Link>
                </span>
              </div>
              <button className="form-btn" type="submit">
                <strong>ENTRAR</strong>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;