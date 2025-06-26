
export const generatePDF = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  // Create a print-specific stylesheet
  const printStyles = `
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        font-size: 12pt;
        line-height: 1.4;
        color: #000;
        background: white;
      }
      
      .no-print {
        display: none !important;
      }
      
      .question-paper-content {
        max-width: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border: none;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      
      .header img {
        max-height: 80px;
        margin-bottom: 15px;
      }
      
      .header h2 {
        font-size: 18pt;
        font-weight: bold;
        margin: 10px 0;
        color: #000;
      }
      
      .header h3 {
        font-size: 16pt;
        font-weight: 600;
        margin: 10px 0;
        color: #333;
      }
      
      .exam-details {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 10px;
        margin-bottom: 25px;
        font-size: 11pt;
      }
      
      .section-title {
        font-size: 14pt;
        font-weight: bold;
        text-decoration: underline;
        margin: 25px 0 15px 0;
        color: #000;
        page-break-after: avoid;
      }
      
      .question {
        margin-bottom: 20px;
        page-break-inside: avoid;
        orphans: 3;
        widows: 3;
      }
      
      .question-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      
      .question-number {
        font-weight: bold;
        font-size: 12pt;
      }
      
      .difficulty-badge {
        background: #f5f5f5;
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 9pt;
        border: 1px solid #ddd;
      }
      
      .question-text {
        font-size: 12pt;
        line-height: 1.5;
        margin: 8px 0;
        color: #000;
      }
      
      .question-options {
        margin: 10px 0 10px 20px;
        font-size: 11pt;
      }
      
      .question-options div {
        margin-bottom: 4px;
      }
      
      .sub-questions {
        margin-left: 25px;
        margin-top: 10px;
        border-left: 2px solid #ddd;
        padding-left: 15px;
      }
      
      .sub-question {
        margin-bottom: 8px;
        font-size: 11pt;
      }
      
      .marks {
        font-weight: bold;
        color: #000;
        font-size: 11pt;
      }
      
      .unit-info {
        font-size: 10pt;
        color: #666;
        font-style: italic;
        margin-top: 5px;
      }
      
      .footer {
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #ccc;
        text-align: center;
        font-size: 10pt;
        color: #666;
        page-break-inside: avoid;
      }
      
      @page {
        margin: 0.75in;
        size: A4;
      }
      
      h1, h2, h3, h4 {
        page-break-after: avoid;
      }
    }
  `;

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    console.error('Failed to open print window');
    return;
  }

  // Build the complete HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${filename}</title>
      <style>${printStyles}</style>
    </head>
    <body>
      ${clonedElement.innerHTML}
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for the content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (optional)
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
  };
};

export const generateWordDocument = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  let htmlContent = element.innerHTML;
  
  // Clean up the HTML for Word
  htmlContent = htmlContent.replace(/class="[^"]*"/g, ''); // Remove CSS classes
  htmlContent = htmlContent.replace(/<button[^>]*>.*?<\/button>/gs, ''); // Remove buttons
  htmlContent = htmlContent.replace(/class="no-print"[^>]*>.*?<\/[^>]*>/gs, ''); // Remove no-print elements
  
  const wordDocument = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          line-height: 1.4;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .question {
          margin-bottom: 15px;
        }
        .section-title {
          font-weight: bold;
          text-decoration: underline;
          margin: 20px 0 10px 0;
        }
        .sub-questions {
          margin-left: 20px;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;
  
  const blob = new Blob([wordDocument], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
