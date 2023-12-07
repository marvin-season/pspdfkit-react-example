import PdfViewerComponent from "./PdfViewerComponent";

function PdfViewerUse() {
  return (
    <div className="PDF-viewer">
      <PdfViewerComponent document={"document.pdf"} />
    </div>
  );
}

export default PdfViewerUse;
