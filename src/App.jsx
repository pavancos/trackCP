import { useEffect, useState, Suspense } from 'react'
import './App.css'
import { useForm } from 'react-hook-form';
import Table from './components/Table';
import * as XLSX from 'xlsx';
import ExportToXlxs from './functions/ExportToXlxs';

function App() {
  const { register, handleSubmit } = useForm();
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const todayDate = new Date();
  const oneWeekAgoDate = new Date(todayDate);
  oneWeekAgoDate.setDate(todayDate.getDate() - 7);
  const todayFormatted = todayDate.toISOString().split('T')[0];
  const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
  const ccDateFormat = todayDate.toISOString().split(' ')[0];


  async function getstudentInfo() {
    let studentsDataFromAPI = await fetch(`https://getdata-contests.vercel.app/getAllData`);
    let studentsData = await studentsDataFromAPI.json();
    console.log('studentsData: ', studentsData);
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
          codechef: filterCodechef(dataFromForm.from, dataFromForm.to, student.codechef.newAllRating),
          codeforces: filterCodeforces(dataFromForm.from, dataFromForm.to, student.codeforces.attendedContests)
        }
      };
    });
    filteredContests = await Promise.all(filteredContests);
    console.log('filteredContests: ', filteredContests);
    setFilteredContests(filteredContests);
    setIsSubmitted(true);
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

  function filterCodechef(fromDate, toDate, contestsData) {
    // console.log('contestsData: ', contestsData);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let filteredContests = contestsData.filter((contest) => {
      // console.log('contest: ', contest);
      if(contest.end_date!=null ){
        let date = new Date(contest.end_date.split(" ")[0]);
        // console.log('date: ', date);
        return date >= startDate && date <= endDate;
      }
    });
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

  return (
    <>
      <div className="m-5" id='table-to-pdf'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4 mb-2 border rounded-md">
        <h1 className="text-2xl font-bold text-blue-700 text-center">Contest Tracker</h1>
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
          {
            isSubmitted &&
            <button
              onClick={() => ExportToXlxs(filteredContests)}
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download .xlsx
            </button>
          }
        </form>

        {
          isSubmitted &&
          <>
            {/* <button
              onClick={() => ExportToXlxs(filteredContests)}
              className="w-1/3 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download Xlsx
            </button> */}

            <Table data={filteredContests} />
          </>
        }
      </div>
    </>
  )
}

export default App
