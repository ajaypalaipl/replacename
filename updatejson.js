import { readFile, writeFile } from 'fs';
import { join } from 'path';

// Define the file path
// const filePath = join(__dirname, 'data.json');
const path = 'D:/AIPL/prioticket/CSV-testcases/AutomationApiCsvData/new_data/';
// const path = '/home/intersoft-admin/Desktop/';
const filePath = path + 'data.json';
let old_name = 'AAA.csv';
//index of array which have src = 12232 
//Distributor api's
let filenames = ['Product_listing', 'Product_Categories', 'Product_Availability', 'Product_Taxes', 'Product_Routes', 'Product_Locations', 'Product_Details', 'Product_Destinations', 'Product_Currency_Rates', 'Create_Reservation_Create_Cart', 'Reseravation_POST_GET', 'Reservation_POST_DELETE', 'Reservation_POST_UPDATE', 'Cancel_order_booking', 'Instant_booking', 'List_orders', 'Order_details', 'Reserve_Confirm_Orders', 'Payment_Confirm_Payment', 'Payment_Reserve_Payment', 'Delete_Payment_After_Reservation'];
//Distributor_local api's
//let filenames = ['Product_listing_local', 'Product_Categories_local', 'Product_Availability_local', 'Product_Taxes_local', 'Product_Routes_local', 'Product_Locations_local', 'Product_Details_local', 'Product_Destinations_local', 'Product_Currency_Rates_local', 'Create_Reservation_Create_Cart_local', 'Reseravation_POST_GET_local', 'Reservation_POST_DELETE_local', 'Reservation_POST_UPDATE_local', 'Cancel_order_booking_local', 'Instant_booking_local', 'List_orders_local', 'Order_details_local', 'Reserve_Confirm_Orders_local', 'Payment_Confirm_Payment_local', 'Payment_Reserve_Payment_local', 'Delete_Payment_After_Reservation_local'];
//Thynq
//let filenames = ['Thynq_admin_login', 'Thynq_dashboard', 'Thynq_admin_users', 'Thynq_admin_tag', 'Thynq_admin_faq', 'Thynq_admin_categories', 'Thynq_admin_sub_categories', 'Thynq_admin_package', 'Thynq_admin_Spokenlanguage', 'Thynq_admin_illness', 'Thynq_Admin_SelfCareVideo', 'Thynq_Admin_SelfCareArticle', 'Thynq_Admin_Blogs', 'Thynq_Admin_Blog_Comment', 'Thynq_Admin_Content', 'Thynq_Admin_Assessment', 'Thynq_Admin_Booking', 'Thynq_Admin_Transaction', 'Thynq_Admin_Payout_Transaction'];

// Initialize the data
let data = {};

// Read the file
readFile(filePath, 'utf8', (err, dataString) => {
    if (err) {
        console.error(err);
        return;
    }
    //
    data = JSON.parse(dataString);
    for (let i in data.data) {
        let temp = data.data[i];
        let s_temp = temp[0];
        // Loop to update the data
        if (s_temp.includes('src')) {
            for (let j in filenames) {
                let temp_file_name = filenames[j]
                let filename = temp_file_name + '.csv';
                data.data[i][0] = s_temp.replace(old_name, filename);
                let new_data = JSON.stringify(data)
                // Write the updated data to the file
                let new_file_path = path + temp_file_name + '.json';
                writeFile(new_file_path, new_data, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
    }
});