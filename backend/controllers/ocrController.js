// tesseract.js ek JavaScript library hai jo Tesseract OCR engine ko browser mein use karne deti hai.
const Tesseract = require("tesseract.js");

async function recognizeImage(filePath) {
  try {
    const result = await Tesseract.recognize(filePath, "eng", {
      logger: () => {} 
    });

    // recognized text
    return result.data.text || "";
  } catch (err) {
    console.error("OCR error:", err);
    throw new Error("OCR failed: " + err.message);
  }
}

module.exports = { recognizeImage };
