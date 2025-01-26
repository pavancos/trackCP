import { useEffect, useRef } from "react";
import closeImg from '../../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"
import { useAuth } from "../../../../store/authContext";
import {deleteBatch} from '../batchConfigHandler'


const DeleteModal = ({ setIsDelete, year, branch }) => {
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

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <div
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">Are You Sure</h1>
                    <img onClick={() => setIsDelete(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <h1></h1>
                <div className="flex gap-x-2">
                    <button
                        onClick={()=>{
                            setIsDelete(false)
                            // deleteBatch(year, branch,authState.token)
                        }}
                        className=" bg-red-500 btnSubmit">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
