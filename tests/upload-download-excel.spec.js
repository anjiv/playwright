const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = await readExcelTest(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.col+change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcelTest(worksheet, searchText) {
  let output = {row: -1, col: -1};
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);

      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}

test('upload and download excel', async ({page}) => {
  const textsearch = 'Mango';
  const updateValue = '350';
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html/');
  const download = page.waitForEvent('download'); // This will wait for the download to start.
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await download; // This will wait for the download to complete.
  const filePath = await dl.path(); // This will return the path of the downloaded file.
  await writeExcelTest(textsearch, updateValue, {rowChange: 0, colChange: 2}, filePath);
  await page.locator('#fileinput').click();
  // This will work only if the type=file is present in the input field.
  await page.locator('#fileinput').setInputFiles(filePath);
  const textLocator = await page.getByText(textsearch);
  const desiredRow = await page.getByRole('row').filter({ has: textLocator });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});
