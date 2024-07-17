const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware to parse JSON and handle form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (like CSS or client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Endpoint to serve the form with options
// Endpoint to serve the form with options
// Endpoint to serve the form with options

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/',(req,res)=>{
    res.render('Home');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
let companies = ['RS1','RS2','RS3','RS4','RS5'];
      // Render the form with options
const years = ['2024', '2023']; // Add more years as needed

const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ]; // Months options

let jsonData=[];     
const sk1Data = {};
const sk2Data = {};
const sk3Data = {};      
const sk4Data = {};
const sk5Data = {};
      
app.get('/login',(req,res)=>{
    res.render('login',{title:'Login',message:''});
})
app.get('/form', (req, res) => {
    // Read current data from JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }
      
        // Parse JSON data
        let jsonData = JSON.parse(data);
        

        // Extract list of companies for the current year (2024)
       
   // Assuming '2023' and '2024' are the years of interest
const yearsOfInterest = ['2023', '2024'];



  
        res.render('form', { message: '', companies: companies, years: years, months: months });
    });
});

app.get('/data', (req, res) => {
    // Read data from JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        // Parse JSON data
         jsonData = JSON.parse(data);

        // Render index.ejs with the JSON data
        res.render('data', { companiesData: jsonData });
    });
});

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    // Extract form data
    const { company, year, month,Rice,Dal,Sugar } = req.body;

    // Read current data from JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        // Parse JSON data
        let jsonData = JSON.parse(data);

        // Check if the year exists
        if (!jsonData.years[year]) {
            return res.status(404).json({ error: 'Year not found' });
        }

        // Check if the company exists for the specified year
        let companyExists = false;
        for (let i = 0; i < jsonData.years[year].companies.length; i++) {
            const companyNameInData = jsonData.years[year].companies[i].name;
            const companyNameFromForm = company; // Assuming `company` is the variable holding the form's company name
        
            // Check if the companyNameInData contains the year in the form of 'companyname(year)'
            if (companyNameInData.includes(companyNameFromForm)) {
                // Match found, proceed with your logic here
                // Example:
               
                companyExists = true;

                // Check if data for the month already exists
                if (jsonData.years[year].companies[i].data[month]) {
                    return res.render('form', { message: 'Data for this month already exists!', companies: companies, years: years, months: months });
                } else {
                    // Add new data for the month
                    jsonData.years[year].companies[i].data[month] = {
                        Rice: parseInt(Rice),
                        Dal: parseFloat(Dal),
                        Sugar: parseInt(Sugar)
                    };
                }
                break;
            }
        }

        // If company does not exist, respond with an error
        if (!companyExists) {
            return res.render('form', { message: 'Company not found', companies: companies, years: years, months: months });
        }

        // Write updated data back to JSON file
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing data:', err);
                res.status(500).json({ error: 'Error writing data' });
                return;
            }

            // Respond with success message
            res.render('data', { companiesData: jsonData });
        });
    });
});


app.get('/data/RS1', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        const jsonData = JSON.parse(data);
        
        const years = ['2023', '2024'];

        for (const year of years) {
            if (jsonData.years[year]) {
                const companyData = jsonData.years[year].companies.find(company => company.name.includes('RS1'));
                if (companyData) {
                    sk1Data[year] = companyData.data;
                }
            }
        }

        // console.log('sk1 data for 2023 and 2024:', sk1Data);

        res.render('RS1', { sk1Data });
    });
});




app.get('/data/RS2', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        const jsonData = JSON.parse(data);
        // const sk2Data = {};
        const years = ['2023', '2024'];

        for (const year of years) {
            if (jsonData.years[year]) {
                const companyData = jsonData.years[year].companies.find(company => company.name.includes('RS2'));
                if (companyData) {
                    sk2Data[year] = companyData.data;
                }
            }
        }

        // console.log('sk1 data for 2023 and 2024:', sk1Data);

        res.render('RS2', { sk2Data });
    });
});



app.get('/data/RS3', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        const jsonData = JSON.parse(data);
        // const sk3Data = {};
        const years = ['2023', '2024'];

        for (const year of years) {
            if (jsonData.years[year]) {
                const companyData = jsonData.years[year].companies.find(company => company.name.includes('RS3'));
                if (companyData) {
                    sk3Data[year] = companyData.data;
                }
            }
        }

        // console.log('sk1 data for 2023 and 2024:', sk1Data);

        res.render('RS3', { sk3Data });
    });
});



app.get('/data/RS4', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        const jsonData = JSON.parse(data);
        // const sk4Data = {};
        const years = ['2023', '2024'];

        for (const year of years) {
            if (jsonData.years[year]) {
                const companyData = jsonData.years[year].companies.find(company => company.name.includes('RS4'));
                if (companyData) {
                    sk4Data[year] = companyData.data;
                }
            }
        }

        // console.log('sk1 data for 2023 and 2024:', sk1Data);

        res.render('RS4', { sk4Data });
    });
});



app.get('/data/RS5', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ error: 'Error reading data' });
            return;
        }

        const jsonData = JSON.parse(data);
        // const sk5Data = {};
        const years = ['2023', '2024'];

        for (const year of years) {
            if (jsonData.years[year]) {
                const companyData = jsonData.years[year].companies.find(company => company.name.includes('RS5'));
                if (companyData) {
                    sk5Data[year] = companyData.data;
                }
            }
        }

        // console.log('sk1 data for 2023 and 2024:', sk1Data);

        res.render('RS5', { sk5Data });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body); // Log the request body to inspect received data

    // Trim whitespace from username and password
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check credentials
    if (trimmedUsername.toLowerCase() === 'rscentral.2024@gmail.com' && trimmedPassword === 'RSC@2024') {
        res.json({ success: true, redirectUrl: '/data' });
    } else if (trimmedUsername.toLowerCase() === 'rssub1.2024@gmail.com' && trimmedPassword === 'RSS1@2024') {
        res.json({ success: true, redirectUrl: '/data/RS1' });
    } else if (trimmedUsername.toLowerCase() === 'rssub2.2024@gmail.com' && trimmedPassword === 'RSS2@2024') {
        res.json({ success: true, redirectUrl: '/data/RS2' });
    } else if (trimmedUsername.toLowerCase() === 'rssub3.2024@gmail.com' && trimmedPassword === 'RSS3@2024') {
        res.json({ success: true, redirectUrl: '/data/RS3' });
    } else if (trimmedUsername.toLowerCase() === 'rssub4.2024@gmail.com' && trimmedPassword === 'RSS4@2024') {
        res.json({ success: true, redirectUrl: '/data/RS4' });
    } else if (trimmedUsername.toLowerCase() === 'rssub5.2024@gmail.com' && trimmedPassword === 'RSS5@2024') {
        res.json({ success: true, redirectUrl: '/data/RS5' });
    } else {
        res.json({ success: false, message: 'Wrong username or password. Please try again.' });
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
