import React, { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Home.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JSConfetti from 'js-confetti'


function Home() {

  // gsap.registerPlugin(useGSAP)
  // gsap.registerPlugin(ScrollTrigger)

  // useGSAP(() => {
  //   gsap.to('.home', {
  //     duration: 1,
  //     opacity: 1,
  //     delay: 1,
  //     x: 20,
  //     y: 20,
  //   })

  // })
  // useEffect(() => {
  //   const contentWidth = document.querySelector('.hs h1').scrollWidth;
  //   const viewportWidth = window.innerWidth;

  //   gsap.to(".hs h1", {
  //     x: -(contentWidth - viewportWidth) - 10,
  //     scrollTrigger: {
  //       trigger: "#page2",
  //       scroller: "body",
  //       // markers: true,
  //       start: "top 40%",
  //       end: () => `+=${contentWidth - viewportWidth}`,
  //       scrub: 1,
  //       pin: true,
  //     }
  //   });

  //   gsap.from(".page3", {
  //     opacity: 0,
  //     y: -20,
  //     duration: 2,
  //     delay: 1,
  //     scrollTrigger: {
  //       trigger: "#page3 h1",
  //       scroller: "body",
  //       // markers: true,
  //       start: "top 10%",
  //     }
  //   });
  // }, []);
  const jsConfetti = new JSConfetti()

  const handleClick = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['📈','📊','📉','🎯','🚀','🗂️','📝','📋','🔎'],
      emojiSize: 40,
      confettiNumber: 10,
    }).then(() => {
      console.log('done');
    }).finally(() => {
      jsConfetti.clearCanvas();
    });
  }

  return (
    // <div>
    //   <h1 className='home'>Hello</h1>
    //   <div className={`w-full h-full bg-zinc-200 flex flex-col items-center pt-3 `} style={{ minHeight: "100vh" }}>
    //     <div className={`flex items-center gap-3 bg-white p-7 rounded-md m-3`}>
    //       <h1 className='text-justify'>Under Maintanance! We are currently improving this page. Meanwhile, checkout Batch Report and Student Report.</h1>
    //     </div>
    //   </div>
    //   <div className='page'>
    //   </div>
    //   <div id="page2" className='hs'>
    //     <h1>Start Tracking Now 💻 Roll Number and Date Range Selection 📅 Contest Participation Overview 🏆 Multi-Platform Integration 🌐 Performance Metrics 📊 Export to xlsx 📂</h1>
    //   </div>
    //   <div id="page3" className='page3'>
    //     <h1>Page 3 Content  </h1>
    //   </div>
    // </div>
    <>
      <div className='h-screen flex justify-center items-center pb-48 '>
        <div className="grid grid-cols-8 grid-rows-3 gap-0 auto-rows-fr grid-flow-row w-full h-1/2 md:w-2/3">
          <div className="col-span-3 row-span-1  flex justify-start items-start">
            <button
              className={`
                 backdrop-blur-sm shadow-xl text-black  py-2 px-4 rounded-lg z-50  bg-white
                `}
            >
              <a href="/batchreport">Batch Report</a>
            </button>
          </div>
          <div className="col-span-3 col-start-6 row-span-1  flex justify-center items-center ">

            <button
              className={`
                 backdrop-blur-sm shadow-xl text-black py-2 px-4 rounded-lg z-50 bg-white
                `}
            >
              <a href="/playground">CP Report</a>
            </button>
          </div>
          <div className="col-span-4 col-start-3 row-span-1 "
            // onClick={handleClick}
          >
            <h1 className='text-5xl  md:text-8xl font-mono tracking-wider font-black ' >
              trackio
            </h1>
          </div>
          <div className="col-span-3 row-span-1  flex flex-row justify-center items-center">
            <button
              className={`
                 backdrop-blur-sm shadow-xl text-black  py-2 px-2 rounded-lg bg-white z-50
                `}
            >
              <a href="/studentreport">Student Report</a>
            </button>

          </div>
          <div className="col-span-3 col-start-6 row-span-1  flex flex-row justify-end items-end">

            <button
              className={`
                 backdrop-blur-sm shadow-xl text-black  py-2 px-4 rounded-lg z-50 bg-white

                `}
            >
              <a href="/compare">Compare</a>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home