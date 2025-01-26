import { useEffect, useRef } from "react";
import closeImg from '../../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"
import { useAuth } from "../../../../store/authContext";
import {deleteBatch} from '../batchConfigHandler'


const DeleteModal = ({ setIsDelete, year, branch, handleDelete }) => {
    console.log(year, branch);
    const { authState } = useAuth();
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsDelete(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsDelete]);


    const onDeleteClick = async ()=>{
        let res = await deleteBatch(year, branch, authState.token);
        if(res.error){
            toast.error(res.message)
        }
        else{
            toast.success(res.message);
            handleDelete(year, branch);
            setIsDelete(false);
        }
    }

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <div
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-black-700 text-center">Are You Sure?</h1>
                    <img onClick={() => setIsDelete(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <h1 className="text-xl mb-3">You are going to clear {year}-{branch} Batch</h1>
                <div className="flex gap-x-2">
                    <button
                        onClick={()=>{
                            onDeleteClick();
                        }}
                        className="w-full bg-red-700 text-white rounded-md py-2 font-semibold focus:outline-none">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
