const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');

const dbPath = path.resolve(__dirname, 'database.sqlite')
var knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: dbPath
	}
});

app.on("ready", () => {
    const modalPath = path.join('file://', __dirname, 'main.html')
    let mainWindow = new BrowserWindow({ 
		height: 800, 
		width: 1250, 
		show: false,
		webPreferences: {
			nodeIntegration: true
        }
	})
	mainWindow.loadURL(modalPath);
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("FirstName").from("User");
		result.then(function(rows){
			mainWindow.webContents.send("resultSent", rows);
		})
	});

	ipcMain.on("invoiceData", function(event, arg){
		console.log(arg);
		knex('invoices').insert({
			invoice_id: arg["invNumber"],
			customer: arg["customer"],
			issue_date: arg["createdDate"],
			due_date: arg["dueDate"],
			discount: arg["discount"]
		}).then(() => console.log("data inserted"));
	})
});



app.on("window-all-closed", () => { app.quit() })