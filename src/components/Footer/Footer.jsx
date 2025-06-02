import "./Footer.css"
import Logo2 from "../../assets/logo-branca-sem-fundo-alertae.png"
import { useState } from "react"

function Footer() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState(""); // "success" ou "wrong"


  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = /\S+@\S+\.\S+/;

    if (!emailValido.test(email)) {
      setMensagem("E-mail inválido. Por favor, tente novamente.  ");
      setTipo("wrong");
    } else {
      setMensagem("Inscrição realizada com sucesso!  ");
      setTipo("success");
      setEmail("")
      // aqui você poderia enviar o e-mail para sua API, por exemplo
    }
  };

  return (
    <footer onSubmit={handleSubmit} className="footer text-center pt-5 mt-5">
      <div className="container d-md-flex pt-4 flex-md-column">

        {/* Grid principal */}
        <div className="row text-start">
          {/* Logo */}
          <div className="col-md-3 mb-md-4">
            <div className="mb-md-3">
              <div className="footer-img mb-md-2">
                <img src={Logo2} alt="Logo" />
              </div>
              <p className="footer-slogan d-none d-sm-block">
                Desenvolvido para trazer mais informações e te manter mais seguro.
              </p>
            </div>
          </div>


          {/* Links úteis */}
          <div className="col-sm-6 col-md-3 mb-4 d-flex flex-column justify-content-center align-items-center d-none d-md-block">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <ul className="list-unstyled">
                <li> <h6 className="fw-bold links-title">LINKS ÚTEIS</h6></li>
                <li><a href="/sobre/quem-somos" className="link-animado text-decoration-none mb-1">Sobre nós</a></li>
                <li><a href="sobre/proposito" className="link-animado text-decoration-none mb-1">Serviços</a></li>
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
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 col-md-10 text-start">
            <h6 className="fw-bold newsletter-title mb-0">NEWSLETTER</h6>
            <p className="small newsletter-subtitle mb-3  p-0">
              Inscreva-se e receba diariamente todas as atualizações por e-mail.
            </p>

            {/* Mostrar o formulário apenas se tipo for diferente de 'success' */}
            {tipo !== "success" && (
              <form
                className="d-flex flex-column flex-lg-row justify-content-start"
                onSubmit={handleSubmit} // você pode ajustar conforme seu handler
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-input mb-2 mb-lg-0 me-lg-2 py-2 fs-6"
                  placeholder="Escreva o seu e-mail"
                  required
                />
                <button
                  className="btn-footer btn py-1 fs-6 border border-2"
                  type="submit"
                >
                  Inscrever-se
                </button>
              </form>
            )}

            {/* Mostrar a mensagem se houver */}
            {mensagem && (
              <div
                className={`alert alert-${tipo === "wrong" ? "danger" : "success"} mt-3 d-flex align-items-center fs-6`}
                role="alert"
              >
                <i
                  className={`bi ${tipo === "wrong" ? "bi-x-circle" : "bi-check-circle"
                    } me-2`}
                ></i>
                {mensagem}
              </div>
            )}
          </div>
        </div>


        {/* Ícones sociais - apenas no mobile (após newsletter) */}
        <div className="container-icons mb-4 mt-4 d-flex justify-content-center gap-3 gap-md-4 d-md-none">
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-facebook fs-2  "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-twitter fs-2  "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-instagram fs-2  "></i></a>
          <a href="#" className="icons-sociais border border-3 rounded-circle d-flex justify-content-center align-items-center ms-0"><i className="bi bi-youtube fs-2  "></i></a>
        </div>


        {/* Rodapé final */}
        <hr className="footer-bar mt-5" />
        <p className="footer-rights">&copy; {new Date().getFullYear()} Alertaê - Todos os direitos reservados.</p>
      </div>
    </footer>


  )
}

export default Footer
