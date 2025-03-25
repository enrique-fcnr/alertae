function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#">Alertaê</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#funcionalidades">Funcionalidades</a></li>
            <li className="nav-item"><a className="nav-link" href="#depoimentos">Depoimentos</a></li>
            <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
          </ul>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  