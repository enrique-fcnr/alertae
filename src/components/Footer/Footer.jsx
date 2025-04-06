import "./style.css"
import Logo2 from "../../assets/logo-branca-sem-fundo-alertae.png"

function Footer() {
  return (
    <footer className="footer text-center pt-5 mt-5">
      <div className="container d-md-flex flex-md-column">

        {/* Grid principal */}
        <div className="row text-start">
          {/* Logo */}
          <div className="col-md-3 mb-md-4">
            <div className="mb-md-3">
              <div className="footer-img mb-md-2">
                <img src={Logo2} alt="Logo" />
              </div>
              <p className="footer-slogan d-none d-sm-block">
                Desenvolvido para trazer mais informações para te manter mais seguro.
              </p>
            </div>
          </div>


          {/* Links úteis */}
          <div className="col-sm-6 col-md-3 mb-4 d-flex flex-column justify-content-center align-items-center d-none d-md-block">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <ul className="list-unstyled">
                <li> <h6 className="fw-bold links-title">LINKS ÚTEIS</h6></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Sobre nós</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Serviços</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Blog</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Contato</a></li>
              </ul>
            </div>

          </div>

          {/* Informações */}
          <div className="col-sm-6 col-md-3 mb-4 d-flex flex-column justify-content-center align-items-center d-none d-md-block ">
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <ul className="list-unstyled">
                <li><h6 className="links-title fw-bold ">INFORMAÇÕES</h6></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Política de Privacidade</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Termos & Condições</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">Suporte</a></li>
                <li><a href="#" className="link-animado text-decoration-none mb-1">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Ícones sociais - só em telas ≥ sm */}
          <div className="icons-container col-md-3 mb-4 d-flex justify-content-center align-items-start d-none d-md-flex">
            <a href="#" className="icons-sociais border border-3 rounded-circle"><i className="bi bi-facebook fs-3 p-2"></i></a>
            <a href="#" className="icons-sociais border border-3 rounded-circle"><i className="bi bi-twitter fs-3 p-2"></i></a>
            <a href="#" className="icons-sociais border border-3 rounded-circle"><i className="bi bi-instagram fs-3 p-2"></i></a>
            <a href="#" className="icons-sociais border border-3 rounded-circle"><i className="bi bi-youtube fs-3 p-2"></i></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="row justify-content-center  mt-4">
          <div className="col-lg-8 col-md-10 text-start">
            <h6 className="fw-bold ">NEWSLETTER</h6>
            <p className="small ">Inscreva-se e recebe diariamente todas as atualizações por e-mail.</p>
            <form className="d-flex justify-content-center">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Escreva o seu e-mail"
              />
              <button className="btn btn-primary w-50 w-md-100" type="submit">Submeter</button>
            </form>
          </div>
        </div>

        {/* Ícones sociais - apenas no mobile (após newsletter) */}
        <div className="mb-4 mt-4 d-flex justify-content-center gap-5  d-md-none">
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-facebook fs-2 ms-2 "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-twitter fs-2 ms-2 "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-instagram fs-2 ms-2 "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-youtube fs-2 ms-2 "></i></a>
        </div>


        {/* Rodapé final */}
        <p className=" ">&copy; {new Date().getFullYear()} Alertaê</p>
      </div>
    </footer>


  )
}

export default Footer
