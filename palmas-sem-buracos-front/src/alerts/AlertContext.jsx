import React, { createContext, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import './AlertContext.css';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [errorAlertMessage, setErrorAlertMessage] = useState(null);

  const triggerSuccess = (message) => {
    setShowSuccessAlert(message);
    setTimeout(() => setShowSuccessAlert(null), 3000); // Auto-hide in 3s
  };

  const triggerError = (message) => {
    setErrorAlertMessage(message);
    setTimeout(() => setErrorAlertMessage(null), 4000); // Auto-hide in 4s
  };

  return (
    <AlertContext.Provider value={{ triggerSuccess, triggerError }}>
      {children}
      
    {createPortal(
      <div className="global-toast-container">
        {showSuccessAlert && (
          <div className="alert-success-toast">
            {showSuccessAlert}
          </div>
        )}
        {errorAlertMessage && (
          <div className="alert-error-toast">
            {errorAlertMessage}
          </div>
        )}
      </div>,
      document.body
    )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
