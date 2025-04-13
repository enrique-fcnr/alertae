import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';


function LoginPage() {
  const [displayForm, setDisplayForm] = useState(false);

  const handleForm = async (e) => {

    e.preventDefault();
    setDisplayForm(!displayForm)
    console.log(displayForm)

  };

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="login-container">
          <div className="divisor"></div>
          <div className="form-container">
            <h2 className="title-form">{displayForm ? 'Register' : 'Login'}</h2>
            <p className='login-subtitle'>
              Se você ainda não tem uma conta: <Link onClick={handleForm} to="/signup">{displayForm ? 'Login' : 'Register'}</Link>
            </p>
            {displayForm ? <Register displayForm={displayForm} setDisplayForm={setDisplayForm} /> : <Login />}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;