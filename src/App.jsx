import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [userData, setUserData] = useState([])

  async function getContestHistory(username) {
    let urlAPI = `https://alfa-leetcode-api.onrender.com/${username}/contest/history`
    let body = fetch(urlAPI)
      .then(res => res.json())
      .then(data => data)
    return body
  }

  useEffect(() => {
    let username = 'pavankc'
    let data = getContestHistory(username)
    data.then(res => {
      console.log(res.contestHistory)
      setUserData(res)
      let contests = res.contestHistory.reverse();

    })

  }, []);



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
            <tr>
              <td className="border border-slate-700 p-4">Data 1</td>
              <td className="border border-slate-700 p-4">Data 2</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
              <td className="border border-slate-700 p-4">Data 3</td>
            </tr>

          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
