//for file system operation read/write with promises
const fs = require('fs/promises');

//third-party library which parse the PDF to extract text from PDF
const pdfParse = require('pdf-parse');

//here i have to give file path from another function where its is extracting the path

//filePath woh location hai jaha PDF file stored hai.
async function extractText(filePath) 
{
   
  //PDF file ko binary buffer form mein read karna
  const data = await fs.readFile(filePath);
  //parsed the PDF file
  const parsed = await pdfParse(data, { max: 10 * 1024 * 1024 });  //maximum limit 10 mb
  return parsed.text || '';
}

module.exports = { extractText };
