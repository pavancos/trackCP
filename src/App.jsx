import { useEffect, useState, Suspense } from 'react'
import { Students } from './DataBase/Students.json'
import { LeetCode } from "leetcode-query";
import './App.css'
import { set, useForm } from 'react-hook-form';
import LeetcodeTable from './components/LeetcodeTable';
import PrintButton from './components/PrintButton';
import html2pdf from 'html2pdf.js';

function App() {
  const { register, handleSubmit } = useForm();
  const [students, setStudents] = useState(Students);
  const [filteredLeetcodeContests, setFilteredLeetcodeContests] = useState([]);
  const [filteredCodechefContests, setFilteredCodechefContests] = useState([]);
  const { LeetcodeContests, setLeetcodeContests } = useState([]);
  const { CodechefContests, setCodechefContests } = useState([]);
  const { CodeforcesContests, setCodeforcesContests } = useState([]);



  const [contests, setContests] = useState([]);
  const [codeChefContestHistory, setcodeChefContestHistory] = useState([]);
  const [leetCodeContestHistory, setleetCodeContestHistory] = useState([]);
  const [codeForcesContestHistory, setcodeForcesContestHistory] = useState([]);
  const todayDate = new Date();
  const oneWeekAgoDate = new Date(todayDate);
  oneWeekAgoDate.setDate(todayDate.getDate() - 7);
  const todayFormatted = todayDate.toISOString().split('T')[0];
  const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
  const ccDateFormat = todayDate.toISOString().split(' ')[0];


  //console log students
  useEffect(() => {
    console.log(students)
  }, [students])




  // LeetCode Contest History
  async function getLeetCodeContestHistory(username) {
    // let urlAPI = `http://localhost:3000/${username}/contest/history`;
    // let urlAPI = `https://alfa-leetcode-api.onrender.com/${username}/contest/history`
    try {
      let body = await fetch(`http://localhost:3000/${username}/contest/history`);
      let res = await body.json();
      // console.log(res.contestHistory)
      let allContests = res.contestHistory;
      let attendedContests = allContests.filter((contest) => contest.attended == true);
      // console.log("LeetCode ->", username, attendedContests)

      // Reverse the array to get the latest contest firs
      attendedContests = attendedContests.reverse();

      return attendedContests;
    } catch (err) {
      console.log(err)
    }

  }

  // CodeChef Contest History
  async function getCodeChefContestHistory(username) {
    try {
      let body = await fetch(`https://codechef-api.vercel.app/${username}`);
      let res = await body.json();
      let allContests = res.ratingData;
      let attendedContests = allContests.reverse();
      // console.log(`Code Chef -> ${username}`, attendedContests)
      return attendedContests;

    } catch (err) {
      console.log(err)
    }
  }

  // CodeForces Contest History
  async function getCodeForcesContestHistory(username) {
    try {
      let body = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
      let res = await body.json();
      let allContests = res.result;
      let attendedContests = allContests.reverse();
      // console.log(`Code Forces -> ${username}`, attendedContests)
      // filterFromDate(attendedContests)

      return attendedContests;
    } catch (err) {
      console.log(err)
    }
  }

  // Get total problems in Codeforces contest
  async function getTotalProblems(contestId) {
    try {
      let body = await fetch(`https://codeforces.com/api/contest.standings/?contestId=${contestId}&from=1&count=1`);
      let res = await body.json();
      let total = res.result.problems.length;
      return total;
    } catch (err) {
      console.log(err);
    }
  }


  // Get Solved problems in Codeforces contest
  async function getSolved(username, contestId) {
    try {
      let body = await fetch(`https://codeforces.com/api/contest.status?handle=${username}&contestId=${contestId}`);
      let res = await body.json();
      res.result = res.result.filter((problem) => problem.verdict == "OK");
      let solved = res.result.length;
      return solved;
    } catch (err) {
      console.log(err);
    }
  }

  // // Get codeChef Contest History of all students
  useEffect(() => {
    students.map(async (student) => {
      let codeChefContestHistory = await getCodeChefContestHistory(student.codechef);
      setcodeChefContestHistory((prev) => [...prev, codeChefContestHistory]);
    })
  }, [students])

  // Get LeetCode Contest History of all students
  useEffect(() => {
    students.map(async (student) => {
      let leetCodeContestHistory = await getLeetCodeContestHistory(student.leetcode);
      setleetCodeContestHistory((prev) => [...prev, leetCodeContestHistory]);
    })
  }, [students])

  // Get CodeForces Contest History of all students
  useEffect(() => {
    students.map(async (student) => {
      let codeForcesContestHistory = await getCodeForcesContestHistory(student.codeforces);
      setcodeForcesContestHistory((prev) => [...prev, codeForcesContestHistory]);
    })
  }, [])


  async function handleFormSubmit(dates) {
    console.log('dates: ', dates);
    // FILTER STUDENTS ACCORDING TO ROLL NO ACCORDING TO LAST 2 VALUES
    let fromRoll = dates.fromroll;
    let toRoll = dates.toroll;
    let students = Students.filter((student) => {
      let roll = student.roll;
      let rollNo = roll.split('A')[1];
      return rollNo >= fromRoll.split('A')[1] && rollNo <= toRoll.split('A')[1];
    });
    let filteredContests = students.map(async (student, index) => {
      let leetcode = await getLeetCodeContestHistory(student.leetcode);
      let codechef = await getCodeChefContestHistory(student.codechef);
      let codeforces = await getCodeForcesContestHistory(student.codeforces);


      // console.log('leetcode: ', leetcode);
      // console.log('codechef: ', codechef);
      // console.log('codeforces: ', codeforces);
      return {
        student,
        contests: {
          leetcode: filterLeetcode(dates.from, dates.to, leetcode),
          codechef: filteCodechef(dates.from, dates.to, codechef),
          codeforces: filterCodeforces(dates.from, dates.to, codeforces, student.codeforces)
        }
      };
    });
    filteredContests = await Promise.all(filteredContests);
    console.log('filteredContests: ', filteredContests);
    setFilteredLeetcodeContests(filteredContests);

  }

  function filteCodechef(fromDate, toDate, contestsData) {
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let filteredContests = contestsData.filter((contest) => {
      let date = new Date(contest.end_date.split(' ')[0]);
      return date >= startDate && date <= endDate;
    })

    return filteredContests
  }

  function filterLeetcode(fromDate, toDate, contestsData) {
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
    // filteredContests = filteredContests.map((contest) => {
    //   let tmp = contest;
    //   let total = getTotalProblems(contest.contestId);
    //   total.then((res) => {
    //     tmp.total = res;
    //   });
    //   let solved = getSolved(contest.handle, contest.contestId);
    //   solved.then((res) => {
    //     tmp.solved = res;
    //   });
    //   return tmp;
    // });
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
              <input type="text" id="fromroll" defaultValue="22501A05E0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('fromroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="toroll" className="block text-sm font-medium text-blue-700">To Roll No</label>
              <input type="text" id="toroll" defaultValue="22501A05G1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('toroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
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
          onClick={downloadPDF}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Download PDF
        </button>
        {/* <PrintButton></PrintButton> */}




        <LeetcodeTable data={filteredLeetcodeContests} />
      </div>
    </>
  )
}

export default App
