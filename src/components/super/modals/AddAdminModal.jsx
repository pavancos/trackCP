import { useEffect, useRef } from "react";
import closeImg from '../../../assets/CloseDelete.svg'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../../store/authContext";
import { addAdminHandler } from "./modalHandlers";
const AddAdminModal = ({ setIsAddAdmin }) => {
    const { authState } = useAuth();
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsAddAdmin(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsAddAdmin]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onAddAdmin = async(data) => {
        // console.log(data);
        const token = authState.token;
        // console.log(authState.token)
        if (data.username === "" || data.password === "") {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const { username, password, role } = data;
            const newUser = await addAdminHandler(username, password, role, token);
            // console.log(newUser)
            if (!newUser.error) {
                toast.success(newUser.message);
                setIsAddAdmin(false);
                return;
            }
            // console.log(newUser);
            toast.error(newUser.message);
            return;
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="fixed z-10 w-screen h-screen inset-0 bg-[#0004] flex justify-center items-center">
            <form
                ref={modalRef}
                className="fixed z-20 w-[300px] h-min flex flex-col inset-0 m-auto bg-white rounded-md p-4"
                onSubmit={handleSubmit(onAddAdmin)}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-blue-700 text-center">Add Admin</h1>
                    <img onClick={() => setIsAddAdmin(false)} src={closeImg} className="w-5 mt-1 hover:cursor-pointer" alt="" />
                </div>
                <label className="labelText" htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className="textInputBox mb-2" {...register("username")} />
                <label className="labelText" htmlFor="">Password</label>
                <input type="password" id="password" name="password" className="textInputBox mb-2" {...register('password')} />
                <label className="labelText" htmlFor="">Role</label>
                <select className="textInputBox mt-2"  {...register('role')} >
                    <option value="admin">Admin</option>
                    <option value="dev">Dev</option>
                    <option value="user">User</option>
                </select>
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

export default AddAdminModal;