// Listen for messages from the extension
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    // Check if the action is to execute scraping
    if (request.action === 'executeScraping') {
        // Check if the Chrome version is supported
        const isSupportedChromeVersion = checkChromeVersion();

        if (!isSupportedChromeVersion) {
            alert('This Chrome version is not supported. Please update to version 59.0.307 or higher.');
            return;
        }

        // Get the table element from the page
        const table = getTable();

        if (table) {
            // Get the rows of the table
            let rows = getRows(table);

            // Limit rows to the first 10 if there are more than 10
            if (rows.length > 10) {
                rows = rows.slice(0, 10);
                alert('The table contains more than 10 rows. Only the first 10 rows will be included in the CSV.');
            }

            // Generate CSV content from the rows
            const csvContent = generateCSVContent(rows);

            // Create a Blob containing the CSV data
            const blob = new Blob([csvContent], { type: 'text/csv' });

            // Trigger the download of the CSV file
            await downloadCSV(blob, 'table_data.csv');
        } else {
            alert('No table found on the active tab');
        }
    }
});

// Function to check if the Chrome version is supported
function checkChromeVersion() {
    const chromeVersion = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return chromeVersion && parseInt(chromeVersion[2], 10) >= 59;
}

// Function to get the table element from the page
function getTable() {
    return document.querySelector('table');
}

// Function to get the rows of the table
function getRows(table) {
    return Array.from(table.querySelectorAll('tr'));
}

// Function to generate CSV content from the rows of the table
function generateCSVContent(rows) {
    return rows.map(row => {
        const rowData = Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent);
        return rowData.join(',');
    }).join('\n');
}

// Function to trigger the download of the CSV file
function downloadCSV(blob, fileName) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Simulate a click to trigger the download
        link.click();

        // Cleanup
        URL.revokeObjectURL(link.href);

        resolve();
    });
}
