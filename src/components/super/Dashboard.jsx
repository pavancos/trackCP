import { useEffect, useState } from 'react'
import { useAuth } from '../../store/authContext'
import { fullRefresh, getBatches, getViews } from './handlers'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import BatchConfigTable from './batchconfig/BatchConfigTable'
import AddAdminModal from './modals/AddAdminModal'
import AddBatch from './modals/AddBatch'
import AddView from './modals/AddView'
import ViewConfigTable from './viewconfig/ViewConfigTable'
import { toast } from 'react-hot-toast'
const Dashboard = () => {
  const { authState } = useAuth()
  const navigate = useNavigate()
  const [batches, setBatches] = useState([])
  const [views, setViews] = useState([])
  const [isAddAdmin, setIsAddAdmin] = useState(false)
  const [isAddBatch, setIsAddBatch] = useState(false)
  const [isAddView, setIsAddView] = useState(false)
  useEffect(() => {
    if (authState.isAuthenticated === null) {
      return
    }
    if (!authState.isAuthenticated) {
      navigate('/login')
      return
    }
    if (authState.isAuthenticated) {
      getBatches(authState.token).then(data => {
        setBatches(data)
      })
      getViews().then(data => {
        if (!data || !data.views) {
          setViews([])
        } else {
          setViews(data.views)
        }
      })
    }
  }, [])

  const handleDelete = (year, branch) => {
    setBatches(prevBatches =>
      prevBatches.filter(
        batch => !(batch.year === year && batch.branch === branch)
      )
    )
  }

  function handleViewDelete () {
    console.log('View delete')
  }

  const handleFullRefresh = async () => {
    try {
      const response = await fullRefresh(authState.token);
      if (response.error) {
        toast.error(response.message || 'Full Refresh Failed');
      } else {
        toast.success(response.message || 'Full Refresh Started');
      }
    } catch (err) {
      toast.error('An unexpected error occurred during Full Refresh');
    }
  };

  if (authState.isAuthenticated === null) {
    return <div>Loading...</div> // Show loading state
  }
  return (
    <>
      <div className='mx-3 mt-3'>
        {/* <div className='flex flex-col md:flex-row justify-end items-center'>
          <div className='flex justify-center items-center gap-x-2'>
            {authState.role === 'dev' && (
              <button
                className=' bg-[#000] px-5 py-2 rounded-md text-white text-center flex-wrap'
                onClick={() => setIsAddAdmin(true)}
              >
                Add Admin
              </button>
            )}
          </div>
        </div> */}
        <div className='mt-4'>
          <div className='flex sm:justify-between items-center flex-wrap'>
            <h1 className='text-3xl '>Batches</h1>
            <div className='flex gap-x-2'>
              <button
                onClick={() => setIsAddBatch(true)}
                className='text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out'
              >
                Add Batch
              </button>
              {authState.role === 'dev' && (
                <>
                  <button
                    className=' bg-[#000] px-5 py-2 rounded-md text-white text-center flex-wrap'
                    onClick={() => setIsAddAdmin(true)}
                  >
                    Add Admin
                  </button>
                  <button
                    className=' bg-[#ff5151] px-5 py-2 rounded-md text-white text-center flex-wrap'
                    onClick={() => handleFullRefresh()}
                  >
                    Full Refresh
                  </button>
                </>
              )}
            </div>
          </div>
          <BatchConfigTable batches={batches} handleDelete={handleDelete} />
        </div>
        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl pl-1 '>Views</h1>
            <button
              onClick={() => setIsAddView(true)}
              className='text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-500 hover:bg-blue-600 transition duration-700 ease-in-out'
            >
              Add View
            </button>
          </div>
          {views.length === 0 ? (
            <h1 className='text-2xl font-bold text-center my-4'>
              No Views Found
            </h1>
          ) : (
            <ViewConfigTable
              handleViewDelete={handleViewDelete}
              views={views}
            />
          )}
        </div>
      </div>
      {isAddAdmin && <AddAdminModal setIsAddAdmin={setIsAddAdmin} />}
      {isAddBatch && (
        <AddBatch setIsAddBatch={setIsAddBatch} batches={batches} />
      )}
      {isAddView && <AddView setIsAddView={setIsAddView} views={views} />}
    </>
  )
}
export default Dashboard
