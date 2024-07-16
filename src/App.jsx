import { useEffect, useState, Suspense } from 'react'
import { Students } from './DataBase/Students.json'
import { LeetCode } from "leetcode-query";
import './App.css'
import { set, useForm } from 'react-hook-form';
import LeetcodeTable from './components/LeetcodeTable';

function App() {
  const { register, handleSubmit } = useForm();
  const [students, setStudents] = useState(Students);
  const [filteredLeetcodeContests, setFilteredLeetcodeContests] = useState([]);
  const [filteredCodechefContests, setFilteredCodechefContests] = useState([]);



  const [contests, setContests] = useState([]);
  const [codeChefContestHistory, setcodeChefContestHistory] = useState([]);
  const [leetCodeContestHistory, setleetCodeContestHistory] = useState([]);
  const [codeForcesContestHistory, setcodeForcesContestHistory] = useState([]);
  const todayDate = new Date();
  const todayFormatted = todayDate.toISOString().split('T')[0];
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
  useEffect(()=>{
    students.map(async (student)=>{
      let codeForcesContestHistory = await getCodeForcesContestHistory(student.codeforces);
      setcodeForcesContestHistory((prev)=>[...prev,codeForcesContestHistory]);
    })
  },[])


  async function handleFormSubmit(dates) {
    console.log('dates: ', dates);
    const filteredContests = students.map((student, index) => {
      return {
        student,
        contests: {
          leetcode: filterLeetcode(dates.from, dates.to, leetCodeContestHistory[index]),
          codechef: filteCodechef(dates.from, dates.to, codeChefContestHistory[index]),
          codeforces: filterCodeforces(dates.from, dates.to, codeForcesContestHistory[index])
        }
      };
    });
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
    })
    return filteredContests
  }

  return (
    <>
      <div className="m-5">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4">
          <div className='flex-row flex justify-between'>
            <div className="mb-4">
              <label htmlFor="from" className="block text-sm font-medium text-blue-700">From</label>
              <input type="date" id="from" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('from')} />
            </div>
            <div className="mb-4">
              <label htmlFor="to" className="block text-sm font-medium text-blue-700">To</label>
              <input type="date" id="to" defaultValue={todayFormatted} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700"{...register('to')} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        <LeetcodeTable data={filteredLeetcodeContests} />
      </div>
    </>
  )
}

export default App
