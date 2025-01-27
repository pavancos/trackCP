import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

async function usernamesToXlsx(students, year, branch) {
    console.log('students: ', students);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Username-trackcode');

    // Add Header Row for the Table
    worksheet.columns = [
        { header: 'Roll No', key: 'rollNo', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 30 },
        { header: 'Leetcode Username', key: 'leetcode', width: 20 },
        { header: 'Codechef Username', key: 'codechef', width: 20 },
        { header: 'Codeforces Username', key: 'codeforces', width: 20 },
        { header: 'Interviewbit Username', key: 'interviewbit', width: 20 },
        { header: 'HackerRank Username', key: 'hackerrank', width: 20 },
        { header: 'SPOJ Username', key: 'spoj', width: 20 }
    ];

    // Apply styles to header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D3D3D3' } // Grey background for the header
    };
    headerRow.eachCell(cell => {
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        };
    });

    // Add student data rows
    students.forEach(student => {
        worksheet.addRow({
            rollNo: student.rollNo,
            studentName: student.name,
            leetcode: student.leetcode.username || '',
            codechef: student.codechef.username || '',
            codeforces: student.codeforces.username || '',
            interviewbit: student.interviewbit.username || '',
            hackerrank: student.hackerrank || '',
            spoj: student.spoj || ''
        });
    });

    // Save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
        new Blob([buffer]),
        `Usernames-${year}-${branch}-Students.xlsx`
    );
}

export default usernamesToXlsx;
