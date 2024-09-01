import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                <p>{`Rating: ${payload[0].payload.rating}`}</p>
                <p>{`Rank: ${payload[0].payload.rank}`}</p>
                <p className="label">{`${payload[0].payload.date}`}</p>
                <p className="desc text-gray-500">{`${payload[0].payload.name}`}</p>
                <p className="desc text-gray-500">{`Problems Solved: ${payload[0].payload.problemsSolved}`}</p>
            </div>
        );
    }
    return null;
}
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};

function CodechefChart({ codechefData }) {
    let contestsData = codechefData.contests;
    contestsData = contestsData.reverse();
    console.log('contestsData: ', contestsData);
    // Learning Paths (
    // 1)Practice Paths (
    // 1) Contests (
    // 45) Total Problems Solved: 358
    let problemsSolved = codechefData.problemsSolved;
    let problemsData = {
        LearningPaths: problemsSolved.split('(')[1].split(')')[0],
        PraticePaths: problemsSolved.split('(')[2].split(')')[0],
        Contests: problemsSolved.split('(')[3].split(')')[0],
        TotalProblems: problemsSolved.split(':')[1]
    }
    const data = [
        { name: 'Learning Paths', value: parseInt(problemsData.LearningPaths) },
        { name: 'Practice Paths', value: parseInt(problemsData.PraticePaths) },
        { name: 'Contests', value: parseInt(problemsData.Contests) },
        { name: 'Total Problems', value: parseInt(problemsData.TotalProblems) }
    ];
    console.log('problemsData: ', problemsData);

    contestsData = contestsData.map((contest) => {
        contest.end_date = contest.end_date.split(' ')[0];
        problemsSolved = contest.problems.length;
        return {
            date: formatDate(contest.end_date),
            rank: contest.rank,
            name: contest.name,
            rating: contest.rating,
            problemsSolved: problemsSolved
        };
    });

    const minRating = Math.min(...contestsData.map(contest => contest.rating));
    const maxRating = Math.max(...contestsData.map(contest => contest.rating));

    return (
        <div>
            <h1 className='text-2xl font-semibold text-blue-500'>Code Chef</h1>
            <h1>Username: {codechefData.username}</h1>
            <h1>Total Contests Participated: {problemsData.Contests} </h1>
           {/* <div className='flex flex-col md:flex-row justify-center'> */}
           <div className='hidden sm:flex sm:justify-center'>
                <LineChart
                    width={700}
                    height={400}
                    data={contestsData}
                    margin={{ top: 20, right: 30, bottom: 20, left: -10 }}
                >
                    <Line type="monotone" dataKey="rating" stroke="#2563eb" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[minRating - 50, maxRating + 50]} /> {/* Set Y-axis dynamically */}
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
           <div className='flex sm:hidden'>
                <LineChart
                    width={360}
                    height={400}
                    data={contestsData}
                    margin={{ top: 20, right: 10, bottom: 20, left: 5 }}
                >
                    <Line type="monotone" dataKey="rating" stroke="#2563eb" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[minRating - 50, maxRating + 50]} /> {/* Set Y-axis dynamically */}
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
        </div>
    );
}

export default CodechefChart;
