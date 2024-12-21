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
        return (
            <div className="p-2 bg-white border border-gray-300 rounded shadow custom-tooltip">
                <p>{`Rating: ${payload[0].payload.rating}`}</p>
                <p>{`Rank: ${payload[0].payload.rank}`}</p>
                <p className="label">{`${payload[0].payload.date}`}</p>
                <p className="text-gray-500 desc">{`${payload[0].payload.name}`}</p>
                <p className="text-gray-500 desc">{`Problems Solved: ${payload[0].payload.problemsSolved}`}</p>
            </div>
        );
    }
    return null;
}

function LeetcodeChart({ leetcodeData }) {
    // console.log('leetcodeData: ', leetcodeData);
    let totalProblemsSolved = leetcodeData.data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count;
    let totalContestsParticipated = leetcodeData.data.userContestRanking.attendedContestsCount;


    let contests = leetcodeData.data.userContestRankingHistory;
    contests = contests.reverse();
    // console.log('contests: ', contests);
    let contestsData = contests.map((contest) => {
        return {
            date: convertTimestampToDate(contest.contest.startTime),
            rank: contest.ranking,
            rating: contest.rating,
            problemsSolved: contest.problemsSolved,
            name: contest.contest.title
        }
    });

    const minRating = Math.min(...contestsData.map(contest => contest.rating));
    // console.log('minRating: ', minRating);
    const maxRating = Math.max(...contestsData.map(contest => contest.rating));
    // console.log('maxRating: ', maxRating);

    // console.log('contestsData: ', contestsData);
    return (
        <div>
            <h1 className='text-2xl font-semibold text-blue-500'>Leetcode</h1>
            <h1>Username: <a href={`https://leetcode.com/u/${leetcodeData.username}/`} target="_blank" rel="noopener noreferrer">{leetcodeData.username}</a> </h1>
            <h1>Total Problems Solved: {totalProblemsSolved}</h1>
            <h1>Total Contests Participated: {totalContestsParticipated}</h1>
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
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                >
                    <Line type="monotone" dataKey="rating" stroke="#2563eb" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[minRating - 20, maxRating + 20]} />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
        </div>
    )
}

export default LeetcodeChart