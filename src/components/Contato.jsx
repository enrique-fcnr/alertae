function Contato() {
    return (
      <section id="contato" className="container py-5">
        <h2 className="text-center mb-4">Fale Conosco</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" placeholder="Seu nome" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="seu@email.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensagem</label>
            <textarea className="form-control" rows="4" placeholder="Sua mensagem"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </section>
    )
  }
  
  export default Contato
  