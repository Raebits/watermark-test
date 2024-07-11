import { PathLike } from "fs";

const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function addImageWatermark(inputPath: PathLike, outputPath: PathLike, imagePath: PathLike) {
  // Load the PDF
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Load the image
  const imageBytes = fs.readFileSync(imagePath);
  const image = await pdfDoc.embedPng(imageBytes); // or use embedJpg for JPEG images

  // Get the dimensions of the image
  const { width: imageWidth, height: imageHeight } = image.scale(0.3); // scale down if necessary

  // Get the number of pages
  const pages = pdfDoc.getPages();

  // Add the image watermark to each page
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawImage(image, {
      x: width / 2 - imageWidth / 2,
      y: height / 2 - imageHeight / 2,
      width: imageWidth,
      height: imageHeight,
      opacity: 0.5 // adjust opacity if necessary
    });
  }

  // Save the PDF with the image watermark
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`Watermark added to ${outputPath}`);
}

// Example usage
const inputPath = 'test/input/input.pdf';
const outputPath = 'test/output/output.pdf';
const imagePath = 'src/watermark.png';

addImageWatermark(inputPath, outputPath, imagePath);
