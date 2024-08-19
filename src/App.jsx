import React from 'react'
import { useEffect, useState, Suspense } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { set, useForm } from 'react-hook-form';
// import Table from './components/Table';
const Table = React.lazy(() => import('./components/Table'));
import * as XLSX from 'xlsx';
import ExportToXlxs from './functions/ExportToXlxs';
import Loading from './components/Loading';


function App() {
  const { register, handleSubmit } = useForm();
  const [studentsInfo, setstudentsInfo] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFetchedFromAPI, setIsFetchedFromAPI] = useState(false);
  const [areThereAnyContests, setAreThereAnyContests] = useState();


  const todayDate = new Date();
  const oneWeekAgoDate = new Date(todayDate);
  oneWeekAgoDate.setDate(todayDate.getDate() - 7);
  const todayFormatted = todayDate.toISOString().split('T')[0];
  const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
  const ccDateFormat = todayDate.toISOString().split(' ')[0];


  const notify = () => toast.custom(
    <div className='flex flex-row items-center justify-around p-3 bg-slate-200 rounded-lg shadow-2xl border'>
      <p>Oops! Found no one participated in contests, try with different date</p>
      <button
        onClick={() => toast.remove()}
        type="button" className="rounded-lg ml-2 p-1.5 focus:ring-2 focus:ring-slate-400 inline-flex items-center justify-center h-8 w-8 text-gray-500">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>,
    {
      duration: 9000,
      position: 'top-center',
      icon: '⚠️',
      style: {
        background: '#333',
        color: '#fff',
      },
    }
  );


  async function getstudentInfo() {
    let studentsDataFromAPI = await fetch(`https://getdata-contests.vercel.app/getAllData`);
    let studentsData = await studentsDataFromAPI.json();
    console.log('studentsData: ', studentsData);
    setstudentsInfo(studentsData);
    // console.log("useEffect Invoked");
  }

  useEffect(() => {
    getstudentInfo().then(()=>{
      setIsFetchedFromAPI(true);
    })
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
    let filteredContests = await students.map(async (student, index) => {
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
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    setFilteredContests(filteredContests);

    setIsSubmitted(true);
    // Resolves Renderering table w/o Data
    filteredContests.map((contest) => {
      if (contest.contests.codechef.length > 0 || contest.contests.codeforces.length > 0 || contest.contests.leetcode.length > 0) {
        // console.log('true');
        // console.log(contest.contests.codechef.length, contest.contests.codeforces.length, contest.contests.leetcode.length)
        setAreThereAnyContests(true);
      } else {
        setAreThereAnyContests(false);
      }
    });


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
      if (contest.end_date != null) {
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

  // function areThereAnyContests(contests){
  // contests.map((contest)=>{
  //   if(contest.contests.codechef.length>0 && contest.contests.codeforces.length>0 && contest.contests.leetcode.length>0){
  //     console.log('true');
  //     console.log(contest.contests.codechef.length , contest.contests.codeforces.length , contest.contests.leetcode.length)
  //     return true;
  //   }
  // })
  // return false;
  // }
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="m-5" id='table-to-pdf'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4 mb-2 border rounded-md">
          <h1 className="text-2xl font-bold text-blue-700 text-center">Contest Tracker</h1>
          <div className="flex-row flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="from" className="block text-sm font-medium text-blue-700">From</label>
              <input
                type="date"
                id="from"
                defaultValue={oneWeekAgoFormatted}
                max={today}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700"
                {...register('from')}
              />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="to" className="block text-sm font-medium text-blue-700">To</label>
              <input
                type="date"
                id="to"
                defaultValue={todayFormatted}
                max={today}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700"
                {...register('to')}
              />
            </div>
          </div>
          <div className="flex-row flex justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label htmlFor="fromroll" className="block text-sm font-medium text-blue-700">From Roll No</label>
              <input type="text" id="fromroll" defaultValue="22501A05D4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700" {...register('fromroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
            </div>
            <div className="mb-4 w-1/2 pl-2">
              <label htmlFor="toroll" className="block text-sm font-medium text-blue-700">To Roll No</label>
              <input
                type="text" id="toroll" defaultValue="22501A05J8"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-blue-700"
                {...register('toroll')}
                onInput={(e) => e.target.value = e.target.value.toUpperCase()}
              />
            </div>
          </div>
          {
            // isFetched &&
            <button
              type="submit"
              className={`
                    w-full   text-white 
                    font-semibold py-2 px-4 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isFetchedFromAPI ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                    transition duration-700 ease-in-out

                    `}
            // onClick={()=>{
            //   if(!areThereAnyContests){
            //     notify();
            //   }
            // }}
            >
              {isFetchedFromAPI ? 'Submit' : 'Fetching Data...'}
            </button>
          }
          {
            isSubmitted &&
            areThereAnyContests &&
            <button
              onClick={() => ExportToXlxs(filteredContests)}
              className={`
                 w-full mt-2 bg-blue-500 hover:bg-blue-600
                 text-white font-semibold py-2 px-4 
                 rounded-md focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-blue-500
                `}
            >
              Download .xlsx
            </button>
          }
        </form>

        {
          isSubmitted &&
          areThereAnyContests &&
          <>
            <Suspense
              fallback={
                <>
                  <div className='w-full flex flex-row justify-center '>
                    <Loading />
                  </div>
                </>
              }
            >
              <Table data={filteredContests} />
            </Suspense>
          </>
        }
      </div>
      {/* <Toaster /> */}
    </>
  )
}

export default App
