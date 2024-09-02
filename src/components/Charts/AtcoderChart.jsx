import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};
function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                <p>{`Rank: ${payload[0].payload.rank}`}</p>
                <p className="label">{`${payload[0].payload.date}`}</p>
                <p className="desc text-gray-500">{`${payload[0].payload.name}`}</p>
            </div>
        );
    }
    return null;
}

function AtcoderChart({ atcoderData }) {
    console.log('atcoderData: ', atcoderData);
    let totalContestsParticipated = atcoderData.contests.length;
    console.log('totalContestsParticipated: ', totalContestsParticipated);

    let contestsData = atcoderData.contests.map((contest, index) => {
        return {
            name: contest.name,
            rank: contest.rank,
            date: formatDate(contest.date.split(' ')[0]),
        }
    });
    console.log('contestsData: ', contestsData);

    const minRank = Math.min(...contestsData.map(contest => contest.rank));
    const maxRank = Math.max(...contestsData.map(contest => contest.rank));

    return (
        <div>
            <h1 className='text-2xl font-semibold text-blue-500'>Atcoder</h1>
            <h1>Username: {atcoderData.username}</h1>
            <p>Total Contests Participated: {totalContestsParticipated}</p>
            <div className='hidden sm:flex sm:justify-center'>
                <LineChart width={700} height={400} data={contestsData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                >
                    <Line type="monotone" dataKey="rank" stroke="#2563eb" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[minRank - 50, maxRank + 50]} />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
            <div className='flex sm:hidden'>
                <LineChart width={360} height={400} data={contestsData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 5 }}
                >
                    <Line type="monotone" dataKey="rank" stroke="#2563eb" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="1 5" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[minRank - 50, maxRank + 50]} />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
        </div>
    )
}

export default AtcoderChart