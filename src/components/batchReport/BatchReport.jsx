import React from 'react'
import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form';
import ExportToXlxs from '../../functions/ExportToXlxs';
import { filterCodechef, filterCodeforces, filterLeetcode } from '../../functions/filterLogics/filterLogics';
import Loading from '../Loading'
const Table = React.lazy(() => import('../Table'));

function BatchReport({studentsInfo,isFetchedFromAPI}) {
    const [areThereAnyContests, setAreThereAnyContests] = useState(false);

    const { register, handleSubmit } = useForm();
    const [filteredContests, setFilteredContests] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const todayDate = new Date();
    const oneWeekAgoDate = new Date(todayDate);
    oneWeekAgoDate.setDate(todayDate.getDate() - 7);
    const todayFormatted = todayDate.toISOString().split('T')[0];
    const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
    const ccDateFormat = todayDate.toISOString().split(' ')[0];
    const today = new Date().toISOString().split('T')[0];


    async function handleFormSubmit(dataFromForm) {
        console.log('dataFromForm: ', dataFromForm);
        // FILTER STUDENTS ACCORDING TO ROLL NO ACCORDING TO LAST 2 VALUES
        let fromRoll = dataFromForm.fromroll;
        let toRoll = dataFromForm.toroll;
        let students = studentsInfo.filter((student) => {
            let roll = student.roll;

            let rollNo = roll.split('A')[1];
            return rollNo >= fromRoll.split('A')[1] && rollNo <= toRoll.split('A')[1];
        });
        // console.log('students: ', students);
        let filteredContests = await students.map(async (student) => {
            return {
                student,
                contests: {
                    leetcode: filterLeetcode(dataFromForm.from, dataFromForm.to, student.leetcode.data.userContestRankingHistory),
                    codechef: filterCodechef(dataFromForm.from, dataFromForm.to, student.codechef.newAllRating),
                    codeforces: filterCodeforces(dataFromForm.from, dataFromForm.to, student.codeforces.attendedContests)
                }
            };
        });
        filteredContests = await Promise.all(filteredContests);
        console.log('filteredContests: ', filteredContests);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        setFilteredContests(filteredContests);

        setIsSubmitted(true);
        // Resolves Renderering table w/o Data
        filteredContests.map((contest) => {
            if (contest.contests.codechef.length > 0 || contest.contests.codeforces.length > 0 || contest.contests.leetcode.length > 0) {
                // console.log('true');
                // console.log(contest.contests.codechef.length, contest.contests.codeforces.length, contest.contests.leetcode.length)
                setAreThereAnyContests(true);
            } else {
                setAreThereAnyContests(false);
            }
        });
    }

    return (
        <div className="mt-6 m-3">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-4 mb-2 border rounded-md ">
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Batch Report</h1>
                <div className="flex-row flex justify-between">
                    <div className="mb-4 w-1/2 pr-2">
                        <label htmlFor="from" className="labelText">From</label>
                        <input
                            type="date"
                            id="from"
                            defaultValue={oneWeekAgoFormatted}
                            max={today}
                            className="textInputBox"
                            {...register('from')}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label htmlFor="to" className="labelText">To</label>
                        <input
                            type="date" id="to"
                            defaultValue={todayFormatted}
                            max={today}
                            className="textInputBox"
                            {...register('to')}
                        />
                    </div>
                </div>
                <div className="flex-row flex justify-between">
                    <div className="mb-4 w-1/2 pr-2">
                        <label htmlFor="fromroll" className="labelText">From Roll No</label>
                        <input type="text" id="fromroll" defaultValue="22501A05D4" className='textInputBox' {...register('fromroll')} onInput={(e) => e.target.value = e.target.value.toUpperCase()} />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label htmlFor="toroll" className="labelText">To Roll No</label>
                        <input
                            type="text" id="toroll" defaultValue="22501A05J8"
                            className='textInputBox'
                            {...register('toroll')}
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                        />
                    </div>
                </div>
                {
                    // isFetched &&
                    <button
                        type="submit"
                        className={`
                    w-full   text-white 
                    font-semibold py-2 px-4 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isFetchedFromAPI ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                    transition duration-700 ease-in-out
                    `}
                    >
                        {isFetchedFromAPI ? 'Submit' : 'Fetching Data...'}
                    </button>
                }
                {
                    isSubmitted &&
                    areThereAnyContests &&
                    <button
                        onClick={() => ExportToXlxs(filteredContests)}
                        className={`
                 btnSubmit w-full mt-2
                `}
                    >
                        Download .xlsx
                    </button>
                }
            </form>
            {
                isSubmitted &&
                areThereAnyContests &&
                <>
                    <Suspense
                        fallback={
                            <div className='w-full flex flex-row justify-center '>
                                <Loading />
                            </div>
                        }
                    >
                        <Table data={filteredContests} />
                    </Suspense>
                </>
            }
        </div>
    )
}

export default BatchReport