import React, { useState, useEffect, isValidElement } from 'react'
import Navbar from './Navbar'
import TopContests from './TopContests'
import { set } from 'react-ga'
import CodechefIcon from '../../assets/codechef.svg'
import CodeforcesIcon from '../../assets/codeforces.svg'
import LeetcodeIcon from '../../assets/leetcode.svg'
import { Link } from 'react-router-dom'
import './fullrewind.css'
import html2canvas from 'html2canvas'
import { useRef } from 'react'
import domtoimage from 'dom-to-image'
import ShareIcon from '../../assets/rewind/share.svg'
import { use } from 'react'

function FullRewind({
  topContest,
  topPlatforms,
  totalContests,
  totalProblems,
  quote,
  monthlyData
}) {
  // console.log('quote: ', quote)
  // console.log('topPlatforms: ', topPlatforms)
  // console.log('topContest: ', topContest)
  const [selectedMonth, setSelectedMonth] = useState('Year')
  const [platforOrder, setPlatformOrder] = useState({
    codeforces: CodeforcesIcon,
    codechef: CodechefIcon,
    leetcode: LeetcodeIcon
  })
  // Background Colors
  let colors = [
    {
      from: "#e2c8e5",
      via: "#ffc1b3",
      to: "#ffdcce"
    }, {
      from: "#5C8374",
      via: "#a0b2af",
      to: "#bac5c5"
    }, {
      from: "#Ac8e2b2",
      via: "#f0eb8e",
      to: "#fff3b3"
    }, {
      from: "#94fffb",
      via: "#88e6e7",
      to: "#ace6e9"
    }
    , {
      from: "#e6cf9c",
      via: "#f8d586",
      to: "#fbe4b2"
    }
    , {
      from: "#f3f9f9",
      via: "#60abb3",
      to: "#4da1a9"
    }
    , {
      from: "#ffffff",
      via: "#b5a9fa",
      to: "#a294f9"
    }
    , {
      from: "#fdf6ed",
      via: "#f1c083",
      to: "#f1bc79"
    }
    , {
      from: "#f9fff2",
      via: "#e1ffbb",
      to: "#e1febb"
    }
    , {
      from: "#fefefe",
      via: "#bbcbdb",
      to: "#d1e2f5"
    }
    , {
      from: "#fef9fb",
      via: "#fecbe0",
      to: "#ffcce1"
    }
    , {
      from: "#f9fefb",
      via: "#a3eebe",
      to: "#a0edbc"
    }
    , {
      from: "#fefaf5",
      via: "#ffbd73",
      to: "#febd73"
    }
    , {
      from: "#fefffe",
      via: "#e1fce3",
      to: "#e0fbe2"
    }
  ]

  const [gradColors, setGradColors] = useState({
    from: "#e6cf9c",
    via: "#f8d586",
    to: "#fbe4b2"
  });

  const [isNoContests, setIsNoContests] = useState(false)

  const [top5Contests, setTop5Contests] = useState([])
  const [top3Platforms, setTop3Platforms] = useState([])
  const [totalMonthlyProblems, settotalMonthlyProblems] = useState(0)
  const [activeMonth, setActiveMonth] = useState('January')

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
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
      let temp = []
      // console.log('monthlyData[selectedMonth] : ', monthlyData[selectedMonth])
      if (monthlyData[selectedMonth].contests.length >= 5) {
        for (let i = 0; i < 5; i++) {
          temp.push(monthlyData[selectedMonth].contests[i].contest)
        }
      } else {
        for (let i = 0; i < monthlyData[selectedMonth].contests.length; i++) {
          temp.push(monthlyData[selectedMonth].contests[i].contest)
        }
      }
      setTop5Contests(prev => [...temp])
    }
  }, [topContest, monthlyData, selectedMonth])

  // Top Platform Logic
  useEffect(() => {
    if (selectedMonth === 'Year') {
      let temp = []
      for (let i = 0; i < 3; i++) temp.push(topPlatforms[i].platform)
      setTop3Platforms(prev => [...temp])
    }
  }, [topPlatforms, selectedMonth])

  // Total Problems Logic
  useEffect(() => {
    if (selectedMonth != 'Year') {
      let totMonthProblems = 0
      monthlyData[selectedMonth].contests.forEach(element => {
        // console.log('element : ', element)
        totMonthProblems += element.problem
      })
      settotalMonthlyProblems(totMonthProblems)
    }
  }, [monthlyData, selectedMonth])

  useEffect(() => {
    let maxContests = 0
    let actMonth = ''
    if (selectedMonth === 'Year') {
      monthlyData.forEach(element => {
        if (element.contests.length > maxContests) {
          maxContests = element.contests.length
          actMonth = element.month
        }
      })
      setActiveMonth(actMonth)
    }
  }, [monthlyData, selectedMonth])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length); // Ensure integer index
    const selectedColors = colors[randomIndex];
    setGradColors(selectedColors);
    document.body.style.background = `${selectedColors.from}`;
    return () => {
      document.body.style.background = `white`;
    }
  }, []); // Run only once on mount


  useEffect(() => {
    // console.log(selectedMonth)
    if (selectedMonth === 'Year') {
      if (totalContests.length === 0) {
        setIsNoContests(true)
      }
    } else {
      // console.log('monthlyData[selectedMonth] : ', monthlyData[selectedMonth])
      if (monthlyData[selectedMonth].contests.length === 0) {
        setIsNoContests(false)
      }
    }
  }, [selectedMonth])

  const exportRef = useRef(null)

  // const handleExport = () => {
  //   const element = exportRef.current
  //   html2canvas(element, {
  //     scale: 2, // Increase for better quality
  //     width: element.offsetWidth, // Use the actual width of the element
  //     windowWidth: document.body.scrollWidth, // Ensures styles match the current viewport
  //     windowHeight: document.body.scrollHeight - 138,
  //     backgroundColor: null, // Avoid overriding the gradient

  //     onclone: clonedDocument => {
  //       // Apply the gradient manually to the cloned element
  //       const clonedElement = clonedDocument.querySelector('.rewindDown')
  //       if (clonedElement) {

  //         clonedElement.style.background =
  //           `linear-gradient(to bottom, ${gradColors.from},${gradColors.from},${gradColors.from})`
  //       }
  //     }
  //   }).then(canvas => {
  //     const link = document.createElement('a')
  //     link.download = 'rewind.png'
  //     link.href = canvas.toDataURL('image/png')
  //     link.click()

  //   })
  // }

  const handleExport = () => {
    const element = exportRef.current;
  
    // Ensure the gradient is explicitly applied
    const gradientStyle = `linear-gradient(to bottom, ${gradColors.from}, ${gradColors.via}, ${gradColors.to})`;
    element.style.background = gradientStyle;
  
    html2canvas(element, {
      scale: 2, // Increase for better quality
      width: element.offsetWidth, // Use the actual width of the element
      windowWidth: document.body.scrollWidth, // Ensures styles match the current viewport
      backgroundColor: null, // Avoid overriding the gradient
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'rewind.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
  
      // Revert the style change after capture
      element.style.background = '';
    });
  };
  

  return (
    <div className={`fullrewind w-full min-h-screen  text-balck pt-2 font-afacad`}
      style={{
        background: `linear-gradient(to bottom, ${gradColors.from},${gradColors.via},${gradColors.to})`
      }}
    >
      {/* <div className='fullrewind w-full h-auto bg-[#1e1e1e] pt-2 font-afacad'> */}

      <div className=' w-11/2 md:max-w-[350px] mx-auto shadow-2xl rounded-[20px] px-4'>
        <div className='pt-2'>
          <Navbar
            themeColor='light'
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          <div
            className={`rewindDown ${selectedMonth === 'Year' ? 'min-h-screen px-5' : 'px-5'
              }`}
            ref={exportRef}
          >

            <div className='flex justify-between text-lg pt-3 mx-auto'>
              <Link to='/' className='text-center font-mono'>
                trackcode
              </Link>
              {/* <h1 className='text-center font-mono'>trackcode</h1> */}
              <h1 className='text-center font-semibold'>Rewind</h1>
            </div>

            {selectedMonth === 'Year' && (
              <div>
                <div className='flex justify-center font-bold text-6xl pt-10 px-2  mx-auto'>
                  <h1>‘24</h1>
                </div>

                <div className='flex justify-between text-xl pt-10  mx-auto'>
                  <div>
                    <h1 className='font-semibold'>Top Contest</h1>
                    <p>{top5Contests[0]}</p>
                  </div>
                  <div>
                    <h1 className='font-semibold'>Top Platforms</h1>
                    <p>{capitalizeFirstLetter(top3Platforms[0])}</p>
                  </div>
                </div>
                <div className='flex justify-between text-xl pt-10  mx-auto'>
                  <div>
                    <h1 className='font-semibold'>Total Contests</h1>
                    <p>{totalContests}</p>
                  </div>
                  <div>
                    <h1 className='font-semibold'>Active Month</h1>
                    <p>{activeMonth}</p>
                  </div>
                </div>
                <div className='flex flex-col pt-14 items-center justify-center'>
                  <div className='text-4xl font-bold'>{totalProblems}</div>
                  <div className='text-lg font-bold'>
                    problems solved this year{' '}
                  </div>
                </div>

                {/* Icons */}
                <div className='pt-16 flex justify-evenly  mx-auto'>
                  {topPlatforms.map((item, index) => {
                    return (
                      <div className='flex items-end' key={index}>
                        <h1 className='text-5xl'>{index + 1}</h1>
                        <img
                          loading={'eager'}
                          src={platforOrder[item.platform]}
                          className='w-20'
                          alt=''
                        />
                        {/* <img loading={'eager'} src={platforOrder[item.platform]} className='w-20 invert opacity-85' alt="" /> */}
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h1 className='pt-8 text-md font-bold text-center'>{quote}</h1>
                </div>
              </div>
            )}
          </div>
          {/* {selectedMonth === 'Year' && (
            <div>
              <h1 className='pt-8 text-md font-bold text-center'>{quote}</h1>
            </div>
          )} */}
          {selectedMonth === 'Year' && (
            <div className='flex justify-center mb-4'>
              <button
                onClick={handleExport}
                className='mt-4 p-2 px-8 text-lg bg-white text-black rounded-full flex items-center gap-2'
              >
                <img src={ShareIcon} className='w-6' alt='Share Icon' />
                <span>Share Summary</span>
              </button>
            </div>
          )}
        </div>
        <div className={`flex flex-col ${selectedMonth != 'Year' && "min-h-screen"}  mx-auto justify-start`}>
          <div className='flex flex-col justify-between'>
            {!isNoContests && selectedMonth != 'Year' && (
              <TopContests title='Top Contests' content={top5Contests} />
            )}
            {!isNoContests && selectedMonth != 'Year' ? (
              <TopContests title='Favorite Platforms' content={top3Platforms} />
            ) : null}
          </div>
          <div>
            {!isNoContests && selectedMonth != 'Year' ? (
              <div className='flex flex-col justify-between text-xl pt-4 px-5'>
                <div>
                  <h1 className='font-semibold text-2xl'>
                    Contests Participated
                  </h1>
                  <p className='text-lg'>
                    {monthlyData[selectedMonth].contests.length}
                  </p>
                </div>
                <div>
                  <h1 className='font-semibold text-2xl'>Problems Solved</h1>
                  <p className='text-lg'>{totalMonthlyProblems}</p>
                </div>
              </div>
            ) : null}
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
    </div>
  )
}

export default FullRewind