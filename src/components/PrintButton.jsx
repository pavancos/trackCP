import React from 'react';
import './PrintStyles.css'; // Import your print-specific CSS

const PrintButton = () => {
  const printDocument = () => {
    window.print();
  };

  return (
    <button onClick={printDocument}>
      Print to PDF
    </button>
  );
};

export default PrintButton;
