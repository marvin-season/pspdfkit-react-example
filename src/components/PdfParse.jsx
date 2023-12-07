import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFReader = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleTextExtraction() {
    const url = 'document.pdf'; // Replace with your PDF file URL
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then((pdf) => {
      let fullText = '';
      const promises = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = pdf.getPage(i);
        promises.push(page.then((page) => page.getTextContent()));
      }

      Promise.all(promises).then((texts) => {
        texts.forEach((text) => {
          text.items.forEach((item) => {
            fullText += item.str + ' ';
          });
        });
        setPdfText(fullText);
        console.log(fullText); // Output text content to console
      });
    });
  }

  return (
    <div>
      <Document
        file="document.pdf" // Replace with your PDF file path
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button onClick={handleTextExtraction}>Extract Text</button>
      <div>
        {/* Render extracted text here */}
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
};

export default PDFReader;
