
// import { watermarkPDF } from 'pdf-manip' as any
import fs from 'fs'
(async () => {
  const watermarkPDF = require('pdf-manip').watermarkPDF
  const file = fs.readFileSync('test/input/input.pdf')
  const watermarkedPDF = await watermarkPDF('test/input/input.pdf', 'CONFIDENTIAL');
  console.log
})()
