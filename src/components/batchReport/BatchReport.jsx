import React, { useEffect } from 'react'
import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form';
import ExportToXlxs from '../../functions/ExportToXlxs';
import { filterCodechef, filterCodeforces, filterLeetcode } from '../../functions/filterLogics/filterLogics';
import Loading from '../Loading'
const Table = React.lazy(() => import('../Table'));
import toast from 'react-hot-toast';
import { data } from 'autoprefixer';
// import notify from '../toasts/notify';

function BatchReport({ studentsInfo, isFetchedFromAPI }) {
    console.log('studentsInfo: ', studentsInfo);

    // const [studentInfo, setStudentInfo] = useState([]);

    const [areThereAnyContests, setAreThereAnyContests] = useState(false);
    const [isTheDataAvailable, setIsTheDataAvailable] = useState(true);

    const [batchNumber, setBatchNumber] = useState('batch22');

    const [fromRollForm, setFromRoll] = useState('22501A0501');
    const [toRollForm, setToRoll] = useState('22501A05J8');


    const { register, handleSubmit } = useForm();
    const [filteredContests, setFilteredContests] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [whtplatform, setplatform] = useState('all');
    const [hasLeetcode, setHasLeetcode] = useState(false);
    const [hasCodechef, setHasCodechef] = useState(false);
    const [hasCodeforces, setHasCodeforces] = useState(false);

    const todayDate = new Date();
    const oneWeekAgoDate = new Date(todayDate);
    oneWeekAgoDate.setDate(todayDate.getDate() - 7);
    const todayFormatted = todayDate.toISOString().split('T')[0];
    const oneWeekAgoFormatted = oneWeekAgoDate.toISOString().split('T')[0];
    const ccDateFormat = todayDate.toISOString().split(' ')[0];
    const today = new Date().toISOString().split('T')[0];

    const putToast = () => {
        toast.error('No Contests Found', {
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

    async function handleFormSubmit(dataFromForm) {
        try{

            console.log('dataFromForm: ', dataFromForm);
            let studentsData;
            if(dataFromForm.batch=='batch21'){
                studentsData = studentsInfo.Batch21Data;
            }else{
                studentsData = studentsInfo.Batch22Data;
            }
            // FILTER STUDENTS ACCORDING TO ROLL NO 
            let fromRoll = dataFromForm.fromroll;
            let toRoll = dataFromForm.toroll;
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
            console.log('filteredContests: ', filteredContests);
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            setFilteredContests(filteredContests);
    
            // Check if there are any contests
            const hasContests = filteredContests.some(contest =>
                contest.contests.codechef.length > 0 ||
                contest.contests.codeforces.length > 0 ||
                contest.contests.leetcode.length > 0
            );
    
            setAreThereAnyContests(hasContests);
            setFilteredContests(filteredContests);
            setIsSubmitted(true);
            setplatform(dataFromForm.platform);
            if (!hasContests) {
                putToast();
            }
            // Check if there are any contests for asked platform
            const HasLeetcode = filteredContests.some(contest =>
                contest.contests.leetcode.length > 0
            );
            setHasLeetcode(HasLeetcode);
            const HasCodechef = filteredContests.some(contest =>
                contest.contests.codechef.length > 0
            );
            setHasCodechef(HasCodechef);
            const HasCodeforces = filteredContests.some(contest =>
                contest.contests.codeforces.length > 0
            );
            setHasCodeforces(HasCodeforces);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("batchNumber: ", batchNumber);
        if (batchNumber == 'batch21') {
            setFromRoll('21501A0501');
            setToRoll('21501A05J7');
        }
        else if (batchNumber == 'batch22') {
            setFromRoll('22501A0501');
            setToRoll('22501A05J8');
        }
    }, [batchNumber]);



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
                {/* Select which Batch */}
                <div>
                    <label className="labelText">Select Batch</label>
                    <select
                        className="textInputBox mb-4"
                        {...register('batch')}
                        defaultValue={"batch22"}
                        onChange={(e) => {
                            setBatchNumber(e.target.value);
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
                            onChange={(e)=>{setFromRoll(e.target.value)}}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label htmlFor="toroll" className="labelText">To Roll No</label>
                        <input
                            type="text" id="toroll" value={toRollForm}
                            className='textInputBox'
                            {...register('toroll')}
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                            onChange={(e)=>{setToRoll(e.target.value)}}
                        />
                    </div>
                </div>

                {/* Select which platform to display */}
                <div>
                    <label className="labelText">Select Platform</label>
                    <select
                        className="textInputBox mb-4"
                        {...register('platform')}
                    >
                        <option value="all">All</option>
                        <option value="codechef">Codechef</option>
                        <option value="codeforces">Codeforces</option>
                        <option value="leetcode">Leetcode</option>
                    </select>
                </div>
                {
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
                    (whtplatform === 'all' || (whtplatform === 'leetcode' && hasLeetcode) || (whtplatform === 'codechef' && hasCodechef) || (whtplatform === 'codeforces' && hasCodeforces)) &&



                    <button
                        onClick={() => ExportToXlxs(filteredContests, whtplatform)}
                        className={
                            `btnSubmit w-full mt-2`
                        }
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
                        <Table data={filteredContests} filter={whtplatform} />
                    </Suspense>
                </>
            }
        </div>
    )
}

export default BatchReport