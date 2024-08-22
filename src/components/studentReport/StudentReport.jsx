import React from 'react'
import { useForm } from 'react-hook-form';
import { Suspense, useState } from 'react';
import Loading from '../Loading'
const Table = React.lazy(() => import('../Table'));

const UserForm = ({ studentsInfo, isFetchedFromAPI }) => {
    // console.log("Student data :", studentsInfo);
    const { register, handleSubmit } = useForm();
    const [isStudentReport, setIsStudentReport] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userData, setUserData] = useState([]);
    const handleUserSubmit = async function (rollNo) {
        rollNo = rollNo.toUpperCase();
        let studentDetails = studentsInfo.find((student) => student.roll === rollNo);
        if (!studentDetails) {
            setUserData([]);
            setIsSubmitted(true);
            return;
        }
        let contestData = {
            leetcode: studentDetails.leetcode.data.userContestRankingHistory,
            codechef: studentDetails.codechef.newAllRating,
            codeforces: studentDetails.codeforces.attendedContests
        };
        let DataOfUser = {
            student: studentDetails,
            contests: contestData
        }
        let DataOfUsers = [DataOfUser];
        console.log('DataOfUsers: ', userData);
        setUserData(DataOfUsers);
        setIsSubmitted(true);
    }
    return (
        <>
            <form
                className={`p-6 max-w-md mx-auto border rounded-md mt-6`}
                onSubmit={handleSubmit((data) => handleUserSubmit(data.rollno))}
                onInput={(e) => e.target.value = e.target.value.toUpperCase()}
            >
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Student Report</h1>
                <div>
                    <label className={`labelText`}>
                        Roll No
                    </label>

                    <input
                        defaultValue={'22501A05D4'}
                        type="text"
                        className='textInputBox'
                        {...register('rollno')}
                    />

                    {
                        // isFetched &&
                        <button
                            type="submit"
                            className={`
                    w-full mt-4  text-white 
                    font-semibold py-2 px-4 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isFetchedFromAPI ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                    transition duration-700 ease-in-out
                    `}
                        >
                            {isFetchedFromAPI ? 'Get Report' : 'Fetching Data...'}
                        </button>
                    }
                </div>

            </form>
            <Suspense
                fallback={
                    <div className='w-full flex flex-row justify-center '>
                        <Loading />
                    </div>
                }
            >
                {isSubmitted &&
                    <div className={`m-3`}>
                        {
                            userData.length > 0 ?
                                <Table data={userData} isStudentReport={isStudentReport} /> :
                                <div className={`w-full flex flex-row justify-center `}>
                                    <h1>No Data Found</h1>
                                </div>
                        }
                    </div>
                }
            </Suspense>
        </>

    )
}

export default UserForm