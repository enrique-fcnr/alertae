import { useRouteError } from "react-router-dom";
import "./ErrorPage.css"
import errorImage from '../../assets/error-image.jpg'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container-fluid" id="error-page">
      <h1 className="text-primary">Oops!</h1>
      <p className="error-text-sorry mb-6">Desculpe, ocorreu um erro inesperado.</p>

      <button className="btn btn-primary mb-0 cursor-pointer
">Valtar a página anterior</button>
      <div className="main-error-img">
        <img className="error-img" src={errorImage} alt="" />
      </div>
    </div>
  );
}