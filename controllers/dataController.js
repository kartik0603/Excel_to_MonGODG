const multer = require("multer");

const XLSX = require("xlsx");
const Data = require("../models/data.Schema");
const fs = require("fs");
// file Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './excel/';
        //  directory exists
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);  // directory if not exists
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single("file");

const importFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file');
        }

        const filePath = `./excel/${req.file.originalname}`;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        Data.insertMany(sheetData)
            .then(() => res.redirect('/'))
            .catch(err => res.status(500).send('Error saving data to MongoDB'));
    });
};

const exportData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }

};

// Delete all data
const deleteData = (req, res) => {
    Data.deleteMany({})
        .then(() => res.redirect('/'))
        .catch(err => res.status(500).send('Error deleting data from MongoDB'));
};

module.exports = { importFile, exportData ,deleteData };