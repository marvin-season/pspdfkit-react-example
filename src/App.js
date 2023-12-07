import PDFReader from './components/PdfParse';
// import PdfViewerComponent from './components/PdfViewerComponent';

function App() {
	return (
		<div className="App">
			{/* <div className="PDF-viewer">
			<PdfViewerComponent
				document={"document.pdf"}
			/>
			</div> */}
			<PDFReader/>
		</div>
	);
}

export default App;