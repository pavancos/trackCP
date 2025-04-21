import React, { useEffect, useRef } from "react";
import closeImg from '../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addView, removeStudentsFromView } from "../handlers";
import { useAuth } from "../../../store/authContext";


const DeleteStudentFromView = ({
    setRemoveStudents,
    viewName,
    refreshStudents
}) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const {authState} =  useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setRemoveStudents(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setRemoveStudents]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onDeleteStudent = async (data) => {
        if (data.studentRolls === "") {
            toast.error("Please fill the field");
            return;
        }
        let studentRolls = data.studentRolls.split(',').map(roll => roll.toString().trim().toUpperCase()).filter(roll=>roll!=="");
        const response = await removeStudentsFromView(viewName, studentRolls, authState.token);
        if(response.error){
            toast.error(response.message);
            return;
        }
        refreshStudents();
        toast.success("Students Removed from View");
        setRemoveStudents(false);
    }

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <form
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
                onSubmit={handleSubmit(onDeleteStudent)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">Delete Students</h1>
                    <img onClick={() => setRemoveStudents(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <label className="labelText" htmlFor="">Student Roll</label>
                <textarea type="text" id="studentRolls" name="studentRolls" className="textInputBox mb-2" {...register('studentRolls')}></textarea>
                <div className="flex gap-x-2">
                    <button
                        type="submit"
                        className="bg-red-500 w-full text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>

            </form>
        </div>
    );
};
export default DeleteStudentFromView