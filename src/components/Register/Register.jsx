import { useState } from 'react'
import { Link } from 'react-router-dom';
import { validateUser } from '../../../functions'
import "./Regsiter.css"

function Register({ setDisplayForm, display }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateUser(formData);

    if (result.isValid) {
      setErrors({});
      setSuccess(true);

      // Salva os dados no localStorage
      localStorage.setItem("cliente", JSON.stringify(formData));
      setDisplayForm(false)

      console.log("Usuário válido:", formData);

    } else {
      setErrors(result.errors);
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
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

        <div className="form-group">
          <input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmar Senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button className="form-btn" type="submit">
          <strong>{!display ? "REGISTRAR" : "ENTRAR"}</strong>
        </button>

        {success && <p className="success-message">Cadastro realizado com sucesso!</p>}
      </form>
    </>
  )
}

export default Register;
