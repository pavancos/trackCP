import { useEffect, useState } from "react"
import { useAuth } from "../../store/authContext"
import { getBatches } from "./handlers"
import { Navigate, Link, useNavigate } from "react-router-dom"
import BatchConfigTable from "./batchconfig/BatchConfigTable"
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
            <div className="mx-3 mt-3">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl " >Batches</h1>
                    <div className="flex justify-center items-center gap-x-2">
                        <button
                            onClick={() => setIsAddBatch(true)}
                            className="text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out">
                            Add New Batch
                        </button>
                        {
                            authState.role === "dev" &&
                            <button
                                className=" bg-[#000] px-5 py-2 rounded-md text-white text-center flex-wrap"
                                onClick={() => setIsAddAdmin(true)}
                            >
                                Add Admin
                            </button>
                        }
                    </div>
                </div>
                <div className="mt-4">
                    <BatchConfigTable batches={batches} handleDelete={handleDelete} />
                </div>

            </div>
            {
                isAddAdmin && <AddAdminModal setIsAddAdmin={setIsAddAdmin} />
            }
            {
                isAddBatch && <AddBatch setIsAddBatch={setIsAddBatch} batches={batches} />
            }

        </>
    )
}
export default Dashboard