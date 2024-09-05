import React, { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Home.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
function Home() {

  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.to('.home', {
      duration: 1,
      opacity: 1,
      delay: 1,
      x: 20,
      y: 20,
    })

  })
  useEffect(() => {
    const contentWidth = document.querySelector('.hs h1').scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(".hs h1", {
      x: -(contentWidth - viewportWidth) - 10,
      scrollTrigger: {
        trigger: "#page2",
        scroller: "body",
        // markers: true,
        start: "top 40%",
        end: () => `+=${contentWidth - viewportWidth}`,
        scrub: 1,
        pin: true,
      }
    });

    gsap.from(".page3", {
      opacity: 0,
      y: -20,
      duration: 2,
      delay: 1,
      scrollTrigger: {
        trigger: "#page3 h1",
        scroller: "body",
        // markers: true,
        start: "top 10%",
      }
    });
  }, []);

  return (
    <div>
      {/* <h1 className='home'>Hello</h1> */}
      {/* <div className={`w-full h-full bg-zinc-200 flex flex-col items-center pt-3 `} style={{ minHeight: "100vh" }}>
        <div className={`flex items-center gap-3 bg-white p-7 rounded-md m-3`}>
          <h1 className='text-justify'>Under Maintanance! We are currently improving this page. Meanwhile, checkout Batch Report and Student Report.</h1>
        </div>
      </div> */}
      <div className='page'>
      </div>
      <div id="page2" className='hs'>
        <h1>Start Tracking Now 💻 Roll Number and Date Range Selection 📅 Contest Participation Overview 🏆 Multi-Platform Integration 🌐 Performance Metrics 📊 Export to xlsx 📂</h1>
      </div>
      <div id="page3" className='page3'>
        <h1>Page 3 Content  </h1>
      </div>
    </div>
  )
}

export default Home