import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getYearsBranches } from "./BatchUtil";
const BatchReport = () => {
    const [yearsBranches, setYearsBranches] = useState({ years: [], branches: [] });
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        getYearsBranches().then((data) => {
            setYearsBranches(data);
        })
        .then(()=>{
            setIsLoaded(true);
        })
    }, []);

    const {register,handleSubmit,formState: { errors },} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        // console.log(data);
        
        navigate(`/batch/${data.year}/${data.branch}`);
    };



    return (
        <div className="m-3">
            <form
                className={`
                    p-6 max-w-md mx-auto border rounded-md mt-6 shadow-md
                    ${!isLoaded ? "hidden" : ""}
                    `}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">
                    Batch Report
                </h1>
                <div>
                    <label className="labelText">Year</label>
                    <select
                        {...register("year")}
                        className="w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition duration-300 ease-in-out mb-2"
                    >
                        <option value="all">All</option>
                        {yearsBranches.years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.year && (
                        <p className="text-red-500 text-sm">{errors.year.message}</p>
                    )}

                    <label className="labelText">Branch</label>
                    <select
                        {...register("branch")}
                        className="w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  hover:bg-gray-100 transition duration-300 ease-in-out"
                    >
                        <option value="all">All</option>
                        {yearsBranches.branches.map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                    {errors.branch && (
                        <p className="text-red-500 text-sm">{errors.branch.message}</p>
                    )}

                    <button
                        type="submit"
                        className={`
                            w-full mt-4 text-white 
                            font-semibold py-2 px-4 rounded-md focus:outline-none 
                            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                            bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out
                        `}
                    >
                        Get Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BatchReport;
