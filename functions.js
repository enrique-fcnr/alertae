export const validateUser = ({ username, email, password, confirmPassword }) => {
  const errors = {};

  // Username
  if (!username || username.length < 6) {
    errors.username = "O nome de usuário deve ter pelo menos 6 caracteres.";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "E-mail inválido.";
  }

  // Password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.password = "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.";
  }

  // Confirm password
  if (password !== confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};