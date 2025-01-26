import { useEffect, useState } from "react"
import { useAuth } from "../../store/authContext"
import { getBatches } from "./handlers"
import { Navigate, Link, useNavigate } from "react-router-dom"
import BatchConfigTable from "./batchConfig/BatchConfigTable"
import AddAdminModal from "./modals/AddAdminModal";
import AddBatch from "./modals/AddBatch"
const Dashboard = () => {
    const { authState } = useAuth();
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    const [isAddAdmin, setIsAddAdmin] = useState(false);
    const [isAddBatch, setIsAddBatch] = useState(false);
    useEffect(() => {
        if (authState.isAuthenticated) {
            getBatches(authState.token)
                .then(data => {
                    setBatches(data)
                })
        }
    }, []);

    const handleDelete = (year, branch) => {
        setBatches((prevBatches) =>
            prevBatches.filter((batch) => !(batch.year === year && batch.branch === branch))
        );
    };

    return (
        <>
            <div className={`flex bg-slate-100 rounded-md m-3 py-2 md:flex-row  md:justify-around md:items-center `}>
                <div className=" w-[300px] h-[300px] rounded-full bg-slate-200">
                    
                </div>
                <div className={`flex flex-col gap-y-4 `}>
                    {
                        batches.map((batch, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/batch/${batch.year}/${batch.branch}`}
                                    className={`w-full bg-slate-500 px-5 py-2 rounded-md text-white text-center`}
                                >
                                    <div>
                                        <h2>{batch.year} - {batch.branch}</h2>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    {
                        authState.role === "dev" &&
                        <button
                            className="w-full bg-slate-500 px-5 py-2 rounded-md text-white text-center"
                            onClick={() => setIsAddAdmin(true)}
                        >
                            Add Admin
                        </button>
                    }
                </div>
            </div>
            <div className="mx-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl " >Batches</h1>
                    <button
                        onClick={() => setIsAddBatch(true)}
                        className="text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out">
                        Add New Batch
                    </button>
                </div>
                <div className="mt-4">
                    <BatchConfigTable batches={batches} handleDelete={handleDelete} />
                </div>

            </div>
            {
                isAddAdmin && <AddAdminModal setIsAddAdmin={setIsAddAdmin} />
            }
            {
                isAddBatch &&  <AddBatch setIsAddBatch={setIsAddBatch} batches={batches} />
            }

        </>
    )
}
export default Dashboard