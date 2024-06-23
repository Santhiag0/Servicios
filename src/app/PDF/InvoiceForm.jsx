'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Invoice from '../../Components/InvoicePDF';

const PrintInvoice = ({ invoiceData }) => {
  const componentRef = useRef(null);

  const handlePrint = () => {
    const element = componentRef.current;
  
    if (element) {
      html2canvas(element, { 
        useCORS: true, 
        allowTaint: true, 
        logging: true, 
        scrollX: 0, 
        scrollY: 0 
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      }).catch(err => {
        console.error('Error generating PDF: ', err);
      });
    }
  };

  return (
    <div>
      <Invoice ref={componentRef} invoiceData={invoiceData} />
      <button onClick={handlePrint} className="bg-[#003366] text-white px-4 py-2 mt-4">Descargar como PDF</button>
    </div>
  );
};

export default PrintInvoice;
