import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    let diffOfRating = payload[0].payload.rating - payload[0].payload.oldRating;
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow custom-tooltip">
        <p>
          {`Rating: ${payload[0].payload.rating}`}
          <span
            className={`ps-1
              ${diffOfRating > 0 ? 'text-green-500' : 'text-red-500'}`}
          > {
              diffOfRating > 0 ? `(+${diffOfRating})` : `(${diffOfRating})`
            }
          </span>
        </p>
        <p>{`Rank: ${payload[0].payload.rank}`}</p>
        <p className="label">{`${payload[0].payload.date}`}</p>
        <p className="text-gray-500 desc">{`${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
}
function CodeforcesChart({ codeforcesData }) {
  // console.log('codeforcesData: ', codeforcesData);
  let totalProblemsSolved = codeforcesData.problems.length
  // console.log('totalProblemsSolved: ', totalProblemsSolved);
  let totalContestsParticipated = codeforcesData.contests.length
  // console.log('totalContestsParticipated: ', totalContestsParticipated);

  let cfContests = codeforcesData.contests.reverse();
  let contestsData = cfContests.map(contest => {
    return {
      date: convertTimestampToDate(contest.ratingUpdateTimeSeconds),
      rating: contest.newRating,
      oldRating: contest.oldRating,
      rank: contest.rank,
      name: contest.contestName,
    }
  })
  // console.log('contestsData: ', contestsData);

  const minRating = Math.min(...contestsData.map(contest => contest.rating));
  const maxRating = Math.max(...contestsData.map(contest => contest.rating));

  return (
    <div>
      <h1 className='text-2xl font-semibold text-blue-500'>Codeforces</h1>
      <h1>Username: <a href={`https://codeforces.com/profile/${codeforcesData.username}/`} target="_blank" rel="noopener noreferrer">{codeforcesData.username}</a> </h1>
      <p>Total Problems Solved: {totalProblemsSolved}</p>
      <p>Total Contests Participated: {totalContestsParticipated}</p>


      <div className='hidden sm:flex sm:justify-center'>
        <LineChart width={690} height={400} data={contestsData}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <Line type="monotone" dataKey="rating" stroke="#2563eb" />
          <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
          <YAxis domain={[minRating - 50, maxRating + 50]} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>
      <div className='flex sm:hidden'>
        <LineChart width={370} height={400} data={contestsData}
          margin={{ top: 20, right: 30, bottom: 20, left: -10 }}
        >
          <Line type="monotone" dataKey="rating" stroke="#2563eb" />
          <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
          <YAxis domain={[minRating - 50, maxRating + 50]} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>



    </div>
  )
}

export default CodeforcesChart