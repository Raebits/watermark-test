import { PathLike } from "fs";

const { PDFDocument, rgb, degrees } = require('pdf-lib');
const fs = require('fs');

async function addWatermark(inputPath: PathLike, outputPath: PathLike, watermarkText: PathLike) {
  // Load the PDF
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the number of pages
  const pages = pdfDoc.getPages();

  // Define the watermark text and its properties
  const watermark = watermarkText;
  const fontSize = 50;
  const opacity = 0.5;

  // Add the watermark to each page
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(watermark, {
      x: width / 4,
      y: height / 2,
      size: fontSize,
      // color: rgb(0.75, 0.75, 0.75),
      color: rgb(1, 0, 0),
      opacity: opacity,
      rotate: degrees(- 45)
    });
  }

  // Save the PDF with the watermark
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`Watermark added to ${outputPath}`);
}

// Example usage
const inputPath = 'test/input/input.pdf';
const outputPath = 'test/output/output.pdf';
const watermarkText = 'CONFIDENTIAL';

addWatermark(inputPath, outputPath, watermarkText);
