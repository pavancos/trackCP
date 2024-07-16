import { useEffect, useState, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Students} from './assets/DataBase/Students.json'
import './App.css'
import { LeetCode } from "leetcode-query";

function App() {
  const [contests, setContests] = useState([]);
  const [students,setStudents]=useState(Students);
  const [studentHistory, setStudentHistory] = useState([]);
  const [codeChefContestHistory, setcodeChefContestHistory] = useState([  ]);
  const [leetCodeContestHistory, setleetCodeContestHistory] = useState([]);
  const [codeForcesContestHistory, setcodeForcesContestHistory] = useState([]);


  //console log students
  useEffect(()=>{
    console.log(students)
  } , [students])


  // LeetCode Contest History
  async function getLeetCodeContestHistory(username) {
    // let urlAPI = `http://localhost:3000/${username}/contest/history`;
    // let urlAPI = `https://alfa-leetcode-api.onrender.com/${username}/contest/history`
    try{
      let body = await fetch(`http://localhost:3000/${username}/contest/history`);
      let res = await body.json();
      // console.log(res.contestHistory)
      let allContests = res.contestHistory;
      let attendedContests = allContests.filter((contest)=>contest.attended==true);
      // console.log(attendedContests)
      return attendedContests;
    }catch(err){
      console.log(err)
    }
    
  }


  // CodeChef Contest History
  async function getCodeChefContestHistory(username) {
    try{
      let body = await fetch(`https://codechef-api.vercel.app/${username}`);
      let res = await body.json();
      let allContests = res.ratingData;
      let attendedContests = allContests.reverse();
      console.log("     in function: ",attendedContests)
      return attendedContests;
    }catch(err){
      console.log(err)
    }
  }

  // CodeForces Contest History
  async function getCodeForcesContestHistory(username) {
    try{
      let body = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
      let res = await body.json();
      let allContests = res.result;
      let attendedContests = allContests.reverse();
      console.log("     in function: ",attendedContests)
      return attendedContests;
    }catch(err){
      console.log(err)
    }
  }

  // Get codeChef Contest History of all students
  useEffect(()=>{
    students.map(async (student)=>{
      let codeChefContestHistory = await getCodeChefContestHistory(student.codechef);
      setcodeChefContestHistory((prev)=>[...prev,codeChefContestHistory]);
    })
  },[students])

  // Get LeetCode Contest History of all students
  useEffect(()=>{
    students.map(async (student)=>{
      let leetCodeContestHistory = await getLeetCodeContestHistory(student.leetcode);
      setleetCodeContestHistory((prev)=>[...prev,leetCodeContestHistory]);
    })
  },[students])

  // Get CodeForces Contest History of all students
  useEffect(()=>{
    students.map(async (student)=>{
      let codeForcesContestHistory = await getCodeForcesContestHistory(student.codeforces);
      setcodeForcesContestHistory((prev)=>[...prev,codeForcesContestHistory]);
    })
  },[students])

  return (
    <>
      <div className="">
        
        <table className="table-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600 p-4">Roll.No</th>
              <th className="border border-slate-600 p-4">Name</th>
              <th className="border border-slate-600 p-4">Contest Name</th>
              <th className="border border-slate-600 p-4">Rank</th>
              <th className="border border-slate-600 p-4">Attended</th>
              <th className="border border-slate-600 p-4">N.of Problems Solved</th>
              <th className="border border-slate-600 p-4">Day</th>
              <th className="border border-slate-600 p-4">Month</th>
              <th className="border border-slate-600 p-4">Year</th>
            </tr>
          </thead>
          <tbody>


          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
