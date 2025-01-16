import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Suspense, useState } from 'react';
import Loading from '../Loading'
const Table = React.lazy(() => import('../Table'));
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const StudentReport = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const rollNo = e.target.elements.rollNo.value; // Get roll number from input
        if (rollNo) {
            navigate(`/student/${rollNo}`); // Redirect to the Student page with rollNo
        }
    };

    return (
        <>
            <div className='m-3'>
                <form
                    className={`p-6 max-w-md mx-auto border rounded-md mt-6`}
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Student Report</h1>
                    <div>
                        <label className={`labelText`}>
                            Roll No
                        </label>

                        <input
                            name="rollNo"
                            defaultValue={'22501A05D4'}
                            type="text"
                            className='textInputBox'
                            onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                        />
                        {
                            // isFetched &&
                            <button
                                type="submit"
                                className={`
                                    w-full mt-4  text-white 
                                    font-semibold py-2 px-4 rounded-md focus:outline-none 
                                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    ${true ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"}
                                    transition duration-700 ease-in-out
                                `}
                            >
                                Get Report
                            </button>
                        }
                    </div>
                </form>
            </div>
        </>

    )
}

export default StudentReport