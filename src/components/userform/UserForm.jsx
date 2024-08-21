import React from 'react'
import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';

const UserForm = ({ studentsInfo }) => {
    // console.log("Student data :", studentsInfo);
    const { register, handleSubmit } = useForm();
    const handleUserSubmit = async function (rollNo) {
        rollNo = rollNo.toUpperCase();
        let studentDetails = studentsInfo.find((student) => student.roll === rollNo);
        console.log(studentDetails);
    }
    return (
        <form
            className={`p-6 max-w-md mx-auto border rounded-md`}
            onSubmit={handleSubmit((data) => handleUserSubmit(data.rollno))}
        >
            <div>
                <label className={`labelText`}>
                    Roll No
                </label>
                <input
                    defaultValue={'22501A05D4'}
                    type="text"
                    className='textInputBox'
                    {...register('rollno')  }
                />


                <button
                    type="submit"
                    className={`btnSubmit`}>
                        Get Report
                </button>
            </div>

        </form>
    )
}

export default UserForm