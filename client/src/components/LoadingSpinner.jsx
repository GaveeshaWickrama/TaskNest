import React from 'react';

const LoadingSpinner = ({ message }) => {
  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <p className="loading-message">{message}</p>
      <style jsx>{`
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 10;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-message {
          margin-top: 10px;
          font-size: 16px;
          color: #3498db;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
