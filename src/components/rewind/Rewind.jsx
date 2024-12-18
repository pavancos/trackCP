import React, { useState, useEffect } from 'react'
import RewindLoading from './RewindLoading'
import GradientBackground from './GradientBackground'
import RewindLoadingGradient from './RewindLoadingGradient'

function Rewind () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false)
    // }, 100000) // Set the loading duration to 10 seconds
    // return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      {loading ? (
        <div className='loading-screen justify-center items-center m-20'>
          {/* <RewindLoading /> */}
          <RewindLoadingGradient/>
        </div>
      ) : (
        <div className='content'>
          <h1 className='text-5xl'>Hello</h1>
          {/* Place other content here */}
        </div>
      )}
    </div>
  )
}

export default Rewind
