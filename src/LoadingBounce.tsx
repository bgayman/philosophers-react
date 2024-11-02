import React from 'react';
import colors from './color';

const LoadingBounce = () => {
  return (
    <div>
      <style>
        {`
          .bounce-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .bounce-loading {
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .bounce-loading > div {
            width: 12px;
            height: 12px;
            border-radius: 100%;
            background-color: ${colors.blue};
            animation: bounce-loading 0.8s infinite ease-in-out both;
          }

          .bounce-loading > div:first-child {
            animation-delay: -0.32s;
          }

          .bounce-loading > div:nth-child(2) {
            animation-delay: -0.16s;
          }

          @keyframes bounce-loading {
            0%, 100% { 
              transform: translateY(0);
            }
            50% { 
              transform: translateY(-10px);
            }
          }
        `}
      </style>
      <div className="bounce-container" style={{margin: '20px'}}>
        <div className="bounce-loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBounce;