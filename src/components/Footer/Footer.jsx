import "./style.css"
import Logo2 from "../../assets/logo-preta-sem-fundo-alertae.png"

function Footer() {
  return (
    <footer className="bg-light text-white text-center pt-5 mt-5">
      <div className="container d-md-flex flex-md-column">

        {/* Grid principal */}
        <div className="row text-start">
          {/* Logo */}
          <div className="col-md-3 mb-4">
            <div className="mb-3">
              <div className="footer-img">
                <img src={Logo2} alt="Logo" className="mb-2" />
              </div>
              <p className="footer-slogan text-dark d-none d-sm-block">
                Desenvolvido para trazer mais informações para te manter mais seguro.
              </p>
            </div>
          </div>

          {/* Links úteis */}
          <div className="col-sm-6 col-md-3 mb-4 d-flex flex-column justify-content-center align-items-center d-none d-md-block">
            <h6 className="fw-bold text-dark">LINKS ÚTEIS</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Sobre nós</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Serviços</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Contato</a></li>
            </ul>
          </div>

          {/* Informações */}
          <div className="col-sm-6 col-md-3 mb-4 d-flex flex-column justify-content-center align-items-center d-none d-md-block">
            <h6 className="fw-bold text-dark">INFORMAÇÕES</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Política de Privacidade</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Termos & Condições</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Suporte</a></li>
              <li><a href="#" className="text-dark text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          {/* Ícones sociais - só em telas ≥ sm */}
          <div className="col-md-3 mb-4 d-flex  justify-content-center align-items-start d-none d-md-flex">
            <a href="#" className="me-4 text-dark"><i className="bi bi-facebook fs-1"></i></a>
            <a href="#" className="me-4 text-dark"><i className="bi bi-twitter fs-1"></i></a>
            <a href="#" className="me-4 text-dark"><i className="bi bi-instagram fs-1"></i></a>
            <a href="#" className="me-4 text-dark"><i className="bi bi-youtube fs-1"></i></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 col-md-10 text-center">
            <h6 className="fw-bold text-dark">SUBSCRIBE TO OUR NEWSLETTER</h6>
            <p className="small text-dark">Lorem ipsum dolor sit amet nulla adipiscing elit.</p>
            <form className="d-flex justify-content-center">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Escreva o seu e-mail"
              />
              <button className="btn btn-primary w-50" type="submit">Inscreva-se</button>
            </form>
          </div>
        </div>

        {/* Ícones sociais - apenas no mobile (após newsletter) */}
        <div className="d-flex justify-content-center mt-4 d-md-none">
          <a href="#" className="me-4 text-dark"><i className="bi bi-facebook fs-1"></i></a>
          <a href="#" className="me-4 text-dark"><i className="bi bi-twitter fs-1"></i></a>
          <a href="#" className="me-4 text-dark"><i className="bi bi-instagram fs-1"></i></a>
          <a href="#" className="me-4 text-dark"><i className="bi bi-youtube fs-1"></i></a>
        </div>

        {/* Rodapé final */}
        <p className="fs-5 mt-3 text-dark">&copy; {new Date().getFullYear()} Alertaê</p>
      </div>
    </footer>


  )
}

export default Footer
