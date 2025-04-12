import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css";
import errorImage from '../../assets/error-image.jpg';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container-fluid" id="error-page">
      <h1 className="text-primary">Oops!</h1>
      <p className="error-text-sorry mb-6">Desculpe, ocorreu um erro inesperado.</p>

      <Link to="/" className="btn btn-primary mb-3">
        Voltar à página inicial
      </Link>

      <div className="main-error-img">
        <img className="error-img" src={errorImage} alt="Erro" />
      </div>
    </div>
  );
}
