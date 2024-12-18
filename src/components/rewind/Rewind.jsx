import React, { useState, useEffect } from 'react'
import RewindLoading from './RewindLoading'
import GradientBackground from './GradientBackground'
import RewindLoadingGradient from './RewindLoadingGradient'
import { useForm } from 'react-hook-form'
import Loading from '../Loading';
import { set } from 'react-ga'


function Rewind () {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFetchedFromApi, setIsFetchedFromApi] = useState(true)

  const [codechefData, setCodechefData] = useState([])
  const [codeforcesData, setCodeforcesData] = useState([])
  const [leetcodeData, setLeetcodeData] = useState([])

  const [selectedPlatforms, setSelectedPlatforms] = useState({
    Codechef: true,
    Codeforces: true,
    Leetcode: true,
    Spoj: false,
    Atcoder: false
  })

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false)
    // }, 100000) // Set the loading duration to 10 seconds
    // return () => clearTimeout(timer)
  }, [])

  async function playGroundInput (usernamesData) {
    setLoading(true)
    setIsFetchedFromApi(false)
    // console.log('usernamesData: ', usernamesData)
    let onlyUsernames = usernamesData
    delete onlyUsernames.nameOfUser
    // console.log('onlyUsernames: ', onlyUsernames)
    let params = new URLSearchParams(onlyUsernames).toString().toLowerCase()
    // console.log('params: ', params)
    try {
      let res = await fetch(`https://cpplayground.vercel.app/all?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log('res: ', res)
      let data = await res.json()
      console.log('data: ', data)
      setCodechefData(data.codechef)
      setLeetcodeData(data.leetcode)
      setCodeforcesData(data.codeforces)
      setIsSubmitted(true)
      setIsFetchedFromApi(true)
      setLoading(false)
    } catch (err) {
      toast.error('Something went wrong')
      setIsFetchedFromApi(true)
    }
  }

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      {loading ? (
        <div className='loading-screen justify-center items-center m-20'>
          {/* <RewindLoading /> */}
          <RewindLoadingGradient />
        </div>
      ) : (
        <div className='content'>
          <div className='m-3'>
            <form
              onSubmit={handleSubmit(playGroundInput)}
              className='max-w-lg mt-5 mx-auto p-4 mb-2 border rounded-md'
            >
              <h1 className='text-2xl font-semibold text-blue-700 text-center mb-3'>
                Rewind - Trackcode
              </h1>
              {/* Inputs for the platform usernames */}
              <div className='mb-2 flex flex-wrap'>
                <div className='mb-1 w-full md:w-1/2 px-1'>
                  <label htmlFor='inputCodechef' className='labelText'>
                    Codechef Username
                  </label>
                  <input
                    type='text'
                    id='inputCodechef'
                    placeholder='Codechef Username'
                    required
                    className='textInputBox'
                    {...register('Codechef')}
                  />
                </div>

                <div className='mb-1 w-full md:w-1/2 px-1'>
                  <label htmlFor='inputCodeforces' className='labelText'>
                    Codeforces Username
                  </label>
                  <input
                    type='text'
                    id='inputCodeforces'
                    required
                    placeholder='Codeforces Username'
                    className='textInputBox'
                    {...register('Codeforces')}
                  />
                </div>
                <div className='mb-1 w-full md:w-1/2 px-1'>
                  <label htmlFor='inputLeetcode' className='labelText'>
                    Leetcode Username
                  </label>
                  <input
                    type='text'
                    id='inputLeetcode'
                    reauired
                    placeholder='Leetcode Username'
                    className='textInputBox'
                    {...register('Leetcode')}
                  />
                </div>
              </div>

              <button
                type='submit'
                // disabled={!isFetchedFromApi}
                className={`w-full  font-semibold py-2 px-4 rounded-md
                        transition duration-700 ease-in-out text-white 
                         focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-blue-500 
                        ${
                          !isFetchedFromApi
                            ? 'cursor-not-allowed bg-blue-300'
                            : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
                        }`}
              >
                Submit
              </button>
            </form>

            {/* {
                !isFetchedFromApi &&
                <div className='flex flex-row justify-center'><RewindLoadingGradient /></div>
            } */}

            {/* {
                (isSubmitted && isFetchedFromApi) &&
                (codechefData !== null) &&
                isCodeChefSelected && !isAnyChange &&
                <CodechefChart codechefData={codechefData} />
            }
            {
                (isSubmitted && isFetchedFromApi) &&
                (leetcodeData !== null) &&
                isLeetcodeSelected && !isAnyChange &&
                <LeetcodeChart leetcodeData={leetcodeData} />
            } */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Rewind
