import React, { useEffect, useRef } from "react";
import closeImg from "../../../assets/CloseDelete.svg";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addStudent, updateStudent } from "./modalHandlers";
import { useAuth } from "../../../store/authContext";

const AddStudent = ({ studentData, isEdit, onDone, year, branch, setStudents, students }) => {
    const { register, handleSubmit, setValue } = useForm();
    const modalRef = useRef();
    const navigate = useNavigate();
    const { authState } = useAuth();

    useEffect(() => {
        if (isEdit && studentData) {
            setValue("rollNo", studentData.rollNo);
            setValue("name", studentData.name);
            setValue("leetcode", studentData.leetcode);
            setValue("codechef", studentData.codechef);
            setValue("codeforces", studentData.codeforces);
            setValue("interviewbit", studentData.interviewbit);
            setValue("hackerrank", studentData.hackerrank);
            setValue("spoj", studentData.spoj);
        }
    }, [isEdit, studentData, setValue]);

    const onSubmit = async (data) => {
        let student = {
            rollNo: data.rollNo.toUpperCase(),
            name: data.name,
            leetcode: {
                username: data.leetcode,
            },
            codechef: {
                username: data.codechef,
            },
            codeforces: {
                username: data.codeforces,
            },
            interviewbit: {
                username: data.interviewbit,
            },
            hackerrank: data.hackerrank,
            spoj: data.spoj,
        };

        if (!data.rollNo || !data.name || !data.leetcode || !data.codechef || !data.codeforces || !data.interviewbit || !data.hackerrank || !data.spoj) {
            toast.error("Please fill all the fields!");
            return;
        }

        let token = authState.token;
        if (isEdit) {
            const res = await updateStudent(student, year, branch, token);
            if (res.error) {
                toast.error(res.message);
            } else {
                let updatedStudents = students.map((stud) => {
                    if (stud.rollNo === student.rollNo) {
                        return student;
                    }
                    return stud;
                });
                setStudents(updatedStudents);
                toast.success("Student Updated successfully!");
                onDone();
            }
        } else {
            const res = await addStudent(student, year, branch, token);
            if (res.error) {
                toast.error(res.message);
            } else {
                setStudents([...students, student]);
                toast.success("Student Added successfully!");
                onDone();
            }
        }
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onDone && onDone();
        }
    };

    return (
        <div
            className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center"
            onClick={handleOutsideClick}
        >
            <form
                ref={modalRef}
                className="fixed z-20 w-max h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">
                        {isEdit ? "Edit Student" : "Add Student"}
                    </h1>
                    <img
                        onClick={() => onDone && onDone()}
                        src={closeImg}
                        className="w-5 mt-1 hover:cursor-pointer"
                        alt="close"
                    />
                </div>
                <div className="sm:flex w-fit sm:gap-x-4">
                    <div>
                        <label className="labelText" htmlFor="rollNo">Roll No</label>
                        <input
                            type="text"
                            id="rollNo"
                            name="rollNo"
                            className="textInputBox mb-2"
                            {...register("rollNo")}
                            disabled={isEdit}
                        />
                    </div>
                    <div>
                        <label className="labelText" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="textInputBox mb-2"
                            {...register("name")}
                        />
                    </div>
                </div>
                <div className="sm:flex w-fit sm:gap-x-4">
                    <div>
                        <label className="labelText" htmlFor="leetcode">LeetCode</label>
                        <input
                            type="text"
                            id="leetcode"
                            name="leetcode"
                            className="textInputBox mb-2"
                            {...register("leetcode")}
                        />
                    </div>
                    <div>
                        <label className="labelText" htmlFor="codechef">CodeChef</label>
                        <input
                            type="text"
                            id="codechef"
                            name="codechef"
                            className="textInputBox mb-2"
                            {...register("codechef")}
                        />
                    </div>
                </div>
                <div className="sm:flex w-fit sm:gap-x-4">
                    <div>
                        <label className="labelText" htmlFor="codeforces">CodeForces</label>
                        <input
                            type="text"
                            id="codeforces"
                            name="codeforces"
                            className="textInputBox mb-2"
                            {...register("codeforces")}
                        />
                    </div>
                    <div>
                        <label className="labelText" htmlFor="interviewbit">InterviewBit</label>
                        <input
                            type="text"
                            id="interviewbit"
                            name="interviewbit"
                            className="textInputBox mb-2"
                            {...register("interviewbit")}
                        />
                    </div>
                </div>
                <div className="sm:flex w-fit sm:gap-x-4">
                    <div>
                        <label className="labelText" htmlFor="hackerrank">HackerRank</label>
                        <input
                            type="text"
                            id="hackerrank"
                            name="hackerrank"
                            className="textInputBox mb-2"
                            {...register("hackerrank")}
                        />
                    </div>
                    <div>
                        <label className="labelText" htmlFor="spoj">Spoj</label>
                        <input
                            type="text"
                            id="spoj"
                            name="spoj"
                            className="textInputBox mb-2"
                            {...register("spoj")}
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex w-full gap-x-2 mt-0">
                    <button type="submit" className="btnSubmit">
                        {isEdit ? "Done" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
