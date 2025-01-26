import React, { useEffect, useRef } from "react";
import closeImg from '../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddBatch = ({
    setIsAddBatch, batches
}) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsAddBatch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsAddBatch]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onAddBatch = async (data) => {
        let year = Number(data.year);
        let branch = data.branch.toUpperCase();
        if (data.year === "" || data.branch === "") {
            toast.error("Please fill all the fields");
            return;
        }
        // console.log(year, branch);
        let existingBatch = batches.find(batch => batch.year === year && batch.branch === branch);
        if (existingBatch) {
            toast.error("Batch already exists");
            return;
        }
        setIsAddBatch(false);
        navigate(`/super/edit/${year}/${branch}`);
    }

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <form
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
                onSubmit={handleSubmit(onAddBatch)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">Add Batch</h1>
                    <img onClick={() => setIsAddBatch(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <label className="labelText" htmlFor="year">Year</label>
                <input type="number" id="year" name="year" className="textInputBox mb-2" {...register("year")} />
                <label className="labelText" htmlFor="">Branch</label>
                <input type="text" id="branch" name="branch" className="textInputBox mb-2" {...register('branch')} />
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
export default AddBatch