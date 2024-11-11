const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/icons/app-icon.png') // Add your app icon
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// TELEGRAM
// 
const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_BOT_TOKEN';  // Replace with your bot's token
const bot = new TelegramBot(token, { polling: true });

function sendNotification(message) {
  bot.sendMessage('YOUR_TELEGRAM_CHAT_ID', message); // Replace with your chat ID
}

// Example: Send success message when an appointment is booked
sendNotification('Appointment successfully booked!');
