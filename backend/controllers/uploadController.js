//handle file upload
const multer = require('multer');
//path nikalne ke liye
const path = require('path');
const fs = require('fs/promises');
//To use system ka temporary folder 
const os = require('os');
const pdfService = require('./pdfController');
const ocrService = require('./ocrController');
const analyzeService = require('./analyzeController');

// function to upload file in system temp folder
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, os.tmpdir()),
    filename: (req, file, cb) => {
      const name = `${Date.now()}-${file.originalname}`;
      cb(null, name);
    }
  }),
  //file size limit
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  },
  fileFilter: (req, file, cb) => {
    //extensions
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Unsupported file type'), false);
    cb(null, true);
  }
}).single('file');

exports.handleUpload = (req, res, next) => {
  upload(req, res, async err => {
    //error ya file missing hai toh
    if (err) return next(err);
    if (!req.file) return res.status(400).json(
        { error: 'No file uploaded' 

        }
    );

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    try {
      let text = '';
      if (ext === '.pdf') {
        //if pdf file than extract the text
        text = await pdfService.extractText(filePath);
      } 
      else {
        //if image than OCR
        text = await ocrService.recognizeImage(filePath);
      }

      // analysis
      const analysis = analyzeService.analyzeText(text || '');

      //after processing remove from temp folder
      try { 
        await fs.unlink(filePath); 
    } catch (e) 
    { 
        console.log(e);
    }

      return res.json({
        text,
        analysis
      });
    } catch (error) {
      // agr error ->first delete file from temp folder
      try {
         await fs.unlink(filePath); 
        } catch (e) 
        { 
            console.log(e);
        }
      next(error);
    }
  });
};
