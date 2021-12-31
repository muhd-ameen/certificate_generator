

console.log("hello")
const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submitBtn.addEventListener("click", () => {
  const val = userName.value.toUpperCase();
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});
const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("Certificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);


  //get font
  const fontBytes = await fetch("Sanchez-Regular.ttf").then((res) =>
  res.arrayBuffer()
);

  // Set font size
  const textSize = 20;

  // Embed our custom font in the document
  const SanChezFont  = await pdfDoc.embedFont(fontBytes);
   // Get the first page of the document
   const pages = pdfDoc.getPages();
   const firstPage = pages[0];

   // Calculations for center aligning the text
   const { width, height } = firstPage.getSize()
   const textWidth = SanChezFont.widthOfTextAtSize(name, textSize);
   const textHeight = SanChezFont.heightAtSize(textSize);
   // Draw a string of text diagonally across the first page
   firstPage.drawText(name, {
     x: width / 2 - textWidth / 2 - 28,
     y: height / 2 - 32,
     size: textSize,
     font: SanChezFont ,
     color: rgb(0.0, 0.0, 0.0),
   });

   const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri,"Living-islam-Certificate.pdf")
};

