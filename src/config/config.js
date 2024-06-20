// config.js
// export const api1 = {
//     baseUrl: 'http://localhost:3000'
// };
// export const api2 = {
//     baseUrl: 'http://localhost:3000'
// };
export const apiConfig = {
    baseUrl: 'http://localhost:3000',
    endpoints: {
        convertCsvToJson: {
            path: '/convertCsvToJson',
            method: 'post',
        },
        api2: {
            path: '/api2',
            method: 'get',
        },
    },
};

