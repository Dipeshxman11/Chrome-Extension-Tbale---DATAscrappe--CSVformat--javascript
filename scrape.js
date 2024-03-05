// This script contains the logic to scrape data from a specific HTML table on the webpage

let table = document.getElementById('student-table');
let data = [];

if (table) {
  for (let i = 0; i < table.rows.length; i++) {
    let rowData = [];
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      rowData.push(table.rows[i].cells[j].innerText);
      
    }
    data.push(rowData);
  }
  console.log(data);
}

