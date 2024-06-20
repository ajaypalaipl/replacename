import { readFile, writeFile } from 'fs';
import { join } from 'path';

// Define the file path
// const filePath = join(__dirname, 'data.json');
const path = 'D:/AIPL/prioticket/CSV-testcases/AutomationApiCsvData/new_data/';
const filePath = path + 'data.json';
// Initialize the data
let data = {};

// Read the file
readFile(filePath, 'utf8', (err, dataString) => {
    if (err) {
        console.error(err);
        return;
    }
    data = JSON.parse(dataString);
    for (let i in data.data) {
        // console.log(i);
        let temp = data.data[i];
        let s_temp = temp[0];
        // Loop to update the data
        if (s_temp.includes('src')) {
            // console.log(i);
            //12232        
            let filenames = ['a', 'b', 'c', 'd'];
            let old_name = 'AAA.csv';
            for (let j in filenames) {
                // Update the 
                let temp_file_name = filenames[j]
                let filename = temp_file_name + '.csv';
                // console.log(s_temp);
                data.data[i][0] = s_temp.replace(old_name, filename);
                // console.log(s_temp);
                // console.log(data.data[12232][0]);
                let new_data = JSON.stringify(data)
                // JSON.stringify(data, null, 2)
                // Write the updated data to the file
                let new_file_path = path + temp_file_name + '.json';
                writeFile(new_file_path, new_data, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                // s_temp = data.data[i][0]
                // old_name = filename;
            }
        }
    }
});