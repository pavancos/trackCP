import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

async function exportToExcel(filteredContests, whtplatform) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contests');

    // Add Header Row
    worksheet.columns = [
        { header: 'Roll No', key: 'rollNo', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 30 },
        { header: 'Contest Name', key: 'contestName', width: 40 },
        { header: 'Rank', key: 'rank', width: 10 },
        { header: 'Problems Solved', key: 'problemsSolved', width: 20 },
        // { header: 'Total Problems', key: 'totalProblems', width: 20 },
        { header: 'Date', key: 'date', width: 15 }
    ];

    const headerRow = worksheet.getRow(1);

    headerRow.font = { bold: true };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D3D3D3' }, // Grey background for header
    };
    headerRow.eachCell((cell) => {
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
        };
    });

    // Format date function
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Format Codechef Date
    const formatCodechefDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    // Add data rows
    filteredContests.forEach(({ student, contests }) => {
        const studentRollNo = student.roll;
        const studentName = student.name;
        let isFirstRow = true;

        if (whtplatform === 'leetcode' || whtplatform === 'all') {
            contests.leetcode.forEach((contest) => {
                worksheet.addRow({
                    rollNo: isFirstRow ? studentRollNo : '',
                    studentName: isFirstRow ? studentName : '',
                    contestName: contest.contest.title,
                    rank: contest.ranking,
                    problemsSolved: contest.problemsSolved,
                    // totalProblems: contest.totalProblems,
                    date: formatDate(contest.contest.startTime)
                });
                isFirstRow = false;
            });
        }

        if (whtplatform === 'codeforces' || whtplatform === 'all') {
            contests.codeforces.forEach((contest) => {
                worksheet.addRow({
                    rollNo: isFirstRow ? studentRollNo : '',
                    studentName: isFirstRow ? studentName : '',
                    contestName: contest.contestName,
                    rank: contest.rank,
                    problemsSolved: contest.problemsSolved,
                    // totalProblems: '',
                    date: formatDate(contest.ratingUpdateTimeSeconds)
                });
                isFirstRow = false;
            });
        }

        if (whtplatform === 'codechef' || whtplatform === 'all') {
            contests.codechef.forEach((contest) => {
                worksheet.addRow({
                    rollNo: isFirstRow ? studentRollNo : '',
                    studentName: isFirstRow ? studentName : '',
                    contestName: contest.name,
                    rank: contest.rank,
                    problemsSolved: contest.noOfProblems,
                    // totalProblems: '',
                    date: formatCodechefDate(contest.end_date.split(' ')[0])
                });
                isFirstRow = false;
            });
        }
    });

    // align cells
    worksheet.getColumn('rollNo').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getColumn('studentName').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getColumn('problemsSolved').alignment = { horizontal: 'center' };
    // worksheet.getColumn('totalProblems').alignment = { horizontal: 'center' };
    worksheet.getColumn('rank').alignment = { horizontal: 'center' };
    worksheet.getColumn('date').alignment = { horizontal: 'center' };

    // merging cells
    let startRow = 2;
    filteredContests.forEach(({ contests }) => {
        const totalRows = contests.leetcode.length + contests.codeforces.length + contests.codechef.length;
        if (totalRows > 1) {
            worksheet.mergeCells(`A${startRow}:A${startRow + totalRows - 1}`);
            worksheet.mergeCells(`B${startRow}:B${startRow + totalRows - 1}`);
        }
        startRow += totalRows;
    });

    // Save the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Contests.xlsx');
}

export default exportToExcel;
