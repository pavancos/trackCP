import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ContestTable from './ContestTable';
import toast from 'react-hot-toast';

const ContestAnalysis = ({ studentsInfo, isFetchedFromAPI }) => {
    const { register, handleSubmit } = useForm();

    const [contests, setContests] = useState([]);
    const [isContestFetched, setIsContestFetched] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);
    const [contestData, setContestData] = useState(null);

    async function fetchContests() {
        try {
            const res = await fetch('https://v2contestinfo.onrender.com/v2/contest/getContests');
            const data = await res.json();
            setContests(data.contests);
            // console.log('data.contests: ', data.contests);
            setIsContestFetched(true);
        } catch (err) {
            console.log(err);
            setContests(null);
            setIsContestFetched(false);
            // Add toast here for error handling
        }
    }

    useEffect(() => {
        fetchContests();
    }, []);

    async function onSubmit(data) {
        // console.log('data: ', data);


        try {
            // if 404 print toast saying contest not found
            // let res = await fetch('http://localhost:4000/v2/contest?contestName=' + data.contestName);
            let res = await fetch('https://v2contestinfo.onrender.com/v2/contest/id/'+data._id);
            // let res = await fetch('http://localhost:4000/v2/contest/id/'+data._id);
            res.json().then((data) => {
                setContestData(data);
            })
            // .then(()=>{
            //     console.log(contestData);
            // })
        } catch (err) {
            console.log(err);
            toast.error('Error! Please try again later');
            setContestData(null);
        }
    }

    return (
        <>
            <div className="m-3">
                <form
                    className="p-6 max-w-md mx-auto border rounded-md mt-6 shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
                        Contest Analysis
                    </h1>
                    <div className={` ${isContestFetched ? " " : "opacity-80 cursor-not-allowed "} `}>
                        <label className="labelText mb-1">Select Contest</label>
                        <select
                            {...register("_id")}
                            onChange={(e) => setSelectedContest(e.target.value)} // Handle onChange on select
                            className="w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition duration-300 ease-in-out mb-2"
                        >
                            <option value="">Select Contest</option>
                            {isContestFetched && contests.map((contest, index) => {
                                // console.log('contest: ', contest);
                                return(
                                    <option key={index} value={contest._id}>
                                        {contest.contestName}
                                    </option>
                                )
                            })}
                        </select>
                        <button
                            type="submit"
                            className={`w-full mt-4 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out`}
                        >
                            Get Analysis
                        </button>
                    </div>
                </form>
            </div>

            <div>
                {contestData && (
                    <div>
                        <a href={contestData.contest.link} target="_blank" >
                            <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
                                {contestData.contest.contestName} - {contestData.contest.date}
                            </h1>
                        </a>
                        <ContestTable contestData={contestData} />
                    </div>
                )}
            </div>
        </>
    );
};

export default ContestAnalysis;