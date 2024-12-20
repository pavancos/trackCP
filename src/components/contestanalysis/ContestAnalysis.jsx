import React from 'react'
import { useState, useEffect } from 'react'
import { set, useForm } from 'react-hook-form'
import { getUniqueContests } from '../../functions/uniqueContests/UniqueContests'
import { filterLeetcode, filterCodechef, filterCodeforces } from '../../functions/filterLogics/filterLogics'
import toast from 'react-hot-toast';
import AnalysisTable from './AnalysisTable'

const ContestAnalysis = ({ studentsInfo, isFetchedFromAPI }) => {
    console.log('studentsInfo: ', studentsInfo);
    const { register, handleSubmit } = useForm();


    const [batchNumber, setBatchNumber] = useState('batch22');

    const [fromRollForm, setFromRoll] = useState('22501A0501');
    const [toRollForm, setToRoll] = useState('22501A05J8');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // for the getUniqueContests
    const [uniqueCodechefContestNames, setUniqueCodechefContestNames] = useState([]);
    const [uniqueLeetcodeContestNames, setUniqueLeetcodeContestNames] = useState([]);
    const [uniqueCodeforcesContestNames, setUniqueCodeforcesContestNames] = useState([]);
    const [uniqueContests, setUniqueContests] = useState(null);

    const [leetcodeParticipants, setLeetcodeParticipants] = useState([]);
    const [codechefParticipants, setCodechefParticipants] = useState([]);
    const [codeforcesParticipants, setCodeforcesParticipants] = useState([]);

    const [isFiltered, setIsFiltered] = useState(false);
    const [combinedContests, setCombinedContests] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [areThereAnyContests, setAreThereAnyContests] = useState(false);



    const todayDate = new Date();
    const oneWeekAgoDate = new Date(todayDate);
    oneWeekAgoDate.setDate(todayDate.getDate() - 7);
    const todayFormatted = todayDate.toISOString().split('T')[0];
    // console.log('todayFormatted: ', todayFormatted);
    const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
    // console.log('oneWeekAgoFormatted: ', oneWeekAgoFormatted);

    const putErrToast = (err) => {
        toast.error(err, {
            style: {
                marginTop: '-10px',
                marginBottom: '10px',
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
            iconTheme: {
                primary: '#333',
                secondary: '#fff',
            },
            icon: '🚫',
        });
    }
    async function handleContestAnalysisSubmit(dataFromForm) {
        console.log('dataFromForm: ', dataFromForm);
        // console.log("Contest Analysis Submitted");
        let studentsData;
        if (batchNumber == 'batch21') {
            studentsData = studentsInfo.Batch21Data;
        } else {
            studentsData = studentsInfo.Batch22Data;
        }
        let fromRoll = fromRollForm;
        let toRoll = toRollForm;

        if (fromRoll > toRoll) {
            putErrToast('Enter Valid Roll No Range');
            // throw new Error('Enter Valid Roll No Range');
        }
        let students = studentsData.filter((student) => {
            let roll = student.roll;
            let fromRollFormatted = fromRoll.toUpperCase();
            let toRollFormatted = toRoll.toUpperCase();
            return roll >= fromRollFormatted && roll <= toRollFormatted;
        });

        // console.log('students: ', students);

        let filteredContests = await students.map(async (student) => {
            // console.log('student: ', student);

            return {
                student,
                contests: {
                    leetcode: filterLeetcode(dataFromForm.from, dataFromForm.to, student.leetcode?.data?.userContestRankingHistory || []),
                    codechef: filterCodechef(dataFromForm.from, dataFromForm.to, student.codechef?.newAllRating || []),
                    codeforces: filterCodeforces(dataFromForm.from, dataFromForm.to, student.codeforces?.attendedContests || [])
                }
            };
        });
        filteredContests = await Promise.all(filteredContests);
        console.log(' filteredContests: ', filteredContests);
        const hasContests = filteredContests.some(contest =>
            contest.contests.codechef.length > 0 ||
            contest.contests.codeforces.length > 0 ||
            contest.contests.leetcode.length > 0
        );
        setAreThereAnyContests(hasContests);
        if (!hasContests) {
            putErrToast('No Contests Found');
            setIsSubmitted(false);
            return;
        }
        await getUniqueContests(filteredContests, setUniqueCodechefContestNames, setUniqueLeetcodeContestNames, setUniqueCodeforcesContestNames, setUniqueContests, setLeetcodeParticipants, setCodechefParticipants, setCodeforcesParticipants);
        console.log('uniqueContests: ', uniqueContests);
        setIsSubmitted(true);
    }

    useEffect(() => {
        // console.log("batchNumber: ", batchNumber);
        if (batchNumber == 'batch21') {
            setFromRoll('21501A0501');
            setToRoll('21501A05J7');
        }
        else if (batchNumber == 'batch22') {
            setFromRoll('22501A0501');
            setToRoll('22501A05J8');
        }
    }, [batchNumber]);

    async function handleContestSelect(data) {
        console.log('data: ', data);
        setIsFiltered(true);

        let newUniqueContests = [];
        if (uniqueContests.leetcode.length > 0) {
            newUniqueContests = [...uniqueContests.leetcode];
        }
        if (uniqueContests.codechef.length > 0) {
            console.log('uniqueContests.codechef: ', uniqueContests.codechef);
            let newCodechefContests = uniqueContests.codechef.map((con) => {
                let codechefContest = con;
                // console.log('codechefContest: ', codechefContest);
                let newParticipants = codechefContest.contest.participants.map((participant) => {
                    // console.log(participant);
                    return {
                        name: participant.name,
                        roll: participant.roll,
                        performance: {
                            ranking: participant.performance.rank,
                            problemsSolved: participant.performance.problemsSolved.length,
                        }
                    }
                })
                let newcontest = [{
                    contest: {
                        title: codechefContest.contest.title,
                        platform:"codechef",
                        participants: newParticipants
                    }
                }]
                newUniqueContests = [...newUniqueContests, ...newcontest];
            })
        }
        if (uniqueContests.codeforces.length > 0) {
            let newCodeforces = uniqueContests.codeforces.map((con) => {
                let codeforcesContest = con;
                // console.log('codeforcesContest: ', codeforcesContest);
                let newParticipants = codeforcesContest.contest.participants.map((participant) => {
                    // console.log(participant);
                    return {
                        name: participant.name,
                        roll: participant.roll,
                        performance: {
                            ranking: participant.performance.rank,
                            problemsSolved: participant.performance.problemsSolved,
                        }
                    }
                })
                console.log('newParticipants: ', newParticipants);

                let newcontest = [{
                    contest: {
                        title: codeforcesContest.contest.title,
                        platform:"codeforces",
                        participants: newParticipants
                    }
                }]

                newUniqueContests = [...newUniqueContests, ...newcontest];
            })
        }
        // console.log('newUniqueContests: ', newUniqueContests);
        setCombinedContests(newUniqueContests);

        let getContestFullDetails = newUniqueContests.filter((con) => {
            // console.log('con: ', con);
            return con.contest.title === data.contest;
        })
        getContestFullDetails = getContestFullDetails[0].contest.participants;
        console.log('getContestFullDetails: ', getContestFullDetails);
        setTableData(getContestFullDetails);
    }

    return (
        <>
            <div className="mt-6 m-3">
                <form onSubmit={handleSubmit(handleContestAnalysisSubmit)} className="max-w-md mx-auto p-4 mb-2 border rounded-md ">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Contest Analysis</h1>
                    <div className="flex-row flex justify-between">
                        <div className="mb-4 w-1/2 pr-2">
                            <label htmlFor="from" className="labelText">From</label>
                            <input
                                type="date"
                                id="from"
                                defaultValue={oneWeekAgoFormatted}
                                max={todayDate}
                                className="textInputBox"
                                {...register('from')}
                            />
                        </div>
                        <div className="mb-4 w-1/2 pl-2">
                            <label htmlFor="to" className="labelText">To</label>
                            <input
                                type="date" id="to"
                                defaultValue={todayFormatted}
                                max={todayDate}
                                className="textInputBox"
                                {...register('to')}
                            />
                        </div>
                    </div>
                    {/* Select which Batch */}
                    <div>
                        <label className="labelText">Select Batch</label>
                        <select
                            className="textInputBox mb-4"
                            {...register('batch')}
                            defaultValue={"batch22"}
                            onChange={(e) => {
                                setBatchNumber(e.target.value);
                                setIsSubmitted(false);
                            }}
                        >
                            <option value="batch22">22 Batch</option>
                            <option value="batch21">21 Batch</option>
                        </select>
                    </div>
                    <div className="flex-row flex justify-between">
                        <div className="mb-4 w-1/2 pr-2">
                            <label htmlFor="fromroll" className="labelText">From Roll No</label>
                            <input
                                type="text" id="fromroll" value={fromRollForm}
                                className='textInputBox' {...register('fromroll')}
                                onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                onChange={(e) => { setFromRoll(e.target.value); setIsSubmitted(false) }}
                            />
                        </div>
                        <div className="mb-4 w-1/2 pl-2">
                            <label htmlFor="toroll" className="labelText">To Roll No</label>
                            <input
                                type="text" id="toroll" value={toRollForm}
                                className='textInputBox'
                                {...register('toroll')}
                                onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                                onChange={(e) => {
                                    setToRoll(e.target.value),
                                        setIsSubmitted(false)
                                }}
                            />
                        </div>
                    </div>

                    {
                        <button
                            type="submit"
                            className={
                                `w-full   text-white 
                                font-semibold py-2 px-4 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                ${isFetchedFromAPI ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                                transition duration-700 ease-in-out`
                            }
                        >
                            {isFetchedFromAPI ? 'Submit' : 'Fetching Data...'}
                        </button>
                    }
                </form>

            </div>
            {
                isSubmitted &&
                <div className="mt-6 m-3">
                    <form onSubmit={handleSubmit(handleContestSelect)} className="max-w-md mx-auto p-4 mb-2 border rounded-md ">
                        {/* Select which Batch */}
                        <div>
                            <label className="labelText">Select Contest</label>
                            <select
                                className="textInputBox mb-4"
                                {...register('contest')}
                            >
                                {
                                    uniqueContests.leetcode.map((contest) => {
                                        return (
                                            <option key={contest.contest.title} value={contest.contest.title}>{contest.contest.title}</option>
                                        )
                                    })
                                }
                                {uniqueContests.codechef.map((contest) => {
                                    return (
                                        <option key={contest.contest.title} value={contest.contest.title}>{contest.contest.title}</option>
                                    )
                                })
                                }
                                {
                                    uniqueContests.codeforces.map((contest) => {
                                        return (
                                            <option key={contest.contest.title} value={contest.contest.title}>{contest.contest.title}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            <button
                                type="submit"
                                className={
                                    `w-full   text-white 
                                font-semibold py-2 px-4 rounded-md focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                ${isFetchedFromAPI ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                                transition duration-700 ease-in-out`
                                }
                            >
                                {'Get Participants'}
                            </button>
                        }
                    </form>
                </div>
            }
            {
                isFiltered && isSubmitted &&
                <AnalysisTable tableData={tableData} />
            }
        </>
    )
}

export default ContestAnalysis