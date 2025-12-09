export const fetchRewindData = async usernames => {
  const params = new URLSearchParams(usernames).toString().toLowerCase()

  try {
    const res = await fetch(`https://cpplayground.vercel.app/all?${params}`)
    if (!res.ok) throw new Error('Failed to fetch data')

    const data = await res.json()

    // Basic Validation
    if (data.codechef?.message === 'Username does not exist')
      throw new Error('Invalid Codechef Username')
    if (data.leetcode?.error) throw new Error('Invalid Leetcode Username')

    const YEAR = 2025

    // Process Codechef
    const codechefContests = (data.codechef?.contests || []).filter(
      c => c.getyear == YEAR
    )

    // Process Codeforces
    if (data.codeforces?.contests) {
      data.codeforces.contests.forEach(contest => {
        const problems = (data.codeforces.problems || []).filter(
          p => p.contestId === contest.contestId
        )
        contest.problemsCount = problems.length
      })
    }
    const codeforcesContests = (data.codeforces?.contests || []).filter(c => {
      const date = new Date(c.ratingUpdateTimeSeconds * 1000)
      return date.getFullYear() === YEAR
    })

    // Process Leetcode
    const leetcodeContests = (
      data.leetcode?.data?.userContestRankingHistory || []
    ).filter(c => {
      const date = new Date(c.contest.startTime * 1000)
      return date.getFullYear() === YEAR
    })

    // Normalize and Aggregate
    let allContests = []

    // Codechef Normalization
    codechefContests.forEach(c => {
      let name = c.name
      if (name.split(' ')[0] === 'Starters') {
        name = `Starters ${name.split(' ')[1]}`
      }
      allContests.push({
        name: name,
        rank: parseInt(c.rank),
        problems: c.problems ? c.problems.length : 0,
        platform: 'codechef',
        month: parseInt(c.getmonth) - 1
      })
    })

    // Codeforces Normalization
    codeforcesContests.forEach(c => {
      let name = c.contestName
      // Simplified naming logic
      const parts = name.split(' ')
      if (parts[0] === 'Codeforces' && parts[1] === 'Round') {
        name = `CF Round ${parts[2]}`
      } else if (parts[0] === 'Educational') {
        name = `Edu Round ${parts[2]}`
      }

      const date = new Date(c.ratingUpdateTimeSeconds * 1000)
      allContests.push({
        name: name,
        rank: c.rank,
        problems: c.problemsCount || 0,
        platform: 'codeforces',
        month: date.getMonth()
      })
    })

    leetcodeContests.forEach(c => {
      let name = c.contest.title
      const parts = name.split(' ')
      if (parts[0] === 'Weekly' || parts[0] === 'Biweekly') {
        name = `${parts[0]} ${parts[2]}`
      }

      const date = new Date(c.contest.startTime * 1000)
      allContests.push({
        name: name,
        rank: c.ranking,
        problems: c.problemsSolved,
        platform: 'leetcode',
        month: date.getMonth()
      })
    })

    const totalContestsParticipated = allContests.length
    const totalProblemsSolved = allContests.reduce(
      (acc, curr) => acc + curr.problems,
      0
    )

    // Top Platform
    const platformCounts = { codechef: 0, codeforces: 0, leetcode: 0 }
    allContests.forEach(c => {
      if (platformCounts[c.platform] !== undefined) {
        platformCounts[c.platform]++
      }
    })

    // Filter platforms based on provided usernames
    const availablePlatforms = Object.keys(usernames).filter(
      p => usernames[p] && usernames[p].trim() !== ''
    )
    const platformsToConsider =
      availablePlatforms.length > 0
        ? availablePlatforms
        : Object.keys(platformCounts)

    const topPlatform = platformsToConsider.reduce((a, b) =>
      (platformCounts[a] || 0) >= (platformCounts[b] || 0) ? a : b
    )

    // Top Contest (Best Rank)
    let topContest = { name: 'N/A', rank: Infinity }
    if (allContests.length > 0) {
      const sortedByRank = [...allContests].sort((a, b) => a.rank - b.rank)
      topContest = {
        name: sortedByRank[0].name,
        rank: sortedByRank[0].rank
      }
    } else {
      topContest = { name: 'No Contests', rank: 0 }
    }

    // Month Stats & Active Month
    const monthNames = [
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
    const monthStatsObj = {}
    monthNames.forEach(m => (monthStatsObj[m] = 0))

    allContests.forEach(c => {
      monthStatsObj[monthNames[c.month]]++
    })

    const activeMonth = monthNames.reduce((a, b) =>
      monthStatsObj[a] > monthStatsObj[b] ? a : b
    )

    // Format Usernames for return
    const formattedUsernames = []
    if (usernames.leetcode)
      formattedUsernames.push({ leetcode: usernames.leetcode })
    if (usernames.codeforces)
      formattedUsernames.push({ codeforces: usernames.codeforces })
    if (usernames.codechef)
      formattedUsernames.push({ codechef: usernames.codechef })
    let currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata'
    })

    let response = await fetch(
      `https://getdata-contests.vercel.app/rewindUser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usernames: formattedUsernames,
          timestamp: currentTime,
          rewind:"2025"
        })
      }
    )

    return {
      usernames: formattedUsernames,
      totalProblemsSolved,
      activeMonth,
      topPlatform,
      totalContestsParticipated,
      topContest,
      monthStats: monthStatsObj,
      tagline: 'Code. Solve. Repeat.'
    }
  } catch (error) {
    console.error('Error fetching rewind data:', error)
    throw error
  }
}
