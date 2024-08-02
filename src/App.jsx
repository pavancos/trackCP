import { useEffect, useState, Suspense } from 'react'
import { Students } from './DataBase/Students.json'
import { LeetCode } from "leetcode-query";
import './App.css'
import { get, set, useForm } from 'react-hook-form';
import Table from './components/Table';
import PrintButton from './components/PrintButton';
import html2pdf from 'html2pdf.js';
import { writeFile, utils } from 'xlsx';
import * as XLSX from 'xlsx';

function App() {
  const { register, handleSubmit } = useForm();
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);


  const todayDate = new Date();
  const oneWeekAgoDate = new Date(todayDate);
  oneWeekAgoDate.setDate(todayDate.getDate() - 7);
  const todayFormatted = todayDate.toISOString().split('T')[0];
  const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
  const ccDateFormat = todayDate.toISOString().split(' ')[0];


  async function getstudentInfo() {
    let studentsDataFromAPI = await fetch(`https://getdata-contests.vercel.app/getAllData`);
    let studentsData = await studentsDataFromAPI.json();
    // console.log('studentsData: ', studentsData);
    setstudentsInfo(studentsData);
    // console.log("useEffect Invoked");
  }

  useEffect(() => {
    getstudentInfo()
  }, [])


  async function handleFormSubmit(dataFromForm) {

    console.log('dataFromForm: ', dataFromForm);
    // FILTER STUDENTS ACCORDING TO ROLL NO ACCORDING TO LAST 2 VALUES
    let fromRoll = dataFromForm.fromroll;
    let toRoll = dataFromForm.toroll;
    let students = studentsInfo.filter((student) => {
      let roll = student.roll;

      let rollNo = roll.split('A')[1];
      return rollNo >= fromRoll.split('A')[1] && rollNo <= toRoll.split('A')[1];
    });
    // console.log('students: ', students);
    let filteredContests = students.map(async (student, index) => {

      return {
        student,
        contests: {
          leetcode: filterLeetcode(dataFromForm.from, dataFromForm.to, student.leetcode.data.userContestRankingHistory),
          // codechef: filteCodechef(dataFromForm.from, dataFromForm.to, codechef),
          codeforces: filterCodeforces(dataFromForm.from, dataFromForm.to, student.codeforces.attendedContests)
        }
      };
    });
    filteredContests = await Promise.all(filteredContests);
    console.log('filteredContests: ', filteredContests);
    setFilteredContests(filteredContests);

  }

  // -> Filter Logics

  function filterLeetcode(fromDate, toDate, contestsData) {
    // console.log('contestsData: ', contestsData);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let filteredContests = contestsData.filter((contest) => {
      let date = new Date(contest.contest.startTime * 1000);
      return date >= startDate && date <= endDate;
    })
    return filteredContests
  }

  function filterCodeforces(fromDate, toDate, contestsData) {
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let filteredContests = contestsData.filter((contest) => {
      let date = new Date(contest.ratingUpdateTimeSeconds * 1000);
      return date >= startDate && date <= endDate;
    });
    return filteredContests
  }

  const downloadPDF = () => {
    const element = document.getElementById('table-to-pdf');
    const options = {
      margin: 0.5,
      filename: 'table-data.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'tabloid', orientation: 'landscape' }
    };

    html2pdf().from(element).set(options).save();
  };

  // const exportToExcel = () => {
  //   const dataToExport = filteredContests.map(item => {
  //     return {
  //       Name: item.student.name,
  //       RollNo: item.student.roll,
  //       // Leetcode Contest Details
  //       LeetcodeProblemsSolved: item.contests.leetcode.map(

  //       ),
  //       LeetcodeTotalProblems: item.contests.leetcode.map(contest => contest.totalProblems).join(', '),
  //       LeetcodeDate: item.contests.leetcode.map(contest => new Date(contest.contest.startTime * 1000).toDateString()).join(', '),
  //       // Codeforces Contest Details
  //       CodeforcesContestName: item.contests.codeforces.map(contest => contest.contestName),
  //       CodeforcesRank: item.contests.codeforces.map(contest => contest.rank).join(', '),
  //       CodeforcesProblemsSolved: item.contests.codeforces.map(contest => contest.problemsSolved).join(', '),
  //       CodeforcesDate: item.contests.codeforces.map(contest => new Date(contest.ratingUpdateTimeSeconds * 1000).toDateString()).join(', ')
  //     };
  //   });


  // const exportToExcel = () => {
  //   const workbook = XLSX.utils.book_new();
  //   const dataToExport = [];
  //   let headerRow = {
  //     RollNo: "Roll No",
  //     Name: "Student Name",
  //     ContestName: "Contest Name",
  //     Rank: "Rank",
  //     ProblemsSolved: "Problems Solved",
  //     TotalProblems: "Total Problems",
  //     Date: "Date"
  //   }
  //   dataToExport.push(headerRow);

  //   filteredContests.forEach(({ student, contests }) => {
  //     let newLeetCodeContests = contests.leetcode;
  //     if (contests.leetcode.length > 0) {

  //       const studentRow = {
  //         RollNo: student.roll,
  //         Name: student.name,
  //         ContestName: '' + contests.leetcode[0].contest.title,
  //         Rank: '' + contests.leetcode[0].ranking,
  //         ProblemsSolved: '' + contests.leetcode[0].problemsSolved,
  //         TotalProblems: '' + contests.leetcode[0].totalProblems,
  //         Date: '' + new Date(contests.leetcode[0].contest.startTime * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  //       };

  //       dataToExport.push(studentRow);
  //       newLeetCodeContests = contests.leetcode.slice(1);
  //     }
      

  //     const leetcodeContests = newLeetCodeContests.map((contest) => {
  //       console
  //       return(
        
  //         {
  //           RollNo: '',
  //           Name: '',
  //           ContestName: contest.contest.title,
  //           Rank: contest.ranking,
  //           ProblemsSolved: contest.problemsSolved,
  //           TotalProblems: contest.totalProblems,
  //           Date: new Date(contest.contest.startTime * 1000).toLocaleDateString('en-IN', {
  //             day: '2-digit',
  //             month: '2-digit',
  //             year: 'numeric',
  //           }),
  //         }
  //       )});

  //     const codeforcesContests = contests.codeforces.map((contest) => ({
  //       RollNo: '',
  //       Name: '',
  //       ContestName: contest.contestName,
  //       Rank: contest.rank,
  //       ProblemsSolved: contest.problemsSolved,
  //       TotalProblems: '',
  //       Date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-IN', {
  //         day: '2-digit',
  //         month: '2-digit',
  //         year: 'numeric',
  //       }),
  //     }));

  //     dataToExport.push(...leetcodeContests, ...codeforcesContests);
  //   });

  //   const worksheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: true });
  //   const mergeCells = [];

  //   let currentRow = 1;
  //   filteredContests.forEach(({ student, contests }) => {
  //     const totalRows = contests.leetcode.length + contests.codeforces.length;

  //     if (totalRows > 0) {
  //       mergeCells.push({
  //         s: { r: currentRow, c: 0 },
  //         e: { r: currentRow + totalRows - 1, c: 0 },
  //       });
  //       mergeCells.push({
  //         s: { r: currentRow, c: 1 },
  //         e: { r: currentRow + totalRows - 1, c: 1 },
  //       });
  //     }

  //     currentRow += totalRows + 1;
  //   });

  //   worksheet['!merges'] = mergeCells;
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Contests');
  //   XLSX.writeFile(workbook, 'Contests.xlsx');
  // };



  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const dataToExport = [];
    let headerRow={
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

    worksheet['!merges'] = mergeCells;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contests');
    XLSX.writeFile(workbook, 'Contests.xlsx');
  };



  return (
    <>
      <div className="m-5" id='table-to-pdf'>
        <h1 className="text-2xl font-bold text-blue-700 text-center">Contest Tracker</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4">
          <div className="flex-row flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="from" className="block text-sm font-medium text-blue-700">From</label>
              <input type="date" id="from" defaultValue={oneWeekAgoFormatted} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('from')} />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="to" className="block text-sm font-medium text-blue-700">To</label>
              <input type="date" id="to" defaultValue={todayFormatted} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('to')} />
            </div>
          </div>
          <div className="flex-row flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="fromroll" className="block text-sm font-medium text-blue-700">From Roll No</label>
              <input type="text" id="fromroll" defaultValue="22501A05D4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('fromroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="toroll" className="block text-sm font-medium text-blue-700">To Roll No</label>
              <input type="text" id="toroll" defaultValue="22501A05J8" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('toroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <button
          onClick={exportToExcel}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Download Xlsx
        </button>
        {/* <PrintButton></PrintButton> */}




        <Table data={filteredContests} />
      </div>
    </>
  )
}

export default App
