import * as XLSX from 'xlsx';

function preventDefault() {
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function (type, listener, options) {
        if (type === 'beforeprint') {
            return;
        }
        originalAddEventListener.apply(document, arguments);
    };
}

function exportToExcel(filteredContests){
    const workbook = XLSX.utils.book_new();
    const dataToExport = [];
    let headerRow = {
        RollNo: "Roll No",
        Name: "Student Name",
        ContestName: "Contest Name",
        Rank: "Rank",
        ProblemsSolved: "Problems Solved",
        TotalProblems: "Total Problems",
        Date: "Date"
    }
    dataToExport.push(headerRow);
    filteredContests.forEach(({ student, contests }) => {
        const studentRow = {
            RollNo: student.roll,
            Name: student.name,
            ContestName: '',
            Rank: '',
            ProblemsSolved: '',
            TotalProblems: '',
            Date: '',
        };

        dataToExport.push(studentRow);
        // const newLeetCodeContests = contests.leetcode.slice(1);

        const leetcodeContests = contests.leetcode.map((contest) => ({
            RollNo: '',
            Name: '',
            ContestName: contest.contest.title,
            Rank: contest.ranking,
            ProblemsSolved: contest.problemsSolved,
            TotalProblems: contest.totalProblems,
            Date: new Date(contest.contest.startTime * 1000).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
        }));

        const codeforcesContests = contests.codeforces.map((contest) => ({
            RollNo: '',
            Name: '',
            ContestName: contest.contestName,
            Rank: contest.rank,
            ProblemsSolved: contest.problemsSolved,
            TotalProblems: '',
            Date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
        }));

        dataToExport.push(...leetcodeContests, ...codeforcesContests);
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: true });
    const mergeCells = [];

    let currentRow = 1;
    filteredContests.forEach(({ student, contests }) => {
        const totalRows = contests.leetcode.length + contests.codeforces.length;

        if (totalRows > 0) {
            mergeCells.push({
                s: { r: currentRow, c: 0 },
                e: { r: currentRow + totalRows - 1, c: 0 },
            });
            mergeCells.push({
                s: { r: currentRow, c: 1 },
                e: { r: currentRow + totalRows - 1, c: 1 },
            });
        }

        currentRow += totalRows + 1;
    });
    console.log("download")

    worksheet['!merges'] = mergeCells;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contests');
    XLSX.writeFile(workbook, 'Contests.xlsx');
};

export default exportToExcel;