// apiController.js
import Papa from 'papaparse';
import multer from 'multer';

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function parseObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].replace(/\n/g, '').replace(/\s+/g, ' ');
                try {
                    obj[key] = parsedata(obj[key]);
                } catch (e) {
                    // Handle the case where parsing fails, if needed
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                parseObject(obj[key]);
            }
        }
    }
}

function parsedata(data) {
    return data.map(row => {
        for (let key in row) {
            if (row.hasOwnProperty(key)) {
                if (typeof row[key] === 'string') {
                    try {
                        row[key] = parsedata(row[key]);
                    } catch (e) {
                        // Handle the case where parsing fails, if needed
                    }
                } else if (typeof row[key] === 'object' && row[key] !== null) {
                    parseObject(row[key]);
                }
            }
        }

        // Other processing logic for different columns

        return row;
    });
}

const apiController = {
    convertCsvToJson: (req, res) => {
        upload.single('csvFile')(req, res, (err) => {
            if (!req.file) {
                return res.status(400).send({ error: 'No file uploaded.' });
            }
            // const filename = req.file.originalname;
            const csvData = req.file.buffer.toString('utf8');
            const jsonData = Papa.parse(csvData, { header: true });
            const jsonDatas = parsedata(jsonData.data);

            res.json(jsonDatas);
            // res.json({ filename, data: jsonDatas });
        });
    },

    api2: (req, res) => {
        res.json("jsonDatas");
    },
};

export default apiController;
