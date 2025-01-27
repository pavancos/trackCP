import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

async function batchReportToXlsx(batchData, title) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Batch-Report-trackcode');

  // Title Row
  worksheet.mergeCells('A1:T1'); // Adjust based on total columns
  const titleCell = worksheet.getCell('A1');
  titleCell.value = title;
  titleCell.font = { bold: true, size: 16 };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Headers
  const headers = [
    { header: 'Roll No', key: 'rollNo', span: 2, width: 12 },
    { header: 'Name', key: 'name', span: 2, width: 28 },
    { header: 'Branch', key: 'branch', span: 2, width: 15 },
    { header: 'Year', key: 'year', span: 2, width: 10 },
    { header: 'Total Score', key: 'totalScore', span: 2, width: 18 },
    { header: 'Leetcode', key: 'leetcode', subHeaders: ['Total PS', 'Rating', 'Contests', 'Score'], widths: [12, 12, 12, 12] },
    { header: 'Codechef', key: 'codechef', subHeaders: ['Total PS', 'Rating', 'Contests', 'Score'], widths: [12, 12, 12, 12] },
    { header: 'Codeforces', key: 'codeforces', subHeaders: ['Total PS', 'Rating', 'Contests', 'Score'], widths: [12, 12, 12, 12] },
    { header: 'Interviewbit', key: 'interviewbit', subHeaders: ['Total PS', 'Platform Score', 'Score'], widths: [12, 20, 12] }
  ];

  // Prepare column merging for header rows and set widths
  let colIndex = 1;
  headers.forEach((header) => {
    if (header.span) {
      worksheet.mergeCells(2, colIndex, 3, colIndex);
      const cell = worksheet.getCell(2, colIndex);
      cell.value = header.header;
      cell.alignment = { horizontal: 'center', vertical: 'middle' };

      // Set column width
      worksheet.getColumn(colIndex).width = header.width;
      colIndex += 1;
    } else if (header.subHeaders) {
      const subHeaderCount = header.subHeaders.length;
      worksheet.mergeCells(2, colIndex, 2, colIndex + subHeaderCount - 1);
      const cell = worksheet.getCell(2, colIndex);
      cell.value = header.header;
      cell.alignment = { horizontal: 'center', vertical: 'middle' };

      header.subHeaders.forEach((subHeader, i) => {
        const subCell = worksheet.getCell(3, colIndex + i);
        subCell.value = subHeader;
        subCell.alignment = { horizontal: 'center', vertical: 'middle' };

        // Set column width for each sub-header
        worksheet.getColumn(colIndex + i).width = header.widths[i];
      });

      colIndex += subHeaderCount;
    }
  });

  // Add Borders to Header Rows
  worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
    if (rowIndex === 2 || rowIndex === 3) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }
  });

  // Add Data Rows
  batchData.forEach((data) => {
    const rowData = [
      data.rollNo,
      data.name,
      data.branch,
      data.year,
      data.totalScore,
      data.leetcode.TotalProblemsSolved,
      data.leetcode.rating,
      data.leetcode.contests,
      data.leetcode.score,
      data.codechef.TotalProblemsSolved,
      data.codechef.rating,
      data.codechef.contests,
      data.codechef.score,
      data.codeforces.TotalProblemsSolved,
      data.codeforces.rating,
      data.codeforces.contests,
      data.codeforces.score,
      data.interviewbit.TotalProblemsSolved,
      data.interviewbit.platformScore,
      data.interviewbit.score
    ];
    worksheet.addRow(rowData);
  });

  // Save to File
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `Batch-Report-${title}.xlsx`);
}

export default batchReportToXlsx;
