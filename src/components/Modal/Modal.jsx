import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";
import { IoWarningOutline } from "react-icons/io5";
import { useWeatherQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation'
import { cities } from '../../../data-dashboard-page3'


const Modal = ({ isOpen, onClose, title }) => {
  const coordinates1 = { lon: cities[0].lon, lat: cities[0].lat };
  const weatherQuery = useWeatherQuery(coordinates1)
  const { error, isLoading } = useGeolocation();
  const {
    temp = 0,
    feels_like = 0,
    temp_min = 0,
    temp_max = 0,
    humidity = 0,
    grnd_level = 0,
    sea_level = 0,
  } = weatherQuery?.data?.main || {};



  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header"><><IoWarningOutline size={40} color="white" /></> {title}</div>
            <div className="modal-body">
              {isLoading ? (
                <div className="loading-container">
                  <motion.div
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <p>Carregando dados do clima...</p>
                </div>
              ) : error || weatherQuery.isError ? (
                <div className="error-state d-flex justify-content-center align-items-start">
                  <IoWarningOutline size={40} color="red" />
                  <p className="p-0 mt-2">Erro ao carregar dados do clima. Verifique sua conexão ou tente novamente mais tarde.</p>
                </div>
              ) : (
                <>
                  <div className="alert-box">
                    <h5>Condições atuais</h5>
                    <p><span className="highlight">Temperatura atual:</span> {temp}°C </p>
                    <p><span className="highlight">Sensação térmica:</span> {feels_like}°C (⚠️ Abaixo de 10°C e acima de 35°C)</p>
                    <p><span className="highlight">Temperatura máxima:</span> {temp_max}°C (⚠️ Acima de 35°C)</p>
                    <p><span className="highlight">Temperatura mínima:</span> {temp_min}°C (⚠️ Abaixo de 5°C)</p>
                  </div>
                  <div className="alert-box">
                    <h5>Condições atmosféricas</h5>
                    <p><span className="highlight">Umidade:</span> {humidity}% (⚠️ Abaixo de 30% e acima de 85%)</p>
                    <p><span className="highlight">Pressão ao nível do mar:</span> {sea_level} hPa (⚠️ 1000 hPa e acima de 1030 hPa)</p>
                    <p><span className="highlight">Pressão no solo:</span> {grnd_level} hPa (⚠️ 1000 hPa e acima de 1030 hPa)</p>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={onClose}>Fechar</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;
