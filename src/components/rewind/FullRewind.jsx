import React, { useState, useEffect, isValidElement } from 'react'
import Navbar from './Navbar'
import TopContests from './TopContests'
import { set } from 'react-ga';
import CodechefIcon from '../../assets/codechef.svg'
import CodeforcesIcon from '../../assets/codeforces.svg'
import LeetcodeIcon from '../../assets/leetcode.svg'
import { Link } from 'react-router-dom';
import './fullrewind.css'


function FullRewind({ topContest, topPlatforms, totalContests, totalProblems, quote, monthlyData }) {
  console.log('quote: ', quote);
  console.log('topPlatforms: ', topPlatforms);
  console.log('topContest: ', topContest);
  const [selectedMonth, setSelectedMonth] = useState('Year');
  const [platforOrder, setPlatformOrder] = useState({
    "codeforces": CodeforcesIcon,
    "codechef": CodechefIcon,
    "leetcode": LeetcodeIcon
  });

  const [isNoContests, setIsNoContests] = useState(false);

  const [top5Contests, setTop5Contests] = useState([])
  const [top3Platforms, setTop3Platforms] = useState([])
  const [totalMonthlyProblems, settotalMonthlyProblems] = useState(0)
  const [activeMonth, setActiveMonth] = useState('January')

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  // Top Contest Logic
  useEffect(() => {
    if (selectedMonth === 'Year') {
      if (topContest.length >= 5) {
        let temp = []
        for (let i = 0; i < 5; i++) {
          temp.push(topContest[i].contest)
        }
        setTop5Contests(prev => [...temp])
      } else {
        let temp = []
        for (let i = 0; i < topContest.length; i++) {
          temp.push(topContest[i].contest)
        }
        setTop5Contests(prev => [...temp])
      }
    } else {
      let temp = [];
      console.log('monthlyData[selectedMonth] : ', monthlyData[selectedMonth]);
      if (monthlyData[selectedMonth].contests.length >= 5) {
        for (let i = 0; i < 5; i++) {
          temp.push(monthlyData[selectedMonth].contests[i].contest);
        }
      } else {
        for (let i = 0; i < monthlyData[selectedMonth].contests.length; i++) {
          temp.push(monthlyData[selectedMonth].contests[i].contest);
        }
      }
      setTop5Contests(prev => [...temp]);
    }
  }, [topContest, monthlyData, selectedMonth])

  // Top Platform Logic
  useEffect(() => {
    if (selectedMonth === 'Year') {
      let temp = []
      for (let i = 0; i < 3; i++)
        temp.push(topPlatforms[i].platform)
      setTop3Platforms(prev => [...temp])

    }
  }, [topPlatforms, selectedMonth])

  // Total Problems Logic
  useEffect(() => {
    if (selectedMonth != 'Year') {
      let totMonthProblems = 0;
      monthlyData[selectedMonth].contests.forEach(element => {
        console.log('element : ', element);
        totMonthProblems += element.problem;
      });
      settotalMonthlyProblems(totMonthProblems);
    }

  }, [monthlyData, selectedMonth])

  useEffect(() => {
    let maxContests = 0;
    let actMonth = ""
    if (selectedMonth === 'Year') {
      monthlyData.forEach((element) => {
        if (element.contests.length > maxContests) {
          maxContests = element.contests.length;
          actMonth = element.month;
        }
      });
      setActiveMonth(actMonth);
    }
  }, [monthlyData, selectedMonth])

  useEffect(() => {
    // set body color to black
    document.body.style.backgroundColor = '#e2c8e5'
    return () => {
      document.body.style.backgroundColor = 'white'
    }
  }, []);

  useEffect(() => {
    console.log(selectedMonth);
    if (selectedMonth === 'Year') {
      if (totalContests.length === 0) {
        setIsNoContests(true)
      }
    } else {
      console.log('monthlyData[selectedMonth] : ', monthlyData[selectedMonth]);
      if (monthlyData[selectedMonth].contests.length === 0) {
        setIsNoContests(false);
      }
    }
  }, [selectedMonth])
  return (
    <div className='fullrewind w-full min-h-screen bg-gradient-to-b from-[#e2c8e5] via-[#ffc1b3] to-[#ffdcce] text-balck pt-2 font-afacad'>
      {/* <div className='fullrewind w-full h-auto bg-[#1e1e1e] pt-2 font-afacad'> */}
      <div className='pt-2'>
        <Navbar
          themeColor='light'
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <div className='flex justify-between text-lg pt-3 px-2 w-11/12 md:w-7/12 mx-auto'>
          <Link to='/' className='text-center font-mono'>trackcode</Link>
          {/* <h1 className='text-center font-mono'>trackcode</h1> */}
          <h1 className='text-center  font-semibold'>Rewind</h1>
        </div>

        {
          selectedMonth === 'Year' &&
          <div>
            <div className='flex justify-center font-bold text-6xl pt-10 px-2 w-11/12 md:w-7/12 mx-auto'>
              <h1>‘24</h1>
            </div>

            <div className='flex justify-between text-xl pt-10 w-11/12 md:w-7/12 mx-auto'>
              <div>
                <h1 className='font-semibold'>Top Contest</h1>
                <p>{top5Contests[0]}</p>
              </div>
              <div>
                <h1 className='font-semibold'>Top Platforms</h1>
                <p>{capitalizeFirstLetter(top3Platforms[0])}</p>
              </div>
            </div>
            <div className='flex justify-between text-xl pt-10 w-11/12 md:w-7/12 mx-auto'>
              <div>
                <h1 className='font-semibold'>Total Contests</h1>
                <p>{totalContests}</p>
              </div>
              <div>
                <h1 className='font-semibold'>Active Month</h1>
                <p>{activeMonth}
                </p>
              </div>
            </div>
            <div className='flex flex-col pt-12  items-center justify-center'>
              <div className='text-4xl font-bold'>{totalProblems}</div>
              <div className='text-lg font-bold'>problems solved this year </div>
            </div>

            {/* Icons */}
            <div className='pt-16 flex justify-evenly'>
              {
                topPlatforms.map((item, index) => {
                  return (
                    <div className='flex items-end' key={index}>
                      <h1 className='text-5xl'>{index + 1}</h1>
                      <img loading={'eager'} src={platforOrder[item.platform]} className='w-20' alt="" />
                      {/* <img loading={'eager'} src={platforOrder[item.platform]} className='w-20 invert opacity-85' alt="" /> */}
                    </div>
                  )
                })
              }
            </div>
            <div>
              <h1 className='pt-8 text-md font-bold text-center'>{quote}</h1>
            </div>
          </div>
        }
      </div>
      <div className='flex flex-col w-11/12 md:w-7/12 mx-auto justify-between'>
        <div className='flex flex-col sm:flex-row justify-between'>
          {
            !isNoContests && selectedMonth != 'Year' &&
            <TopContests
              title='Top Contests'
              content={top5Contests}
            />
          }
          {
            !isNoContests && selectedMonth != 'Year' ? <TopContests
              title='Favorite Platforms'
              content={top3Platforms}
            /> : null
          }
        </div>
        <div>
          {
            (!isNoContests && selectedMonth != 'Year') ?
              <div className='flex flex-col px-3 sm:flex-row justify-between text-xl pt-4'>
                <div>
                  <h1 className='font-semibold text-2xl'>Contests Participated</h1>
                  <p className='text-lg'>{monthlyData[selectedMonth].contests.length}</p>
                </div>
                <div>
                  <h1 className='font-semibold text-2xl'>Problems Solved</h1>
                  <p className='text-lg'>{totalMonthlyProblems}
                  </p>
                </div>
              </div>
              : null
          }
        </div>
      </div>


        {/* // <div className='flex flex-col items-center justify-center'>
        //   <div className='text-2xl font-bold'>{monthlyData[selectedMonth].contests.length}</div>
        //   <div className='text-md font-bold'>{"Contests participated Month"} </div>
        // </div> */}
        {/* {
        (!isNoContests && selectedMonth != 'Year' ) ?
          <div className='flex flex-col items-center justify-center'>
            <div className='text-2xl font-bold'>{totalMonthlyProblems}</div>
            <div className='text-md font-bold'>{"Problems solved this month"} </div>
          </div>
          :null
      } */}
      </div>
      )
}

export default FullRewind;
