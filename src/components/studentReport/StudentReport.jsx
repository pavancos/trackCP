import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Suspense, useState } from 'react';
import Loading from '../Loading'
const Table = React.lazy(() => import('../Table'));
import toast from 'react-hot-toast';

const UserForm = ({ studentsInfo, isFetchedFromAPI }) => {
    // useEffect(()=>{
    //     console.log("Student Info: ",studentsInfo);
    // })
    const [whtplatform, setplatform] = useState('all');


    const putToast = () => {
        toast.error('No Data Found', {
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
            duration: 2000
        });
    }
    // console.log("Student data :", studentsInfo);
    const { register, handleSubmit } = useForm();
    const [isStudentReport, setIsStudentReport] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userData, setUserData] = useState([]);
    const handleUserSubmit = async function (data) {
        // console.log('data: ', data);
        // data.rollNo = data.rollNo.toUpperCase();
        let studentDetails = studentsInfo.find((student) => student.roll === data.rollno);
        // console.log('studentDetails: ', studentDetails);
        if (!studentDetails) {
            setUserData([]);
            setIsSubmitted(true);
            putToast();
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
        // console.log('DataOfUsers: ', userData);
        setUserData(DataOfUsers);
        setIsSubmitted(true);
        setplatform(data.platform)
    }
    return (
        <>
            <div className='m-3'>
                <form
                    className={`p-6 max-w-md mx-auto border rounded-md mt-6`}
                    onSubmit={handleSubmit((data) => handleUserSubmit(data))}
                    
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
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                        />
                        {/* Select which platform to display */}
                        <div className='mt-4'>
                            <label className="labelText ">Select Platform</label>
                            <select
                                className="textInputBox"
                                {...register('platform')}
                            >
                                <option value="all">All</option>
                                <option value="codechef">Codechef</option>
                                <option value="codeforces">Codeforces</option>
                                <option value="leetcode">Leetcode</option>
                            </select>
                        </div>

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
            </div>

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
                            userData.length > 0 &&
                            <Table data={userData} isStudentReport={isStudentReport} filter={whtplatform}/>
                        }
                    </div>
                }
            </Suspense>
        </>

    )
}

export default UserForm