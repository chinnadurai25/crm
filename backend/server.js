const express = require("express");
const ExcelJS = require("exceljs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {

    const { name, companyName, email, phone, projectType, projectBudget, projectDescription } = req.body;

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    const filePath = require("path").join(__dirname, "data.xlsx");

    const headers = ["Full Name", "Company Name", "Email Address", "Phone Number", "Project Type", "Project Budget", "Project Description"];

    try {
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet("Sheet1");
        if (!worksheet) {
            worksheet = workbook.addWorksheet("Sheet1");
            worksheet.addRow(headers);
        }
    } catch {
        worksheet = workbook.addWorksheet("Sheet1");
        worksheet.addRow(headers);
    }

    worksheet.addRow([name, companyName, email, phone, projectType, projectBudget, projectDescription]);

    try {
        await workbook.xlsx.writeFile(filePath);
        res.send("Data Saved");
    } catch (err) {
        console.error("Error writing to Excel file:", err);
        res.status(500).send("Failed to save data. Please close the Excel file if it is open.");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});