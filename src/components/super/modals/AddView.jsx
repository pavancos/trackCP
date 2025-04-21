import React, { useEffect, useRef } from "react";
import closeImg from '../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addView } from "../handlers";
import { useAuth } from "../../../store/authContext";


const AddView = ({
    setIsAddView,
    views
}) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const {authState} =  useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsAddView(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsAddView]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onAddView = async (data) => {
        if (data.viewName === "" || data.studentRolls === "") {
            toast.error("Please fill all the fields");
            return;
        }
        let newViewName = data.viewName.toString().trim().split(' ').join('-');
        let studentRolls = data.studentRolls.split(',').map(roll => roll.toString().trim().toUpperCase()).filter(roll=>roll!=="");
        const isExisting = views.find(view=> {
            return view === newViewName;
        });
        if (isExisting) {
            toast.error("View already exists");
            return;
        }
        console.log("newViewName: ", newViewName);
        console.log("studentRolls: ", studentRolls);
        const response=await addView(newViewName,studentRolls,authState.token)
        if(response.error){
            toast.error(response.message);
            return;
        }
        toast.success("View added successfully");
        setIsAddView(false);
    }

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <form
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
                onSubmit={handleSubmit(onAddView)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">Add View</h1>
                    <img onClick={() => setIsAddView(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <label className="labelText" htmlFor="viewName">Name</label>
                <input type="text" id="viewName" name="viewName" className="textInputBox mb-2" {...register("viewName")} />
                <label className="labelText" htmlFor="">Student Roll</label>
                <textarea type="text" id="studentRolls" name="studentRolls" className="textInputBox mb-2" {...register('studentRolls')}></textarea>
                <div className="flex gap-x-2">
                    <button
                        type="submit"
                        className="btnSubmit">
                        Add
                    </button>
                </div>

            </form>
        </div>
    );
};
export default AddView