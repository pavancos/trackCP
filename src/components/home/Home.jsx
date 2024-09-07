import React, { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Home.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import UpcomingContests from './UpcomingContests'


function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // hide bubbles
    gsap.set('.bubble',
      {
        opacity: 0,
        y: 90
      });

    // show bubbles
    gsap.to('.bubble', {
      opacity: 1,
      delay: 0.3,
      duration: 0.6,
      stagger: 0.3,
      y: 10,
      ease: 'back.out(5)',
      // ease: 'elastic.out(0.9, 0.5)',
    });
  }, [])
  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div className="grid grid-cols-8 grid-rows-3 auto-rows-fr grid-flow-row w-full h-1/2 md:w-2/3">
          <div className="bubble col-span-3 row-span-1  flex justify-center items-start">
            <button
              className={`
                 backdrop-blur-sm shadow-xl text-white  py-2 px-4 rounded-lg z-50  bg-vividBlue rotate-[3deg]
                `}
            >
              <a href="/batchreport">Batch Report</a>
            </button>
          </div>
          <div className="bubble col-span-3 col-start-6 row-span-1  flex justify-center items-center ">

            <button
              className={`
                 backdrop-blur-sm shadow-xl text-white py-2 px-4 rounded-lg z-50 bg-coral rotate-[-7deg]
                `}
            >
              <a href="/playground">CP Report</a>
            </button>
          </div>
          <div className="col-span-4 col-start-3 row-span-1 "
          >
            <h1 className='main-heading text-5xl text-center font-medium sm:text-6xl md:text-7xl lg:text-8xl font-advent tracking-wider' >
              Track io
            </h1>
          </div>
          <div className="bubble col-span-3 row-span-1  flex flex-row justify-center sm:items-center items-start">
            <button
              className={`
                 backdrop-blur-sm shadow-xl text-white  py-2 px-2 rounded-lg bg-softRed z-50 rotate-[-7deg]
                `}
            >
              <a href="/studentreport">Student Report</a>
            </button>

          </div>
          <div className="bubble col-span-3 col-start-6 row-span-1  flex flex-row justify-center  items-start sm:items-end">

            <button
              className={`
                 backdrop-blur-sm shadow-xl text-white py-2 px-4 rounded-lg z-50 bg-deepTeal rotate-[5deg]
                `}
            >
              <a href="/compare">Compare</a>
            </button>
          </div>
        </div>
      </div>

      <UpcomingContests />

      <div className='page'></div>
      <div className='page'></div>
    </>
  )
}

export default Home