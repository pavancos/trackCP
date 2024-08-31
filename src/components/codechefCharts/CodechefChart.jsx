import React, { useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
function CustomTooltip({ payload, label, active }) {
    // console.log('active: ', active);
    // console.log('label: ', label);
    // console.log('payload: ', payload);
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].payload.pv}`}</p>
                <p className="desc">Anything you want can be displayed here.</p>
            </div>
        );
    }

    return null;
}
const formatDate = (dateString) => {
    console.log('dateString: ', dateString);
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

function CodechefChart({ codechefData }) {
    console.log('codechefData: ', codechefData);
    let contestsData = codechefData.contests.reverse();
    console.log('contestsData: ', contestsData);

    contestsData = contestsData.map((contest) => {
        contest.end_date = contest.end_date.split(' ')[0];
        console.log('contest.date: ', contest.end_date);
        return {
            name: contest.end_date,
            rank: contest.rating
        }
    });

    return (
        <div>
            <h1>Username:{codechefData.username}</h1>
            <LineChart   width={950} height={400} data={contestsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="rank" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
                {/* <Tooltip content={<CustomTooltip />} /> */}
            </LineChart>
        </div>
    )
}

export default CodechefChart