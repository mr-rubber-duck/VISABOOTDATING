const express = require('express');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // To parse JSON requests

const PORT = process.env.PORT || 3000;

// Define the route to check availability and book the appointment
app.post('/bookAppointment', async (req, res) => {
    const { name, email, date, telegramLink } = req.body;
    
    try {
        const result = await checkAvailabilityAndBook(date);
        
        if (result.success) {
            sendNotification(email, telegramLink, 'Appointment booked successfully!');
            return res.json({ success: true, message: 'Appointment booked!' });
        } else {
            return res.json({ success: false, message: 'No availability found.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.json({ success: false, message: 'An error occurred.' });
    }
});

// Check availability and book the appointment using Puppeteer
async function checkAvailabilityAndBook(date) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://example.com'); // Replace with ITS Contact URL

    // Example of how you might check availability
    const isAvailable = await page.evaluate((date) => {
        // Add logic to check if the date is available
        return document.querySelector('.available-date') !== null; // Modify based on actual website
    }, date);

    if (isAvailable) {
        await page.type('#name', 'John Doe');
        await page.type('#email', 'john@example.com');
        await page.click('#submit'); // Modify based on actual form element
        await page.waitForNavigation();
        await browser.close();
        return { success: true };
    } else {
        await browser.close();
        return { success: false };
    }
}

// Send notification (e.g., via email)
function sendNotification(email, telegramLink, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password',   // Replace with your email password or app-specific password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Appointment Booking Status',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
