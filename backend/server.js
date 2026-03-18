const express = require("express");
const ExcelJS = require("exceljs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Create uploads folder if it does not exist
const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Configure file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Allow specific file types
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
        const ext = path.extname(file.originalname).toLowerCase();

        if (allowedTypes.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed"));
        }
    }
});

app.post("/save", upload.single("document"), async (req, res) => {
    try {
        const {
            name,
            companyName,
            email,
            phone,
            projectType,
            projectBudget,
            projectDescription
        } = req.body;

        const documentName = req.file ? req.file.filename : "";

        const workbook = new ExcelJS.Workbook();
        let worksheet;

        const filePath = path.join(__dirname, "data.xlsx");

        const headers = [
            "Full Name",
            "Company Name",
            "Email Address",
            "Phone Number",
            "Project Type",
            "Project Budget",
            "Project Description",
            "Uploaded Document"
        ];

        if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
            worksheet = workbook.getWorksheet("Sheet1");

            if (!worksheet) {
                worksheet = workbook.addWorksheet("Sheet1");
                worksheet.addRow(headers);
            }
        } else {
            worksheet = workbook.addWorksheet("Sheet1");
            worksheet.addRow(headers);
        }

        // Create clickable hyperlink for document
        const fullPath = documentName ? path.join(uploadFolder, documentName) : "";
        const fileLink = documentName ? { text: "Open File", hyperlink: fullPath } : "";

        // Add row
        worksheet.addRow([
            name,
            companyName,
            email,
            phone,
            projectType,
            projectBudget,
            projectDescription,
            fileLink
        ]);

        await workbook.xlsx.writeFile(filePath);
        res.send("Data Saved Successfully");

    } catch (err) {
        console.error("Error in /save route:", err);
        if (err.code === 'EBUSY' || (err.message && err.message.includes('EBUSY'))) {
            res.status(400).send("pls close the excel sheet then you submit agin");
        } else {
            res.status(500).send("Internal Server Error: " + err.message);
        }
    }
});

// Generic error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).send("Something went wrong!");
});

// Catch unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Error: Port 5000 is already in use. Please stop any existing server processes.');
        process.exit(1);
    } else {
        console.error('Uncaught Exception:', err);
    }
});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});