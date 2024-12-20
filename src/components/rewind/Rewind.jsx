import React, { useState, useEffect } from 'react'
import RewindLoading from './RewindLoading'
import GradientBackground from './GradientBackground'
import RewindLoadingGradient from './RewindLoadingGradient'
import { get, useForm } from 'react-hook-form'
import Loading from '../Loading'
import { set } from 'react-ga'
import { getTopContests } from './utils/utilsRewind'
import { getTopPlatform } from './utils/utilsRewind'
import { getProblemsSolved } from './utils/utilsRewind'
import FullRewind from './FullRewind'

function Rewind () {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFetched, setIsFetched] = useState(false)

  const [codechefData, setCodechefData] = useState([])
  const [codeforcesData, setCodeforcesData] = useState([])
  const [leetcodeData, setLeetcodeData] = useState([])

  const [originalData, setOriginalData] = useState()


  const [selectedPlatforms, setSelectedPlatforms] = useState({
    Codechef: true,
    Codeforces: true,
    Leetcode: true,
    Spoj: false,
    Atcoder: false
  })

  // Rewind List
  const [topContest, setTopContest] = useState([])
  const [topPlatforms, setTopPlatforms] = useState([])
  const [totalContsts, setTotalContests] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [quote, setQuote] = useState('')
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false)
    // }, 100000) // Set the loading duration to 10 seconds
    // return () => clearTimeout(timer)
  }, [])

  async function playGroundInput (usernamesData) {
    setLoading(true)
    setIsFetched(false)
    // console.log('usernamesData: ', usernamesData)
    let onlyUsernames = usernamesData
    delete onlyUsernames.nameOfUser
    // console.log('onlyUsernames: ', onlyUsernames)
    let params = new URLSearchParams(onlyUsernames).toString().toLowerCase()
    console.log('params: ', params)
    try {
      let res = await fetch(`https://cpplayground.vercel.app/all?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log('res: ', res)
      let data = await res.json()
      console.log('data: ', data)
      setOriginalData(data)

      // console.log(data.codeforces);

      // Add problems codeforces contests data
      data.codeforces.contests.forEach(contest =>{
        let problems = data.codeforces.problems.filter(problem => problem.contestId === contest.contestId)
        contest.problems = problems.length
      })
      console.log('data.codeforces.contests: ', data.codeforces.contests);


      // filtering - Rewind 1918
      const codechefContests = (data.codechef?.contests || []).filter(
        contest => contest.getyear === '2024'
      )
      
      const codeforcesContests = (data.codeforces?.contests || []).filter(
        contest => {
          const date = new Date(
            contest.ratingUpdateTimeSeconds * 1000
          ).getFullYear()
          return date === 2024
        }
      )
      const leetcodeContests = (
        data.leetcode?.data.userContestRankingHistory || []
      ).filter(con => {
        const date = new Date(con.contest.startTime * 1000).getFullYear()
        return date === 2024
      })

      // Top platforms
      let topplatformsArr = [
        { platform: 'codechef', length: codechefContests.length },
        { platform: 'codeforces', length: codeforcesContests.length },
        { platform: 'leetcode', length: leetcodeContests.length }
      ]
      topplatformsArr.sort((a, b) => b.length - a.length)
      console.log('topplatformsArr: ', topplatformsArr)
      setTopPlatforms(topplatformsArr)

      // Total contests
      let totalContests =
        codechefContests.length +
        codeforcesContests.length +
        leetcodeContests.length
      console.log('totalContests: ', totalContests)
      setTotalContests(totalContests)

      // Total problems
      let totalProblems = 0
      codechefContests.forEach(contest => {
        totalProblems += contest.problems.length
      })
      console.log(codeforcesContests);
      codeforcesContests.forEach(contest => {
        // console.log('contest: ', contest);
        // console.log('contest Problems: ', contest.problems);
        if (contest.problems) {
          totalProblems += contest.problems
        }
      })
      leetcodeContests.forEach(contest => {
        totalProblems += contest.problemsSolved
      })
      console.log('totalProblems: ', totalProblems)
      setTotalProblems(totalProblems)

      // Sorting Codeforces Contests
      let sortedCodeForcesContests = codeforcesContests.sort(
        (p, q) => p.rank - q.rank
      )
      console.log('sortedCodeForcesContests: ', sortedCodeForcesContests)
      // Sorting Codechef Contests
      let sortedCodeChefContests = codechefContests.sort(
        (p, q) => p.rank - q.rank
      )
      console.log('sortedCodeChefContests: ', sortedCodeChefContests)
      // Sorting Leetcode Contests
      let sortedLeetcodeContests = leetcodeContests.sort(
        (p, q) => p.ranking - q.ranking
      )
      console.log('sortedLeetcodeContests: ', sortedLeetcodeContests)

      // sortedAllContest
      let sortedAllContest = []
      sortedAllContest = sortedCodeForcesContests.map(contest => {
        // console.log('contest: ', contest);
        let date = new Date(contest.ratingUpdateTimeSeconds * 1000)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        console.log(contest.contestName)
        let tempContestName = contest.contestName.split(' ')
        if (tempContestName[0] === 'Codeforces') {
          if (tempContestName[1] === 'Global') {
            contest.contestName = `${tempContestName[2]} ${tempContestName[3]}`
          } else {
            contest.contestName = `${tempContestName[1]} ${tempContestName[2]}`
          }
        } else if (tempContestName[0] === 'EPIC') {
          contest.contestName = `${tempContestName[0]} ${tempContestName[5]}`
        } else if (tempContestName[0] === 'Educational') {
          contest.contestName = `${tempContestName[2]} ${tempContestName[3]}`
        } else if (tempContestName[0] === 'Pinely') {
          contest.contestName = `${tempContestName[0]} ${tempContestName[1]} ${tempContestName[2]}`
        } else if (tempContestName[0] === 'Rayan') {
          contest.contestName =
            contest.contestName.split('(').split(' ')[1] +
            ' ' +
            contest.contestName.split('(').split(' ')[2]
        } else if (tempContestName[0] === 'CodeTON') {
          contest.contestName = `${tempContestName[0]} ${tempContestName[1]} ${tempContestName[2]}`
        }

        return {
          contest: contest.contestName,
          rank: contest.rank,
          problem: contest.problems,
          platform: 'Codeforces',
          getYear: year,
          getMonth: month + 1,
          getDay: day
        }
      })
      sortedCodeChefContests.forEach(contest => {
        if(contest.name.split(" ")[0]==='Starters'){
          contest.name = `Starters ${contest.name.split(" ")[1]}`;
        }
        sortedAllContest.push({
          contest: contest.name,
          rank: parseInt(contest.rank),
          problem: contest.problems.length,
          platform: 'Codechef',
          getYear: contest.getyear,
          getMonth: contest.getmonth,
          getDay: contest.getday
        })
      })
      sortedLeetcodeContests.forEach(contest => {
        // console.log('contest: ', contest);
        let date = new Date(contest.contest.startTime * 1000)
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate();

        if(contest.contest.title.split(" ")[0]==='Weekly'||contest.contest.title.split(" ")[0]==='Biweekly'){
          contest.contest.title = `${contest.contest.title.split(" ")[0]} ${contest.contest.title.split(" ")[2]}`
        }
        sortedAllContest.push({
          contest: contest.contest.title,
          rank: contest.ranking,
          problem: contest.problemsSolved,
          platform: 'Leetcode',
          getYear: year,
          getMonth: month + 1,
          getDay: day
        })
      })
      // Sorting all contest
      let sortedAllContestData = sortedAllContest.sort(
        (p, q) => p.rank - q.rank
      )
      console.log('sortedAllContestData: ', sortedAllContestData)
      setTopContest(sortedAllContestData)

      // Filtering Monthly data

      // {
      //   month="",
      //   contests=[
      //     // All Contests sorted{}
      //   ],
      //   // cf, cf, lc;
      // }

      let monthlyData = []
      let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      for (let i = 0; i < 12; i++) {
        let monthData = {
          month: month[i],
          contests: sortedAllContestData.filter(
            contest => parseInt(contest.getMonth) === i + 1
          )
        }
        monthlyData.push(monthData)
      }
      console.log('monthlyData: ', monthlyData)
      setMonthlyData(monthlyData)
      // Getting Top Contests (5 or 0 => incase no contests)
      console.log('January: ', getTopContests(monthlyData[0].contests))
      // Getting Top Platform
      console.log('Feb: ', getTopPlatform(monthlyData[1].contests))
      // Getting Problems Solved
      console.log('Feb Contests: ', monthlyData[1].contests)
      console.log('Feb: ', getProblemsSolved(monthlyData[1].contests))

      // Quote
      // 10+ Contests: "You're just getting started—future champion in the making!"
      // 20+ Contests: "Consistency is your middle name—keep up the momentum!"
      // 30+ Contests: "You're coding your way to greatness—keep shining!"
      // 40+ Contests: "A problem-solving wizard—your dedication is inspiring!"
      // 50+ Contests: "Half a century of contests—you're unstoppable!"
      // 60+ Contests: "A true coding legend—your persistence is extraordinary!"
      // 70+ Contests: "You're rewriting the rules—an icon in the coding world!"
      // 80+ Contests: "A master of marathons—conquering challenges with ease!"
      // 90+ Contests: "You're the essence of excellence—an elite coding champion!"
      // 100+ Contests: "A centurion of code—you're in a league of your own!"

      let quote = ''
      if (totalContests >= 100) {
        quote = "A centurion of code—you're in a league of your own!"
      } else if (totalContests >= 90) {
        quote = "You're the essence of excellence—an elite coding champion!"
      } else if (totalContests >= 80) {
        quote = 'A master of marathons—conquering challenges with ease!'
      } else if (totalContests >= 70) {
        quote = "You're rewriting the rules—an icon in the coding world!"
      } else if (totalContests >= 60) {
        quote = 'A true coding legend—your persistence is extraordinary!'
      } else if (totalContests >= 50) {
        quote = "Half a century of contests—you're unstoppable!"
      } else if (totalContests >= 40) {
        quote = 'A problem-solving wizard—your dedication is inspiring!'
      } else if (totalContests >= 30) {
        quote = "You're coding your way to greatness—keep shining!"
      } else if (totalContests >= 20) {
        quote = 'Consistency is your middle name—keep up the momentum!'
      } else if (totalContests >= 10) {
        quote = "You're just getting started—future champion in the making!"
      } else {
        quote = 'Keep coding, keep shining!'
      }
      console.log('quote: ', quote)
      setQuote(quote)

      // Update state
      setCodechefData(codechefContests)
      setLeetcodeData(leetcodeContests)
      setCodeforcesData(codeforcesContests)

      setIsSubmitted(true)
      setIsFetched(true)
      setLoading(false)
    } catch (err) {
      console.log('Something went wrong' + err)
      setIsSubmitted(false)
    }
  }

  useEffect(() => {
    console.log('Original Data:', originalData)
  }, [originalData])

  return (
    <div className='flex w-full justify-center items-center'>
      {/* 
      isfeteched flase -> form
      issubmtted && isfetched false -> loading(2sec)
      isfetched true -> full rewind
      
      */}

      {loading && <RewindLoadingGradient/>}
      {isFetched && <FullRewind
        topContest={topContest}
        topPlatforms={topPlatforms}
        totalContests={totalContsts}
        totalProblems={totalProblems}
        quote={quote}
        monthlyData={monthlyData}
      />}
      {
        !isSubmitted && !loading &&
        <div className='content'>
          <div className='m-3'>
            <form
              onSubmit={handleSubmit(playGroundInput)}
              className='max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md'
            >
              <h1 className='text-2xl font-semibold text-blue-700 text-center mb-3'>
                Rewind - Trackcode
              </h1>
              {/* Inputs for the platform usernames */}
              <div className='mb-2 flex flex-wrap'>
                <div className='mb-1 w-full  px-1'>
                  <label htmlFor='inputCodechef' className='labelText'>
                    Codechef Username
                  </label>
                  <input
                    type='text'
                    id='inputCodechef'
                    placeholder='Codechef Username'
                    required
                    className='textInputBox'
                    {...register('Codechef')}
                  />
                </div>

                <div className='mb-1 w-full  px-1'>
                  <label htmlFor='inputCodeforces' className='labelText'>
                    Codeforces Username
                  </label>
                  <input
                    type='text'
                    id='inputCodeforces'
                    required
                    placeholder='Codeforces Username'
                    className='textInputBox'
                    {...register('Codeforces')}
                  />
                </div>
                <div className='mb-1 w-full  px-1'>
                  <label htmlFor='inputLeetcode' className='labelText'>
                    Leetcode Username
                  </label>
                  <input
                    type='text'
                    id='inputLeetcode'
                    required
                    placeholder='Leetcode Username'
                    className='textInputBox'
                    {...register('Leetcode')}
                  />
                </div>
              </div>

              <button
                type='submit'
                // disabled={!isFetched}
                className={`w-full  font-semibold py-2 px-4 rounded-md
                        transition duration-700 ease-in-out text-white 
                         focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 
                            : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                        `}
              >
                Submit
              </button>
            </form>

            {/* {
                !isFetched &&
                <div className='flex flex-row justify-center'><RewindLoadingGradient /></div>
            } */}

            {/* {
                (isSubmitted && isFetched) &&
                (codechefData !== null) &&
                isCodeChefSelected && !isAnyChange &&
                <CodechefChart codechefData={codechefData} />
            } */}
          </div>
        </div>
      }
    </div>
  )
}

export default Rewind

{/* <div className='loading-screen justify-center items-center m-20'>
            {/* <RewindLoading /> */}
            // <RewindLoadingGradient />
          // </div>