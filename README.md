#  Social Media Content Analyzer  
A simple web application that allows users to upload PDF files or images and extracts text from them using PDF parsing and OCR (Tesseract.js).  
After extracting the text, the app gives **engagement improvement suggestions** for social media content.


##  Features

###  1. File Upload  
- Upload PDF, JPG, PNG, JPEG  
- Drag-and-drop support  
- Shows selected file name  
- Handles errors for unsupported files  

###  2. Text Extraction  
- PDF Parsing using `pdf-parse`  
- OCR for images using `tesseract.js` (Node compatible version)  
- Extracts raw text and cleans formatting  

###  3. Content Analysis  
After extracting text, the analyzer evaluates:  
- Word count  
- Sentence count  
- Average sentence length  
- Presence of Call-To-Action  
- Hashtag suggestions  
- Improvement tips for better engagement  

###  4. User Interface  
- Clean and simple UI  
- Progress bar while uploading  
- Error messages  
- Displays extracted text  
- Shows suggestions and hashtags  

---

##  Project Structure (Backend + Frontend)

/backend
    /controllers
        ├── analyzeController.js
        ├── ocrController.js
        ├── pdfController.js
        └── uploadController.js

    app.js
    routes.js

/frontend
    /src
        /components
            ├── FileDrop.js
            ├── Progress.js
            └── ResultPanel.js

        /pages
            └── Home.js

        /services
            └── apis.js

        /utils
            └── textUtils.js

        App.js


##  Tech Stack Used

### Frontend
- React 
- JavaScript
- HTML/CSS
- Axios / XHR

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse
- tesseract.js
- CORS

---

##  How to Run the Project Locally  

### Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>


---

##  Backend Setup
cd backend
npm install
npm run dev

---

##  Frontend Setup
cd frontend
npm install
npm run start

---

## Screenshots 


### 1. Home Page UI
screenshot/image1.png

### 2. File Upload
screenshot/image2.png

### 3. Extracted Text Output
screenshot/image3.png

### 4. Analysis & Suggestions
screenshot/image4.png

 
