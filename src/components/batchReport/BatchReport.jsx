import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getYearsBranches } from './BatchUtil'
import { getViews } from '../super/handlers'
import Loading from '../Loading'
const BatchReport = () => {
  const [yearsBranches, setYearsBranches] = useState({
    years: [],
    branches: []
  })
  const [views, setViews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    getYearsBranches().then(data => {
      setYearsBranches(data)
    })
    getViews()
      .then(data => {
        // console.log('data: ', data)
        if (!data || !data.views) {
          setViews([])
        } else {
          setViews(data.views)
        }
        // console.log(data.views)
      })
      .then(() => {
        setIsLoaded(true)
      })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      year: 'all',
      branch: 'all',
      view: 'none'
    }
  })
  const navigate = useNavigate()
  const onSubmit = data => {
    if (data.view && data.view !== 'none') {
      navigate(`/view/${data.view}`)
    } 
    else {
      navigate(`/batch/${data.year}/${data.branch}`)
    }
  }

  return (
    <div className='m-3'>
      {!isLoaded && (
        <div className='w-full h-[calc(100vh-80px)] flex flex-row justify-center items-center'>
          <Loading />
        </div>
      )}
      <form
        className={`
                    p-6 max-w-md mx-auto border rounded-md mt-6 shadow-md
                    ${!isLoaded ? 'hidden' : ''}
                    `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl font-semibold text-blue-700 text-center mb-3'>
          Batch Report
        </h1>
        <div>
          <label className='labelText'>Year</label>
          <select
            {...register('year')}
            className='w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition duration-300 ease-in-out mb-2'
          >
            <option value='all'>All</option>
            {yearsBranches.years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className='text-red-500 text-sm'>{errors.year.message}</p>
          )}

          <label className='labelText'>Branch</label>
          <select
            {...register('branch')}
            className='w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  hover:bg-gray-100 transition duration-300 ease-in-out'
          >
            <option value='all'>All</option>
            {yearsBranches.branches.map(branch => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className='text-red-500 text-sm'>{errors.branch.message}</p>
          )}

          {views.length > 0 && (
            <>
              <p className='text-center mt-4 font-semibold text-lg'>or</p>
              <label className='labelText'>View</label>
              <select
                {...register('view')}
                className='w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  hover:bg-gray-100 transition duration-300 ease-in-out mb-2'
              >
                <option value='none'>Select a View</option>
                {views.map(view => (
                  <option key={view} value={view}>
                    {view}
                  </option>
                ))}
              </select>
              {errors.view && (
                <p className='text-red-500 text-sm'>{errors.view.message}</p>
              )}
            </>
          )}

          <button
            type='submit'
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
  )
}

export default BatchReport
