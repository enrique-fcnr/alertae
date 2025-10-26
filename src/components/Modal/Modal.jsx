import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PiWavesDuotone, PiCloudRainBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="modal-content-popup"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header-popup">
              <span className="alert-indicator red" />
              <div className="container-red">
                <span className="modal-title-city">São Paulo - Hoje</span>
                <button
                  style={{ display: 'block' }}
                  onClick={onClose}
                  className="close-btn"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="modal-title-popup">
              Notificações de hoje na sua região
              <p className="subtitle-popup">
                Tome decisões com base no clima atual
              </p>
            </div>

            <div className="popup-data-cards">
              <div className="popup-card alert-flood">
                <PiWavesDuotone size={40} className="icon" />
                <div className="popup-text">
                  <p>
                    <strong>Alerta de enchente!</strong>
                  </p>
                  <p>Evite áreas alagadas e busque rotas seguras.</p>
                </div>
              </div>

              <div className="popup-card alert-rain">
                <PiCloudRainBold size={40} className="icon" />
                <div className="popup-text">
                  <p>
                    <strong>Fortes chuvas:</strong> 12 mm
                  </p>
                  <p>Volume ideal: 0 mm a 3 mm. Risco de alagamento elevado.</p>
                </div>
              </div>
            </div>

            <div className="modal-footer-popup">
              <Link
                className="rotas-seguras-link"
                to="/emergencias/rotas-seguras"
              >
                <button className="btn-rota-segura">Rotas Seguras</button>
              </Link>
            </div>
          </motion.div>
        </div >
      )}
    </AnimatePresence >,
    modalRoot
  );
};

export default Modal;
