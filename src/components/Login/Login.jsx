import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',

  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedClient = JSON.parse(localStorage.getItem("cliente"));

    if (!savedClient) {
      // Nenhum cliente cadastrado
      setErrors({ general: "Nenhum usuário registrado. Faça o cadastro primeiro." });
      return;
    }

    const { username, password } = formData;

    // Verifica se as credenciais batem
    if (username === savedClient.username && password === savedClient.password) {
      setErrors({});
      setSuccess(true);
      console.log("Login bem-sucedido");

      // Aguarda 5 segundos e redireciona
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } else {
      setErrors({ general: "Usuário ou senha inválidos." });
      setSuccess(false);
    }
  };


  return (
    <>
      <form className="needs-validation" id="loginForm" onSubmit={handleSubmit} noValidate>

        <div className="form-group">
          <input
            id="username"
            name="username"
            placeholder="Nome de usuário"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="form-group">
          <input
            id="password"
            name="password"
            placeholder="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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

        {errors.general && <p className="text-danger mt-2 text-center">{errors.general}</p>}
        {success && <p className="text-success mt-2 text-center">Login bem-sucedido! Redirecionando...</p>}

      </form>


    </>
  )
}

export default Login